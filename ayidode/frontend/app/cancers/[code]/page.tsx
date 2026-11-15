'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { CANCERS_DATA } from '../../../lib/cancersData';
import { BoutonAudio } from '../../../components/BoutonAudio';
import { BoutonInfirmier } from '../../../components/BoutonInfirmier';
import {
  ArrowLeft,
  AlertTriangle,
  Heart,
  ShieldCheck,
  Utensils,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  PhoneCall
} from 'lucide-react';

export default function CancerDetailPage() {
  const params = useParams();
  const code = params?.code as string;
  const cancer = CANCERS_DATA[code];

  if (!cancer) {
    return (
      <div className="min-h-screen bg-[#faf8f3] py-24 px-6 text-center">
        <h1 className="font-fraunces text-3xl text-[#1a2e28] mb-4">Cancer non répertorié</h1>
        <p className="font-atkinson text-xl text-[#1a2e28]/70 mb-8">Veuillez choisir un cancer parmi les 5 fiches officielles.</p>
        <Link href="/cancers" className="btn-ayidode bg-[#007048] text-white">
          Retour aux 5 cancers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Navigation retour */}
        <div>
          <Link
            href="/cancers"
            className="inline-flex items-center gap-2 font-sora font-semibold text-[#007048] hover:underline text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux 5 cancers
          </Link>
        </div>

        {/* 1. EN-TÊTE DU CANCER + PHRASE D'ESPOIR */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-8 border-[#007048] shadow-card space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-4 py-1.5 rounded-full bg-[#e6f7f0] border border-[#00a86b]/30 text-[#007048] font-sora text-sm font-bold">
              Fiche Médicale Officielle Bénin
            </span>
            <BoutonAudio
              texte={`${cancer.nomFr}. En langue fon : ${cancer.nomFon}. ${cancer.phraseEspoirFr}`}
              audioUrlFon={cancer.audioFon}
              audioUrlFr={cancer.audioFr}
              titre="Écouter la fiche complète"
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-fraunces font-black text-4xl sm:text-5xl md:text-hero text-[#1a2e28] leading-tight">
              {cancer.nomFr}
            </h1>
            <p className="font-fraunces italic text-2xl md:text-3xl text-[#c25b3a] font-bold">
              {cancer.nomFon}
            </p>
          </div>

          {/* Phrase d'espoir mise en valeur */}
          <div className="p-6 rounded-[24px_24px_6px_24px] bg-[#e6f7f0] border-2 border-[#00a86b]/40">
            <p className="font-fraunces italic text-2xl md:text-3xl text-[#007048] font-bold leading-snug">
              &quot;{cancer.phraseEspoirFr}&quot;
            </p>
            <p className="font-atkinson text-lg text-[#007048]/80 mt-2">
              En fɔngbe : &quot;{cancer.phraseEspoirFon}&quot;
            </p>
          </div>

          {/* Boutons d'action rapide */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-black/5">
            <BoutonInfirmier label="Parler à un infirmier" />
            <Link
              href="/centres"
              className="btn-ayidode bg-[#007048] text-white text-lg"
            >
              <MapPin className="w-5 h-5" />
              Trouver un centre de dépistage
            </Link>
          </div>
        </section>

        {/* 2. SECTION CAUSE (Texte + Audio) */}
        <section className="card-ayidode p-8 md:p-10 bg-white border-t-4 border-[#007048] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f7f0] text-[#007048] flex items-center justify-center font-bold">
                01
              </div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                Les Causes & Facteurs de Risque
              </h2>
            </div>
            <BoutonAudio
              texte={`Causes du ${cancer.nomFr}. ${cancer.cause.fr}`}
              audioUrlFon={cancer.audioFon}
              taille="compacte"
            />
          </div>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/90 font-medium">
            {cancer.cause.fr}
          </p>

          <div className="bg-[#faf8f3] p-4 rounded-xl text-lg text-[#c25b3a] font-atkinson italic">
            <strong>En Fɔngbe :</strong> {cancer.cause.fon}
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-sora font-bold text-lg text-[#007048]">Facteurs précis identifiés :</h3>
            <ul className="space-y-3 font-atkinson text-lg text-[#1a2e28]/85">
              {cancer.cause.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c25b3a] mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. SECTION MANIFESTATION / SIGNES D'ALERTE (Texte + Audio) */}
        <section className="card-ayidode p-8 md:p-10 bg-white border-t-4 border-[#c25b3a] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf3ee] text-[#c25b3a] flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                Manifestations & Signes d&apos;Alerte
              </h2>
            </div>
            <BoutonAudio
              texte={`Signes d'alerte pour le ${cancer.nomFr}. ${cancer.manifestation.fr}`}
              audioUrlFon={cancer.audioFon}
              taille="compacte"
            />
          </div>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/90 font-medium">
            {cancer.manifestation.fr}
          </p>

          <div className="bg-[#faf8f3] p-4 rounded-xl text-lg text-[#c25b3a] font-atkinson italic">
            <strong>En Fɔngbe :</strong> {cancer.manifestation.fon}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {cancer.manifestation.alertes.map((alt, i) => (
              <div
                key={i}
                className="p-5 rounded-[20px_20px_6px_20px] bg-[#faf3ee] border-l-4 border-[#c25b3a] space-y-1"
              >
                <div className="flex items-center gap-2 text-[#c25b3a] font-sora font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Signe n°{i + 1}
                </div>
                <p className="font-atkinson text-lg text-[#1a2e28] font-semibold">{alt}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#e6f7f0] p-4 rounded-xl flex items-center justify-between gap-4">
            <span className="font-fraunces italic text-lg text-[#007048]">
              Vous remarquez un de ces signes ? Ne gardez pas l&apos;inquiétude pour vous.
            </span>
            <BoutonInfirmier label="Parler à un soignant" />
          </div>
        </section>

        {/* 4. SECTION CONSÉQUENCES (Texte + Audio) */}
        <section className="card-ayidode p-8 md:p-10 bg-white border-t-4 border-[#1a2e28] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf8f3] text-[#1a2e28] border border-black/10 flex items-center justify-center font-bold">
                03
              </div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                Conséquences en Cas de Retard
              </h2>
            </div>
            <BoutonAudio
              texte={`Conséquences du ${cancer.nomFr}. ${cancer.consequences.fr}`}
              audioUrlFon={cancer.audioFon}
              taille="compacte"
            />
          </div>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/90 font-medium">
            {cancer.consequences.fr}
          </p>

          <div className="space-y-3 pt-2">
            {cancer.consequences.impacts.map((imp, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#faf8f3]">
                <XCircle className="w-6 h-6 text-[#c25b3a] shrink-0 mt-0.5" />
                <span className="font-atkinson text-lg text-[#1a2e28]">{imp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECTION SOLUTIONS (Prévention & Dépistage) */}
        <section className="card-ayidode p-8 md:p-10 bg-white border-t-4 border-[#007048] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f7f0] text-[#007048] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                Solutions Concrètes & Dépistage
              </h2>
            </div>
            <BoutonAudio
              texte={`Solutions et dépistage pour le ${cancer.nomFr}. ${cancer.solutions.fr}`}
              audioUrlFon={cancer.audioFon}
              taille="compacte"
            />
          </div>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/90 font-medium">
            {cancer.solutions.fr}
          </p>

          <div className="space-y-4 pt-2">
            {cancer.solutions.gestes.map((sol, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#e6f7f0]/60 border border-[#00a86b]/20">
                <CheckCircle2 className="w-7 h-7 text-[#007048] shrink-0 mt-0.5" />
                <span className="font-atkinson text-xl text-[#1a2e28] font-bold">{sol}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. SECTION NUTRITION : ALIMENTS À REMPLACER & ALTERNATIVES LOCALES */}
        <section className="card-ayidode p-8 md:p-10 bg-white border-t-4 border-[#d4a574] space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf8f3] text-[#c25b3a] border border-[#d4a574]/40 flex items-center justify-center font-bold">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
                  Prévention par l&apos;Alimentation
                </h2>
                <p className="font-atkinson text-lg text-[#1a2e28]/70">
                  Aliments à éviter et alternatives concrètes au marché béninois
                </p>
              </div>
            </div>
            <BoutonAudio
              texte={`Aliments à éviter et alternatives saines pour le ${cancer.nomFr}.`}
              audioUrlFon="/audio/aliments/marche_budget_fon.mp3"
              taille="compacte"
            />
          </div>

          <div className="space-y-6">
            {cancer.nutrition.alimentsAEviter.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-[24px_24px_6px_24px] bg-[#faf8f3] border border-[#d4a574]/30"
              >
                {/* À Remplacer */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-black/10 pb-4 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-2 text-[#c25b3a] font-sora font-bold text-sm">
                    <XCircle className="w-4 h-4" />
                    À ÉVITER OU REMPLACER
                  </div>
                  <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">{item.nomFr}</h3>
                  <p className="font-atkinson italic text-sm text-[#c25b3a]">{item.nomFon}</p>
                  <p className="font-atkinson text-base text-[#1a2e28]/80">{item.raison}</p>
                </div>

                {/* Alternative Locale */}
                <div className="space-y-2 md:pl-2">
                  <div className="flex items-center gap-2 text-[#007048] font-sora font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    ALTERNATIVE LOCALE RECOMMANDÉE
                  </div>
                  <h3 className="font-fraunces text-2xl font-bold text-[#007048]">{item.alternativeLocale}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#e6f7f0] text-[#007048] font-sora font-bold text-sm mt-2">
                    Prix moyen au marché : {item.prixMarche}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/alimentation"
              className="inline-flex items-center gap-2 font-sora font-bold text-[#007048] text-lg hover:underline"
            >
              Consulter le Guide Complet Marché & Budget (500, 1 000, 2 000 FCFA) →
            </Link>
          </div>
        </section>

        {/* 7. CAPSULE AUDIO RÉCAPITULATIVE (FR & FON) */}
        <section className="card-ayidode p-8 md:p-10 bg-gradient-to-r from-[#e6f7f0] to-[#faf8f3] border-t-4 border-[#007048] space-y-6 text-center">
          <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
            Écouter l&apos;intégralité de cette fiche en audio
          </h2>
          <p className="font-atkinson text-xl text-[#1a2e28]/85 max-w-2xl mx-auto">
            Capsule certifiée enregistrée avec des soignants béninois. Disponible en français et en fɔngbe pour vous et vos proches.
          </p>
          <div className="flex justify-center">
            <BoutonAudio
              texte={`${cancer.nomFr}. ${cancer.phraseEspoirFr}. ${cancer.cause.fr}. ${cancer.manifestation.fr}. ${cancer.solutions.fr}`}
              audioUrlFon={cancer.audioFon}
              audioUrlFr={cancer.audioFr}
              titre="Lancer la capsule"
            />
          </div>
        </section>

        {/* 8 & 9. ACTIONS FINALES : PARLER À UN INFIRMIER & TROUVER UN CENTRE */}
        <section className="card-ayidode p-8 md:p-12 bg-white border-t-4 border-[#c25b3a] shadow-xl space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28] mb-2">
              Passez à l&apos;action dès aujourd&apos;hui
            </h2>
            <p className="font-fraunces italic text-xl text-[#007048]">
              &quot;Chaque petit geste compte. Aujourd&apos;hui, vous pouvez faire la différence.&quot;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-4">
            <BoutonInfirmier label="Parler à un infirmier" />
            <Link
              href="/centres"
              className="btn-ayidode bg-[#007048] text-white text-lg"
            >
              <MapPin className="w-5 h-5" />
              Trouver le centre le plus proche
            </Link>
            <a
              href="tel:136"
              className="btn-ayidode bg-[#faf8f3] text-[#007048] border-2 border-[#007048] text-lg"
            >
              <PhoneCall className="w-5 h-5" />
              Numéro vert gratuit : 136
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
