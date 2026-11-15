import React from 'react';

interface CarteChiffreProps {
  valeur: string;
  label: string;
  description: string;
  filigrane: string;
}

export default function CarteChiffre({ valeur, label, description, filigrane }: CarteChiffreProps) {
  return (
    <div className="card-ayidode p-8 transition-transform hover:-translate-y-1.5 duration-300">
      {/* Numéro filigrane */}
      <span className="absolute top-2 right-4 font-sora font-black text-6xl text-[#d4a574]/15 select-none pointer-events-none">
        {filigrane}
      </span>

      <div className="relative z-10 space-y-3">
        {/* Chiffre clé Sora 72px terracotta */}
        <div className="font-sora font-black text-5xl sm:text-6xl md:text-[72px] leading-none text-[#c25b3a] tracking-tight">
          {valeur}
        </div>

        {/* Label Fraunces */}
        <h3 className="font-fraunces font-bold text-2xl text-[#1a2e28]">
          {label}
        </h3>

        {/* Description Atkinson Hyperlegible */}
        <p className="font-atkinson text-lg md:text-xl text-[#1a2e28]/85 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
