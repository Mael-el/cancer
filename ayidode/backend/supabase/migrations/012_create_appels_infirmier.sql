-- Migration 012: Table appels_infirmier (Demande de rappel et orientation soignante)
CREATE TABLE IF NOT EXISTS appels_infirmier (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID REFERENCES utilisateurs(id) ON DELETE SET NULL,
    telephone_chiffre TEXT NOT NULL,
    motif TEXT,
    statut TEXT DEFAULT 'demande' CHECK (statut IN ('demande', 'en_cours', 'traite', 'annule')),
    infirmier_id UUID NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    traite_le TIMESTAMPTZ NULL
);

-- RLS
ALTER TABLE appels_infirmier ENABLE ROW LEVEL SECURITY;

-- Insertion ouverte (anon et auth) pour permettre à toute personne en détresse de demander un rappel
CREATE POLICY "appels_infirmier_insert" ON appels_infirmier
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Lecture réservée à l'utilisateur lui-même, aux infirmiers et aux admins
CREATE POLICY "appels_infirmier_select" ON appels_infirmier
    FOR SELECT TO authenticated
    USING (
        auth.uid() = utilisateur_id
        OR (auth.jwt() ->> 'role') IN ('admin', 'infirmier')
    );

-- Mise à jour réservée aux infirmiers et admins
CREATE POLICY "appels_infirmier_update" ON appels_infirmier
    FOR UPDATE TO authenticated
    USING (
        (auth.jwt() ->> 'role') IN ('admin', 'infirmier')
    )
    WITH CHECK (
        (auth.jwt() ->> 'role') IN ('admin', 'infirmier')
    );

-- Indexation
CREATE INDEX IF NOT EXISTS idx_appels_infirmier_statut ON appels_infirmier(statut);
CREATE INDEX IF NOT EXISTS idx_appels_infirmier_created ON appels_infirmier(created_at DESC);
