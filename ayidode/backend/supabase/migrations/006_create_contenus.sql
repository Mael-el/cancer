-- Migration 006: Table contenus
CREATE TABLE IF NOT EXISTS contenus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT CHECK (type IN ('fiche', 'capsule_audio', 'recette')),
    cancer TEXT NULL,
    langue TEXT CHECK (langue IN ('fr', 'fon')),
    titre TEXT NOT NULL,
    contenu_texte TEXT,
    contenu_audio_url TEXT,
    duree_secondes INT,
    valide_par TEXT NOT NULL,
    date_validation DATE NOT NULL,
    version INT DEFAULT 1,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contenus_type_langue ON contenus (type, langue);
CREATE INDEX IF NOT EXISTS idx_contenus_actif ON contenus (actif);
