"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Heart, Send, Check, Plus, X, ArrowRight, ArrowLeft, User, Users, UtensilsCrossed, Mail, Phone, BedDouble } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Dictionary } from "@/lib/i18n/dictionaries"

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface Guest {
  id: string
  name: string
  attending: boolean
  menu: "classic" | "vegetarian"
}

const TOTAL_STEPS = 6
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export function RSVPSection({ dict }: { dict: Dictionary["rsvp"] }) {
  const t = dict.steps
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")

  // Step 0: Your name
  const [mainName, setMainName] = useState("")
  const [mainAttending, setMainAttending] = useState(true)
  const [mainMenu, setMainMenu] = useState<"classic" | "vegetarian">("classic")

  // Step 1: Guests (start with one empty guest by default)
  const [guests, setGuests] = useState<Guest[]>([
    { id: "guest-0", name: "", attending: true, menu: "classic" },
  ])

  // Step 3: Accommodation
  const [needAccommodation, setNeedAccommodation] = useState(false)
  const [accommodationDetails, setAccommodationDetails] = useState("")

  // Step 5: Contact
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [contactError, setContactError] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  // Honeypot (invisible to users, bots fill it)
  const [honeypot, setHoneypot] = useState("")

  // Load reCAPTCHA v3 script
  const recaptchaLoaded = useRef(false)
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || recaptchaLoaded.current) return
    recaptchaLoaded.current = true
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    document.head.appendChild(script)
  }, [])

  const addGuest = useCallback(() => {
    setGuests((prev) => [...prev, { id: `guest-${Date.now()}`, name: "", attending: true, menu: "classic" }])
  }, [])

  const removeGuest = useCallback((id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const updateGuest = useCallback((id: string, field: keyof Guest, value: string | boolean) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)))
  }, [])

  // Validation
  const isValidEmail = (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const isValidPhone = (v: string) => !v || /^[+]?[\d\s\-().]{6,20}$/.test(v)

  const canProceed = () => {
    switch (step) {
      case 0: return mainName.trim().length > 0
      case 1: return guests.length === 0 || guests.every((g) => g.name.trim().length > 0)
      case 2: return true
      case 3: return true
      case 4: return true
      case 5: {
        const hasContact = email.trim().length > 0 || phone.trim().length > 0
        const validEmail = isValidEmail(email)
        const validPhone = isValidPhone(phone)
        return hasContact && validEmail && validPhone
      }
      default: return true
    }
  }

  const next = () => {
    if (step === 5) {
      if (!email.trim() && !phone.trim()) {
        setContactError(true)
        return
      }
      if (email && !isValidEmail(email)) {
        setEmailError(t.invalidEmail)
        return
      }
      if (phone && !isValidPhone(phone)) {
        setPhoneError(t.invalidPhone)
        return
      }
    }
    setContactError(false)
    setEmailError("")
    setPhoneError("")
    if (step < TOTAL_STEPS - 1) setStep(step + 1)
  }

  const back = () => {
    setContactError(false)
    setEmailError("")
    setPhoneError("")
    setServerError("")
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!canProceed()) { setContactError(true); return }
    setIsSubmitting(true)
    setServerError("")

    try {
      // Get reCAPTCHA token (soft-fail: if it errors, we still submit)
      let recaptchaToken = ""
      try {
        if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
          recaptchaToken = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(async () => {
              try {
                const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "rsvp_submit" })
                resolve(token)
              } catch { resolve("") }
            })
          })
        }
      } catch { /* reCAPTCHA unavailable, proceed without it */ }

      const payload = {
        mainName: mainName.trim(),
        mainAttending,
        mainMenu,
        guests: guests.filter(g => g.name.trim()).map(g => ({
          name: g.name.trim(),
          attending: g.attending,
          menu: g.menu,
        })),
        needAccommodation,
        accommodationDetails: accommodationDetails.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        recaptchaToken,
        website: honeypot, // Honeypot
      }

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.")
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setSubmitted(true)
    } catch {
      setServerError("Connection error. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="px-6 py-16 sm:py-20 md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center sm:gap-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-card sm:h-20 sm:w-20">
            <Check className="h-7 w-7 text-primary sm:h-9 sm:w-9" />
          </div>
          <h3 className="font-serif text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl">
            {dict.thankYou}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {dict.thankYouMessage}
          </p>
          <div className="mt-2 h-px w-12 bg-accent sm:mt-4 sm:w-16" />
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-16 sm:py-20 md:px-10 lg:px-16 lg:py-24">
      <AnimatedSection className="mx-auto flex max-w-lg flex-col items-center gap-6 sm:gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card sm:h-14 sm:w-14">
            <Heart className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
            {dict.sectionLabel}
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {dict.sectionTitle}
          </h2>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-base">
            {dict.sectionDescription}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex w-full max-w-xs items-center justify-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>

        {/* Honeypot field - hidden from users, bots will fill it */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website-field">Website</label>
          <input
            type="text"
            id="website-field"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Step content */}
        <div className="w-full">
          {/* Step 0: Name */}
          {step === 0 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.yourName}</h3>
              </div>
              <Input
                value={mainName}
                onChange={(e) => setMainName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="border-border/60 bg-card text-base font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
                autoFocus
              />
            </div>
          )}

          {/* Step 1: Additional guests */}
          {step === 1 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.guests}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.guestsDescription}</p>

              {guests.map((guest, idx) => (
                <div key={guest.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Input
                    value={guest.name}
                    onChange={(e) => updateGuest(guest.id, "name", e.target.value)}
                    placeholder={t.guestNamePlaceholder}
                    className="flex-1 border-border/60 bg-card font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
                    autoFocus={idx === guests.length - 1}
                  />
                  <button
                    type="button"
                    onClick={() => removeGuest(guest.id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                    aria-label={t.removeGuest}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addGuest}
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border/80 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
                {t.addGuest}
              </button>
            </div>
          )}

          {/* Step 2: Attendance */}
          {step === 2 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.attendance}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.attendanceDescription}</p>

              <div className="flex flex-col gap-3">
                {/* Main person */}
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3">
                  <span className="font-light tracking-wide text-foreground">{mainName}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMainAttending(true)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                        mainAttending ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      {t.attendYes}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMainAttending(false)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                        !mainAttending ? "bg-muted-foreground text-background" : "border border-border text-muted-foreground hover:border-muted-foreground/40"
                      )}
                    >
                      {t.attendNo}
                    </button>
                  </div>
                </div>

                {/* Guest attendance */}
                {guests.filter(g => g.name.trim()).map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3">
                    <span className="font-light tracking-wide text-foreground">{guest.name}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateGuest(guest.id, "attending", true)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          guest.attending ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t.attendYes}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateGuest(guest.id, "attending", false)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          !guest.attending ? "bg-muted-foreground text-background" : "border border-border text-muted-foreground hover:border-muted-foreground/40"
                        )}
                      >
                        {t.attendNo}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Accommodation */}
          {step === 3 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <BedDouble className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.accommodation}</h3>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNeedAccommodation(true)}
                  className={cn(
                    "flex-1 rounded-lg border py-4 text-sm tracking-wide transition-all",
                    needAccommodation
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {t.accommodationYes}
                </button>
                <button
                  type="button"
                  onClick={() => { setNeedAccommodation(false); setAccommodationDetails("") }}
                  className={cn(
                    "flex-1 rounded-lg border py-4 text-sm tracking-wide transition-all",
                    !needAccommodation
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {t.accommodationNo}
                </button>
              </div>

              {needAccommodation && (
                <div className="flex flex-col gap-2 animate-in fade-in duration-200">
                  <Label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.accommodationDetails}</Label>
                  <Input
                    value={accommodationDetails}
                    onChange={(e) => setAccommodationDetails(e.target.value)}
                    placeholder={t.accommodationPlaceholder}
                    className="border-border/60 bg-card font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Menu */}
          {step === 4 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.menu}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.menuDescription}</p>

              <div className="flex flex-col gap-3">
                {/* Main person menu - only if attending */}
                {mainAttending && (
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3">
                    <span className="font-light tracking-wide text-foreground">{mainName}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMainMenu("classic")}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          mainMenu === "classic" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t.menuClassic}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMainMenu("vegetarian")}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          mainMenu === "vegetarian" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t.menuVegetarian}
                      </button>
                    </div>
                  </div>
                )}

                {/* Guest menus - only attending guests with names */}
                {guests.filter(g => g.attending && g.name.trim()).map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3">
                    <span className="font-light tracking-wide text-foreground">{guest.name}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateGuest(guest.id, "menu", "classic")}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          guest.menu === "classic" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t.menuClassic}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateGuest(guest.id, "menu", "vegetarian")}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs tracking-wide transition-all",
                          guest.menu === "vegetarian" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t.menuVegetarian}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Contact */}
          {step === 5 && (
            <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">{t.contact}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.contactDescription}</p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="rsvp-email" className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> {t.emailLabel}
                  </Label>
                  <Input
                    id="rsvp-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setContactError(false); setEmailError("") }}
                    placeholder={t.emailPlaceholder}
                    className={cn(
                      "border-border/60 bg-card font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30",
                      emailError && "border-destructive/60"
                    )}
                  />
                  {emailError && (
                    <p className="text-xs text-destructive animate-in fade-in duration-200">{emailError}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="rsvp-phone" className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" /> {t.phoneLabel}
                  </Label>
                  <Input
                    id="rsvp-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setContactError(false); setPhoneError("") }}
                    placeholder={t.phonePlaceholder}
                    className={cn(
                      "border-border/60 bg-card font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30",
                      phoneError && "border-destructive/60"
                    )}
                  />
                  {phoneError && (
                    <p className="text-xs text-destructive animate-in fade-in duration-200">{phoneError}</p>
                  )}
                </div>
                {contactError && (
                  <p className="text-xs text-destructive animate-in fade-in duration-200">{t.atLeastOne}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="rsvp-message" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.messageLabel}</Label>
                <Textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  rows={3}
                  className="resize-none border-border/60 bg-card font-light tracking-wide placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
                />
              </div>
            </div>
          )}
        </div>

        {/* Server error */}
        {serverError && (
          <p className="text-xs text-destructive text-center animate-in fade-in duration-200">{serverError}</p>
        )}

        {/* Navigation buttons */}
        <div className="flex w-full items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {dict.back}
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className={cn(
                "group flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {dict.next}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className={cn(
                "group flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70",
                isSubmitting && "cursor-wait"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  ...
                </span>
              ) : (
                <>
                  {dict.submit}
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          )}
        </div>
      </AnimatedSection>
    </div>
  )
}
