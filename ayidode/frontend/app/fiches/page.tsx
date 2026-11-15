'use client';

import React, { useState } from 'react';

interface FicheEducative {
  id: string;
  type: 'fiche' | 'capsule_audio' | 'recette';
  cancer: string;
  langue: 'fr' | 'fon';
  titre: string;
  resume: string;
  contenu: string;
  audioUrl?: string;
  duree?: string;
  validePar: string;
}

const FICHES: FicheEducative[] = [
  {
    id: '1',
    type: 'capsule_audio',
    cancer: 'Col de l’utérus',
    langue: 'fon',
    titre: 'Gǎn tɔ̀n nǔ e kàn VPH kpo nyɔ̌nú lɛ kpo (Capsule Audio Fɔngbe)',
    resume: 'Explication simple en langue fɔn sur la vaccination gratuite des jeunes filles de 9 à 14 ans et le dépistage sans douleur.',
    contenu: 'Écoutez cette capsule audio de 2 minutes expliquant en fɔngbe pourquoi le vaccin protège nos filles dès l’école primaire et comment se déroule l’examen du col à la maternité.',
    audioUrl: '/audio/capsule_vph_fon.mp3',
    duree: '2 min 15 s',
    validePar: 'Dr. C. Dossou (PNLMNT Bénin)'
  },
  {
    id: '2',
    type: 'fiche',
    cancer: 'Foie (Aflatoxines)',
    langue: 'fr',
    titre: 'Aflatoxines : Comment protéger le maïs et l’arachide à la maison',
    resume: 'Guide pratique pour trier les grains de maïs et d’arachides au retour du marché de Dantokpa ou d’Ouando.',
    contenu: `Les aflatoxines sont produites par de minuscules moisissures qui se développent sur les céréales humides.
Règles d'or pour la cuisine :
1. Trier impérativement : jetez tout grain noirci, flétri ou au goût amer.
2. Bien sécher au soleil sur une bâche propre avant le stockage.
3. Conserver dans des récipients hermétiques dans un endroit sec et surélevé.
4. Cuire à haute température ne détruit pas les toxines : seul le tri préventif est efficace !`,
    validePar: 'Pr. M. Agbessi (CNHU-HKM)'
  },
  {
    id: '3',
    type: 'recette',
    cancer: 'Nutrition Préventive',
    langue: 'fr',
    titre: 'Menu protecteur à 1 000 FCFA/jour pour 4 personnes',
    resume: 'Une alimentation béninoise riche en antioxydants végétaux sans dépasser le budget familial quotidien.',
    contenu: `Composition du repas familial :
- Sauce Gboma ou Amanvivè fraîche (300 FCFA) : gorgée de polyphénols protecteurs cellulaires.
- Niébé ou galettes de soja / wangash frais (350 FCFA) : apport complet en protéines végétales sans mauvaises graisses.
- Pâte de maïs blanc bien trié ou gari de qualité (250 FCFA).
- Assaisonnement traditionnel : afitin bien fermenté et lanhouin artisanal (100 FCFA).
Total : 1 000 FCFA pour un repas équilibré et protecteur pour toute la famille.`,
    validePar: 'Nutritionniste de Santé Publique - Cotonou'
  },
  {
    id: '4',
    type: 'fiche',
    cancer: 'Col de l’utérus',
    langue: 'fr',
    titre: 'Dépistage IVA : Ce qui se passe concrètement pendant l’examen',
    resume: 'Démystifier le test à l’acide acétique : 5 minutes pour avoir l’esprit tranquille.',
    contenu: `L'inspection visuelle à l'acide acétique (IVA) se réalise en quelques minutes sur table gynécologique :
- La sage-femme applique un liquide doux dérivé du vinaigre sur le col de l'utérus.
- En cas de zone suspecte précancéreuse, elle blanchit immédiatement.
- L'examen ne fait pas mal et ne nécessite aucune piqûre.
- Si tout est normal, vous êtes tranquille pour 3 ans !`,
    validePar: 'PNLMNT Bénin'
  }
];

export default function FichesPage() {
  const [filtreType, setFiltreType] = useState<string>('tous');

  const fichesFiltrees = FICHES.filter(
    (f) => filtreType === 'tous' || f.type === filtreType
  );

  return (
    <div className="section-spacing px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#e6f7f0] text-[#007048] font-sora text-sm font-bold inline-block">
            Savoirs & Bonnes Pratiques
          </span>
          <h1 className="font-fraunces font-black text-4xl md:text-5xl text-[#1a2e28]">
            Fiches Médicales, Recettes & Capsules Audio
          </h1>
          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85">
            Des conseils concrets conçus avec les médecins béninois, traduits en fɔn et adaptés au quotidien de nos ménages.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'tous', label: 'Tout voir' },
            { id: 'capsule_audio', label: '🎙️ Capsules Audio (Fon/Fr)' },
            { id: 'fiche', label: '📄 Fiches Pratiques' },
            { id: 'recette', label: '🍲 Recettes Saines (1 000 FCFA)' }
          ].map((onglet) => (
            <button
              key={onglet.id}
              type="button"
              onClick={() => setFiltreType(onglet.id)}
              className={`min-h-[50px] px-6 rounded-full font-sora text-lg font-bold transition-all ${
                filtreType === onglet.id
                  ? 'bg-[#007048] text-white shadow-md'
                  : 'bg-white text-[#1a2e28] border border-[#007048]/20 hover:bg-[#e6f7f0]'
              }`}
            >
              {onglet.label}
            </button>
          ))}
        </div>

        {/* Grille des fiches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fichesFiltrees.map((item) => (
            <div
              key={item.id}
              className="card-ayidode p-8 bg-white space-y-5 border-t-4 border-[#007048] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#e6f7f0] text-[#007048] font-sora font-bold text-sm rounded-md">
                    {item.cancer}
                  </span>
                  <span className="font-sora text-xs font-semibold text-[#c25b3a] uppercase">
                    {item.langue === 'fon' ? 'Langue Fɔngbe' : 'Langue Française'}
                  </span>
                </div>

                <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28] leading-snug">
                  {item.titre}
                </h2>

                <p className="font-atkinson text-lg text-[#1a2e28]/80 font-medium">
                  {item.resume}
                </p>

                {item.type === 'capsule_audio' && (
                  <div className="p-4 rounded-xl bg-[#e6f7f0] border border-[#00a86b]/30 space-y-2">
                    <div className="flex justify-between items-center text-sm font-sora font-bold text-[#007048]">
                      <span>Lecteur Audio Fɔngbe</span>
                      <span>{item.duree}</span>
                    </div>
                    <audio controls className="w-full h-10 accent-[#00a86b]">
                      <source src={item.audioUrl} type="audio/mpeg" />
                      Votre navigateur ne supporte pas le lecteur audio.
                    </audio>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[#faf8f3] border border-[#007048]/15 font-atkinson text-lg leading-relaxed whitespace-pre-line text-[#1a2e28]">
                  {item.contenu}
                </div>
              </div>

              <div className="pt-4 border-t border-[#007048]/10 text-xs font-sora text-[#007048] font-semibold">
                Validé scientifiquement par : {item.validePar}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
