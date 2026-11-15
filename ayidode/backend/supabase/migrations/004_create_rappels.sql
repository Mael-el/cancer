-- Migration 004: Table rappels
CREATE TABLE IF NOT EXISTS rappels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('vaccination', 'depistage', 'nutrition', 'aflatoxines')),
    date_prevue DATE NOT NULL,
    canal TEXT CHECK (canal IN ('whatsapp', 'sms', 'push', 'email')),
    statut TEXT DEFAULT 'planifie' CHECK (statut IN ('planifie', 'envoye', 'lu', 'confirme', 'annule')),
    contenu_hash TEXT,
    categorie TEXT,
    envoye_le TIMESTAMPTZ,
    lu_le TIMESTAMPTZ,
    confirme_le TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rappels_date_statut ON rappels (date_prevue, statut);
CREATE INDEX IF NOT EXISTS idx_rappels_utilisateur ON rappels (utilisateur_id);
