-- Migration 010: Table cancers (5 cancers majeurs au Bénin)
CREATE TABLE IF NOT EXISTS cancers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- col_uterus, sein, foie, colorectal, prostate
    nom_fr TEXT NOT NULL,
    nom_fon TEXT,
    cause_fr TEXT NOT NULL,
    cause_fon TEXT,
    manifestation_fr TEXT NOT NULL,
    manifestation_fon TEXT,
    consequences_fr TEXT NOT NULL,
    consequences_fon TEXT,
    solutions_fr TEXT NOT NULL,
    solutions_fon TEXT,
    phrase_espoir_fr TEXT NOT NULL,
    phrase_espoir_fon TEXT,
    audio_url_fr TEXT,
    audio_url_fon TEXT,
    ordre INT DEFAULT 1,
    actif BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE cancers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cancers_select_public" ON cancers
    FOR SELECT TO anon, authenticated
    USING (actif = true);

CREATE POLICY "cancers_admin_all" ON cancers
    FOR ALL TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role') = 'admin');

-- Données initiales
INSERT INTO cancers (code, nom_fr, nom_fon, cause_fr, cause_fon, manifestation_fr, manifestation_fon, consequences_fr, consequences_fon, solutions_fr, solutions_fon, phrase_espoir_fr, phrase_espoir_fon, audio_url_fr, audio_url_fon, ordre)
VALUES
(
    'col_uterus',
    'Cancer du col de l''utérus',
    'Azɔn doto tɔn e nɔ gbà nyɔnu lɛ sin vǐjí tɛn mɛ',
    'Infection persistante par le papillomavirus humain (VPH), rapports sexuels très précoces, partenaires multiples et tabagisme.',
    'VPH azɔnkwín e nɔ gba gbɔn xóxó mɛ, alɔwliwli hwenu e ma sɔ mɔ gba ǎ, kpo azɔ e nɔ gba nyɔnu lɛ ji.',
    'Saignements vaginaux anormaux (après les rapports ou entre les règles), pertes vaginales malodorantes, douleurs pelviennes.',
    'Hùn e nɔ jɛ dɔn nyɔnu mɛ hwenu e ma nyi vǐgbé ǎ, wuvɛ gégé ɖo adɔgló mɛ.',
    'Infertilité, complications rénales graves, décès évitable et coût financier lourd pour la famille.',
    'Vǐ ma sɔ sixu jì ǎ, alɔkpa gégé e nɔ dɔn nyɔnu gbɔn ku mɛ bo nɔ dɔn azɔ vɔvɔ wa xwédo mɛ.',
    'Vaccination gratuite contre le VPH pour les filles de 9 à 14 ans, dépistage régulier par test IVA (gratuit dans les centres publics) et frottis.',
    'Gbéɖiɖo VPH tɔn e nyi vɔnu nú vǐnyɔnu xwè 9 yi 14 lɛ, kpo doto kpikpɔn vɔnu bo na mɔ azɔn ɔ gban.',
    'Dépisté à temps, le cancer du col se guérit dans plus de 95% des cas.',
    'E nyi doto mɔ azɔn ɔ ɖo bǐbɛmɛ ɔ, e nɔ gbɔ mlɛmlɛ.',
    '/audio/cancers/col_uterus_fr.mp3',
    '/audio/cancers/col_uterus_fon.mp3',
    1
),
(
    'sein',
    'Cancer du sein',
    'Anɔ̌ zɔn',
    'Facteurs hormonaux, âge, antécédents familiaux, consommation d''alcool, surpoids et manque d''activité physique.',
    'Mɛxwè yiyi, azɔn e gbɔn xwédo mɛ, ahan syɛnsyɛn nunu, kpo nǔɖuɖu e ma sɔgbe ǎ lɛ.',
    'Boule indolore au niveau du sein ou de l''aisselle, modification de la peau (aspect peau d''orange), écoulement anormal du mamelon.',
    'Kpɔ e ɖo anɔ̌ mɛ bo ma nɔ vɛ ǎ, anɔ̌kpa e nɔ huzu, kpo nǔ e nɔ tɔn sín anɔ̌ nu.',
    'Mastectomie (ablation du sein), propagation métastatique, angoisse et impact social sur la femme.',
    'Anɔ̌ sísɛ́ sín gbɛtɔ wu, wuvɛ syɛnsyɛn kpo alɔkpa e nɔ dɔn gbɛtɔ yi ku mɛ.',
    'Auto-palpation mensuelle des seins après les règles, examen clinique annuel par une sage-femme, mammographie dès 40 ans.',
    'Anɔ̌ lilɛ kpikpɔn wezun wezun ɖo sunmɛ sunmɛ, bo na yi doto gɔn nǔ e mɔ nǔɖe e ma sɔgbe ǎ.',
    'Le cancer du sein n''est pas une fatalité : la détection précoce sauve des milliers de mères.',
    'Anɔ̌ zɔn kún nyi ku gbe e ma gbɔ ǎ : e mɔ nǔ jɛ e wu ɖo taji ɔ, e nɔ gán.',
    '/audio/cancers/sein_fr.mp3',
    '/audio/cancers/sein_fon.mp3',
    2
),
(
    'foie',
    'Cancer du foie',
    'Ayi zɔn syɛnsyɛn',
    'Hépatite virale B et C chronique, ingestion fréquente d''aflatoxines présentes sur les arachides et le maïs mal séchés ou moisis, abus d''alcool local (sodabi).',
    'Hépatite B azɔn, mɔlikun kpo azǐin e fɔn fún é ɖuɖu, kpo sodabi kpo ahan syɛnsyɛn nunu zɛxwlɛ.',
    'Fatigue intense, perte de poids rapide, coloration jaune des yeux (jaunisse), gonflement et douleur sous les côtes à droite.',
    'Agbaza kuku, nukún e nɔ biɔ jɔjɔ, xomɛ sísɔ́ kpo adɔgló e nɔ vɛ ɖo ɖisí lɔ.',
    'Destruction irréversible du tissu hépatique, défaillance organique rapide, pronostic sombre en cas de retard.',
    'Ayi e nɔ gble bǐ mlɛmlɛ, bo nɔ zɔn bɔ gbɛtɔ nɔ yawu ku.',
    'Vaccination systématique dès la naissance contre l''hépatite B, tri rigoureux et élimination des céréales et arachides moisies, modération stricte de l''alcool.',
    'Gbéɖiɖo hépatite B tɔn do na vǐ lɛ, nǔɖuɖu e fɔn fún lɛ sísɛ́ dodo, kpo ahan gbigbɔ.',
    'Bien trier ses arachides et vacciner contre l''hépatite B préserve votre foie pour la vie.',
    'Azǐin daxó lilɛ kpɔn ganji kpo gbéɖiɖo kpo nɔ kɛn azɔn ayi tɔn.',
    '/audio/cancers/foie_fr.mp3',
    '/audio/cancers/foie_fon.mp3',
    3
),
(
    'colorectal',
    'Cancer colorectal',
    'Adɔvǐ zɔn',
    'Régime pauvre en fibres végétales, forte consommation de viandes transformées ou très cuites au feu de bois avec suie, obésité et sédentarité.',
    'Lannu gégé ɖuɖu kpo nǔ e ma ɖó amavɔ ǎ lɛ ɖuɖu, kpo nǔjilɛ ma bló.',
    'Présence de sang rouge ou noirâtre dans les selles, alternance inexpliquée de diarrhée et constipation, crampes abdominales.',
    'Hùn e nɔ tɔn ɖo mi mɛ, adɔmɛ e nɔ xwi bɔ mi nɔ gló alǒ e nɔ kɔn gégé.',
    'Occlusion intestinale aiguë, dénutrition sévère, nécessité d''interventions chirurgicales lourdes.',
    'Adɔgló e nɔ tli mlɛmlɛ, bo nɔ byɔ ɖɔ e na gbà gbɛtɔ sin adɔ.',
    'Augmentation quotidienne des légumes feuilles locaux (gboma, amanvivè, crincrin), consommation régulière de légumineuses (niébé) et activité physique régulière.',
    'Amavɔ lɛ (gboma, crincrin) ɖuɖu tɛgbɛ, kpo ayikun ɖuɖu, kpo wezun zinzin.',
    'Nourrir son corps de fibres locales protège notre digestion au quotidien.',
    'Nǔɖuɖu amavɔ tɔn e nɔ mɔ ɖo Benɛɛ nɔ cyɔn alɔ mǐ ji.',
    '/audio/cancers/colorectal_fr.mp3',
    '/audio/cancers/colorectal_fon.mp3',
    4
),
(
    'prostate',
    'Cancer de la prostate',
    'Adɔɖoxó zɔn asu lɛ tɔn',
    'Âge avancé (au-delà de 45-50 ans), prédisposition génétique, régimes riches en graisses saturées animales et viandes grasses.',
    'Mɛxo yiyi nú súnnu lɛ, xwédo mɛ azɔn, kpo lannu mǐmǐ gégé ɖuɖu.',
    'Difficulté progressive à uriner, jet urinaire faible ou interrompu, besoin fréquent d''uriner la nuit, douleurs lombaires.',
    'Adɔdido e nɔ gló, adɔ e nɔ jɛ hweɖenu hweɖenu, zǎn mɛ fɔn tɛgbɛ nú adɔdido.',
    'Rétention d''urine aiguë, altération de la fonction rénale, métastases osseuses douloureuses.',
    'Adɔ e ma sɔ sixu tɔn ǎ, wuvɛ syɛnsyɛn ɖo xukpó mɛ.',
    'Consultation urologique annuelle avec toucher rectal et dosage du PSA sanguin dès 45 ans pour tous les hommes béninois.',
    'Doto gɔn yiyi xwewu xwewu nú súnnu e ɖó xwè 45 yi jǐ lɛ bo na tuun bo do jɛ azɔn ɔ ji.',
    'Un simple contrôle annuel permet aux pères et grands-pères de vivre longtemps et sereinement.',
    'Doto kpikpɔn xwewu xwewu nɔ zɔn bɔ tɔ́ lɛ kpo tɔ́gbo lɛ kpo nɔ nɔ gbɛ dindɔn.',
    '/audio/cancers/prostate_fr.mp3',
    '/audio/cancers/prostate_fon.mp3',
    5
)
ON CONFLICT (code) DO NOTHING;
