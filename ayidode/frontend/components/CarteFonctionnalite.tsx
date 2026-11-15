import React from 'react';

interface CarteFonctionnaliteProps {
  numero: string;
  titre: string;
  description: string;
  lienTexte?: string;
  lienUrl?: string;
  badge?: string;
}

export default function CarteFonctionnalite({
  numero,
  titre,
  description,
  lienTexte,
  lienUrl,
  badge
}: CarteFonctionnaliteProps) {
  return (
    <div className="card-ayidode p-8 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Numéro filigrane */}
      <span className="absolute top-2 right-4 font-sora font-black text-6xl text-[#007048]/10 select-none pointer-events-none">
        {numero}
      </span>

      <div className="relative z-10 space-y-4">
        {badge && (
          <span className="inline-block px-3 py-1 bg-[#e6f7f0] text-[#007048] font-sora font-bold text-sm rounded-md">
            {badge}
          </span>
        )}

        <h3 className="font-fraunces font-bold text-2xl text-[#1a2e28] leading-snug">
          {titre}
        </h3>

        <p className="font-atkinson text-lg md:text-xl text-[#1a2e28]/85 leading-relaxed">
          {description}
        </p>

        {lienTexte && lienUrl && (
          <div className="pt-2">
            <a
              href={lienUrl}
              className="inline-flex items-center gap-2 font-sora font-bold text-lg text-[#00a86b] hover:text-[#007048] underline decoration-2 underline-offset-4"
            >
              {lienTexte} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
