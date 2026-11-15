'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CENTRES_BENIN_LISTE, CentreSante } from '../../lib/centresData';
import { BoutonAudio } from '../../components/BoutonAudio';
import { BoutonInfirmier } from '../../components/BoutonInfirmier';
import {
  MapPin,
  PhoneCall,
  Navigation,
  Clock,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Building2,
  HeartHandshake
} from 'lucide-react';

// Import dynamique de la carte Leaflet côté client
const CarteCentresLeaflet = dynamic(
  () => import('../../components/CarteCentresLeaflet'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-[28px_28px_6px_28px] bg-[#e6f7f0]/50 flex flex-col items-center justify-center text-[#007048] font-sora font-semibold animate-pulse">
        <MapPin className="w-10 h-10 mb-2 animate-bounce" />
        Chargement de la carte interactive du Bénin...
      </div>
    )
  }
);

export default function CentresPage() {
  const [departementFiltre, setDepartementFiltre] = useState<string>('tous');
  const [typeFiltre, setTypeFiltre] = useState<string>('tous');
  const [gratuitSeulement, setGratuitSeulement] = useState<boolean>(false);
  const [centreSelectionne, setCentreSelectionne] = useState<CentreSante | null>(null);

  const centresFiltres = CENTRES_BENIN_LISTE.filter((c) => {
    const matchDep = departementFiltre === 'tous' || c.departement === departementFiltre;
    const matchType = typeFiltre === 'tous' || c.type === typeFiltre;
    const matchGratuit = !gratuitSeulement || c.gratuit;
    return matchDep && matchType && matchGratuit;
  });

  return (
    <div className="min-h-screen bg-[#faf8f3] py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* En-tête aéré avec phrase d'espoir */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f7f0] border border-[#00a86b]/30 text-[#007048] font-sora text-sm font-bold">
            <MapPin className="w-4 h-4" />
            Cartographie Nationale Sanitaire
          </div>

          <h1 className="font-fraunces font-black text-4xl sm:text-5xl lg:text-hero text-[#1a2e28] leading-tight">
            Centres de Dépistage au Bénin
          </h1>

          <p className="font-fraunces italic text-2xl md:text-3xl text-[#007048] font-bold">
            &quot;Le dépistage est proche de chez vous. Faire un pas vers un centre, c&apos;est protéger sa vie.&quot;
          </p>

          <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85 leading-relaxed">
            Consultez les hôpitaux de zone, maternités et dispensaires publics pratiquant l&apos;inspection visuelle (IVA) gratuite du col, le vaccin VPH et le suivi de santé.
          </p>

          <div className="pt-2 flex justify-center">
            <BoutonAudio
              texte="Trouvez facilement le centre de santé ou la maternité publique la plus proche de chez vous à Cotonou, Calavi, Porto-Novo, Parakou ou dans les autres départements du Bénin."
              audioUrlFon="/audio/capsules/prevention_fon.mp3"
              titre="Écouter les explications en Fɔngbe"
            />
          </div>
        </div>

        {/* SECTION FILTRES */}
        <div className="card-ayidode p-6 md:p-8 bg-white shadow-card border-t-4 border-[#007048] space-y-6">
          <div className="flex items-center gap-2 font-fraunces font-bold text-2xl text-[#1a2e28]">
            <Filter className="w-6 h-6 text-[#007048]" />
            Filtrer les structures de santé
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filtre Département */}
            <div className="space-y-2">
              <label className="block font-sora font-bold text-sm text-[#1a2e28]">
                Département :
              </label>
              <select
                value={departementFiltre}
                onChange={(e) => setDepartementFiltre(e.target.value)}
                className="w-full h-14 px-4 rounded-2xl bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base text-[#1a2e28] focus:border-[#00a86b]"
              >
                <option value="tous">Tous les départements ({CENTRES_BENIN_LISTE.length})</option>
                <option value="Littoral">Littoral (Cotonou)</option>
                <option value="Atlantique">Atlantique (Abomey-Calavi)</option>
                <option value="Ouémé">Ouémé (Porto-Novo)</option>
                <option value="Borgou">Borgou (Parakou)</option>
                <option value="Zou">Zou (Bohicon)</option>
              </select>
            </div>

            {/* Filtre Type de centre */}
            <div className="space-y-2">
              <label className="block font-sora font-bold text-sm text-[#1a2e28]">
                Type d&apos;établissement :
              </label>
              <select
                value={typeFiltre}
                onChange={(e) => setTypeFiltre(e.target.value)}
                className="w-full h-14 px-4 rounded-2xl bg-[#faf8f3] border-2 border-[#007048]/25 font-sora text-base text-[#1a2e28] focus:border-[#00a86b]"
              >
                <option value="tous">Tous les types</option>
                <option value="hopital">Hôpital de zone / CHU</option>
                <option value="maternite">Maternité spécialisée</option>
                <option value="dispensaire">Centre de santé / Dispensaire</option>
                <option value="clinique">Clinique privée conventionnée</option>
              </select>
            </div>

            {/* Toggle Gratuité */}
            <div className="flex items-center space-x-3 pt-6 md:pt-8">
              <input
                type="checkbox"
                id="gratuit-check"
                checked={gratuitSeulement}
                onChange={(e) => setGratuitSeulement(e.target.checked)}
                className="w-6 h-6 rounded-lg accent-[#00a86b] cursor-pointer"
              />
              <label htmlFor="gratuit-check" className="font-sora font-bold text-base text-[#007048] cursor-pointer">
                Protocole 100% Gratuit PNLMNT uniquement
              </label>
            </div>
          </div>
        </div>

        {/* SECTION CARTE INTERACTIVE LEAFLET */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces font-bold text-2xl md:text-3xl text-[#1a2e28]">
              Carte Interactive des Centres ({centresFiltres.length} trouvés)
            </h2>
            <span className="text-xs font-sora font-bold text-[#007048] bg-[#e6f7f0] px-3 py-1 rounded-full">
              ● Vert: Protocole Gratuit • Ocre: Conventionné
            </span>
          </div>

          <CarteCentresLeaflet
            centres={centresFiltres}
            centreSelectionne={centreSelectionne}
            onSelectCentre={(c) => setCentreSelectionne(c)}
          />
        </div>

        {/* SECTION LISTE DÉTAILLÉE DES FICHES CENTRES */}
        <div className="space-y-6 pt-6">
          <h2 className="font-fraunces font-bold text-3xl text-[#1a2e28]">
            Fiches Détaillées des Établissements
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {centresFiltres.map((centre) => {
              const isSelected = centreSelectionne?.id === centre.id;
              return (
                <div
                  key={centre.id}
                  className={`card-ayidode p-8 bg-white border-t-8 transition-all space-y-6 ${
                    isSelected
                      ? 'border-[#00a86b] shadow-2xl ring-2 ring-[#00a86b]'
                      : 'border-[#007048] shadow-card hover:shadow-xl'
                  }`}
                >
                  {/* Badges statut */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-[#e6f7f0] text-[#007048] font-sora font-bold text-xs uppercase">
                        {centre.type}
                      </span>
                      <span className="font-sora font-bold text-sm text-[#1a2e28]/70">
                        {centre.commune} ({centre.departement})
                      </span>
                    </div>

                    {centre.gratuit ? (
                      <span className="px-3.5 py-1 rounded-full bg-[#e6f7f0] border border-[#00a86b]/40 text-[#007048] font-sora font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Gratuit PNLMNT
                      </span>
                    ) : (
                      <span className="px-3.5 py-1 rounded-full bg-[#faf3ee] border border-[#c25b3a]/30 text-[#c25b3a] font-sora font-bold text-xs">
                        Conventionné
                      </span>
                    )}
                  </div>

                  {/* Nom du centre */}
                  <h3 className="font-fraunces font-bold text-2xl md:text-3xl text-[#1a2e28] leading-tight">
                    {centre.nom}
                  </h3>

                  {/* Infos pratiques */}
                  <div className="space-y-3 font-atkinson text-lg text-[#1a2e28]/85">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-[#007048] shrink-0 mt-1" />
                      <span><strong>Adresse :</strong> {centre.adresse}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-[#007048] shrink-0 mt-1" />
                      <span><strong>Horaires :</strong> {centre.horaires}</span>
                    </p>
                    <p className="text-base text-[#007048] font-sora font-bold bg-[#e6f7f0]/60 p-3 rounded-xl">
                      {centre.tarifsInfo}
                    </p>
                    <p className="text-sm text-[#1a2e28]/70 italic">
                      <strong>Accessibilité :</strong> {centre.accessibilite}
                    </p>
                  </div>

                  {/* Services de dépistage proposés */}
                  <div className="space-y-2 pt-2 border-t border-black/5">
                    <span className="font-sora text-xs font-bold text-[#007048] uppercase tracking-wider block">
                      Dépistages & Services assurés :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {centre.services.map((srv, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#faf8f3] border border-black/10 rounded-lg font-sora text-xs font-semibold text-[#1a2e28]"
                        >
                          ✓ {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions : Appeler & Itinéraire Google Maps */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-black/5">
                    <a
                      href={`tel:${centre.contact.replace(/\s+/g, '')}`}
                      className="btn-ayidode bg-[#007048] text-white flex-1 text-center text-base h-[50px]"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Appeler ({centre.contact})</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ayidode bg-[#faf8f3] text-[#1a2e28] border-2 border-[#007048] flex-1 text-center text-base h-[50px]"
                    >
                      <Navigation className="w-4 h-4 text-[#007048]" />
                      <span>Itinéraire GPS</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Parler à un infirmier & Urgence */}
        <div className="card-ayidode p-8 md:p-12 bg-white border-t-8 border-[#c25b3a] shadow-card space-y-6 text-center">
          <h2 className="font-fraunces text-3xl font-bold text-[#1a2e28]">
            Vous hésitez sur le centre à choisir ?
          </h2>
          <p className="font-fraunces italic text-xl text-[#007048]">
            &quot;Vous n&apos;êtes pas seuls. La prévention est un droit, pas un luxe.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <BoutonInfirmier label="Demander conseil à un soignant" />
            <a href="tel:136" className="btn-ayidode bg-[#faf8f3] border-2 border-[#007048] text-[#007048]">
              <PhoneCall className="w-5 h-5" />
              Ligne verte Ministère : 136
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
