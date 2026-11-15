'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CANCERS_DATA } from '../../lib/cancersData';
import { BoutonAudio } from '../../components/BoutonAudio';
import { BoutonInfirmier } from '../../components/BoutonInfirmier';
import { ArrowRight, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

export default function CancersIndexPage() {
  const cancersList = Object.values(CANCERS_DATA);

  return (
    <div className="min-h-screen bg-[#faf8f3] py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* En-tête aéré avec phrase d'espoir */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f7f0] border border-[#00a86b]/30 text-[#007048] font-sora text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            Guide Médical de Référence • PNLMNT Bénin
          </div>

          <h1 className="font-fraunces font-black text-4xl sm:text-5xl lg:text-hero text-[#1a2e28] leading-tight">
            Les 5 Cancers Clés au Bénin
          </h1>

          <p className="font-fraunces italic text-2xl md:text-3xl text-[#007048] font-bold">
            &quot;Le cancer n&apos;est pas une fatalité. Dépister tôt, c&apos;est protéger ceux qu&apos;on aime.&quot;
          </p>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85 leading-relaxed">
            Chaque cancer a sa cause, ses signaux d&apos;alerte et ses solutions locales. Cliquez sur une fiche pour découvrir les explications complètes en français et en fɔn.
          </p>

          <div className="pt-2 flex justify-center">
            <BoutonAudio
              texte="Le cancer n'est pas une fatalité. Dépister tôt, c'est protéger ceux qu'on aime. Prenez le temps de découvrir les cinq cancers les plus fréquents au Bénin et les moyens simples de les éviter."
              audioUrlFon="/audio/capsules/prevention_fon.mp3"
              titre="Écouter le message général"
            />
          </div>
        </div>

        {/* Liste des 5 Cancers - Design aéré, max 3 par ligne sur grand écran */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cancersList.map((c, idx) => (
            <div
              key={c.code}
              className="card-ayidode p-8 flex flex-col justify-between bg-white border-t-4 border-[#007048] shadow-card hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sora font-black text-3xl text-[#d4a574]">
                    0{idx + 1}
                  </span>
                  <BoutonAudio
                    texte={`${c.nomFr}. ${c.phraseEspoirFr}`}
                    audioUrlFon={c.audioFon}
                    taille="compacte"
                  />
                </div>

                <h2 className="font-fraunces font-bold text-2xl md:text-3xl text-[#1a2e28] group-hover:text-[#007048] transition-colors">
                  {c.nomFr}
                </h2>

                <p className="font-atkinson italic text-lg text-[#c25b3a] font-semibold">
                  {c.nomFon}
                </p>

                <p className="font-atkinson text-lg text-[#1a2e28]/80 line-clamp-3">
                  {c.cause.fr}
                </p>

                <div className="bg-[#e6f7f0] p-3.5 rounded-xl border border-[#00a86b]/20">
                  <p className="font-fraunces italic text-base text-[#007048]">
                    &quot;{c.phraseEspoirFr}&quot;
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 flex items-center justify-between gap-4">
                <Link
                  href={`/cancers/${c.code}`}
                  className="btn-ayidode bg-[#007048] text-white text-base px-5 h-[50px] w-full"
                >
                  <span>Consulter la page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Parler à un infirmier & Centres de dépistage */}
        <div className="max-w-4xl mx-auto space-y-6 pt-8">
          <BoutonInfirmier variant="carte" />

          <div className="card-ayidode p-8 bg-white border-t-4 border-[#007048] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
                Trouver un centre de dépistage au Bénin
              </h3>
              <p className="font-atkinson text-lg text-[#1a2e28]/80">
                Consultez la liste des hôpitaux, maternités et dispensaires agréés à Cotonou, Calavi, Parakou, Porto-Novo et dans tous les départements.
              </p>
            </div>
            <Link
              href="/centres"
              className="btn-ayidode bg-[#007048] text-white shrink-0"
            >
              <MapPin className="w-5 h-5" />
              Voir la carte des centres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
