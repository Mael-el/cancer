package com.example.data

import java.util.UUID

object AyidodeRepository {

    val cancerTypes = listOf(
        CancerInfo(
            id = "col_uterus",
            nameFr = "Cancer du Col de l'Utérus",
            nameFon = "Alɔmɛ kpɔn kudo adɔgo lanmɛzɔn",
            badge = "Priorité Nationale",
            descriptionFr = "Deuxième cancer le plus fréquent chez la femme au Bénin. Causé par des infections persistantes à Papillomavirus humain (HPV). Entièrement guérissable si dépisté tôt.",
            descriptionFon = "Lanmɛzɔn e nɔ jɛ nyɔnu lɛ ji tawun ɖo Benɛ to mɛ. E nɔ gbɔ mɛ bɔxɔ e sɔ kpɔn do hwenu e.",
            symptomsFr = listOf(
                "Saignements anormaux après les rapports ou entre les règles",
                "Pertes vaginales inhabituelles ou malodorantes",
                "Douleurs pelviennes persistantes"
            ),
            preventionFr = listOf(
                "Vaccination anti-HPV des jeunes filles de 9 à 14 ans (campagnes scolaires gratuites)",
                "Dépistage par test HPV ou Frottis / Inspection visuelle (IVA) tous les 3 à 5 ans dès 25 ans"
            ),
            screeningMethodFr = "Test IVA ou Frottis cervical (disponible en centre de santé)"
        ),
        CancerInfo(
            id = "sein",
            nameFr = "Cancer du Sein",
            nameFon = "Anɔ̌ lanmɛzɔn",
            badge = "Dépistage facile",
            descriptionFr = "Cancer féminin le plus répandu. L'autopalpation mensuelle et la mammographie dès 40 ans permettent de sauver des vies.",
            descriptionFon = "Nyɔnu lɛ ɖo na nɔ kplé anɔ̌ yetɔn lɛ mɔ xwe mɛ bo na do kpon nu kpo ɖo mɛ a.",
            symptomsFr = listOf(
                "Boule ou épaississement indolore dans le sein ou l'aisselle",
                "Changement d'aspect de la peau (peau d'orange)",
                "Écoulement anormal du mamelon"
            ),
            preventionFr = listOf(
                "Autopalpation des seins 1 fois par mois (après les règles)",
                "Examen clinique annuel par une sage-femme ou un médecin",
                "Mammographie tous les 2 ans à partir de 40 ans"
            ),
            screeningMethodFr = "Palpation clinique + Mammographie / Échographie"
        ),
        CancerInfo(
            id = "foie",
            nameFr = "Cancer du Foie (Hépatocarcinome)",
            nameFon = "Ayihɔn lanmɛzɔn",
            badge = "Enjeu Aflatoxine & Hépatite",
            descriptionFr = "Très prévalent en Afrique de l'Ouest, souvent provoqué par la co-exposition à l'Hépatite B chronique et aux Aflatoxines (toxines de moisissures sur les arachides et maïs mal séchés).",
            descriptionFon = "Ayihɔn lanmɛzɔn e nɔ gosin azɔn e nɔ gbɔn maɖin kpo azin e hu kpɔ lɛ mɛ.",
            symptomsFr = listOf(
                "Perte de poids inexpliquée et grande fatigue",
                "Jaunisse (yeux et peau jaunes)",
                "Douleur ou gonflement dans le côté droit de l'abdomen"
            ),
            preventionFr = listOf(
                "Vaccination contre l'Hépatite B dès la naissance",
                "Tri strict du maïs et des arachides : jeter systématiquement les graines moisies ou noircies",
                "Conserver les récoltes dans un endroit bien sec et ventilé"
            ),
            screeningMethodFr = "Sérologie Hépatite B + Échographie abdominale"
        ),
        CancerInfo(
            id = "prostate",
            nameFr = "Cancer de la Prostate",
            nameFon = "Sunnu lɛ sin adɔgo lanmɛzɔn",
            badge = "Hommes 50+ ans",
            descriptionFr = "Le cancer le plus fréquent chez les hommes au Bénin au-delà de 50 ans. Évolution lente au début.",
            descriptionFon = "Sunnu e ko ɖo xwe kanweko (50) yi jǐ lɛ ɖo na nɔ kpɔn sunnu sin lanmɛ yetɔn.",
            symptomsFr = listOf(
                "Difficultés à uriner ou jet d'urine faible",
                "Besoin fréquent d'uriner, surtout la nuit",
                "Présence de sang dans les urines"
            ),
            preventionFr = listOf(
                "Consultation et dosage sanguin du PSA dès 50 ans (45 ans si antécédents familiaux)",
                "Activité physique régulière et alimentation équilibrée"
            ),
            screeningMethodFr = "Dosage du PSA sanguin + Toucher rectal médical"
        )
    )

    val screeningCenters = listOf(
        ScreeningCenter(
            id = "cnhu",
            name = "CNHU-HKM (Cotonou)",
            department = "Littoral",
            city = "Cotonou",
            address = "Avenue Jean-Paul II, Quartier Cadjèhoun",
            phone = "+229 21 30 01 55",
            services = listOf("Dépistage Col de l'utérus (IVA/Frottis)", "Mammographie numérique", "Oncologie médicale", "Laboratoire PSA"),
            isNationalCampaignActive = true,
            pricingNote = "Tarif public national homologué"
        ),
        ScreeningCenter(
            id = "cugo",
            name = "Clinique Universitaire de Gynécologie et d'Obstétrique (CUGO)",
            department = "Littoral",
            city = "Cotonou",
            address = "Enceinte CNHU-HKM, Cadjèhoun",
            phone = "+229 21 30 18 19",
            services = listOf("Dépistage précoce col de l'utérus", "Colposcopie", "Prise en charge lésions précancéreuses"),
            isNationalCampaignActive = true,
            pricingNote = "Dépistage gratuit lors des campagnes nationales"
        ),
        ScreeningCenter(
            id = "chd_oueme",
            name = "CHD Ouémé-Plateau",
            department = "Ouémé",
            city = "Porto-Novo",
            address = "Quartier Attakè, Face Stade Charles de Gaulle",
            phone = "+229 20 21 23 20",
            services = listOf("Dépistage Col utérin", "Échographie pelvienne & mammaire", "Consultation urologie"),
            isNationalCampaignActive = true,
            pricingNote = "Tarifs modérés conventionnés"
        ),
        ScreeningCenter(
            id = "chd_borgou",
            name = "CHD Borgou (Parakou)",
            department = "Borgou",
            city = "Parakou",
            address = "Route Nationale Inter-États, Quartier Amanwambou",
            phone = "+229 23 61 02 11",
            services = listOf("Dépistage cancer du col", "Bilan hépatique complet", "Chirurgie & biopsie"),
            isNationalCampaignActive = true,
            pricingNote = "Centre de référence Nord-Bénin"
        ),
        ScreeningCenter(
            id = "hz_calavi",
            name = "Hôpital de Zone Abomey-Calavi / Sô-Ava",
            department = "Atlantique",
            city = "Abomey-Calavi",
            address = "Carrefour Tokpa-Zoungo",
            phone = "+229 21 36 00 24",
            services = listOf("Dépistage IVA du col de l'utérus", "Palpation mammaire", "Dépistage Hépatite B"),
            isNationalCampaignActive = true,
            pricingNote = "Accessibilité sociale garantie"
        ),
        ScreeningCenter(
            id = "bethesda",
            name = "Hôpital Bethesda (Sainte-Rita)",
            department = "Littoral",
            city = "Cotonou",
            address = "Quartier Sainte-Rita, Rue de l'Église",
            phone = "+229 21 38 10 00",
            services = listOf("Mammographie", "Frottis cervico-vaginal", "Échographie", "Consultation spécialisée"),
            isNationalCampaignActive = false,
            pricingNote = "Centre privé confessionnel d'excellence"
        ),
        ScreeningCenter(
            id = "chd_zou",
            name = "CHD Zou-Collines (Abomey / Goho)",
            department = "Zou",
            city = "Abomey",
            address = "Place Goho, Abomey",
            phone = "+229 22 50 03 14",
            services = listOf("Dépistage col de l'utérus", "Examen clinique seins", "PSA"),
            isNationalCampaignActive = true,
            pricingNote = "Tarif public"
        ),
        ScreeningCenter(
            id = "tangieta",
            name = "Hôpital Saint Jean de Dieu",
            department = "Atacora",
            city = "Tanguiéta",
            address = "Tanguiéta centre",
            phone = "+229 23 83 00 12",
            services = listOf("Dépistage et diagnostic précoce", "Chirurgie oncologique", "Laboratoire"),
            isNationalCampaignActive = true,
            pricingNote = "Tarif solidaire"
        )
    )

    val practicalTips = listOf(
        PracticalTip(
            id = "tip_aflatoxine",
            titleFr = "Aflatoxine : protéger son foie des grains moisis",
            titleFon = "Azin kpo gbado kpo e hu kpɔ lɛ jijlo",
            category = "Prévention Alimentaire",
            shortSummaryFr = "Les moisissures sur l'arachide et le maïs produisent l'aflatoxine B1, une toxine cancérogène redoutable qui résiste à la cuisson.",
            detailedContentFr = "L'aflatoxine est produite par un champignon (Aspergillus) qui se développe lors d'un mauvais séchage ou stockage humide du maïs, du manioc et de l'arachide. Attention : faire bouillir ou frire ne détruit PAS l'aflatoxine ! La seule protection est le tri rigoureux avant la mouture ou la préparation : éliminez toujours les graines ratatinées, noircies ou moisies.",
            isMythDebunk = true,
            mythStatementFr = "Mythe fréquent : « Faire bouillir le maïs ou l'arachide détruit tout poison. » -> FAUX ! L'aflatoxine supporte plus de 200°C."
        ),
        PracticalTip(
            id = "tip_mythe_fatalite",
            titleFr = "Le cancer n'est ni une punition ni un sort",
            titleFon = "Lanmɛzɔn e nɔ wá gosin aze mɛ a",
            category = "Sensibilisation & Mythes",
            shortSummaryFr = "Le cancer est une maladie biologique causée par des cellules anormales. Plus tôt il est détecté, plus il se guérit.",
            detailedContentFr = "Beaucoup de familles pensent que le cancer est le résultat d'un sortilège ou d'une fatalité inévitable, ce qui retarde la visite à l'hôpital de plusieurs mois précieux. Lorsqu'une femme consulte dès les premiers signes pour le col ou le sein, le taux de guérison dépasse 85 à 90%. N'attendez pas que la maladie s'aggrave.",
            isMythDebunk = true,
            mythStatementFr = "Mythe fréquent : « Le cancer est incurable en Afrique. » -> FAUX ! Pris à un stade précoce, les cancers du col et du sein se guérissent totalement."
        ),
        PracticalTip(
            id = "tip_autopalpation",
            titleFr = "Guide pratique : 3 minutes d'autopalpation mammaire",
            titleFon = "Ali e nu na gbɔn bo kplé anɔ̌ towe",
            category = "Dépistage Personnel",
            shortSummaryFr = "Chaque femme dès 20 ans devrait palper ses seins une fois par mois, idéalement quelques jours après la fin des règles.",
            detailedContentFr = "1. Devant le miroir, bras le long du corps puis levés : observez s'il y a un creux, une rougeur ou un mamelon dévié.\n2. Allongée ou sous la douche : avec la pulpe de 3 doigts, faites des petits cercles sur tout le sein de l'extérieur vers le mamelon.\n3. Pressez doucement le mamelon pour vérifier l'absence d'écoulement anormal.",
            isMythDebunk = false
        ),
        PracticalTip(
            id = "tip_vaccin_hpv",
            titleFr = "Vaccin anti-HPV : un bouclier pour nos filles",
            titleFon = "Gbo e na jɛ adɔgo lanmɛzɔn sin ali ji nu vǐ nyɔnu lɛ",
            category = "Prévention Vaccinale",
            shortSummaryFr = "Le Ministère de la Santé du Bénin intègre le vaccin HPV pour immuniser les jeunes filles avant tout premier contact avec le virus.",
            detailedContentFr = "Le Papillomavirus humain est responsable de plus de 95% des cancers du col de l'utérus. La vaccination des filles de 9 à 14 ans est sûre, efficace et gratuite lors des campagnes officielles. C'est l'un des rares vaccins au monde qui prévient directement un cancer.",
            isMythDebunk = false
        )
    )

    val quizQuestions = listOf(
        QuizQuestion(
            id = 1,
            questionFr = "Quel est votre groupe d'âge ?",
            questionFon = "Xwe nabi a ɖó ?",
            contextExplanationFr = "L'âge est un facteur clé pour cibler les examens de dépistage recommandés.",
            optionsFr = listOf(
                QuizOption("Moins de 25 ans", "Xwe 25 gblamɛ a jɛ a", 0),
                QuizOption("25 à 39 ans", "Xwe 25 jɛ 39", 1),
                QuizOption("40 à 49 ans", "Xwe 40 jɛ 49", 2),
                QuizOption("50 ans et plus", "Xwe 50 yi jǐ", 3)
            )
        ),
        QuizQuestion(
            id = 2,
            questionFr = "Avez-vous des antécédents de cancer dans votre famille proche (mère, sœur, père, frère) ?",
            questionFon = "Mɛɖe ɖo hɛnnumɛ towe mɛ bo jɛ lanmɛzɔn elɔ kpɔn a ?",
            contextExplanationFr = "Certains cancers (sein, côlon, prostate) ont une composante génétique héréditaire.",
            optionsFr = listOf(
                QuizOption("Non, aucun cas connu", "Ewo, mɛɖe ka jɛ a", 0),
                QuizOption("Oui, 1 membre de la famille", "En, mɛɖokpo ɖo hɛnnumɛ mɛ", 2),
                QuizOption("Oui, plusieurs membres proches", "En, mɛ gégé ɖo hɛnnumɛ mɛ", 4),
                QuizOption("Je ne sais pas", "Un tuun a", 1)
            )
        ),
        QuizQuestion(
            id = 3,
            questionFr = "(Pour les femmes) Avez-vous déjà fait un dépistage du col de l'utérus (Frottis ou test IVA) ?",
            questionFon = "A ko sɔ adɔgo towe kpɔn ɖo dotoxó kpɔn a ?",
            contextExplanationFr = "Le dépistage régulier tous les 3 ans permet de détruire les lésions avant qu'elles ne deviennent un cancer.",
            optionsFr = listOf(
                QuizOption("Oui, il y a moins de 3 ans", "En, e kpe xwe atɔn a", 0),
                QuizOption("Oui, mais il y a plus de 3 ans", "En, loɔ e lín xwe atɔn yi jǐ", 2),
                QuizOption("Non, jamais réalisé", "Ewo, un ko blo kpɔn gbeɖe a", 3),
                QuizOption("Non concerné(e) (Homme)", "Un nyi sunnu", 0)
            )
        ),
        QuizQuestion(
            id = 4,
            questionFr = "Consommez-vous régulièrement du maïs ou de l'arachide séchés de manière artisanale ?",
            questionFon = "A nɔ ɖu azin kpo gbado kpo e ma sɔ mɔ a tawun lɛ hwɛhwɛ a ?",
            contextExplanationFr = "En Afrique de l'Ouest, le tri systématique des céréales et oléagineux est fondamental contre l'aflatoxine hépatotoxique.",
            optionsFr = listOf(
                QuizOption("Oui, et je retire toujours méticuleusement les graines moisies ou noircies", "En, bɔ un nɔ klo e hu kpɔ lɛ sín mɛ", 0),
                QuizOption("Oui, sans faire attention au tri ou à la moisissure", "En, bɔ un nɔ lin nǔ tɔn tawun a", 3),
                QuizOption("Rarement ou jamais", "Kaka a", 0)
            )
        ),
        QuizQuestion(
            id = 5,
            questionFr = "Êtes-vous vacciné(e) ou dépisté(e) pour l'Hépatite B ?",
            questionFon = "A ko gbo Hépatite B sin gbo alǒ sɔ kpɔn a ?",
            contextExplanationFr = "L'hépatite B non traitée est le premier facteur de cirrhose et cancer du foie au Bénin.",
            optionsFr = listOf(
                QuizOption("Oui, vaccin à jour ou test négatif récent", "En, gbo ce ɖo jǐ", 0),
                QuizOption("Non vacciné(e) ou jamais testé(e)", "Ewo, un sɔ kpɔn a", 2),
                QuizOption("Je ne sais pas", "Un tuun a", 1)
            )
        ),
        QuizQuestion(
            id = 6,
            questionFr = "Ressentez-vous actuellement un symptôme inhabituel (saignements, boule au sein, perte de poids rapide) ?",
            questionFon = "Nǔ e ma sɔgbe a ɖe ɖo wu towe din a ?",
            contextExplanationFr = "Toute anomalie persistante plus de 3 semaines mérite un contrôle médical sans panique.",
            optionsFr = listOf(
                QuizOption("Non, je me sens en pleine santé", "Ewo, agbaza ce ɖo ganji", 0),
                QuizOption("Oui, une gêne légère ou récente", "En, nǔ kpɛɖe ɖo wuwé", 2),
                QuizOption("Oui, un symptôme persistant depuis plusieurs semaines", "En, nǔ e lín tawun é ɖe", 4)
            )
        )
    )

    fun evaluateRisk(score: Int): AssessmentResult {
        return when {
            score >= 9 -> AssessmentResult(
                totalScore = score,
                level = RiskLevel.HIGH,
                titleFr = "Recommandation : Consultation de dépistage prioritaire",
                titleFon = "Dotoxó yiyi ɖo taji tawun",
                adviceFr = listOf(
                    "Votre profil présente des facteurs qui méritent une attention médicale rapprochée.",
                    "Prenez rendez-vous sans attendre dans un centre agréé (CNHU, CHD ou hôpital de zone).",
                    "Rappelez-vous : un dépistage précoce permet d'agir très efficacement et simplement."
                ),
                recommendedExamsFr = listOf(
                    "Dépistage Col de l'utérus (Frottis / IVA)",
                    "Examen clinique des seins / Mammographie",
                    "Bilan Hépatite B et échographie de contrôle"
                )
            )
            score >= 4 -> AssessmentResult(
                totalScore = score,
                level = RiskLevel.MODERATE,
                titleFr = "Recommandation : Bilan de prévention préventif",
                titleFon = "Lannmɛ kpɔn kudo alɔmɛ kpɔn",
                adviceFr = listOf(
                    "Votre risque global est modéré, mais certains gestes préventifs manquent.",
                    "Pensez à planifier votre prochain dépistage de routine.",
                    "Faites attention au tri des graines alimentaires (arachide, maïs) et à l'autopalpation."
                ),
                recommendedExamsFr = listOf(
                    "Contrôle de routine en gynécologie ou médecine générale",
                    "Dépistage Hépatite B si non vacciné(e)",
                    "Autopalpation mensuelle des seins"
                )
            )
            else -> AssessmentResult(
                totalScore = score,
                level = RiskLevel.LOW,
                titleFr = "Excellent ! Continuez vos bonnes habitudes préventives",
                titleFon = "Agbaza towe ɖo ganji, nɔ jɛ hǔ tɔn ji",
                adviceFr = listOf(
                    "Vos facteurs de risque actuels sont très bas.",
                    "Continuez d'adopter une alimentation saine, sans tabac et avec un tri rigoureux des aliments.",
                    "Maintenez vos rendez-vous de dépistage systématiques selon votre tranche d'âge."
                ),
                recommendedExamsFr = listOf(
                    "Dépistage de routine selon calendrier national",
                    "Autopalpation des seins une fois par mois"
                )
            )
        }
    }

    val defaultReminders = listOf(
        ScreeningReminder(
            id = "rem_col",
            title = "Dépistage Col de l'utérus (IVA/Frottis)",
            cancerType = "Col de l'Utérus",
            dueDate = "Dans 3 mois",
            periodicity = "Tous les 3 ans",
            isDone = false
        ),
        ScreeningReminder(
            id = "rem_sein",
            title = "Autopalpation mammaire mensuelle",
            cancerType = "Sein",
            dueDate = "Dans 10 jours",
            periodicity = "Chaque mois",
            isDone = false
        ),
        ScreeningReminder(
            id = "rem_hep",
            title = "Test rapide Hépatite B (HBsAg)",
            cancerType = "Foie",
            dueDate = "À planifier",
            periodicity = "Une fois si négatif puis vaccin",
            isDone = true
        )
    )

    fun getChatBotResponse(userText: String, lang: AppLanguage): ChatMessage {
        val lower = userText.lowercase().trim()
        val isFon = lang == AppLanguage.FONGBE

        val responseText = when {
            lower.contains("col") || lower.contains("utérus") || lower.contains("adɔgo") || lower.contains("frottis") -> {
                if (isFon) {
                    "Adɔgo lanmɛzɔn (cancer du col) nɔ gosin Papillomavirus mɛ. E nɔ gbɔ mɛ bɔxɔ e sɔ kpɔn do hwenu e ɖo dotoxó (IVA alǒ Frottis). Vǐ nyɔnu e ɖo xwe 9 jɛ 14 lɛ ɖo na gbo e sin gbo."
                } else {
                    "Le cancer du col de l'utérus est évitable à 95% ! Il est causé par le virus HPV. Au Bénin, le dépistage par frottis ou examen IVA se fait facilement dans les centres de santé (CNHU, CUGO, CHD). Le vaccin est également disponible pour les jeunes filles de 9 à 14 ans. Souhaitez-vous trouver le centre le plus proche de chez vous ?"
                }
            }
            lower.contains("sein") || lower.contains("anɔ̌") || lower.contains("mammaire") || lower.contains("boule") -> {
                if (isFon) {
                    "Anɔ̌ lanmɛzɔn: Kplé anɔ̌ towe lɛ mɔ xwe mɛ ɖokpo ɖokpo. E a mɔ nǔ gégé alǒ nǔ gligbo ɖe ɔ, yi dotoxó tlolo. E nɔ gbɔ mɛ e sɔ kpɔn tlolo e."
                } else {
                    "Pour le cancer du sein, l'autopalpation mensuelle (quelques jours après les règles) permet de détecter toute anomalie très tôt. Si vous sentez une boule ou observez un écoulement, consultez une sage-femme ou un médecin sans paniquer : la grande majorité des boules sont bénignes !"
                }
            }
            lower.contains("aflatoxine") || lower.contains("maïs") || lower.contains("arachide") || lower.contains("foie") || lower.contains("gbado") || lower.contains("azin") -> {
                if (isFon) {
                    "Azin kpo gbado kpo e hu kpɔ lɛ nɔ dɔn lanmɛzɔn wá ayihɔn mɛ. E a da d’azo ji ɔ, e nɔ kǔ a ! E ɖo taji ɖɔ a na klo e hu kpɔ lɛ bǐ sín mɛ bo sɔ nyì gbe."
                } else {
                    "L'aflatoxine est une toxine produite par des moisissures sur les céréales et arachides humides. C'est l'une des causes majeures de cancer du foie en Afrique de l'Ouest. Attention : la cuisson ne détruit pas l'aflatoxine ! Il faut impérativement trier et jeter les graines suspectes ou noircies."
                }
            }
            lower.contains("prostate") || lower.contains("sunnu") || lower.contains("urine") -> {
                if (isFon) {
                    "Sunnu e ko ɖo xwe 50 yi jǐ lɛ ɖo na nɔ kpɔn sunnu sin adɔgo yetɔn (PSA test). E a nɔ tɔn adɔ kpo vɛwǔ kpo ɔ, yi dotoxó."
                } else {
                    "Le cancer de la prostate concerne les hommes à partir de 50 ans (ou 45 ans en cas d'antécédent familial). Le dépistage se fait par une simple prise de sang (dosage du PSA) et un examen clinique. Des difficultés à uriner ou des envies fréquentes la nuit sont des signes à faire vérifier."
                }
            }
            lower.contains("centre") || lower.contains("hopital") || lower.contains("où") || lower.contains("fi") || lower.contains("cotonou") -> {
                if (isFon) {
                    "Dotoxó gégé ɖe ɖo Benɛ to mɛ: CNHU-HKM kudo CUGO ɖo Kutɔnu, CHD Ouémé ɖo Xɔgbonu, CHD Borgou ɖo Parakou. Kpɔn 'Centres de santé' ɖo app ɔ mɛ bo mɔ xixo yetɔn."
                } else {
                    "Au Bénin, vous pouvez vous faire dépister au CNHU-HKM et à la CUGO (Cotonou), au CHD Ouémé (Porto-Novo), au CHD Borgou (Parakou), à l'Hôpital de Zone Calavi, et dans tous les hôpitaux de zone. Vous pouvez consulter l'onglet 'Centres de Dépistage' pour les appeler directement !"
                }
            }
            lower.contains("bonjour") || lower.contains("salut") || lower.contains("kú") || lower.contains("ahouan") -> {
                if (isFon) {
                    "Kú do ayihɔngbe ! Ayidodé+ ɖo fi bo na do alɔ we do lanmɛ na nɔ ganji sin xó mɛ. Anɔ̌ lanmɛzɔn, adɔgo lanmɛzɔn, alǒ azin kpo gbado kpo sin xó a jlo na kanse ?"
                } else {
                    "Bonjour et bienvenue sur Ayidodé+ ! Je suis votre conseiller virtuel pour la santé et la prévention du cancer au Bénin. Que souhaitez-vous savoir aujourd'hui ? (Dépistage du col, santé des seins, aflatoxine, centres proches...)"
                }
            }
            else -> {
                if (isFon) {
                    "Un se nǔ e a ɖɔ ɔ ganji. Ayidodé+ nɔ na wěɖexamɛ do lanmɛzɔn e nɔ gbɔ e wu. A sixu kanse xó do adɔgo lanmɛzɔn, anɔ̌ lanmɛzɔn, alǒ dotoxó e ɖo kpɔ lɛ wu."
                } else {
                    "Merci pour votre message. En tant que conseiller de santé publique Ayidodé+, je vous oriente sur la prévention et le dépistage précoce des cancers au Bénin. N'hésitez pas à poser une question précise sur le col de l'utérus, le sein, l'aflatoxine ou les centres de consultation agréés."
                }
            }
        }

        val quicks = if (isFon) {
            listOf("Adɔgo lanmɛzɔn", "Azin kpo gbado kpo", "Dotoxó lɛ")
        } else {
            listOf("Dépistage du col", "Aflatoxine & Maïs", "Centres à Cotonou", "Autopalpation du sein")
        }

        return ChatMessage(
            id = UUID.randomUUID().toString(),
            text = responseText,
            isUser = false,
            timestamp = "Maintenant",
            quickReplies = quicks
        )
    }
}
