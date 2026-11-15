-- Migration 005: Table centres
CREATE TABLE IF NOT EXISTS centres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    commune TEXT NOT NULL,
    departement TEXT NOT NULL,
    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,
    services JSONB DEFAULT '[]'::jsonb,
    contact TEXT,
    horaires TEXT,
    actif BOOLEAN DEFAULT TRUE,
    verifie_le DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_centres_commune ON centres (commune);
CREATE INDEX IF NOT EXISTS idx_centres_actif ON centres (actif);
