'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Wifi,
  WifiOff,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

interface PersonneSuivie {
  id: string;
  pseudonyme: string;
  age: number;
  commune: string;
  typeDepistage: string;
  statutRappel: 'confirme' | 'envoye' | 'non_repondu' | 'a_relancer';
  dateEcheance: string;
  priorite: 'haute' | 'normale';
}

const PERSONNES_INITIALES: PersonneSuivie[] = [
  {
    id: 'p1',
    pseudonyme: 'Patiente #842 (M. D.)',
    age: 34,
    commune: 'Cotonou (Ménontin)',
    typeDepistage: 'Dépistage IVA Col de l’Utérus',
    statutRappel: 'a_relancer',
    dateEcheance: '22 Septembre 2026',
    priorite: 'haute'
  },
  {
    id: 'p2',
    pseudonyme: 'Mère de famille #619 (A. K.)',
    age: 41,
    commune: 'Abomey-Calavi (Akassato)',
    typeDepistage: 'Vaccin VPH Fille (2ème dose)',
    statutRappel: 'envoye',
    dateEcheance: '28 Septembre 2026',
    priorite: 'normale'
  },
  {
    id: 'p3',
    pseudonyme: 'Patient #305 (T. S.)',
    age: 52,
    commune: 'Porto-Novo (Djassin)',
    typeDepistage: 'Contrôle PSA Prostate & Conseils foie',
    statutRappel: 'a_relancer',
    dateEcheance: '20 Septembre 2026',
    priorite: 'haute'
  },
  {
    id: 'p4',
    pseudonyme: 'Patiente #112 (S. B.)',
    age: 29,
    commune: 'Cotonou (Fidjrossè)',
    typeDepistage: 'Dépistage IVA Col de l’Utérus',
    statutRappel: 'confirme',
    dateEcheance: '15 Octobre 2026',
    priorite: 'normale'
  }
];

export default function DashboardASC() {
  const [personnes, setPersonnes] = useState<PersonneSuivie[]>(PERSONNES_INITIALES);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [relanceEffectuee, setRelanceEffectuee] = useState<string | null>(null);

  const personnesFiltrees = personnes.filter((p) => {
    const matchNom = p.pseudonyme.toLowerCase().includes(recherche.toLowerCase()) ||
                     p.commune.toLowerCase().includes(recherche.toLowerCase());
    const matchStatut = filtreStatut === 'tous' || p.statutRappel === filtreStatut;
    return matchNom && matchStatut;
  });

  const declencherRelance = (id: string) => {
    setRelanceEffectuee(id);
    setPersonnes(prev => prev.map(item => item.id === id ? { ...item, statutRappel: 'envoye' } : item));
    setTimeout(() => setRelanceEffectuee(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Barre du haut */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="space-y-1">
            <Link
              href="/tableau-de-bord"
              className="inline-flex items-center gap-2 text-sm font-sora font-semibold text-[#007048] hover:underline mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à mon espace
            </Link>
            <h1 className="font-fraunces font-black text-3xl sm:text-4xl text-[#1a2e28]">
              Espace Agent de Santé Communautaire (ASC)
            </h1>
            <p className="font-atkinson text-lg text-[#1a2e28]/70">
              Suivi et relances des dépistages de votre communauté • Zone Sanitaire Cotonou / Calavi
            </p>
          </div>

          {/* Indicateur Mode Hors-ligne PWA */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-black/10 shadow-sm">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-sora text-xs font-bold transition-all ${
                isOnline
                  ? 'bg-[#e6f7f0] text-[#007048]'
                  : 'bg-[#faf3ee] text-[#c25b3a]'
              }`}
              title="Cliquez pour simuler le passage en mode hors-ligne"
            >
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-[#00a86b]" />
                  <span>En ligne (Synchronisé)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-[#c25b3a]" />
                  <span>Mode Hors-Ligne Actif (PWA Cache)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chiffres d'activité ASC */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card-ayidode p-6 bg-white border-t-4 border-[#007048] shadow-sm">
            <span className="font-sora text-xs uppercase font-bold text-[#007048]">Personnes Suivies</span>
            <div className="font-sora font-black text-4xl text-[#1a2e28] mt-2">
              {personnes.length}
            </div>
            <p className="font-atkinson text-sm text-[#1a2e28]/70 mt-1">Dans votre secteur d&apos;intervention</p>
          </div>

          <div className="card-ayidode p-6 bg-white border-t-4 border-[#c25b3a] shadow-sm">
            <span className="font-sora text-xs uppercase font-bold text-[#c25b3a]">Dépistages à Relancer</span>
            <div className="font-sora font-black text-4xl text-[#c25b3a] mt-2">
              {personnes.filter(p => p.statutRappel === 'a_relancer').length}
            </div>
            <p className="font-atkinson text-sm text-[#1a2e28]/70 mt-1">Échéance dépassée ou sans réponse</p>
          </div>

          <div className="card-ayidode p-6 bg-white border-t-4 border-[#00a86b] shadow-sm">
            <span className="font-sora text-xs uppercase font-bold text-[#00a86b]">Rendez-vous Confirmés</span>
            <div className="font-sora font-black text-4xl text-[#00a86b] mt-2">
              {personnes.filter(p => p.statutRappel === 'confirme').length}
            </div>
            <p className="font-atkinson text-sm text-[#1a2e28]/70 mt-1">Patientes reçues au centre</p>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="card-ayidode p-6 bg-white shadow-card flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Rechercher par identifiant ou commune..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#faf8f3] border border-black/10 font-sora text-sm text-[#1a2e28] focus:border-[#00a86b]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#007048]" />
            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className="h-12 px-4 rounded-xl bg-[#faf8f3] border border-black/10 font-sora text-sm text-[#1a2e28]"
            >
              <option value="tous">Tous les statuts</option>
              <option value="a_relancer">À relancer en priorité</option>
              <option value="envoye">Relance envoyée</option>
              <option value="confirme">Confirmé</option>
            </select>
          </div>
        </div>

        {/* Notification de relance réussie */}
        {relanceEffectuee && (
          <div className="p-4 rounded-xl bg-[#e6f7f0] border border-[#00a86b]/40 text-[#007048] font-sora text-sm font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5" />
            Relance SMS et WhatsApp transmise avec succès à la personne suivie.
          </div>
        )}

        {/* Liste des personnes */}
        <div className="space-y-4">
          <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
            Dossiers de Suivi Communautaire ({personnesFiltrees.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {personnesFiltrees.map((p) => (
              <div
                key={p.id}
                className="card-ayidode p-6 bg-white shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-8"
                style={{
                  borderLeftColor:
                    p.statutRappel === 'a_relancer'
                      ? '#c25b3a'
                      : p.statutRappel === 'confirme'
                      ? '#00a86b'
                      : '#d4a574'
                }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-fraunces font-bold text-xl text-[#1a2e28]">
                      {p.pseudonyme}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faf8f3] text-[#1a2e28]/70 font-sora font-semibold">
                      {p.age} ans • {p.commune}
                    </span>
                    {p.priorite === 'haute' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#faf3ee] text-[#c25b3a] font-sora font-bold">
                        Priorité Haute
                      </span>
                    )}
                  </div>
                  <p className="font-atkinson text-base text-[#007048] font-bold">
                    {p.typeDepistage}
                  </p>
                  <p className="font-atkinson text-sm text-[#1a2e28]/70">
                    Échéance prévue : {p.dateEcheance}
                  </p>
                </div>

                {/* Statut & Action */}
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs uppercase tracking-wider font-sora font-bold text-[#1a2e28]/60 block">
                      Statut du Rappel
                    </span>
                    <span
                      className={`font-sora font-bold text-sm ${
                        p.statutRappel === 'a_relancer'
                          ? 'text-[#c25b3a]'
                          : p.statutRappel === 'confirme'
                          ? 'text-[#00a86b]'
                          : 'text-[#d4a574]'
                      }`}
                    >
                      {p.statutRappel === 'a_relancer'
                        ? '⚠️ À relancer'
                        : p.statutRappel === 'confirme'
                        ? '✓ Dépistage effectué'
                        : '✉️ Message envoyé'}
                    </span>
                  </div>

                  {p.statutRappel === 'a_relancer' ? (
                    <button
                      onClick={() => declencherRelance(p.id)}
                      className="btn-ayidode bg-[#c25b3a] text-white text-sm px-4 h-[44px] btn-terracotta"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Relancer SMS / WhatsApp</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => declencherRelance(p.id)}
                      className="btn-ayidode bg-[#faf8f3] border border-black/10 text-sm px-4 h-[44px] text-[#1a2e28]"
                    >
                      <span>Renouveler message</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rappel déontologie & APDP */}
        <div className="p-4 rounded-2xl bg-white border border-black/10 flex items-center gap-3 text-xs text-[#1a2e28]/70 font-atkinson">
          <ShieldCheck className="w-5 h-5 text-[#007048] shrink-0" />
          <span>
            Les données personnelles sont masquées conformément aux directives de l&apos;APDP Bénin. L&apos;ASC dispose d&apos;un accès réservé aux identifiants opérationnels de suivi médical uniquement.
          </span>
        </div>
      </div>
    </div>
  );
}
