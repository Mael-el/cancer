'use client';

import React from 'react';
import Hero from '../components/Hero';
import CarteChiffre from '../components/CarteChiffre';
import ChatBot from '../components/ChatBot';
import InscriptionForm from '../components/InscriptionForm';
import { BoutonInfirmier } from '../components/BoutonInfirmier';
import { BoutonAudio } from '../components/BoutonAudio';
import { ShieldCheck, Heart, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-0 bg-[#faf8f3]">
      {/* 1. HERO SECTION ASYMÉTRIQUE AVEC PHRASE D'ESPOIR */}
      <Hero />

      {/* 2. SECTION 3 CHIFFRES CLÉS (Terracotta 72px Sora - Max 3 éléments) */}
      <section className="section-spacing px-6 bg-[#faf8f3] relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="px-3.5 py-1.5 rounded-md bg-[#c25b3a]/15 text-[#c25b3a] font-sora text-sm font-bold inline-block">
              Ce que la science démontre au Bénin
            </span>
            <h2 className="font-fraunces font-black text-3xl md:text-5xl text-[#1a2e28] leading-tight">
              Agir tôt change toute l&apos;histoire.
            </h2>
            <p className="font-fraunces italic text-xl md:text-2xl text-[#007048]">
              &quot;Dépister tôt, c&apos;est protéger ceux qu&apos;on aime.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CarteChiffre
              valeur="> 95%"
              label="Taux de guérison précoce"
              description="Détectés aux premiers stades, le cancer du col de l’utérus et le cancer du sein guérissent dans l'immense majorité des cas."
              filigrane="01"
            />
            <CarteChiffre
              valeur="0 FCFA"
              label="Vaccination VPH & Dépistage"
              description="Le vaccin VPH (filles de 9 à 14 ans) et le test de dépistage IVA sont sans frais dans les centres de santé publics du Bénin."
              filigrane="02"
            />
            <CarteChiffre
              valeur="136"
              label="Numéro Vert Gratuit"
              description="Une ligne directe du Ministère de la Santé pour poser vos questions en toute confidentialité et sans dépenser un seul franc."
              filigrane="03"
            />
          </div>
        </div>
      </section>

      {/* 3. SECTION NOTRE PROMESSE (1 idée par écran, 1 phrase forte) */}
      <section className="section-spacing px-6 bg-[#e6f7f0] relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-[#007048] text-white flex items-center justify-center mx-auto shadow-lg">
            <Heart className="w-8 h-8 fill-current" />
          </div>

          <span className="px-4 py-1.5 rounded-full bg-white text-[#007048] font-sora text-sm font-bold inline-block shadow-sm">
            Notre Promesse
          </span>

          <h2 className="font-fraunces font-black text-3xl md:text-5xl text-[#1a2e28] leading-snug">
            Donner à chaque famille béninoise le pouvoir d&apos;empêcher le mal avant qu&apos;il ne commence.
          </h2>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85 max-w-2xl mx-auto leading-relaxed">
            Pas de mots compliqués, pas de fausses promesses : des conseils adaptés au marché local, la parole des soignants et la solidarité de nos communautés.
          </p>

          <p className="font-fraunces italic text-2xl text-[#c25b3a] font-bold">
            &quot;La prévention est un droit, pas un luxe.&quot;
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/cancers"
              className="btn-ayidode bg-[#007048] text-white text-xl"
            >
              Découvrir les 5 Cancers
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/alimentation"
              className="btn-ayidode bg-white text-[#007048] border-2 border-[#007048] text-xl"
            >
              Guide Alimentation & Budget
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTION CHATBOT AVEC BOUTON PARLER À UN INFIRMIER */}
      <section className="section-spacing px-6 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-md bg-[#00a86b]/20 text-[#007048] font-sora text-sm font-bold inline-block">
              Écoute & Orientation 24h/24
            </span>
            <h2 className="font-fraunces font-black text-3xl md:text-5xl text-[#1a2e28]">
              Une inquiétude ? Nous vous écoutons.
            </h2>
            <p className="font-fraunces italic text-xl text-[#007048]">
              &quot;Vous n&apos;êtes pas seuls. Aujourd&apos;hui, vous pouvez faire la différence.&quot;
            </p>
          </div>

          <ChatBot />
        </div>
      </section>

      {/* 5. SECTION BANNIÈRE INFIRMIER VISIBLE */}
      <section className="px-6 py-12 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto">
          <BoutonInfirmier variant="carte" />
        </div>
      </section>

      {/* 6. SECTION INSCRIPTION AUX RAPPELS DE DÉPISTAGE */}
      <section id="inscription" className="section-spacing px-6 bg-[#faf8f3] border-t border-[#007048]/10">
        <div className="max-w-7xl mx-auto">
          <InscriptionForm />
        </div>
      </section>
    </div>
  );
}
