-- Migration 002: Table profils_risque
CREATE TABLE IF NOT EXISTS profils_risque (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    cancer TEXT DEFAULT 'col_uterus',
    score TEXT CHECK (score IN ('bas', 'moyen', 'eleve')),
    reponses_anonymisees JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profils_utilisateur ON profils_risque (utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_profils_score ON profils_risque (score);
