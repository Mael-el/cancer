'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Package,
  Users,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  Download
} from 'lucide-react';

interface StockAlerte {
  centre: string;
  commune: string;
  produit: string;
  quantiteRestante: number;
  seuilCritique: number;
  statut: 'critique' | 'faible' | 'normal';
}

const ALERTES_STOCK: StockAlerte[] = [
  {
    centre: 'Centre de Santé de Référence d’Abomey-Calavi',
    commune: 'Abomey-Calavi',
    produit: 'Réactif Acide Acétique (Dépistage IVA)',
    quantiteRestante: 8,
    seuilCritique: 20,
    statut: 'critique'
  },
  {
    centre: 'CHUD Borgou - Parakou',
    commune: 'Parakou',
    produit: 'Doses Vaccin VPH (Gardasil-9)',
    quantiteRestante: 35,
    seuilCritique: 50,
    statut: 'faible'
  },
  {
    centre: 'Hôpital de Zone de Ménontin',
    commune: 'Cotonou',
    produit: 'Tests rapides Hépatite B',
    quantiteRestante: 12,
    seuilCritique: 30,
    statut: 'critique'
  }
];

export default function DashboardAdmin() {
  const [periode, setPeriode] = useState<'30j' | 'trimestre' | 'annee'>('30j');

  return (
    <div className="min-h-screen bg-[#faf8f3] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation & Titre */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1">
            <Link
              href="/tableau-de-bord"
              className="inline-flex items-center gap-2 text-sm font-sora font-semibold text-[#007048] hover:underline mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au tableau de bord
            </Link>
            <h1 className="font-fraunces font-black text-3xl sm:text-4xl text-[#1a2e28]">
              Supervision Nationale PNLMNT • Ayidodé+
            </h1>
            <p className="font-atkinson text-lg text-[#1a2e28]/70">
              Pilotage des indicateurs de dépistage, de vaccination et des stocks sanitaires au Bénin
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl border border-black/10 flex text-xs font-sora font-bold">
              <button
                onClick={() => setPeriode('30j')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  periode === '30j' ? 'bg-[#007048] text-white' : 'text-[#1a2e28]'
                }`}
              >
                30 derniers jours
              </button>
              <button
                onClick={() => setPeriode('trimestre')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  periode === 'trimestre' ? 'bg-[#007048] text-white' : 'text-[#1a2e28]'
                }`}
              >
                Trimestre
              </button>
            </div>

            <button
              onClick={() => alert("Génération du rapport agrégé conforme APDP...")}
              className="btn-ayidode bg-[#007048] text-white text-xs px-3.5 h-[38px] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Exporter (PDF)
            </button>
          </div>
        </div>

        {/* 1. STATISTIQUES GLOBALES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-ayidode p-6 bg-white border-t-4 border-[#007048] shadow-sm space-y-2">
            <span className="font-sora text-xs uppercase font-bold text-[#007048]">Citoyens Inscrits</span>
            <div className="font-sora font-black text-4xl text-[#1a2e28]">
              18 420
            </div>
            <div className="flex items-center gap-1 text-xs text-[#00a86b] font-sora font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% ce mois-ci
            </div>
          </div>

          <div className="card-ayidode p-6 bg-white border-t-4 border-[#00a86b] shadow-sm space-y-2">
            <span className="font-sora text-xs uppercase font-bold text-[#00a86b]">Dépistages IVA Réalisés</span>
            <div className="font-sora font-black text-4xl text-[#1a2e28]">
              6 310
            </div>
            <p className="font-atkinson text-xs text-[#1a2e28]/70">Centres publics conventionnés</p>
          </div>

          <div className="card-ayidode p-6 bg-white border-t-4 border-[#c25b3a] shadow-sm space-y-2">
            <span className="font-sora text-xs uppercase font-bold text-[#c25b3a]">Vaccins VPH (Dose 1 & 2)</span>
            <div className="font-sora font-black text-4xl text-[#c25b3a]">
              9 140
            </div>
            <p className="font-atkinson text-xs text-[#1a2e28]/70">Filles de 9 à 14 ans immunisées</p>
          </div>

          <div className="card-ayidode p-6 bg-white border-t-4 border-[#d4a574] shadow-sm space-y-2">
            <span className="font-sora text-xs uppercase font-bold text-[#d4a574]">Taux d&apos;Engagement WhatsApp</span>
            <div className="font-sora font-black text-4xl text-[#1a2e28]">
              84.2%
            </div>
            <p className="font-atkinson text-xs text-[#1a2e28]/70">Rappels lus et confirmés</p>
          </div>
        </div>

        {/* 2. COUVERTURE GÉOGRAPHIQUE PAR DÉPARTEMENT & TAUX DE RÉPONSE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Couverture par département */}
          <div className="card-ayidode p-8 bg-white border-t-4 border-[#007048] space-y-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                Couverture Sanitaire par Département
              </h2>
              <span className="text-xs font-sora font-bold text-[#007048] bg-[#e6f7f0] px-2.5 py-1 rounded">
                Objectif PNLMNT : 70%
              </span>
            </div>

            <div className="space-y-4 font-sora text-sm">
              {[
                { dep: 'Littoral (Cotonou)', taux: 88, centres: 14 },
                { dep: 'Atlantique (Calavi, Ouidah)', taux: 76, centres: 21 },
                { dep: 'Ouémé (Porto-Novo, Sèmè)', taux: 71, centres: 12 },
                { dep: 'Borgou (Parakou, Tchaourou)', taux: 64, centres: 16 },
                { dep: 'Zou (Bohicon, Abomey)', taux: 59, centres: 10 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#1a2e28]">{item.dep}</span>
                    <span className="text-[#007048]">{item.taux}% ({item.centres} centres)</span>
                  </div>
                  <div className="w-full h-3 bg-[#faf8f3] rounded-full overflow-hidden border border-black/5">
                    <div
                      className="h-full bg-[#00a86b] rounded-full transition-all duration-700"
                      style={{ width: `${item.taux}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Taux de conversion & Réponse */}
          <div className="card-ayidode p-8 bg-white border-t-4 border-[#d4a574] space-y-6 shadow-card">
            <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
              Efficacité des Canaux de Rappels
            </h2>

            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#faf8f3] border border-black/10 space-y-2">
                <div className="flex justify-between items-center font-sora text-sm font-bold">
                  <span>WhatsApp Cloud API (Bénin)</span>
                  <span className="text-[#007048]">92% délivrés • 78% présence</span>
                </div>
                <p className="text-xs text-[#1a2e28]/70 font-atkinson">
                  Format le plus plébiscité en milieu urbain et périurbain. Modèles interactifs avec bouton de confirmation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f3] border border-black/10 space-y-2">
                <div className="flex justify-between items-center font-sora text-sm font-bold">
                  <span>SMS Traditionnel Flash</span>
                  <span className="text-[#c25b3a]">86% délivrés • 62% présence</span>
                </div>
                <p className="text-xs text-[#1a2e28]/70 font-atkinson">
                  Indispensable pour les zones rurales sans données internet actives (Parakou rural, Zou profond).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#e6f7f0] border border-[#00a86b]/30 space-y-2">
                <div className="flex justify-between items-center font-sora text-sm font-bold text-[#007048]">
                  <span>Capsules Vocales Fɔngbe</span>
                  <span>95% d&apos;écoute complète</span>
                </div>
                <p className="text-xs text-[#1a2e28]/70 font-atkinson">
                  Impact majeur chez les mères de famille et les marchandes des grands marchés (Dantokpa, Ouando).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ALERTES DE STOCK RÉACTIFS & VACCINS */}
        <div className="card-ayidode p-8 bg-white border-t-8 border-[#c25b3a] space-y-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#faf3ee] text-[#c25b3a] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                  Alertes de Stock Sanitaire en Temps Réel
                </h2>
                <p className="font-atkinson text-sm text-[#1a2e28]/70">
                  Surveillance des intrants pour éviter toute rupture de dépistage dans les maternités
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#faf3ee] text-[#c25b3a] font-sora font-bold text-xs">
              {ALERTES_STOCK.filter(a => a.statut === 'critique').length} alertes critiques
            </span>
          </div>

          <div className="space-y-3">
            {ALERTES_STOCK.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#faf8f3] border-l-4 border-[#c25b3a] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="font-sora font-bold text-base text-[#1a2e28]">
                    {item.produit}
                  </div>
                  <div className="text-sm font-atkinson text-[#1a2e28]/70">
                    {item.centre} • <strong>{item.commune}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-sora font-black text-2xl text-[#c25b3a]">
                      {item.quantiteRestante} unités
                    </span>
                    <span className="text-xs text-[#1a2e28]/60 block">
                      (Seuil d&apos;alerte : {item.seuilCritique})
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Demande de réapprovisionnement transmise à la CAMEG Bénin pour le centre ${item.centre}`)}
                    className="btn-ayidode bg-[#c25b3a] text-white text-xs px-3.5 h-[40px] btn-terracotta shrink-0"
                  >
                    Réapprovisionner CAMEG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protection des données APDP */}
        <div className="p-4 rounded-2xl bg-white border border-black/10 flex items-center justify-between gap-4 text-xs text-[#1a2e28]/70 font-atkinson">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007048]" />
            <span>
              Données de supervision strictement anonymisées. Aucune donnée d&apos;identité citoyenne n&apos;est exposée aux analystes conformément au Code du numérique.
            </span>
          </div>
          <span className="font-sora font-bold text-[#007048]">Agrément APDP n°2026-SANTE-089</span>
        </div>
      </div>
    </div>
  );
}
