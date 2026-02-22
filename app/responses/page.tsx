"use client"

import { useState, useCallback } from "react"
import { Lock, RefreshCw, Download, Users, CheckCircle, XCircle, Hotel, Pencil, Trash2 } from "lucide-react"

interface RSVPRow {
  id: number
  submitted_at: string
  group_name: string
  person_name: string
  attending: string
  menu: string
  accommodation: string
  accommodation_details: string
  email: string
  phone: string
  message: string
}

function normalizeFlag(value: unknown): "Yes" | "No" {
  if (value === true || value === "Yes" || value === "yes" || value === "true" || value === 1) return "Yes"
  return "No"
}

export default function ResponsesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<RSVPRow[]>([])
  const [fetching, setFetching] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [busy, setBusy] = useState(false)
  const [editingRow, setEditingRow] = useState<RSVPRow | null>(null)

  const authenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/responses-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const json = await res.json()
      if (res.ok && json.token) {
        setAuthToken(json.token)
        setIsAuthenticated(true)
        setPassword("")
        fetchDataWithToken(json.token)
      } else {
        setError("Parola incorect\u0103")
      }
    } catch {
      setError("Eroare de conexiune")
    } finally {
      setLoading(false)
    }
  }

  const fetchDataWithToken = useCallback(async (token: string) => {
    setFetching(true)
    try {
      const res = await fetch("/api/responses-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "list" }),
      })
      if (res.status === 401) {
        setIsAuthenticated(false)
        setAuthToken("")
        return
      }
      const json = await res.json()
      if (json.success) {
        const rows: RSVPRow[] = (json.data as RSVPRow[]).map((row) => ({
          ...row,
          attending: normalizeFlag(row.attending),
          accommodation: normalizeFlag(row.accommodation),
        }))
        setData(rows)
        setSelectedIds((prev) => {
          const next = new Set<number>()
          const ids = new Set(rows.map((r) => r.id))
          prev.forEach((id) => {
            if (ids.has(id)) next.add(id)
          })
          return next
        })
      }
    } catch {
      console.error("Failed to fetch data")
    } finally {
      setFetching(false)
    }
  }, [])

  const fetchData = useCallback(() => {
    if (authToken) fetchDataWithToken(authToken)
  }, [authToken, fetchDataWithToken])

  const exportCSV = (rows: RSVPRow[], suffix = "all") => {
    if (rows.length === 0) return

    const headers = [
      "Submitted At",
      "Group",
      "Person Name",
      "Attending",
      "Menu",
      "Accommodation",
      "Accommodation Details",
      "Email",
      "Phone",
      "Message",
    ]

    const csvRows = [
      headers.join(","),
      ...rows.map((row) =>
        [
          row.submitted_at,
          `"${row.group_name}"`,
          `"${row.person_name}"`,
          row.attending,
          row.menu,
          row.accommodation,
          `"${row.accommodation_details || ""}"`,
          row.email,
          row.phone,
          `"${(row.message || "").replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ]

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rsvp-responses-${suffix}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const selectedRows = data.filter((r) => selectedIds.has(r.id))
  const allSelected = data.length > 0 && selectedIds.size === data.length

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(data.map((r) => r.id)))
  }

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const startEditSelected = () => {
    if (selectedRows.length !== 1) return
    setEditingRow({ ...selectedRows[0] })
  }

  const saveEdit = async () => {
    if (!editingRow || !authToken) return
    setBusy(true)
    setError("")
    try {
      const res = await fetch("/api/responses-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken, action: "update", row: editingRow }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || "Edit failed")
      } else {
        setEditingRow(null)
        fetchData()
      }
    } catch {
      setError("Edit failed")
    } finally {
      setBusy(false)
    }
  }

  const deleteSelected = async () => {
    if (!authToken || selectedIds.size === 0) return
    if (!confirm(`Delete ${selectedIds.size} selected response(s)?`)) return
    setBusy(true)
    setError("")
    try {
      const res = await fetch("/api/responses-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken, action: "delete", ids: Array.from(selectedIds) }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || "Delete failed")
      } else {
        setSelectedIds(new Set())
        setEditingRow(null)
        fetchData()
      }
    } catch {
      setError("Delete failed")
    } finally {
      setBusy(false)
    }
  }

  // Compute stats
  const totalPeople = data.length
  const attending = data.filter((r) => r.attending === "Yes").length
  const notAttending = data.filter((r) => r.attending === "No").length
  const needAccommodation = data.filter((r) => r.accommodation === "Yes").length
  const classicMenu = data.filter((r) => (r.menu || "").trim().toLowerCase() === "classic").length
  const vegetarianMenu = data.filter((r) => {
    const menu = (r.menu || "").trim().toLowerCase()
    return menu === "vegetarian" || menu === "vegetariana" || menu === "vegetariană"
  }).length
  const uniqueGroups = new Set(data.map((r) => r.group_name)).size

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
        <form
          onSubmit={authenticate}
          className="w-full max-w-sm rounded-2xl border border-[#e8e0d8] bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f0eb]">
              <Lock className="h-5 w-5 text-[#8b7355]" />
            </div>
            <h1 className="font-serif text-xl text-[#2c2420]">RSVP Responses</h1>
            <p className="text-center text-sm text-[#8b7355]">
              Enter the password to view responses.
            </p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full rounded-lg border border-[#e8e0d8] bg-[#faf8f5] px-4 py-3 text-sm text-[#2c2420] outline-none transition focus:border-[#8b7355] focus:ring-1 focus:ring-[#8b7355]"
            autoFocus
          />

          {error && (
            <p className="mb-3 text-center text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-[#8b7355] px-4 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[#7a6548] disabled:opacity-50"
          >
            {loading ? "Se verific\u0103..." : "Autentificare"}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="border-b border-[#e8e0d8] bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-serif text-2xl text-[#2c2420]">RSVP Responses</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={fetching}
              className="flex items-center gap-2 rounded-lg border border-[#e8e0d8] bg-white px-4 py-2 text-sm text-[#2c2420] transition hover:bg-[#faf8f5] disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => exportCSV(data, "all")}
              disabled={data.length === 0}
              className="flex items-center gap-2 rounded-lg bg-[#8b7355] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7a6548] disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export all
            </button>
            <button
              onClick={() => exportCSV(selectedRows, "selected")}
              disabled={selectedIds.size === 0}
              className="flex items-center gap-2 rounded-lg border border-[#e8e0d8] bg-white px-4 py-2 text-sm text-[#2c2420] transition hover:bg-[#faf8f5] disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export selected ({selectedIds.size})
            </button>
            <button
              onClick={startEditSelected}
              disabled={selectedIds.size !== 1 || busy}
              className="flex items-center gap-2 rounded-lg border border-[#e8e0d8] bg-white px-4 py-2 text-sm text-[#2c2420] transition hover:bg-[#faf8f5] disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
              Edit selected
            </button>
            <button
              onClick={deleteSelected}
              disabled={selectedIds.size === 0 || busy}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete selected
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {editingRow && (
          <div className="mb-6 rounded-xl border border-[#e8e0d8] bg-white p-4">
            <h2 className="mb-3 font-medium text-[#2c2420]">Edit selected response (ID {editingRow.id})</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input value={editingRow.group_name} onChange={(e) => setEditingRow({ ...editingRow, group_name: e.target.value })} placeholder="Group" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <input value={editingRow.person_name} onChange={(e) => setEditingRow({ ...editingRow, person_name: e.target.value })} placeholder="Person name" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <select value={editingRow.attending} onChange={(e) => setEditingRow({ ...editingRow, attending: e.target.value })} className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm"><option>Yes</option><option>No</option></select>
              <input value={editingRow.menu || ""} onChange={(e) => setEditingRow({ ...editingRow, menu: e.target.value })} placeholder="Menu" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <select value={editingRow.accommodation} onChange={(e) => setEditingRow({ ...editingRow, accommodation: e.target.value })} className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm"><option>No</option><option>Yes</option></select>
              <input value={editingRow.accommodation_details || ""} onChange={(e) => setEditingRow({ ...editingRow, accommodation_details: e.target.value })} placeholder="Accommodation details" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <input value={editingRow.email || ""} onChange={(e) => setEditingRow({ ...editingRow, email: e.target.value })} placeholder="Email" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <input value={editingRow.phone || ""} onChange={(e) => setEditingRow({ ...editingRow, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm" />
              <textarea value={editingRow.message || ""} onChange={(e) => setEditingRow({ ...editingRow, message: e.target.value })} placeholder="Message" className="rounded-lg border border-[#e8e0d8] px-3 py-2 text-sm md:col-span-2" rows={3} />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={saveEdit} disabled={busy} className="rounded-lg bg-[#8b7355] px-4 py-2 text-sm font-medium text-white disabled:opacity-50">Save</button>
              <button onClick={() => setEditingRow(null)} disabled={busy} className="rounded-lg border border-[#e8e0d8] px-4 py-2 text-sm">Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-[#8b7355]">
              <Users className="h-4 w-4" />
              Total
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{totalPeople}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              Attending
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{attending}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-red-500">
              <XCircle className="h-4 w-4" />
              Not attending
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{notAttending}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-[#8b7355]">
              <Hotel className="h-4 w-4" />
              Accommodation
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{needAccommodation}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-[#8b7355]">
              <Users className="h-4 w-4" />
              Classic menu
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{classicMenu}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-[#8b7355]">
              <Users className="h-4 w-4" />
              Vegetarian menu
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{vegetarianMenu}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-4">
            <div className="flex items-center gap-2 text-sm text-[#8b7355]">
              <Users className="h-4 w-4" />
              Groups
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#2c2420]">{uniqueGroups}</p>
          </div>
        </div>

        {/* Table */}
        {data.length === 0 ? (
          <div className="rounded-xl border border-[#e8e0d8] bg-white p-12 text-center">
            <p className="text-[#8b7355]">
              {fetching ? "Loading responses..." : "No responses yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#e8e0d8] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e0d8] bg-[#faf8f5]">
                    <th className="whitespace-nowrap px-4 py-3">
                      <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Date</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Group</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Name</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Attending</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Menu</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Accommodation</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Email</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Phone</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium text-[#8b7355]">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => {
                    const isNewGroup =
                      i === 0 || data[i - 1].group_name !== row.group_name
                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-[#f0ebe5] transition hover:bg-[#faf8f5] ${
                          isNewGroup && i > 0 ? "border-t-2 border-t-[#e8e0d8]" : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(row.id)}
                            onChange={() => toggleSelectOne(row.id)}
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#6b5e50]">
                          {new Date(row.submitted_at).toLocaleDateString("ro-RO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-[#2c2420]">
                          {row.group_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#2c2420]">
                          {row.person_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              row.attending === "Yes"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {row.attending === "Yes" ? "Da" : "Nu"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#6b5e50]">
                          {row.menu || "-"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {isNewGroup ? (
                            row.accommodation === "Yes" ? (
                              <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                Da
                              </span>
                            ) : row.accommodation ? (
                              "Nu"
                            ) : (
                              "-"
                            )
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#6b5e50]">
                          {row.email || "-"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#6b5e50]">
                          {row.phone || "-"}
                        </td>
                        <td className="max-w-[200px] truncate px-4 py-3 text-[#6b5e50]" title={row.message || ""}>
                          {row.message || "-"}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
