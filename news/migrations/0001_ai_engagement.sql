-- First-party interaction metrics only. No IP, user agent or ad identifier.
CREATE TABLE IF NOT EXISTS ai_open_events (
  event_id TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  market TEXT NOT NULL CHECK (market IN ('us', 'tw')),
  stock TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('web', 'ios', 'android')),
  language TEXT NOT NULL CHECK (language IN ('zh', 'en')),
  visitor_hash TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ai_open_day ON ai_open_events(day);
CREATE INDEX IF NOT EXISTS ai_open_scope ON ai_open_events(day, market, stock, platform);
