'use client';

import React, { useState } from 'react';

export default function AscPage() {
  const [telephone, setTelephone] = useState('');
  const [commune, setCommune] = useState('Abomey-Calavi');
  const [actionSante, setActionSante] = useState('depistage_col');
  const [succes, setSucces] = useState('');

  const handleEnregistrer = (e: React.FormEvent) => {
    e.preventDefault();
    setSucces(`Femme enregistrée avec succès dans la zone ${commune}. Rappel automatique programmé.`);
    setTelephone('');
  };

  return (
    <div className="section-spacing px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#007048] text-white font-sora text-sm font-bold inline-block">
            Console Agents de Santé Communautaires (ASC)
          </span>
          <h1 className="font-fraunces font-black text-4xl md:text-5xl text-[#1a2e28]">
            Enrôlement & Sensibilisation Porte-à-Porte
          </h1>
          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85">
            Module de terrain optimisé pour les visites domiciliaires au Bénin. Permet d&apos;inscrire des citoyennes sans qu&apos;elles n&apos;aient besoin d&apos;un smartphone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulaire d'enrôlement rapide */}
          <div className="lg:col-span-7">
            <div className="card-ayidode p-8 bg-white border-t-4 border-[#007048] space-y-6">
              <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                Nouvelle Sensibilisation & Programmation
              </h2>

              {succes && (
                <div className="p-4 rounded-xl bg-[#e6f7f0] border-2 border-[#00a86b] text-[#007048] font-sora font-bold text-base">
                  {succes}
                </div>
              )}

              <form onSubmit={handleEnregistrer} className="space-y-5">
                <div>
                  <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
                    Numéro de téléphone de la bénéficiaire :
                  </label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="+229 01 XX XX XX XX"
                    className="w-full min-h-[58px] px-5 rounded-[16px] bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-xl text-[#1a2e28] focus:border-[#00a86b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
                      Commune d&apos;intervention :
                    </label>
                    <select
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full min-h-[56px] px-4 rounded-[16px] bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base text-[#1a2e28]"
                    >
                      <option value="Abomey-Calavi">Abomey-Calavi</option>
                      <option value="Cotonou">Cotonou</option>
                      <option value="Porto-Novo">Porto-Novo</option>
                      <option value="Parakou">Parakou</option>
                      <option value="Bohicon">Bohicon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
                      Action de santé convenue :
                    </label>
                    <select
                      value={actionSante}
                      onChange={(e) => setActionSante(e.target.value)}
                      className="w-full min-h-[56px] px-4 rounded-[16px] bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base text-[#1a2e28]"
                    >
                      <option value="depistage_col">Dépistage Col Utérus (IVA)</option>
                      <option value="vaccin_vph">Vaccination Fille (9-14 ans)</option>
                      <option value="nutrition_aflatoxines">Conseil Nutrition Aflatoxines</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#e6f7f0] border border-[#00a86b]/30 text-sm font-atkinson text-[#007048]">
                  En enregistrant, vous attestez avoir recueilli le consentement oral éclairé de la patiente conformément aux règles de santé publique.
                </div>

                <button
                  type="submit"
                  className="btn-ayidode bg-[#00a86b] text-white w-full text-xl"
                >
                  Enregistrer & Déclencher les rappels
                </button>
              </form>
            </div>
          </div>

          {/* Statistiques ASC en temps réel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-ayidode p-8 bg-white border-t-4 border-[#c25b3a] space-y-6">
              <span className="px-3 py-1 bg-[#c25b3a]/15 text-[#c25b3a] font-sora text-sm font-bold rounded-md inline-block">
                Mon Impact Mensuel
              </span>
              <h2 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
                Bilan d&apos;Activités de l&apos;ASC
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-[16px_16px_4px_16px] bg-[#faf8f3] flex justify-between items-center">
                  <span className="font-atkinson text-lg">Ménages sensibilisés :</span>
                  <span className="font-sora font-black text-2xl text-[#007048]">142</span>
                </div>
                <div className="p-4 rounded-[16px_16px_4px_16px] bg-[#faf8f3] flex justify-between items-center">
                  <span className="font-atkinson text-lg">Dépistages confirmés :</span>
                  <span className="font-sora font-black text-2xl text-[#00a86b]">68</span>
                </div>
                <div className="p-4 rounded-[16px_16px_4px_16px] bg-[#faf8f3] flex justify-between items-center">
                  <span className="font-atkinson text-lg">Vaccins VPH administrés :</span>
                  <span className="font-sora font-black text-2xl text-[#c25b3a]">54</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f3] border border-[#007048]/15 text-sm font-atkinson text-[#1a2e28]/80">
                Synchronisation hors-ligne active : toutes vos saisies sans réseau seront automatiquement transmises dès le rétablissement de la connexion.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
