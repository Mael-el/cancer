'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [periode, setPeriode] = useState('mensuel');
  const [zone, setZone] = useState('national');

  const stats = [
    { label: 'Citoyennes & Citoyens Inscrits', valeur: '24 850', progression: '+18%' },
    { label: 'Utilisateurs Actifs (7j)', valeur: '6 420', progression: '+24%' },
    { label: 'Questionnaires Complétés', valeur: '14 310', progression: '+31%' },
    { label: 'Dépistages IVA Déclarés', valeur: '5 120', progression: '+42%' },
    { label: 'Vaccinations VPH Filles 9-14 ans', valeur: '4 890', progression: '+15%' }
  ];

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Zone,Periode,Inscrits,Actifs_7j,Questionnaires,Depistages,Vaccinations_VPH\n" +
      "National,2026-T3,24850,6420,14310,5120,4890\n" +
      "Littoral (Cotonou),2026-T3,9200,2800,5400,2100,1950\n" +
      "Atlantique (Calavi),2026-T3,8100,2100,4600,1650,1720\n" +
      "Borgou (Parakou),2026-T3,4250,950,2400,810,780\n" +
      "Ouémé (Porto-Novo),2026-T3,3300,570,1910,560,440";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rapport_ayidode_bailleurs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="section-spacing px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#c25b3a]/15 text-[#c25b3a] font-sora text-sm font-bold inline-block">
              Supervision Nationale & Partenaires Bailleurs
            </span>
            <h1 className="font-fraunces font-black text-4xl md:text-5xl text-[#1a2e28]">
              Indicateurs de Santé Publique Bénin
            </h1>
            <p className="font-atkinson text-xl text-[#1a2e28]/85">
              Agrégation anonymisée en temps réel • Zéro donnée nominative stockée • APDP conforme
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="btn-ayidode bg-[#007048] text-white text-lg h-[54px] self-start md:self-auto"
          >
            📥 Exporter Rapport Bailleurs (CSV)
          </button>
        </div>

        {/* Filtres de période et zone */}
        <div className="card-ayidode p-6 bg-white flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block font-sora text-sm font-bold text-[#1a2e28] mb-1">
              Zone géographique :
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full min-h-[50px] px-4 rounded-[14px] bg-[#faf8f3] border border-[#007048]/25 font-sora text-base text-[#1a2e28]"
            >
              <option value="national">Ensemble du Bénin (National)</option>
              <option value="littoral">Littoral (Cotonou)</option>
              <option value="atlantique">Atlantique (Abomey-Calavi)</option>
              <option value="oueme">Ouémé (Porto-Novo)</option>
              <option value="borgou">Borgou (Parakou)</option>
              <option value="zou">Zou (Bohicon/Abomey)</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block font-sora text-sm font-bold text-[#1a2e28] mb-1">
              Période d&apos;analyse :
            </label>
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="w-full min-h-[50px] px-4 rounded-[14px] bg-[#faf8f3] border border-[#007048]/25 font-sora text-base text-[#1a2e28]"
            >
              <option value="hebdo">Derniers 7 jours</option>
              <option value="mensuel">Mois en cours</option>
              <option value="trimestre">Trimestre (Bailleurs)</option>
              <option value="annuel">Année 2026</option>
            </select>
          </div>
        </div>

        {/* Cartes d'indicateurs agrégés */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="card-ayidode p-6 bg-white border-t-4 border-[#007048] space-y-3"
            >
              <span className="font-sora text-xs font-bold text-[#00a86b] uppercase">
                {s.progression} ce mois
              </span>
              <div className="font-sora font-black text-3xl text-[#c25b3a]">
                {s.valeur}
              </div>
              <h3 className="font-atkinson text-base font-bold text-[#1a2e28] leading-snug">
                {s.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Tableau récapitulatif départemental */}
        <div className="card-ayidode p-8 bg-white border-t-4 border-[#007048] space-y-6">
          <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
            Répartition par Pôle Sanitaire Départemental
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-atkinson text-lg">
              <thead>
                <tr className="border-b-2 border-[#007048]/20 font-sora text-sm font-bold text-[#007048]">
                  <th className="py-3 px-4">Département</th>
                  <th className="py-3 px-4">Inscrits Rappels</th>
                  <th className="py-3 px-4">Tests Complétés</th>
                  <th className="py-3 px-4">Dépistages IVA</th>
                  <th className="py-3 px-4">Vaccins VPH</th>
                  <th className="py-3 px-4">Taux de Suivi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#007048]/10">
                <tr>
                  <td className="py-4 px-4 font-bold">Littoral (Cotonou)</td>
                  <td className="py-4 px-4">9 200</td>
                  <td className="py-4 px-4">5 400</td>
                  <td className="py-4 px-4 text-[#00a86b] font-bold">2 100</td>
                  <td className="py-4 px-4">1 950</td>
                  <td className="py-4 px-4 font-sora font-bold text-[#007048]">78%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Atlantique (Calavi, Ouidah)</td>
                  <td className="py-4 px-4">8 100</td>
                  <td className="py-4 px-4">4 600</td>
                  <td className="py-4 px-4 text-[#00a86b] font-bold">1 650</td>
                  <td className="py-4 px-4">1 720</td>
                  <td className="py-4 px-4 font-sora font-bold text-[#007048]">74%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Borgou (Parakou)</td>
                  <td className="py-4 px-4">4 250</td>
                  <td className="py-4 px-4">2 400</td>
                  <td className="py-4 px-4 text-[#00a86b] font-bold">810</td>
                  <td className="py-4 px-4">780</td>
                  <td className="py-4 px-4 font-sora font-bold text-[#007048]">69%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Ouémé (Porto-Novo)</td>
                  <td className="py-4 px-4">3 300</td>
                  <td className="py-4 px-4">1 910</td>
                  <td className="py-4 px-4 text-[#00a86b] font-bold">560</td>
                  <td className="py-4 px-4">440</td>
                  <td className="py-4 px-4 font-sora font-bold text-[#007048]">71%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
