-- Migration 003: Table membres_famille
CREATE TABLE IF NOT EXISTS membres_famille (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    prenom_chiffre TEXT NOT NULL, -- Pseudonymisation & chiffrement AES-256
    age INT CHECK (age BETWEEN 0 AND 120),
    sexe TEXT CHECK (sexe IN ('M', 'F')),
    vaccin_vph TEXT DEFAULT 'non' CHECK (vaccin_vph IN ('oui', 'non', 'incomplet')),
    derniere_vaccination DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_membres_utilisateur ON membres_famille (utilisateur_id);
