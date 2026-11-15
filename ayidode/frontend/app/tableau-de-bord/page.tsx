'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Heart,
  ChevronRight,
  Trash2,
  Syringe,
  Activity,
  User,
  Users,
  BarChart3
} from 'lucide-react';
import { BoutonInfirmier } from '../../components/BoutonInfirmier';

export default function TableauDeBordUtilisateur() {
  const [showEffacementModal, setShowEffacementModal] = useState(false);
  const [effacementDemande, setEffacementDemande] = useState(false);

  // Compte à rebours simulé pour le prochain dépistage IVA
  const [joursRestants, setJoursRestants] = useState(24);

  return (
    <div className="min-h-screen bg-[#faf8f3] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* En-tête avec navigation de rôles */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full bg-[#e6f7f0] text-[#007048] font-sora text-xs font-bold uppercase tracking-wider">
              Espace Personnel Prévention
            </span>
            <h1 className="font-fraunces font-black text-3xl sm:text-4xl text-[#1a2e28]">
              Mon Carnet de Santé Préventif
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tableau-de-bord/asc"
              className="px-4 py-2 rounded-xl bg-white border border-black/10 text-sm font-sora font-semibold text-[#1a2e28] hover:bg-[#e6f7f0] transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-[#007048]" />
              Espace ASC (Soignant)
            </Link>
            <Link
              href="/tableau-de-bord/admin"
              className="px-4 py-2 rounded-xl bg-white border border-black/10 text-sm font-sora font-semibold text-[#1a2e28] hover:bg-[#faf3ee] transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4 text-[#c25b3a]" />
              Supervision Admin
            </Link>
          </div>
        </div>

        {/* 1. COMPTE À REBOURS & PROCHAIN DÉPISTAGE (Bloc Hero Card) */}
        <div className="card-ayidode p-8 md:p-10 bg-white border-t-8 border-[#007048] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e6f7f0] text-[#007048] font-sora text-xs font-bold">
                <Clock className="w-4 h-4" />
                Prochaine Échéance de Dépistage
              </div>
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#1a2e28]">
                Dépistage Visuel du Col de l&apos;Utérus (IVA)
              </h2>
              <p className="font-atkinson text-xl text-[#1a2e28]/80 leading-relaxed">
                Rappel programmé à la Maternité de l&apos;Hôpital de Zone de Ménontin. Ce test rapide (5 min) est gratuit et permet de s&apos;assurer que tout va bien.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/centres"
                  className="btn-ayidode bg-[#007048] text-white text-base h-[48px]"
                >
                  Voir l&apos;adresse du centre
                </Link>
                <BoutonInfirmier label="Une question avant le test ?" />
              </div>
            </div>

            {/* Compte à rebours visuel */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-[24px_24px_6px_24px] bg-[#faf8f3] border-2 border-[#007048]/20 text-center">
              <span className="font-sora text-sm uppercase tracking-wider font-bold text-[#007048] mb-1">
                Compte à rebours
              </span>
              <div className="font-sora font-black text-6xl md:text-7xl text-[#c25b3a] leading-none my-2">
                J-{joursRestants}
              </div>
              <span className="font-fraunces italic text-lg text-[#1a2e28]">
                jours avant votre rendez-vous
              </span>
              <span className="text-xs text-[#1a2e28]/60 mt-3 font-sora">
                Rappel automatique WhatsApp le J-2
              </span>
            </div>
          </div>
        </div>

        {/* 2. CALENDRIER VACCINAL VPH (JEUNES FILLES) & HISTORIQUE DES QUIZ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendrier Vaccinal VPH */}
          <div className="card-ayidode p-8 bg-white border-t-4 border-[#007048] space-y-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7f0] text-[#007048] flex items-center justify-center">
                  <Syringe className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                  Calendrier Vaccin VPH (9-14 ans)
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#00a86b] text-white text-xs font-sora font-bold">
                100% Gratuit
              </span>
            </div>

            <p className="font-atkinson text-lg text-[#1a2e28]/80">
              Protection définitive de votre fille contre le cancer du col de l&apos;utérus (2 doses requises espacées de 6 mois).
            </p>

            <div className="space-y-4">
              {/* Dose 1 */}
              <div className="p-4 rounded-xl bg-[#e6f7f0] border border-[#00a86b]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#007048]" />
                  <div>
                    <div className="font-sora font-bold text-base text-[#1a2e28]">Dose 1 (Initiale)</div>
                    <div className="text-xs text-[#007048] font-semibold">Effectuée le 12 Mai 2026 • Centre de Ménontin</div>
                  </div>
                </div>
                <span className="text-xs font-sora font-bold px-2 py-1 bg-white text-[#007048] rounded">Validée</span>
              </div>

              {/* Dose 2 */}
              <div className="p-4 rounded-xl bg-[#faf8f3] border border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#c25b3a]" />
                  <div>
                    <div className="font-sora font-bold text-base text-[#1a2e28]">Dose 2 (Rappel protecteur)</div>
                    <div className="text-xs text-[#c25b3a] font-semibold">Prévue en Novembre 2026 (6 mois après)</div>
                  </div>
                </div>
                <span className="text-xs font-sora font-bold px-2 py-1 bg-[#faf3ee] text-[#c25b3a] rounded">À venir</span>
              </div>
            </div>

            <div className="bg-[#faf8f3] p-4 rounded-xl text-sm text-[#1a2e28]/80 font-atkinson">
              <strong>Info parents :</strong> Le vaccin est disponible tous les jours ouvrables dans les maternités et centres de santé publics du Bénin sans aucun frais.
            </div>
          </div>

          {/* Historique des Auto-évaluations (Quiz) */}
          <div className="card-ayidode p-8 bg-white border-t-4 border-[#d4a574] space-y-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf3ee] text-[#c25b3a] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                  Historique de Mes Évaluations
                </h3>
              </div>
              <Link
                href="/questionnaire"
                className="text-xs font-sora font-bold text-[#007048] hover:underline"
              >
                + Nouveau test
              </Link>
            </div>

            <p className="font-atkinson text-lg text-[#1a2e28]/80">
              Résultats de vos bilans de risque anonymes réalisés sur la plateforme.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#faf8f3] border border-black/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sora font-bold text-sm text-[#1a2e28]">Bilan de Prévention Général</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6f7f0] text-[#007048] font-sora text-xs font-bold">
                    Vigilance Modérée
                  </span>
                </div>
                <p className="text-xs text-[#1a2e28]/70 font-atkinson">
                  Réalisé le 14 Septembre 2026 • Recommandation : dépistage triennal col & tri des arachides
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f3] border border-black/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sora font-bold text-sm text-[#1a2e28]">Évaluation Nutritionnelle Aflatoxines</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6f7f0] text-[#007048] font-sora text-xs font-bold">
                    Vigilance de Routine
                  </span>
                </div>
                <p className="text-xs text-[#1a2e28]/70 font-atkinson">
                  Réalisé le 28 Août 2026 • Recommandation : utilisation régulière d&apos;afitin et niébé
                </p>
              </div>
            </div>

            <Link
              href="/questionnaire"
              className="btn-ayidode bg-[#faf8f3] border-2 border-[#007048] text-[#007048] w-full text-center text-base h-[48px]"
            >
              Refaire une auto-évaluation rapide
            </Link>
          </div>
        </div>

        {/* 3. CONSEILS PERSONNALISÉS & DROIT À L'EFFACEMENT (APDP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Conseils personnalisés */}
          <div className="lg:col-span-8 card-ayidode p-8 bg-white border-t-4 border-[#007048] space-y-6 shadow-card">
            <h3 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
              Conseils Personnalisés de Votre Soignant
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#faf8f3] border-l-4 border-[#007048] space-y-2">
                <h4 className="font-fraunces font-bold text-lg text-[#007048]">Au marché ce samedi</h4>
                <p className="font-atkinson text-base text-[#1a2e28]/80">
                  Prenez 3 minutes pour trier les arachides avant la cuisson de la pâte. Jeter les grains noirs protège votre foie des aflatoxines.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f3] border-l-4 border-[#c25b3a] space-y-2">
                <h4 className="font-fraunces font-bold text-lg text-[#c25b3a]">Autopalpation mensuelle</h4>
                <p className="font-atkinson text-base text-[#1a2e28]/80">
                  À réaliser 3 jours après la fin des règles. Une boule souple ou dure détectée tôt permet d&apos;agir immédiatement.
                </p>
              </div>
            </div>
          </div>

          {/* Droits APDP Bénin */}
          <div className="lg:col-span-4 card-ayidode p-8 bg-white border-t-4 border-[#c25b3a] space-y-5 shadow-card">
            <div className="flex items-center gap-2 text-[#c25b3a] font-sora font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              Conformité APDP Bénin
            </div>
            <h3 className="font-fraunces font-bold text-xl text-[#1a2e28]">
              Protection & Effacement
            </h3>
            <p className="font-atkinson text-sm text-[#1a2e28]/80">
              Vos coordonnées sont chiffrées selon le protocole AES-256. Conformément au Code du numérique, vous pouvez purger l&apos;intégralité de vos rappels et données sous 7 jours.
            </p>

            {!effacementDemande ? (
              <button
                type="button"
                onClick={() => setShowEffacementModal(true)}
                className="w-full py-3 px-4 rounded-xl border border-[#c25b3a] text-[#c25b3a] font-sora font-bold text-sm hover:bg-[#c25b3a] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Droit à l&apos;oubli (Effacement)
              </button>
            ) : (
              <div className="p-3 bg-[#faf3ee] text-[#c25b3a] font-sora font-bold text-xs rounded-xl border border-[#c25b3a]/30">
                ✓ Demande enregistrée. Données supprimées sous 7 jours.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modale d'effacement conforme */}
      {showEffacementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="card-ayidode p-8 bg-white max-w-lg w-full space-y-6 animate-slideUp">
            <h3 className="font-fraunces font-bold text-2xl text-[#c25b3a]">
              Confirmer la suppression définitive
            </h3>
            <p className="font-atkinson text-lg text-[#1a2e28]">
              En vertu de la Loi APDP n°2017-20 du Bénin, toutes vos données (téléphone chiffré, rappels programmés et historique) seront irrévocablement supprimées de nos bases.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowEffacementModal(false)}
                className="btn-ayidode bg-[#faf8f3] border border-[#007048]/30 text-[#1a2e28] flex-1 text-base h-[50px]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  setEffacementDemande(true);
                  setShowEffacementModal(false);
                }}
                className="btn-ayidode bg-[#c25b3a] text-white flex-1 text-base h-[50px] btn-terracotta"
              >
                Confirmer l&apos;effacement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
