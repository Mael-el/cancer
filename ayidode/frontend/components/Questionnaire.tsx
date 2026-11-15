'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BoutonInfirmier } from './BoutonInfirmier';
import { BoutonAudio } from './BoutonAudio';
import { ShieldCheck, HeartHandshake, MapPin, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuestionnaireState {
  age_range: string;
  vaccin_vph: string;
  dernier_depistage: string;
  aliments_moisissures: string;
  activite_tabac: string;
}

const PHRASES_ENCOURAGEMENT = [
  "Prendre 5 minutes pour sa santé est un acte d'amour pour toute votre famille.",
  "Chaque réponse nous aide à vous orienter avec bienveillance et clarté.",
  "La prévention est notre plus grand bouclier au Bénin.",
  "Vous faites le bon choix en vous informant aujourd'hui.",
  "Presque terminé ! La santé n'a pas de prix."
];

export default function Questionnaire() {
  const [etape, setEtape] = useState(1);
  const [reponses, setReponses] = useState<QuestionnaireState>({
    age_range: '',
    vaccin_vph: '',
    dernier_depistage: '',
    aliments_moisissures: '',
    activite_tabac: ''
  });

  const [scoreFinal, setScoreFinal] = useState<'faible' | 'modere' | 'eleve' | null>(null);

  const handleChoix = (champ: keyof QuestionnaireState, valeur: string) => {
    setReponses(prev => ({ ...prev, [champ]: valeur }));
  };

  const peutPasser = () => {
    if (etape === 1) return !!reponses.age_range;
    if (etape === 2) return !!reponses.vaccin_vph;
    if (etape === 3) return !!reponses.dernier_depistage;
    if (etape === 4) return !!reponses.aliments_moisissures;
    if (etape === 5) return !!reponses.activite_tabac;
    return false;
  };

  const calculerScore = () => {
    let score = 0;
    if (reponses.age_range === 'plus_40') score += 2;
    if (reponses.vaccin_vph === 'non') score += 2;
    if (reponses.dernier_depistage === 'jamais') score += 3;
    if (reponses.dernier_depistage === 'plus_3ans') score += 2;
    if (reponses.aliments_moisissures === 'frequent') score += 2;
    if (reponses.activite_tabac === 'oui') score += 2;

    if (score <= 3) return 'faible';
    if (score <= 6) return 'modere';
    return 'eleve';
  };

  const handleSuivant = () => {
    if (etape < 5) {
      setEtape(etape + 1);
    } else {
      setScoreFinal(calculerScore());
    }
  };

  return (
    <div className="card-ayidode p-8 md:p-12 bg-white max-w-3xl mx-auto shadow-card border-t-8 border-[#007048]">
      {!scoreFinal ? (
        <div className="space-y-8">
          {/* Barre de progression aérée */}
          <div className="space-y-3 border-b border-[#007048]/15 pb-6">
            <div className="flex items-center justify-between">
              <span className="font-sora text-sm font-bold text-[#007048] uppercase tracking-wider">
                Question {etape} sur 5
              </span>
              <span className="font-sora text-sm font-semibold text-[#1a2e28]/70">
                {etape * 20}% complété
              </span>
            </div>
            {/* Barre fluide */}
            <div className="w-full h-3 bg-[#e6f7f0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00a86b] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${etape * 20}%` }}
              />
            </div>
          </div>

          {/* Phrase d'encouragement dynamique */}
          <div className="bg-[#faf8f3] p-3.5 rounded-xl text-center font-fraunces italic text-[#007048] text-base md:text-lg">
            &quot;{PHRASES_ENCOURAGEMENT[etape - 1]}&quot;
          </div>

          {/* QUESTION 1 : ÂGE */}
          {etape === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#1a2e28]">
                  1. Dans quelle tranche d&apos;âge vous situez-vous ?
                </h2>
                <p className="font-atkinson text-xl text-[#1a2e28]/75">
                  L&apos;âge permet d&apos;adapter les recommandations officielles du PNLMNT Bénin (vaccin VPH ou dépistage triennal).
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { val: 'moins_25', label: 'Moins de 25 ans' },
                  { val: '25_39', label: 'Entre 25 et 39 ans' },
                  { val: '40_49', label: 'Entre 40 et 49 ans' },
                  { val: 'plus_50', label: '50 ans et plus' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleChoix('age_range', opt.val)}
                    className={`w-full text-left min-h-[60px] p-5 rounded-[20px_20px_6px_20px] border-2 font-atkinson text-xl font-bold transition-all ${
                      reponses.age_range === opt.val
                        ? 'border-[#007048] bg-[#e6f7f0] text-[#007048] shadow-md'
                        : 'border-[#007048]/20 bg-white hover:border-[#00a86b]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 2 : VACCIN VPH */}
          {etape === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#1a2e28]">
                  2. Avez-vous (ou votre fille de 9-14 ans) reçu le vaccin contre le VPH ?
                </h2>
                <p className="font-atkinson text-xl text-[#1a2e28]/75">
                  Le vaccin VPH est 100% gratuit dans les centres publics béninois et protège contre le cancer du col de l&apos;utérus.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { val: 'oui_complet', label: 'Oui, schéma complet (2 doses reçues)' },
                  { val: 'oui_incomplet', label: 'Une seule dose reçue à ce jour' },
                  { val: 'non', label: 'Non, aucune dose reçue' },
                  { val: 'ne_sais_pas', label: 'Je ne sais pas ou non concerné(e)' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleChoix('vaccin_vph', opt.val)}
                    className={`w-full text-left min-h-[60px] p-5 rounded-[20px_20px_6px_20px] border-2 font-atkinson text-xl font-bold transition-all ${
                      reponses.vaccin_vph === opt.val
                        ? 'border-[#007048] bg-[#e6f7f0] text-[#007048] shadow-md'
                        : 'border-[#007048]/20 bg-white hover:border-[#00a86b]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 3 : DERNIER DÉPISTAGE */}
          {etape === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#1a2e28]">
                  3. À quand remonte votre dernier test de dépistage (col, sein ou prostate) ?
                </h2>
                <p className="font-atkinson text-xl text-[#1a2e28]/75">
                  Un test régulier permet de repérer les anomalies bénignes des années avant qu&apos;elles ne deviennent graves.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { val: 'moins_1an', label: 'Il y a moins d’un an' },
                  { val: '1_a_3ans', label: 'Entre 1 et 3 ans' },
                  { val: 'plus_3ans', label: 'Il y a plus de 3 ans' },
                  { val: 'jamais', label: 'Jamais réalisé de test à ce jour' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleChoix('dernier_depistage', opt.val)}
                    className={`w-full text-left min-h-[60px] p-5 rounded-[20px_20px_6px_20px] border-2 font-atkinson text-xl font-bold transition-all ${
                      reponses.dernier_depistage === opt.val
                        ? 'border-[#007048] bg-[#e6f7f0] text-[#007048] shadow-md'
                        : 'border-[#007048]/20 bg-white hover:border-[#00a86b]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 4 : ALIMENTATION & GRAINES DU MARCHÉ */}
          {etape === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#1a2e28]">
                  4. Comment choisissez-vous et consommez-vous le maïs et les arachides ?
                </h2>
                <p className="font-atkinson text-xl text-[#1a2e28]/75">
                  L&apos;aflatoxine issue de grains noircis ou mal séchés est une cause directe du cancer du foie en Afrique de l&apos;Ouest.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { val: 'tri_scrupuleux', label: 'Je trie un par un et jette systématiquement tout grain noir ou suspect' },
                  { val: 'achat_sans_tri', label: 'J’achète en vrac au marché sans faire attention aux moisissures' },
                  { val: 'frequent', label: 'Je consomme fréquemment de la pâte d’arachide ou du maïs moulu du marché' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleChoix('aliments_moisissures', opt.val)}
                    className={`w-full text-left min-h-[60px] p-5 rounded-[20px_20px_6px_20px] border-2 font-atkinson text-xl font-bold transition-all ${
                      reponses.aliments_moisissures === opt.val
                        ? 'border-[#007048] bg-[#e6f7f0] text-[#007048] shadow-md'
                        : 'border-[#007048]/20 bg-white hover:border-[#00a86b]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 5 : HABITUDES DE VIE & SIGNES PHYSIQUES */}
          {etape === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="font-fraunces font-bold text-2xl sm:text-3xl text-[#1a2e28]">
                  5. Avez-vous remarqué un changement physique récent ou consommez-vous du tabac / alcool fort ?
                </h2>
                <p className="font-atkinson text-xl text-[#1a2e28]/75">
                  Une petite boule sous la peau, un saignement inattendu ou le sodabi régulier méritent d&apos;être pris en compte.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { val: 'aucun', label: 'Non, aucun signe inhabituel et pas de tabac ni alcool fort' },
                  { val: 'alcool_tabac', label: 'Consommation occasionnelle de tabac ou de sodabi' },
                  { val: 'signe_physique', label: 'J’ai remarqué une grosseur, une douleur continue ou un saignement' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleChoix('activite_tabac', opt.val)}
                    className={`w-full text-left min-h-[60px] p-5 rounded-[20px_20px_6px_20px] border-2 font-atkinson text-xl font-bold transition-all ${
                      reponses.activite_tabac === opt.val
                        ? 'border-[#007048] bg-[#e6f7f0] text-[#007048] shadow-md'
                        : 'border-[#007048]/20 bg-white hover:border-[#00a86b]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Précédent / Suivant */}
          <div className="flex justify-between items-center pt-6 border-t border-[#007048]/15">
            {etape > 1 ? (
              <button
                type="button"
                onClick={() => setEtape(etape - 1)}
                className="btn-ayidode bg-[#faf8f3] text-[#1a2e28] border border-[#007048]/30 px-6 text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Précédent
              </button>
            ) : <span />}

            <button
              type="button"
              disabled={!peutPasser()}
              onClick={handleSuivant}
              className="btn-ayidode bg-[#00a86b] text-white px-8 text-xl disabled:opacity-40"
            >
              <span>{etape === 5 ? 'Découvrir mes conseils' : 'Suivant'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* ÉCRAN RÉSULTAT : NIVEAU DOUX, 3 ACTIONS MAX, SANS PANIQUE */
        <div className="space-y-8 animate-slideUp">
          <div className="text-center space-y-4">
            <span
              className={`inline-block px-5 py-2 rounded-full font-sora font-black text-sm uppercase tracking-wider ${
                scoreFinal === 'eleve'
                  ? 'bg-[#faf3ee] text-[#c25b3a] border border-[#c25b3a]/40'
                  : scoreFinal === 'modere'
                  ? 'bg-[#e6f7f0] text-[#007048] border border-[#00a86b]/40'
                  : 'bg-[#e6f7f0] text-[#007048]'
              }`}
            >
              Votre Profil de Vigilance : {scoreFinal === 'eleve' ? 'Vigilance Active Recommandée' : scoreFinal === 'modere' ? 'Vigilance Modérée' : 'Vigilance de Routine'}
            </span>

            <h2 className="font-fraunces font-black text-3xl md:text-4xl text-[#1a2e28]">
              {scoreFinal === 'eleve'
                ? 'Une consultation préventive simple vous apportera toute la sérénité'
                : scoreFinal === 'modere'
                ? 'Quelques ajustements faciles renforceront votre protection'
                : 'Bravo : vos habitudes actuelles constituent un excellent bouclier'}
            </h2>

            <p className="font-fraunces italic text-xl text-[#007048]">
              &quot;Le cancer n&apos;est pas une fatalité. Dépister tôt, c&apos;est protéger ceux qu&apos;on aime.&quot;
            </p>

            <div className="flex justify-center pt-2">
              <BoutonAudio
                texte={`Votre évaluation indique un niveau de vigilance ${scoreFinal}. Voici les trois actions concrètes à mener dès aujourd'hui.`}
                audioUrlFon="/audio/capsules/prevention_fon.mp3"
                titre="Écouter le bilan en Fɔngbe"
              />
            </div>
          </div>

          {/* 3 ACTIONS CONCRÈTES (Pas plus) */}
          <div className="card-ayidode p-6 md:p-8 bg-[#faf8f3] space-y-5 border-l-8 border-[#007048]">
            <h3 className="font-fraunces font-bold text-2xl text-[#007048]">
              Vos 3 actions prioritaires :
            </h3>
            <ul className="space-y-4 font-atkinson text-xl text-[#1a2e28]">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#007048] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</span>
                <div>
                  <strong>Dépistage dans un centre public :</strong>
                  <p className="text-base text-[#1a2e28]/80 mt-1">
                    Prenez rendez-vous dans le centre le plus proche (maternité ou hôpital) pour un contrôle visuel rapide et indolore.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#007048] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</span>
                <div>
                  <strong>Sécurité alimentaire au marché :</strong>
                  <p className="text-base text-[#1a2e28]/80 mt-1">
                    Jetez systématiquement tout grain d&apos;arachide ou de maïs taché/moisi. Privilégiez les légumes verts (gboma, amanvivè) et l&apos;afitin pur.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#007048] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</span>
                <div>
                  <strong>Parlez-en à un soignant bienveillant :</strong>
                  <p className="text-base text-[#1a2e28]/80 mt-1">
                    Nos infirmiers partenaires sont à votre disposition pour répondre gratuitement à toutes vos questions intimes.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* BOUTON INFIRMIER + BOUTON TROUVER UN CENTRE */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <BoutonInfirmier label="Parler à un infirmier" />
            <Link
              href="/centres"
              className="btn-ayidode bg-[#007048] text-white text-lg"
            >
              <MapPin className="w-5 h-5" />
              Trouver un centre de dépistage
            </Link>
            <button
              onClick={() => {
                setScoreFinal(null);
                setEtape(1);
              }}
              className="btn-ayidode bg-[#faf8f3] border border-black/10 text-base"
            >
              Recommencer le test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
