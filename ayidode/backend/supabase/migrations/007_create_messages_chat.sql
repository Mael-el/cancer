-- Migration 007: Table messages_chat
-- APDP : AUCUN CONTENU EN CLAIR N'EST STOCKÉ
CREATE TABLE IF NOT EXISTS messages_chat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL, -- Identifiant de session éphémère anonyme
    role TEXT CHECK (role IN ('user', 'assistant')),
    contenu_hash TEXT NOT NULL, -- Empreinte SHA-256 (jamais le texte)
    categorie TEXT CHECK (categorie IN ('prevention', 'orientation', 'refus', 'signe_suspect')),
    langue TEXT DEFAULT 'fr',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON messages_chat (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_categorie ON messages_chat (categorie);
