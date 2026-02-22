CREATE TABLE IF NOT EXISTS rsvp_responses (
  id SERIAL PRIMARY KEY,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  group_name TEXT NOT NULL,
  person_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT FALSE,
  menu TEXT DEFAULT '',
  accommodation BOOLEAN DEFAULT FALSE,
  accommodation_details TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  message TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_rsvp_group ON rsvp_responses (group_name);
CREATE INDEX IF NOT EXISTS idx_rsvp_submitted ON rsvp_responses (submitted_at DESC);
