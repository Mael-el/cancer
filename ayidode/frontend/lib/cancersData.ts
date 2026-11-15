export interface CancerDetail {
  code: string;
  nomFr: string;
  nomFon: string;
  phraseEspoirFr: string;
  phraseEspoirFon: string;
  audioFr: string;
  audioFon: string;
  cause: {
    fr: string;
    fon: string;
    points: string[];
  };
  manifestation: {
    fr: string;
    fon: string;
    alertes: string[];
  };
  consequences: {
    fr: string;
    fon: string;
    impacts: string[];
  };
  solutions: {
    fr: string;
    fon: string;
    gestes: string[];
  };
  nutrition: {
    alimentsAEviter: {
      nomFr: string;
      nomFon: string;
      raison: string;
      alternativeLocale: string;
      prixMarche: string;
    }[];
  };
}

export const CANCERS_DATA: Record<string, CancerDetail> = {
  col_uterus: {
    code: "col_uterus",
    nomFr: "Cancer du col de l'utérus",
    nomFon: "Azɔn doto tɔn e nɔ gbà nyɔnu lɛ sin vǐjí tɛn mɛ",
    phraseEspoirFr: "Dépisté à temps, le cancer du col de l'utérus se guérit dans plus de 95% des cas.",
    phraseEspoirFon: "E nyi doto mɔ azɔn ɔ ɖo bǐbɛmɛ ɔ, e nɔ gbɔ mlɛmlɛ.",
    audioFr: "/audio/cancers/col_uterus_fr.mp3",
    audioFon: "/audio/cancers/col_uterus_fon.mp3",
    cause: {
      fr: "Infection prolongée par le Papillomavirus Humain (VPH), transmis lors des relations intimes.",
      fon: "VPH azɔnkwín e nɔ gba gbɔn xóxó mɛ, alɔwliwli hwenu e ma sɔ mɔ gba ǎ.",
      points: [
        "Infection persistante par les souches oncogènes du VPH (types 16 et 18)",
        "Rapports sexuels très précoces avant la maturité du col",
        "Partenaires sexuels multiples sans préservatif",
        "Tabagisme actif ou passif qui affaiblit l'immunité locale"
      ]
    },
    manifestation: {
      fr: "Le col ne fait pas mal au début. Les signes apparaissent plus tard :",
      fon: "Bǐbɛmɛ ɔ, azɔn ɔ nɔ vɛ ǎ. Wuntun lɛ wɛ nyi :",
      alertes: [
        "Saignements vaginaux anormaux après les rapports intimes ou entre les règles",
        "Pertes vaginales inhabituelles, abondantes ou malodorantes",
        "Douleurs sourdes dans le bas-ventre ou le bas du dos",
        "Saignements survenant après la ménopause"
      ]
    },
    consequences: {
      fr: "En l'absence de dépistage précoce, la maladie s'étend et menace la vie :",
      fon: "E ma yawu kpɔn ǎ ɔ, wuvɛ syɛnsyɛn wɛ nɔ wa :",
      impacts: [
        "Infertilité définitive et atteinte de l'appareil reproducteur",
        "Complications rénales graves et anémie chronique",
        "Coût médical et psychologique dévastateur pour la famille"
      ]
    },
    solutions: {
      fr: "Deux solutions très efficaces et gratuites au Bénin :",
      fon: "Ali wé wɛ ɖe bo nyi vɔnu ɖo Benɛɛ :",
      gestes: [
        "Vaccination VPH gratuite pour toutes les jeunes filles de 9 à 14 ans (2 doses)",
        "Dépistage régulier par test IVA (Inspection Visuelle à l'Acide acétique) tous les 3 ans",
        "Utilisation du préservatif pour limiter la transmission des infections"
      ]
    },
    nutrition: {
      alimentsAEviter: [
        {
          nomFr: "Alcool et tabac",
          nomFon: "Ahan syɛnsyɛn kpo azɔ kpo",
          raison: "Affaiblissent les défenses immunitaires de la muqueuse utérine face au VPH.",
          alternativeLocale: "Infusions de kinkeliba, jus de bissap naturel sans excès de sucre.",
          prixMarche: "100 - 200 FCFA"
        },
        {
          nomFr: "Aliments ultra-transformés et pauvres en antioxydants",
          nomFon: "Nǔɖuɖu e ma ɖó amavɔ ǎ lɛ",
          raison: "Augmentent l'inflammation cellulaire et freinent l'élimination naturelle du virus.",
          alternativeLocale: "Feuilles vertes fraîches (Gboma, Amanvivè, Fotètè) et agrumes locaux.",
          prixMarche: "150 - 300 FCFA la botte"
        }
      ]
    }
  },
  sein: {
    code: "sein",
    nomFr: "Cancer du sein",
    nomFon: "Anɔ̌ zɔn",
    phraseEspoirFr: "Le cancer du sein n'est pas une fatalité : chaque femme a le pouvoir de s'auto-examiner chaque mois.",
    phraseEspoirFon: "Anɔ̌ zɔn kún nyi ku gbe e ma gbɔ ǎ : e mɔ nǔ jɛ e wu ɖo taji ɔ, e nɔ gán.",
    audioFr: "/audio/cancers/sein_fr.mp3",
    audioFon: "/audio/cancers/sein_fon.mp3",
    cause: {
      fr: "Facteurs génétiques, hormonaux et environnementaux combinés.",
      fon: "Mɛxwè yiyi, azɔn e gbɔn xwédo mɛ, ahan syɛnsyɛn nunu, kpo nǔɖuɖu e ma sɔgbe ǎ lɛ.",
      points: [
        "Antécédents de cancer du sein chez la mère, une sœur ou une tante",
        "Consommation régulière d'alcool (même la bière ou le vin)",
        "Surpoids, obésité et sédentarité prolongée",
        "Première grossesse tardive ou absence d'allaitement maternel"
      ]
    },
    manifestation: {
      fr: "Les signes qui doivent vous amener immédiatement en consultation :",
      fon: "Wuntun e jɛxa ɖɔ a na yi doto gɔn yawu lɛ :",
      alertes: [
        "Présence d'une boule ou grosseur dure dans le sein ou sous l'aisselle",
        "Changement de forme ou de taille d'un sein",
        "Peau d'orange, plissement ou rougeur locale sur le sein",
        "Écoulement anormal ou saignement par le mamelon"
      ]
    },
    consequences: {
      fr: "Un diagnostic tardif complique les soins et fragilise le foyer :",
      fon: "Hwenu e e ma yawu mɔ ǎ ɔ :",
      impacts: [
        "Ablation chirurgicale du sein (mastectomie) devenue inévitable",
        "Diffusion des cellules malades aux poumons et aux os",
        "Impact émotionnel et détresse dans le couple et la communauté"
      ]
    },
    solutions: {
      fr: "Des gestes d'alerte simples et accessibles à toutes :",
      fon: "Nǔ e nyɔnu bǐ sixu bló lɛ :",
      gestes: [
        "Auto-palpation minutieuse des deux seins chaque mois, 3 jours après les règles",
        "Examen clinique annuel par une sage-femme ou un médecin au centre de santé",
        "Mammographie de dépistage tous les 2 ans à partir de 45-50 ans",
        "Pratique de 30 minutes de marche rapide quotidienne"
      ]
    },
    nutrition: {
      alimentsAEviter: [
        {
          nomFr: "Boissons alcoolisées et sodabi",
          nomFon: "Ahan syɛnsyɛn kpo sodabi kpo",
          raison: "L'alcool perturbe l'équilibre des œstrogènes et stimule la prolifération des cellules mammaires.",
          alternativeLocale: "Eau de coco fraîche (agbon sin), jus d'ananas frais de Tori ou Allada.",
          prixMarche: "200 - 300 FCFA"
        },
        {
          nomFr: "Viandes grasses et huiles réchauffées",
          nomFon: "Lannu mǐmǐ kpo ami e fún zɛxwlɛ kpo",
          raison: "Favorisent l'obésité abdominale et l'inflammation des tissus glandulaires.",
          alternativeLocale: "Niébé blanc cuisiné sans friture, poisson frais (kpanvi, dorade) grillé.",
          prixMarche: "400 - 700 FCFA"
        }
      ]
    }
  },
  foie: {
    code: "foie",
    nomFr: "Cancer du foie",
    nomFon: "Ayi zɔn syɛnsyɛn",
    phraseEspoirFr: "En vaccinant les nouveau-nés contre l'hépatite B et en triant le maïs, le cancer du foie recule.",
    phraseEspoirFon: "Azǐin daxó lilɛ kpɔn ganji kpo gbéɖiɖo kpo nɔ kɛn azɔn ayi tɔn.",
    audioFr: "/audio/cancers/foie_fr.mp3",
    audioFon: "/audio/cancers/foie_fon.mp3",
    cause: {
      fr: "Au Bénin, deux causes majeures prédominent largement :",
      fon: "Nǔ we taji wɛ nɔ dɔn azɔn ayi tɔn wa ɖo Benɛɛ :",
      points: [
        "L'ingestion répétée d'aflatoxines B1 présentes sur les arachides et le maïs moisis",
        "L'hépatite virale B et C chronique transmise par le sang ou à la naissance",
        "L'abus régulier d'alcool local distillé (sodabi) ou frelaté",
        "La stéatose hépatique liée au diabète et au surpoids"
      ]
    },
    manifestation: {
      fr: "Le foie souffre en silence, les signes sont tardifs :",
      fon: "Ayi nɔ yawu ɖe wuvɛ tɔn tɔn ǎ :",
      alertes: [
        "Fatigue écrasante et perte d'appétit brutale",
        "Jaunissement du blanc des yeux (jaunisse) et urines très foncées",
        "Douleur ou sensation de lourdeur sous les côtes du côté droit",
        "Gonflement anormal du ventre (ascite)"
      ]
    },
    consequences: {
      fr: "L'atteinte hépatique sévère est souvent rapide sans prise en charge :",
      fon: "Ayi e nɔ gble bǐ mlɛmlɛ bo nɔ dɔn gbɛtɔ yi ku mɛ :",
      impacts: [
        "Insuffisance hépatique avec perte de la fonction de détoxification",
        "Hémorragies digestives internes graves",
        "Pronostic vital engagé très rapidement"
      ]
    },
    solutions: {
      fr: "Des mesures concrètes à appliquer dans chaque cuisine béninoise :",
      fon: "Nǔ e ɖo na bló ɖo hɔntogbó mɛ lɛ :",
      gestes: [
        "Tri minutieux des arachides et grains de maïs : jeter systématiquement tout grain noirci ou taché",
        "Vaccination des nouveau-nés dès la naissance contre l'hépatite B",
        "Dépistage sanguin simple de l'hépatite B pour toute la famille",
        "Abandon des alcools forts artisanaux non contrôlés"
      ]
    },
    nutrition: {
      alimentsAEviter: [
        {
          nomFr: "Arachides moisies, pâte d'arachide douteuse au marché",
          nomFon: "Azǐin e fɔn fún alǒ kpakpa koun gblégblé",
          raison: "Les aflatoxines sont indestructibles par la cuisson bouillante. Elles empoisonnent directement l'ADN du foie.",
          alternativeLocale: "Pâte d'arachide préparée maison à partir de graines triées une à une ou graines de sésame (ridji).",
          prixMarche: "500 FCFA"
        },
        {
          nomFr: "Sodabi et alcools artisanaux",
          nomFon: "Sodabi kpo ahan syɛnsyɛn kpo",
          raison: "Créent une cirrhose progressive qui se transforme en cancer du foie.",
          alternativeLocale: "Jus de baobab naturel (Kpanbou), eau de source filtrée.",
          prixMarche: "150 - 250 FCFA"
        }
      ]
    }
  },
  colorectal: {
    code: "colorectal",
    nomFr: "Cancer colorectal",
    nomFon: "Adɔvǐ zɔn",
    phraseEspoirFr: "Nourrir son corps de légumes locaux et bouger chaque jour protège notre digestion.",
    phraseEspoirFon: "Amavɔ lɛ ɖuɖu tɛgbɛ kpo wezun zinzin kpo nɔ cyɔn alɔ mǐ ji.",
    audioFr: "/audio/cancers/colorectal_fr.mp3",
    audioFon: "/audio/cancers/colorectal_fon.mp3",
    cause: {
      fr: "Mauvaise alimentation pauvre en fibres et agression intestinale permanente.",
      fon: "Lannu gégé ɖuɖu kpo nǔ e ma ɖó amavɔ ǎ lɛ ɖuɖu, kpo nǔjilɛ ma bló.",
      points: [
        "Consommation insuffisante de légumes et fruits locaux au profit d'aliments raffinés",
        "Consommation fréquente de viandes transformées, salées ou trop cuites à la suie",
        "Constipation chronique non prise en charge",
        "Manque d'exercice physique et sédentarité"
      ]
    },
    manifestation: {
      fr: "Les changements de transit et les signes digestifs d'alerte :",
      fon: "Wuntun e ɖo adɔmɛ lɛ :",
      alertes: [
        "Présence de sang rouge ou noir dans les selles",
        "Alternance nouvelle et inexpliquée de diarrhée et de constipation",
        "Douleurs et crampes abdominales persistantes",
        "Sensation que l'intestin ne se vide jamais complètement"
      ]
    },
    consequences: {
      fr: "L'occlusion et la dénutrition surviennent si l'on attend :",
      fon: "Adɔgló e nɔ tli mlɛmlɛ :",
      impacts: [
        "Occlusion intestinale aiguë nécessitant une chirurgie d'urgence",
        "Pose d'une poche digestive temporaire ou définitive",
        "Altération profonde de la qualité de vie"
      ]
    },
    solutions: {
      fr: "La richesse de nos marchés béninois est notre premier remède :",
      fon: "Nǔ e ɖo na bló lɛ :",
      gestes: [
        "Consommer au moins 2 portions de légumes feuilles (Gboma, Crincrin, Amanvivè) par jour",
        "Remplacer la viande rouge par du niébé (haricots) ou du poisson frais 3 fois par semaine",
        "Faire un test de recherche de sang occulte dans les selles dès 50 ans",
        "Boire au moins 1,5 litre d'eau par jour"
      ]
    },
    nutrition: {
      alimentsAEviter: [
        {
          nomFr: "Viandes calcinées au feu de bois avec suie",
          nomFon: "Lannu e jɛ zǒ fún mɛ",
          raison: "La suie contient des hydrocarbures aromatiques hautement cancérigènes pour le côlon.",
          alternativeLocale: "Poisson frais en papillote de feuilles de bananier ou bouillon maigre de poisson (kpanvi sin).",
          prixMarche: "500 - 800 FCFA"
        },
        {
          nomFr: "Cubes d'assaisonnement chimiques sursalés",
          nomFon: "Maggi kpo nǔ kɛn mɛ tɔn lɛ kpo",
          raison: "Détruisent le microbiote intestinal protecteur et augmentent l'irritation muqueuse.",
          alternativeLocale: "Afitin traditionnel (néré fermenté pur) ou lanhouin de qualité dosé avec modération.",
          prixMarche: "50 - 100 FCFA"
        }
      ]
    }
  },
  prostate: {
    code: "prostate",
    nomFr: "Cancer de la prostate",
    nomFon: "Adɔɖoxó zɔn asu lɛ tɔn",
    phraseEspoirFr: "Un simple contrôle annuel permet aux pères et aux grands-pères de vivre longtemps et sereinement.",
    phraseEspoirFon: "Doto kpikpɔn xwewu xwewu nɔ zɔn bɔ tɔ́ lɛ kpo tɔ́gbo lɛ kpo nɔ nɔ gbɛ dindɔn.",
    audioFr: "/audio/cancers/prostate_fr.mp3",
    audioFon: "/audio/cancers/prostate_fon.mp3",
    cause: {
      fr: "Évolution avec l'âge et susceptibilité génétique chez les hommes africains.",
      fon: "Mɛxo yiyi nú súnnu lɛ, xwédo mɛ azɔn, kpo lannu mǐmǐ gégé ɖuɖu.",
      points: [
        "Âge au-delà de 45-50 ans (fréquence plus élevée chez les hommes d'ascendance africaine)",
        "Antécédents familiaux (père, frère ou oncle ayant eu ce cancer)",
        "Régime riche en graisses saturées animales et viandes rouges",
        "Exposition à certains polluants chimiques"
      ]
    },
    manifestation: {
      fr: "Les difficultés urinaires ne sont pas une honte, ce sont des signes d'alerte :",
      fon: "Adɔɖoxó zɔn sin wuntun lɛ :",
      alertes: [
        "Difficulté à commencer à uriner ou jet urinaire faible et discontinu",
        "Besoin impérieux et très fréquent d'uriner la nuit (plus de 3 fois)",
        "Présence de sang dans les urines ou le sperme",
        "Douleurs sourdes dans le bas du dos ou le bassin"
      ]
    },
    consequences: {
      fr: "Ignorer les signes mène à des douleurs osseuses intenses :",
      fon: "E ma yawu doto ǎ ɔ :",
      impacts: [
        "Blocage complet des urines (rétention aiguë nécessitant une sonde d'urgence)",
        "Insuffisance rénale par reflux de l'urine",
        "Métastases osseuses douloureuses dans la colonne vertébrale"
      ]
    },
    solutions: {
      fr: "La consultation annuelle sauve des vies d'hommes :",
      fon: "Nǔ e súnnu lɛ ɖo na bló lɛ :",
      gestes: [
        "Consultation annuelle chez un médecin dès 45 ans avec toucher rectal rapide",
        "Prise de sang simple pour doser le PSA (Antigène Spécifique de la Prostate)",
        "Alimentation riche en tomates locales cuites et en graines de courge",
        "Activité physique régulière et hydratation tout au long de la journée"
      ]
    },
    nutrition: {
      alimentsAEviter: [
        {
          nomFr: "Viandes rouges très grasses et abats fréquents",
          nomFon: "Lannu vɔvɔ mǐmǐ gégé",
          raison: "Riches en acide arachidonique et graisses qui stimulent la croissance des cellules prostatiques.",
          alternativeLocale: "Sauce graine de niébé, poissons de fleuve ou de lagune (Gbôzoun, Lac Nokoué).",
          prixMarche: "400 - 600 FCFA"
        },
        {
          nomFr: "Produits laitiers industriels en excès et boissons sucrées",
          nomFon: "Nǔ vɛvɛ kpo ahan víví gégé kpo",
          raison: "Augmentent le taux d'IGF-1 (facteur de croissance cellulaire tumoral).",
          alternativeLocale: "Tomates fraîches cuites en sauce (riches en lycopène protecteur prouvé) et pastèque.",
          prixMarche: "200 - 300 FCFA"
        }
      ]
    }
  }
};
