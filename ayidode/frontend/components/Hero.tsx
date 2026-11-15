'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:py-24 px-6">
      {/* Cercles flottants vert brume & ocre en arrière-plan */}
      <div className="absolute -top-16 -left-20 w-96 h-96 rounded-full bg-[#e6f7f0] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#d4a574]/15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Colonne Gauche : Titre et Argumentaire */}
        <div className="lg:col-span-7 space-y-8 animate-fadeIn">
          {/* Badge officiel de santé */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#e6f7f0] border border-[#00a86b]/30">
            <span className="w-3 h-3 rounded-full bg-[#00a86b]" />
            <span className="font-sora text-sm md:text-base font-bold text-[#007048]">
              Initiative Nationale de Prévention • République du Bénin
            </span>
          </div>

          {/* Titre Fraunces */}
          <h1 className="font-fraunces font-black text-4xl sm:text-5xl lg:text-hero leading-tight text-[#1a2e28]">
            Protéger chaque famille béninoise{' '}
            <span className="text-[#00a86b] underline decoration-[#d4a574] decoration-wavy decoration-2">
              avant que le mal n&apos;arrive.
            </span>
          </h1>

          {/* Sous-titre Atkinson Hyperlegible */}
          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/90 max-w-2xl leading-relaxed">
            Dépistage gratuit du col de l&apos;utérus, vaccination VPH des jeunes filles de 9 à 14 ans, et protection contre les aflatoxines alimentaires dans nos marchés (Cotonou, Calavi, Parakou, Porto-Novo).
          </p>

          {/* Actions Asymétriques */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-2">
            <a
              href="/questionnaire"
              className="btn-ayidode bg-[#00a86b] text-white text-xl text-center"
            >
              Faire mon bilan gratuit (5 min)
            </a>
            <a
              href="#chat-section"
              className="btn-ayidode bg-[#faf8f3] text-[#1a2e28] border-2 border-[#007048] btn-terracotta text-center text-xl"
            >
              Discuter avec l&apos;assistant Ayidodé
            </a>
          </div>

          {/* Réassurance APDP et Gratuité */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-[#1a2e28]/80 font-sora">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00a86b]" />
              <span>Conforme APDP Bénin (100% anonyme)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c25b3a]" />
              <span>Disponible en Français et Fɔngbe</span>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Carte Asymétrique Hero */}
        <div className="lg:col-span-5 animate-slideUp">
          <div className="card-ayidode p-8 md:p-10 border-t-8 border-[#007048] shadow-2xl relative overflow-hidden bg-white">
            {/* Numéro filigrane */}
            <span className="absolute right-4 bottom-2 font-sora font-black text-8xl text-[#d4a574]/15 select-none pointer-events-none">
              +229
            </span>

            <div className="space-y-6 relative z-10">
              <div className="inline-block px-3 py-1 bg-[#c25b3a]/10 text-[#c25b3a] font-sora font-bold text-sm rounded-md">
                Données d&apos;Urgence Santé Publique
              </div>

              <h2 className="font-fraunces text-2xl md:text-3xl text-[#1a2e28] font-bold">
                Le cancer dépisté tôt se guérit dans plus de 9 cas sur 10.
              </h2>

              <ul className="space-y-4 font-atkinson text-lg">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e6f7f0] text-[#007048] font-bold flex items-center justify-center shrink-0 mt-1">✓</span>
                  <span><strong>Col de l&apos;utérus :</strong> Dépistage par inspection visuelle (IVA) sans douleur et rapide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e6f7f0] text-[#007048] font-bold flex items-center justify-center shrink-0 mt-1">✓</span>
                  <span><strong>Vaccination VPH :</strong> 2 doses gratuites dans les centres de santé publics pour filles de 9 à 14 ans.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e6f7f0] text-[#007048] font-bold flex items-center justify-center shrink-0 mt-1">✓</span>
                  <span><strong>Alimentation locale saine :</strong> Conservation du maïs et arachides sans moisissures toxiques.</span>
                </li>
              </ul>

              <div className="p-4 rounded-[20px_20px_6px_20px] bg-[#e6f7f0] border border-[#00a86b]/30 text-[#007048]">
                <p className="font-sora text-sm font-bold">Rappels automatiques WhatsApp & SMS</p>
                <p className="font-atkinson text-base text-[#1a2e28]">Recevez vos dates de dépistage sans jamais oublier un rendez-vous.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
