-- Migration 011: Table aliments pour la nutrition préventive au Bénin
CREATE TABLE IF NOT EXISTS aliments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom_fr TEXT NOT NULL,
    nom_fon TEXT,
    categorie TEXT NOT NULL CHECK (categorie IN ('a_remplacer', 'alternatif', 'neutre')),
    raison_fr TEXT,
    raison_fon TEXT,
    cancer_concerne TEXT[], -- ex: ARRAY['foie', 'sein', 'colorectal']
    prix_moyen_fcfa INT,
    disponibilite TEXT DEFAULT 'marche_local', -- 'marche_local', 'supermarche', 'partout'
    alternative_a TEXT, -- référence à un aliment à remplacer
    audio_url_fr TEXT,
    audio_url_fon TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE aliments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "aliments_select_public" ON aliments
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "aliments_admin_all" ON aliments
    FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- Données initiales d'aliments béninois
INSERT INTO aliments (nom_fr, nom_fon, categorie, raison_fr, raison_fon, cancer_concerne, prix_moyen_fcfa, disponibilite, alternative_a, audio_url_fr, audio_url_fon)
VALUES
-- À REMPLACER
(
    'Arachides ou maïs tachés de moisissures',
    'Azǐin alǒ mɔlikun e fɔn fún',
    'a_remplacer',
    'Contient des aflatoxines B1 cancérigènes très puissantes qui détruisent les cellules du foie. La cuisson ne détruit pas la toxine.',
    'Aflatoxine azɔnkwín e nɔ gba ayi mlɛmlɛ ɖo mɛ. Zǒ dídó nɔ hu toxine ɔ ǎ.',
    ARRAY['foie'],
    300,
    'marche_local',
    NULL,
    '/audio/aliments/arachide_moisie_fr.mp3',
    '/audio/aliments/arachide_moisie_fon.mp3'
),
(
    'Alcool fort et sodabi frelaté',
    'Ahan syɛnsyɛn kpo sodabi',
    'a_remplacer',
    'Augmente massivement le risque de cancer du foie, du sein et des voies digestives par agression cellulaire permanente.',
    'Ahan syɛnsyɛn nɔ dɔn azɔn ayi tɔn kpo anɔ̌ zɔn kpo wa gbɛtɔ ji.',
    ARRAY['foie', 'sein', 'colorectal'],
    500,
    'partout',
    NULL,
    '/audio/aliments/alcool_fr.mp3',
    '/audio/aliments/alcool_fon.mp3'
),
(
    'Viandes très grasses et viandes brûlées au feu de bois',
    'Lannu mǐmǐ kpo lannu e jɛ zǒ mɛ kpo fún',
    'a_remplacer',
    'Favorise l''inflammation chronique et le cancer colorectal ainsi que de la prostate.',
    'Lannu kuku e jɛ zǒ fún mɛ nɔ dɔn adɔvǐ zɔn wa.',
    ARRAY['colorectal', 'prostate'],
    2000,
    'marche_local',
    NULL,
    '/audio/aliments/viande_brulee_fr.mp3',
    '/audio/aliments/viande_brulee_fon.mp3'
),
(
    'Huiles de friture noires et réutilisées plusieurs fois',
    'Ami e sɔ da nǔ azɔn gégé',
    'a_remplacer',
    'Dégage des composés cancérigènes agressifs pour le tube digestif et le côlon.',
    'Ami e sɔ da nǔ zɛxwlɛ nɔ hɛn adɔmɛ gblé.',
    ARRAY['colorectal', 'foie'],
    400,
    'marche_local',
    NULL,
    '/audio/aliments/huile_reutilisee_fr.mp3',
    '/audio/aliments/huile_reutilisee_fon.mp3'
),

-- ALTERNATIFS LOCAUX
(
    'Niébé béninois (haricot blanc ou rouge sec et sain)',
    'Ayikun wéwé alǒ vɔvɔ',
    'alternatif',
    'Riche en protéines saines, en fibres protectrices du côlon et en antioxydants, sans matières grasses saturées.',
    'Ayikun nɔ na hlɔnhlɔn gbɛtɔ bo nɔ cyɔn alɔ adɔmɛ ji.',
    ARRAY['colorectal', 'sein', 'prostate', 'foie'],
    400,
    'marche_local',
    'Viandes très grasses',
    '/audio/aliments/niebe_fr.mp3',
    '/audio/aliments/niebe_fon.mp3'
),
(
    'Feuilles de Gboma fraîches',
    'Gboma mumu',
    'alternatif',
    'Légume traditionnel riche en vitamines C et A, en fibres et en sels minéraux renforçant l''immunité contre les agressions cellulaires.',
    'Amavɔ gboma tɔn nɔ kɛn azɔn kpo wuvɛ lɛ.',
    ARRAY['colorectal', 'col_uterus', 'sein'],
    150,
    'marche_local',
    'Aliments pauvres en fibres',
    '/audio/aliments/gboma_fr.mp3',
    '/audio/aliments/gboma_fon.mp3'
),
(
    'Afitin traditionnel (néré fermenté pur)',
    'Afitin nǔgbo',
    'alternatif',
    'Exhausteur de goût naturel riche en probiotiques et antioxydants, remplace avantageusement les cubes chimiques trop salés.',
    'Afitin nɔ na nǔɖuɖu víví bo nɔ wa nǔ ɖagbe nú lanmɛ.',
    ARRAY['colorectal', 'foie'],
    100,
    'marche_local',
    'Cubes d''assaisonnement industriels',
    '/audio/aliments/afitin_fr.mp3',
    '/audio/aliments/afitin_fon.mp3'
),
(
    'Tomate locale fraîche et sauce tomate mijotée',
    'Timati mumu kpo hɛn',
    'alternatif',
    'Source exceptionnelle de lycopène, un antioxydant prouvé pour la protection de la prostate.',
    'Timati nɔ cyɔn alɔ súnnu lɛ sin adɔɖoxó ji bo nɔ klɔ lanmɛ.',
    ARRAY['prostate'],
    250,
    'marche_local',
    'Sauces industrielles chimiques',
    '/audio/aliments/tomate_fr.mp3',
    '/audio/aliments/tomate_fon.mp3'
),
(
    'Poisson frais ou fumé sans suie (kpanvi, dorade)',
    'Hwè mumu',
    'alternatif',
    'Apporte des acides gras oméga-3 anti-inflammatoires et d''excellentes protéines maigres.',
    'Hwè ɖagbe nɔ kɔn hlɔnhlɔn dó agbaza mɛ.',
    ARRAY['prostate', 'colorectal', 'sein'],
    800,
    'marche_local',
    'Viandes rouges grasses',
    '/audio/aliments/poisson_fr.mp3',
    '/audio/aliments/poisson_fon.mp3'
),
(
    'Gari de qualité bien séché (Gari Sohouinto)',
    'Gari ɖagbe e xú ganji',
    'alternatif',
    'Fournit des glucides complexes et des fibres sans risques d''aflatoxines lorsqu''il est stocké au sec.',
    'Gari e xú ganji nɔ d''akpɔ ǎ bo nɔ na hlɔnhlɔn.',
    ARRAY['foie', 'colorectal'],
    300,
    'marche_local',
    'Maïs moisi',
    '/audio/aliments/gari_fr.mp3',
    '/audio/aliments/gari_fon.mp3'
);
