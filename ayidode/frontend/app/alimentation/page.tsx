'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BoutonAudio } from '../../components/BoutonAudio';
import { BoutonInfirmier } from '../../components/BoutonInfirmier';
import {
  Utensils,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Coins,
  ShieldCheck,
  Wheat,
  CookingPot,
  Heart,
  ArrowRight
} from 'lucide-react';

export default function AlimentationPage() {
  const [budgetSelectionne, setBudgetSelectionne] = useState<'500' | '1000' | '2000'>('1000');

  return (
    <div className="min-h-screen bg-[#faf8f3] py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* En-tête avec phrase d'espoir */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f7f0] border border-[#00a86b]/30 text-[#007048] font-sora text-sm font-bold">
            <Utensils className="w-4 h-4" />
            Nutrition & Prévention Béninoise
          </div>

          <h1 className="font-fraunces font-black text-4xl sm:text-5xl lg:text-hero text-[#1a2e28] leading-tight">
            Prévenir le Cancer par l&apos;Alimentation
          </h1>

          <p className="font-fraunces italic text-2xl md:text-3xl text-[#007048] font-bold">
            &quot;Chaque petit geste compte. La prévention est un droit, pas un luxe.&quot;
          </p>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85 leading-relaxed">
            Pas besoin de produits importés chers. La terre du Bénin regorge d&apos;ingrédients protecteurs : niébé, gboma, gari de qualité et assaisonnements naturels.
          </p>

          <div className="pt-2 flex justify-center">
            <BoutonAudio
              texte="Bienvenue sur le guide de l'alimentation préventive au Bénin. Découvrez comment faire votre marché et protéger votre famille sans dépasser votre budget quotidien."
              audioUrlFon="/audio/alimentation/marche_budget_fon.mp3"
              titre="Écouter le guide en Fɔngbe"
            />
          </div>
        </div>

        {/* MODULE 1 : MARCHÉ & BUDGET (500, 1 000, 2 000 FCFA) */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-8 border-[#007048] shadow-card space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f7f0] text-[#007048] flex items-center justify-center font-bold">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                  Module Marché & Budget Quotidien
                </h2>
                <p className="font-atkinson text-lg text-[#1a2e28]/70">
                  Paniers nutritionnels équilibrés calculés aux prix réels des marchés béninois
                </p>
              </div>
            </div>

            <BoutonAudio
              texte="Que peut-on acheter avec cinq cents, mille ou deux mille francs CFA au marché pour manger sainement et éviter les toxines ? Voici nos trois paniers recommandés."
              audioUrlFon="/audio/alimentation/marche_budget_fon.mp3"
              taille="compacte"
            />
          </div>

          {/* Sélecteur de budget */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: '500', label: 'Panier 500 FCFA', desc: 'Essentiel et protecteur' },
              { id: '1000', label: 'Panier 1 000 FCFA', desc: 'Le classique familial équilibré' },
              { id: '2000', label: 'Panier 2 000 FCFA', desc: 'Complet avec poisson frais' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setBudgetSelectionne(btn.id as any)}
                className={`flex-1 min-w-[200px] p-4 rounded-2xl border-2 transition-all text-left ${
                  budgetSelectionne === btn.id
                    ? 'border-[#007048] bg-[#e6f7f0] shadow-md'
                    : 'border-black/10 bg-[#faf8f3] hover:border-[#00a86b]/40'
                }`}
              >
                <div className="font-sora font-black text-2xl text-[#1a2e28]">{btn.label}</div>
                <div className="font-atkinson text-sm text-[#1a2e28]/70">{btn.desc}</div>
              </button>
            ))}
          </div>

          {/* Contenu du Panier sélectionné */}
          {budgetSelectionne === '500' && (
            <div className="p-6 rounded-[24px_24px_6px_24px] bg-[#faf8f3] border border-[#007048]/30 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-sora font-black text-3xl text-[#c25b3a]">500 FCFA</span>
                <span className="font-atkinson text-base text-[#007048] font-bold">Pour 2 à 3 personnes</span>
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Gari Sohouinto + Niébé rouge bien trié + Feuilles de Gboma
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Gari Sohouinto (1 grand verre)</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">150 FCFA</div>
                  <p className="text-xs text-[#1a2e28]/70 mt-1">Énergie sans moisissures</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Niébé sec trié (1 boîte)</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">200 FCFA</div>
                  <p className="text-xs text-[#1a2e28]/70 mt-1">Protéines végétales & fibres</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Botte de Gboma fraîche</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">150 FCFA</div>
                  <p className="text-xs text-[#1a2e28]/70 mt-1">Vitamines A, C & minéraux</p>
                </div>
              </div>
              <p className="font-atkinson text-base text-[#1a2e28]/80 bg-white p-4 rounded-xl border border-black/5">
                <strong>Conseil soignant :</strong> Ce repas apporte des fibres protectrices du côlon sans aucune graisse saturée cancérigène.
              </p>
            </div>
          )}

          {budgetSelectionne === '1000' && (
            <div className="p-6 rounded-[24px_24px_6px_24px] bg-[#faf8f3] border border-[#007048]/30 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-sora font-black text-3xl text-[#c25b3a]">1 000 FCFA</span>
                <span className="font-atkinson text-base text-[#007048] font-bold">Pour 3 à 4 personnes (Le Panier Idéal)</span>
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Gari de qualité + Niébé + Sauce Gboma + Poisson séché sans suie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Gari bien sec</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">200 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Niébé sec propre</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">300 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Gboma + Afitin</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">200 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Poisson séché sain</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">300 FCFA</div>
                </div>
              </div>
              <p className="font-atkinson text-base text-[#1a2e28]/80 bg-white p-4 rounded-xl border border-black/5">
                <strong>Conseil soignant :</strong> L&apos;afitin naturel remplace avantageusement les cubes chimiques sursalés. Le poisson séché sans suie apporte de bons acides aminés.
              </p>
            </div>
          )}

          {budgetSelectionne === '2000' && (
            <div className="p-6 rounded-[24px_24px_6px_24px] bg-[#faf8f3] border border-[#007048]/30 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-sora font-black text-3xl text-[#c25b3a]">2 000 FCFA</span>
                <span className="font-atkinson text-base text-[#007048] font-bold">Pour 4 à 5 personnes (Complet & Festif)</span>
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Riz local béninois + Niébé + Sauce tomate fraîche + Poisson frais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Riz local (Savalou)</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">450 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Niébé blanc</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">350 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Tomates fraîches + piments</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">400 FCFA</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-black/5">
                  <div className="font-sora font-bold text-sm text-[#007048]">Poisson frais (kpanvi)</div>
                  <div className="font-sora font-black text-xl text-[#1a2e28] mt-1">800 FCFA</div>
                </div>
              </div>
              <p className="font-atkinson text-base text-[#1a2e28]/80 bg-white p-4 rounded-xl border border-black/5">
                <strong>Conseil soignant :</strong> La sauce tomate mijotée est pleine de lycopène qui protège la prostate des pères. Le poisson frais combat l&apos;inflammation chronique.
              </p>
            </div>
          )}
        </section>

        {/* MODULE 2 : CONSERVATION & AFLATOXINES (Règles vitales pour le foie) */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-8 border-[#c25b3a] shadow-card space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf3ee] text-[#c25b3a] flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                  Module Conservation & Aflatoxines
                </h2>
                <p className="font-atkinson text-lg text-[#1a2e28]/70">
                  Les 4 règles d&apos;or pour éliminer le poison invisible du foie
                </p>
              </div>
            </div>

            <BoutonAudio
              texte="Les aflatoxines sont produites par des moisissures sur l'arachide et le maïs mal séchés. La cuisson bouillante ne les détruit pas. Voici comment protéger votre foie."
              audioUrlFon="/audio/aliments/aflatoxines_fon.mp3"
              taille="compacte"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#faf3ee] border-l-4 border-[#c25b3a] space-y-3">
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                1. Bien sécher avant tout stockage
              </h3>
              <p className="font-atkinson text-lg text-[#1a2e28]/85">
                Faites sécher le maïs et les arachides au soleil sur une bâche propre surélevée jusqu&apos;à ce que les graines craquent sous la dent. L&apos;humidité est l&apos;amie du champignon.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ee] border-l-4 border-[#c25b3a] space-y-3">
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                2. Conserver dans un endroit sec et aéré
              </h3>
              <p className="font-atkinson text-lg text-[#1a2e28]/85">
                Ne stockez jamais les sacs de céréales à même le sol en ciment ou contre un mur humide. Utilisez des palettes en bois pour laisser l&apos;air circuler dessous.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ee] border-l-4 border-[#c25b3a] space-y-3">
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                3. Jeter tout grain moisi ou noirci
              </h3>
              <p className="font-atkinson text-lg text-[#1a2e28]/85">
                Au marché ou à la maison, triez une par une les graines d&apos;arachide. Tout grain noir, rabougri, grisâtre ou suspect doit partir à la poubelle, jamais dans la marmite.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ee] border-l-4 border-[#c25b3a] space-y-3">
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                4. Ne jamais couper pour consommer
              </h3>
              <p className="font-atkinson text-lg text-[#1a2e28]/85">
                Si un tubercule ou une graine présente de la moisissure, couper la partie moisie ne suffit pas : la toxine microscopique a déjà voyagé dans toute la chair. Jetez le produit entier.
              </p>
            </div>
          </div>
        </section>

        {/* MODULE 3 : ALTERNATIVES LOCALES & RECETTES BÉNINOISES */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-8 border-[#d4a574] shadow-card space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf8f3] text-[#007048] border border-[#d4a574]/40 flex items-center justify-center font-bold">
                <CookingPot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                  Module Recettes Locales Protectrices
                </h2>
                <p className="font-atkinson text-lg text-[#1a2e28]/70">
                  Deux recettes traditionnelles saines, économiques et savoureuses
                </p>
              </div>
            </div>

            <BoutonAudio
              texte="Nos grand-mères connaissaient déjà le secret : le niébé et les feuilles de gboma avec l'afitin protègent le ventre et les intestins. Voici comment les préparer facilement."
              audioUrlFon="/audio/alimentation/niebe_fon.mp3"
              taille="compacte"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recette 1 */}
            <div className="p-6 rounded-2xl bg-[#faf8f3] border border-[#d4a574]/30 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#007048] text-white font-sora text-xs font-bold">
                Recette 1 • Côlon & Énergie
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Niébé mijoté aux feuilles de Gboma & Afitin
              </h3>
              <p className="font-atkinson text-base text-[#1a2e28]/80">
                <strong>Ingrédients :</strong> 2 verres de niébé rouge trié, 1 botte de gboma ébouillantée, 1 cuillère d&apos;afitin pur, 2 tomates fraîches écrasées, oignon et piment.
              </p>
              <p className="font-atkinson text-base text-[#1a2e28]/80">
                <strong>Préparation :</strong> Cuire le niébé dans l&apos;eau jusqu&apos;à tendreté. Faire revenir légèrement les oignons et la tomate avec une touche d&apos;huile saine. Ajouter l&apos;afitin pour relever le goût sans aucun bouillon cube. Incorporer les feuilles de gboma en fin de cuisson. Servir chaud avec du gari.
              </p>
              <div className="text-xs font-sora font-semibold text-[#007048] bg-[#e6f7f0] p-3 rounded-lg">
                ✓ Riche en fibres • Zéro cholestérol • Antioxydant puissant
              </div>
            </div>

            {/* Recette 2 */}
            <div className="p-6 rounded-2xl bg-[#faf8f3] border border-[#d4a574]/30 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#c25b3a] text-white font-sora text-xs font-bold">
                Recette 2 • Foie & Prostate
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Bouillon de poisson Kpanvi à la sauce tomate fraîche
              </h3>
              <p className="font-atkinson text-base text-[#1a2e28]/80">
                <strong>Ingrédients :</strong> 3 petits poissons frais nettoyés (kpanvi ou dorade), 4 grosses tomates locales bien mûres, ail, gingembre, basilic local (tchayo).
              </p>
              <p className="font-atkinson text-base text-[#1a2e28]/80">
                <strong>Préparation :</strong> Faire mijoter la purée de tomates avec l&apos;ail et le gingembre écrasés. Ajouter un peu d&apos;eau pour créer un bouillon léger. Déposer le poisson frais et laisser pocher 10 minutes. Parsemer de feuilles de tchayo fraîches.
              </p>
              <div className="text-xs font-sora font-semibold text-[#c25b3a] bg-[#faf3ee] p-3 rounded-lg">
                ✓ Lycopène actif pour la prostate • Oméga-3 anti-inflammatoires
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D'ACTION ET ORIENTATION */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-4 border-[#007048] shadow-card text-center space-y-6">
          <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
            Une question sur votre alimentation ou vos habitudes ?
          </h2>
          <p className="font-fraunces italic text-xl text-[#007048]">
            &quot;Vous n&apos;êtes pas seuls. Chaque petit geste compte.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <BoutonInfirmier label="Parler à un soignant de santé" />
            <Link href="/questionnaire" className="btn-ayidode bg-[#007048] text-white">
              Évaluer mon profil de risque
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
