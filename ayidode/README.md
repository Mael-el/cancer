# Ayidodé+ (Bénin) — Plateforme de Prévention du Cancer & Santé Publique

**Ayidodé+** est une initiative technologique de santé publique conçue pour la prévention précoce des cancers au Bénin, particulièrement le **cancer du col de l'utérus** (vaccination VPH des filles de 9-14 ans et dépistage par IVA) et le **cancer du foie** (lutte contre les aflatoxines des récoltes locales).

---

## 🏛️ Architecture du Projet

Le projet est conçu selon une architecture découplée, robuste et hautement sécurisée :

```
ayidode/
├── frontend/                     # Application PWA Next.js 14 (App Router)
│   ├── app/                      # Pages & Routes (Accueil, Questionnaire, Centres, etc.)
│   ├── components/               # Composants UX accessibles (Header, Hero, ChatBot, etc.)
│   ├── lib/                      # Client Supabase & Utilitaires de sécurité
│   └── public/                   # Manifest PWA, Service Worker & Assets
├── backend/                      # Backend Supabase & Edge Functions
│   └── supabase/
│       ├── config.toml           # Configuration de l'environnement Supabase
│       ├── migrations/           # Schéma PostgreSQL avec RLS (Migrations 001 à 009)
│       └── functions/            # 8 Edge Functions Deno / TypeScript
│           ├── chat/             # Assistant IA avec garde-fous stricts & Gemini
│           ├── inscription/      # Inscription conforme APDP avec chiffrement AES-256
│           ├── questionnaire/    # Évaluation algorithmique du score de risque
│           ├── rappels-planifier/# Cron quotidien de planification des rappels
│           ├── rappels-envoyer/  # Cron horaire d'expédition WhatsApp & SMS
│           ├── orientation/      # Moteur géolocalisé des centres de santé
│           ├── statistiques/     # Agrégation quotidienne 100% anonyme
│           └── export-bailleurs/ # Rapports pour les bailleurs (OMS, GAVI, PNLMNT)
└── .env.example                  # Template des variables d'environnement
```

---

## 🛡️ Conformité Légale & APDP Bénin (Loi n°2017-20)

1. **Consentement Granulaire :** Dissociation stricte entre les rappels médicaux indispensables et la contribution facultative aux statistiques.
2. **Chiffrement Fort :** Numéros de téléphone et identités protégés par chiffrement **AES-256** ; recherche par empreinte SHA-256 sans déchiffrement.
3. **Minimisation & Anonymisation du Chat :** Aucun message textuel n'est conservé dans la base de données. Seuls le hash et la catégorie sont archivés.
4. **Droit à l'Effacement :** Procédure intégrée de suppression irrévocable sous 7 jours ouvrés.
5. **Garde-fous Médicaux :** Interdiction formelle de poser des diagnostics ou d'établir des ordonnances. Orientation systématique vers le **136** et les centres de dépistage du PNLMNT.

---

## 🚀 Démarrage Rapide

### 1. Frontend (Next.js PWA)
```bash
cd ayidode/frontend
npm install
npm run dev
```

### 2. Backend Supabase & Migrations
```bash
cd ayidode/backend
supabase start
supabase db reset # Applique automatiquement les migrations 001 à 009
supabase functions serve # Lance les Edge Functions locales
```
