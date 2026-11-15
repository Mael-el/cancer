-- Migration 001: Table utilisateurs
-- Conformité APDP Bénin (Loi n°2017-20)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS utilisateurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telephone_chiffre TEXT NOT NULL, -- Chiffré AES-256 côté application / Edge Function
    telephone_hash TEXT UNIQUE NOT NULL, -- SHA-256 indexable pour recherche sans déchiffrement
    langue TEXT DEFAULT 'fr' CHECK (langue IN ('fr', 'fon')),
    canal_prefere TEXT DEFAULT 'whatsapp' CHECK (canal_prefere IN ('whatsapp', 'sms', 'web')),
    profil TEXT CHECK (profil IN ('femme', 'parent', 'asc', 'admin')),
    consentement_rappels BOOLEAN DEFAULT TRUE,
    consentement_sondages BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL, -- Gestion du droit à l'effacement sous 7 jours
    derniere_connexion TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_utilisateurs_hash ON utilisateurs (telephone_hash);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_deleted ON utilisateurs (deleted_at);
