-- Migration 009: RLS (Row Level Security) sur toutes les tables
-- Strictement conforme aux préconisations APDP & Supabase Best Practices

-- 1. Table utilisateurs
ALTER TABLE utilisateurs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "utilisateurs_insert_anon" ON utilisateurs
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "utilisateurs_select_self_or_admin" ON utilisateurs
    FOR SELECT TO authenticated
    USING (
        auth.uid() = id 
        OR (auth.jwt() ->> 'role') = 'admin'
    );

CREATE POLICY "utilisateurs_update_self" ON utilisateurs
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. Table profils_risque
ALTER TABLE profils_risque ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profils_risque_user_access" ON profils_risque
    FOR ALL TO authenticated
    USING (auth.uid() = utilisateur_id)
    WITH CHECK (auth.uid() = utilisateur_id);

-- 3. Table membres_famille
ALTER TABLE membres_famille ENABLE ROW LEVEL SECURITY;

CREATE POLICY "membres_famille_user_all" ON membres_famille
    FOR ALL TO authenticated
    USING (auth.uid() = utilisateur_id)
    WITH CHECK (auth.uid() = utilisateur_id);

-- 4. Table rappels
ALTER TABLE rappels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rappels_insert_service_role" ON rappels
    FOR INSERT TO service_role
    WITH CHECK (true);

CREATE POLICY "rappels_select_user" ON rappels
    FOR SELECT TO authenticated
    USING (auth.uid() = utilisateur_id);

-- 5. Table centres
ALTER TABLE centres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "centres_select_public" ON centres
    FOR SELECT TO anon, authenticated
    USING (actif = true);

CREATE POLICY "centres_admin_all" ON centres
    FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- 6. Table contenus
ALTER TABLE contenus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contenus_select_public" ON contenus
    FOR SELECT TO anon, authenticated
    USING (actif = true);

CREATE POLICY "contenus_admin_all" ON contenus
    FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- 7. Table messages_chat
ALTER TABLE messages_chat ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_chat_insert_service_role" ON messages_chat
    FOR INSERT TO service_role
    WITH CHECK (true);

CREATE POLICY "messages_chat_select_admin" ON messages_chat
    FOR SELECT TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin');

-- 8. Table statistiques_agregees
ALTER TABLE statistiques_agregees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stats_select_admin_and_partenaires" ON statistiques_agregees
    FOR SELECT TO authenticated
    USING (
        (auth.jwt() ->> 'role') IN ('admin', 'partenaire_bailleur')
    );

CREATE POLICY "stats_insert_service_role" ON statistiques_agregees
    FOR INSERT TO service_role
    WITH CHECK (true);
