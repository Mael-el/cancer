-- Migration 008: Table statistiques_agregees
CREATE TABLE IF NOT EXISTS statistiques_agregees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    zone TEXT NOT NULL,
    inscrits INT DEFAULT 0,
    actifs_7j INT DEFAULT 0,
    questionnaires_completes INT DEFAULT 0,
    depistages_declares INT DEFAULT 0,
    vaccinations_declarees INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (date, zone)
);

CREATE INDEX IF NOT EXISTS idx_stats_date_zone ON statistiques_agregees (date, zone);
