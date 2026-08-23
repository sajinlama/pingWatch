-- =========================================================
-- Uptime Monitoring App — Optimized Schema
-- Postgres
-- =========================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";    -- for case-insensitive ema4444il

-- =========================================================
-- ENUM TYPES
-- =========================================================
CREATE TYPE monitor_status AS ENUM ('UP', 'DOWN', 'UNKNOWN', 'PAUSED');
CREATE TYPE notification_type AS ENUM ('EMAIL', 'SMS', 'WEBHOOK', 'SLACK', 'TELEGRAM');

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE users (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name               TEXT NOT NULL,
    email              CITEXT UNIQUE NOT NULL,
    password_hash      TEXT NOT NULL,

    telegram_chat_id   BIGINT UNIQUE,   -- set once user links their Telegram account

    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE telegram_link_codes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    code        TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    used_at     TIMESTAMPTZ,

    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_telegram_link_codes_code ON telegram_link_codes(code);

-- =========================================================
-- MONITORS
-- =========================================================
CREATE TABLE monitors (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    name                     TEXT,
    url                      TEXT NOT NULL,

    status                   monitor_status NOT NULL DEFAULT 'UNKNOWN',

    check_interval_seconds   INTEGER NOT NULL DEFAULT 300 CHECK (check_interval_seconds >= 30),
    timeout_seconds          INTEGER NOT NULL DEFAULT 30  CHECK (timeout_seconds > 0),

    http_status              INTEGER,
    response_time            INTEGER CHECK (response_time >= 0),  -- ms, last check snapshot
    last_checked             TIMESTAMPTZ,

    is_active                BOOLEAN NOT NULL DEFAULT TRUE,

    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_user_url UNIQUE (user_id, url)  
);

CREATE INDEX idx_monitors_user_id       ON monitors(user_id);
CREATE INDEX idx_monitors_active_status ON monitors(is_active, status);

-- =========================================================
-- MONITOR LOGS  (one monitor -> many logs / check history)
-- =========================================================
CREATE TABLE monitor_logs (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monitor_id     UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,

    status         monitor_status NOT NULL,
    http_status    INTEGER,
    response_time  INTEGER CHECK (response_time >= 0),
    error_message  TEXT,

    checked_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Almost every query here is "latest logs for this monitor"
CREATE INDEX idx_monitor_logs_monitor_checked
    ON monitor_logs(monitor_id, checked_at DESC);


    CREATE TABLE notifications (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        monitor_id  UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,

        type        notification_type NOT NULL,
        message     TEXT NOT NULL,

        sent_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

CREATE INDEX idx_notifications_monitor_sent
    ON notifications(monitor_id, sent_at DESC);


CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_monitors_updated_at
    BEFORE UPDATE ON monitors
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();