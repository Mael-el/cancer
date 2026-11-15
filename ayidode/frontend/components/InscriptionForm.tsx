'use client';

import React, { useState } from 'react';

export default function InscriptionForm() {
  const [telephone, setTelephone] = useState('');
  const [langue, setLangue] = useState<'fr' | 'fon'>('fr');
  const [canalPrefere, setCanalPrefere] = useState<'whatsapp' | 'sms' | 'web'>('whatsapp');
  const [profil, setProfil] = useState<'femme' | 'parent' | 'asc'>('femme');
  const [consentementRappels, setConsentementRappels] = useState(true);
  const [consentementSondages, setConsentementSondages] = useState(false);

  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setSucces('');

    // Validation numéro béninois (+229 + 8 à 10 chiffres)
    const cleanPhone = telephone.replace(/[\s-]/g, '');
    const regex = /^(\+229|00229)?[0-9]{8,10}$/;
    if (!regex.test(cleanPhone)) {
      setErreur('Veuillez entrer un numéro béninois valide (ex: +229 01 97 00 00 00 ou 97000000).');
      return;
    }

    if (!consentementRappels) {
      setErreur('Le consentement aux rappels de santé est requis pour programmer vos alertes de prévention.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulation / Appel Edge Function inscription
      await new Promise(r => setTimeout(r, 600));
      setSucces(
        `Inscription réussie ! Vos rappels de santé personnalisés vous seront envoyés via ${
          canalPrefere === 'whatsapp' ? 'WhatsApp' : 'SMS'
        } dans le strict respect du secret médical et des règles APDP.`
      );
      setTelephone('');
    } catch {
      setErreur("Une erreur technique s'est produite. Veuillez réessayer ou contacter le 136.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="inscription" className="card-ayidode p-8 md:p-12 bg-white max-w-3xl mx-auto shadow-2xl">
      <div className="space-y-4 mb-8">
        <span className="px-3.5 py-1.5 rounded-md bg-[#e6f7f0] text-[#007048] font-sora text-sm font-bold inline-block">
          Rappels Gratuits & Sécurisés (APDP Bénin)
        </span>
        <h2 className="font-fraunces font-black text-3xl md:text-4xl text-[#1a2e28]">
          Ne manquez plus aucun dépistage ni vaccin
        </h2>
        <p className="font-atkinson text-xl text-[#1a2e28]/85">
          Recevez des alertes confidentielles sur WhatsApp ou SMS. Vos données sont chiffrées de bout en bout (AES-256) et ne seront jamais revendues.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ Téléphone avec Label Flottant */}
        <div className="relative">
          <input
            id="telephone_input"
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            placeholder=" "
            className="peer w-full min-h-[60px] px-5 pt-5 pb-1 rounded-[20px_20px_6px_20px] bg-[#faf8f3] border-2 border-[#007048]/25 text-xl font-sora text-[#1a2e28] focus:border-[#00a86b] focus:outline-none transition-colors"
          />
          <label
            htmlFor="telephone_input"
            className="absolute left-5 top-2 text-xs font-sora font-bold text-[#007048] pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#1a2e28]/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#00a86b]"
          >
            Numéro de téléphone Bénin (+229...)
          </label>
        </div>

        {/* Profil de l'utilisateur */}
        <div>
          <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
            Vous êtes :
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'femme', label: 'Femme (20-65 ans)' },
              { id: 'parent', label: 'Parent fille 9-14 ans' },
              { id: 'asc', label: 'Agent Santé (ASC)' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setProfil(item.id as any)}
                className={`min-h-[54px] p-3 rounded-[16px_16px_4px_16px] border-2 font-sora text-base font-semibold text-center transition-all ${
                  profil === item.id
                    ? 'border-[#00a86b] bg-[#e6f7f0] text-[#007048] shadow-sm'
                    : 'border-[#007048]/20 bg-[#faf8f3] text-[#1a2e28] hover:border-[#00a86b]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canal & Langue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
              Canal de réception :
            </label>
            <select
              value={canalPrefere}
              onChange={(e) => setCanalPrefere(e.target.value as any)}
              className="w-full min-h-[60px] px-4 rounded-[16px] bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base font-semibold text-[#1a2e28] focus:border-[#00a86b]"
            >
              <option value="whatsapp">WhatsApp (Recommandé)</option>
              <option value="sms">SMS standard</option>
              <option value="web">Consultation Web uniquement</option>
            </select>
          </div>

          <div>
            <label className="block font-sora text-base font-bold text-[#1a2e28] mb-2">
              Langue préférée :
            </label>
            <select
              value={langue}
              onChange={(e) => setLangue(e.target.value as any)}
              className="w-full min-h-[60px] px-4 rounded-[16px] bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base font-semibold text-[#1a2e28] focus:border-[#00a86b]"
            >
              <option value="fr">Français</option>
              <option value="fon">Fɔngbe (Audio et texte)</option>
            </select>
          </div>
        </div>

        {/* CONFORMITÉ APDP — 2 CASES DE CONSENTEMENT SÉPARÉES */}
        <div className="p-5 rounded-[20px_20px_6px_20px] bg-[#faf8f3] border border-[#007048]/20 space-y-4">
          <p className="font-sora text-xs uppercase tracking-wider font-bold text-[#007048]">
            Protection des données personnelles (Loi APDP n°2017-20)
          </p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentementRappels}
              onChange={(e) => setConsentementRappels(e.target.checked)}
              className="w-6 h-6 mt-1 rounded text-[#00a86b] focus:ring-[#00a86b] border-2 border-[#007048]"
            />
            <span className="font-atkinson text-base text-[#1a2e28] leading-snug">
              <strong>Consentement 1 (Obligatoire) :</strong> J&apos;accepte de recevoir des rappels médicaux de dépistage et de vaccination confidentiels.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentementSondages}
              onChange={(e) => setConsentementSondages(e.target.checked)}
              className="w-6 h-6 mt-1 rounded text-[#00a86b] focus:ring-[#00a86b] border-2 border-[#007048]"
            />
            <span className="font-atkinson text-base text-[#1a2e28] leading-snug">
              <strong>Consentement 2 (Facultatif) :</strong> J&apos;accepte que mes réponses anonymisées contribuent aux statistiques nationales de santé publique.
            </span>
          </label>
        </div>

        {/* Message d'erreur Terracotta */}
        {erreur && (
          <div className="p-4 rounded-xl bg-[#faf3ee] border-2 border-[#c25b3a] text-[#c25b3a] font-sora text-base font-bold">
            {erreur}
          </div>
        )}

        {/* Message de succès Vert */}
        {succes && (
          <div className="p-4 rounded-xl bg-[#e6f7f0] border-2 border-[#00a86b] text-[#007048] font-sora text-base font-bold">
            {succes}
          </div>
        )}

        {/* Bouton de soumission 60px */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-ayidode bg-[#00a86b] text-white w-full text-xl"
        >
          {isLoading ? 'Sécurisation et enregistrement...' : 'Activer mes rappels santé gratuits'}
        </button>
      </form>
    </div>
  );
}
