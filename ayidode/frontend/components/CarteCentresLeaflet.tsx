'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CentreSante } from '../lib/centresData';

interface CarteCentresLeafletProps {
  centres: CentreSante[];
  centreSelectionne?: CentreSante | null;
  onSelectCentre: (centre: CentreSante) => void;
}

export default function CarteCentresLeaflet({
  centres,
  centreSelectionne,
  onSelectCentre
}: CarteCentresLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMap.current) {
      // Centre sur le Bénin (autour de Cotonou / Littoral / Atlantique)
      const map = L.map(mapRef.current).setView([6.45, 2.35], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributeurs • Ayidodé+ Bénin',
        maxZoom: 18
      }).addTo(map);

      leafletMap.current = map;
    }

    const map = leafletMap.current;

    // Supprimer anciens marqueurs
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Créer icône personnalisée Ayidodé+
    const createCustomIcon = (gratuit: boolean) => {
      return L.divIcon({
        className: 'custom-ayidode-pin',
        html: `
          <div style="
            background-color: ${gratuit ? '#007048' : '#c25b3a'};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          ">
            <span style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 14px;">+</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
    };

    // Ajouter nouveaux marqueurs
    centres.forEach((c) => {
      const marker = L.marker([c.lat, c.lng], { icon: createCustomIcon(c.gratuit) })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; max-width: 240px; padding: 4px;">
            <div style="font-size: 11px; font-weight: bold; color: #007048; text-transform: uppercase;">
              ${c.commune} (${c.departement})
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #1a2e28; margin: 4px 0;">
              ${c.nom}
            </div>
            <div style="font-size: 12px; color: #555; margin-bottom: 6px;">
              ${c.adresse}
            </div>
            <div style="font-size: 12px; font-weight: bold; color: ${c.gratuit ? '#00a86b' : '#c25b3a'}; margin-bottom: 8px;">
              ${c.gratuit ? '✓ Dépistage Gratuit PNLMNT' : 'Tarifs conventionnés'}
            </div>
            <a href="tel:${c.contact}" style="
              display: block;
              background-color: #007048;
              color: white;
              text-align: center;
              padding: 6px 10px;
              border-radius: 8px;
              font-size: 12px;
              font-weight: bold;
              text-decoration: none;
            ">
              📞 Appeler (${c.contact})
            </a>
          </div>
        `);

      marker.on('click', () => {
        onSelectCentre(c);
      });

      markersRef.current.push(marker);
    });

    if (centres.length > 0 && !centreSelectionne) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [centres, onSelectCentre]);

  // Si un centre est sélectionné spécifiquement, zoomer dessus
  useEffect(() => {
    if (centreSelectionne && leafletMap.current) {
      leafletMap.current.setView([centreSelectionne.lat, centreSelectionne.lng], 13, {
        animate: true
      });
    }
  }, [centreSelectionne]);

  return (
    <div className="w-full h-[450px] md:h-[550px] rounded-[28px_28px_6px_28px] overflow-hidden border-2 border-[#007048]/20 shadow-inner relative z-10">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
