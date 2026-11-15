'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langue, setLangue] = useState<'fr' | 'fon'>('fr');

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f3]/95 backdrop-blur-md border-b border-[#007048]/15 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Ayidodé+ */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-[16px_16px_4px_16px] bg-[#007048] flex items-center justify-center text-white font-fraunces text-2xl font-black shadow-md group-hover:scale-105 transition-transform">
            A+
          </div>
          <div>
            <span className="font-fraunces text-2xl font-bold tracking-tight text-[#1a2e28] block leading-none">
              Ayidodé<span className="text-[#00a86b]">+</span>
            </span>
            <span className="font-sora text-xs font-semibold text-[#c25b3a] tracking-wider uppercase">
              Santé Publique Bénin
            </span>
          </div>
        </Link>

        {/* Navigation Bureau */}
        <nav className="hidden lg:flex items-center gap-6 font-sora text-[17px] font-semibold text-[#1a2e28]">
          <Link href="/" className="hover:text-[#00a86b] transition-colors py-1">Accueil</Link>
          <Link href="/cancers" className="hover:text-[#00a86b] transition-colors py-1">Les 5 Cancers</Link>
          <Link href="/alimentation" className="hover:text-[#00a86b] transition-colors py-1">Alimentation</Link>
          <Link href="/questionnaire" className="hover:text-[#00a86b] transition-colors py-1">Test de Risque</Link>
          <Link href="/centres" className="hover:text-[#00a86b] transition-colors py-1">Centres Bénin</Link>
          <Link href="/infirmier" className="text-[#c25b3a] hover:text-[#a94829] font-bold transition-colors py-1 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" />
            Infirmier
          </Link>
        </nav>

        {/* CTA Numéro Vert & Urgence */}
        <div className="hidden md:flex items-center gap-4">
          {/* Switch FR / FON */}
          <div className="flex bg-[#e6f7f0] border border-[#00a86b]/30 rounded-full p-1 text-xs font-sora font-bold">
            <button
              onClick={() => setLangue('fr')}
              className={`px-3 py-1 rounded-full transition-colors ${
                langue === 'fr' ? 'bg-[#007048] text-white' : 'text-[#1a2e28]/70 hover:text-[#1a2e28]'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLangue('fon')}
              className={`px-3 py-1 rounded-full transition-colors ${
                langue === 'fon' ? 'bg-[#c25b3a] text-white' : 'text-[#1a2e28]/70 hover:text-[#1a2e28]'
              }`}
            >
              FƆN
            </button>
          </div>

          <a
            href="tel:136"
            className="flex items-center gap-2 px-3.5 py-2 rounded-[14px_14px_4px_14px] bg-[#e6f7f0] border border-[#00a86b]/40 text-[#007048] font-sora text-xs font-bold hover:bg-[#00a86b] hover:text-white transition-all"
            title="Ligne verte gratuite du Ministère de la Santé du Bénin"
          >
            <span className="w-2 h-2 rounded-full bg-[#00a86b] animate-ping" />
            N° Vert: 136
          </a>

          <Link
            href="/#inscription"
            className="btn-ayidode bg-[#00a86b] text-white text-[16px] px-5 h-[48px]"
          >
            S&apos;inscrire
          </Link>
        </div>

        {/* Toggle Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-[12px] bg-[#e6f7f0] text-[#007048] p-2"
          aria-label="Ouvrir le menu"
        >
          <span className="w-6 h-0.5 bg-[#007048] transition-all" />
          <span className="w-6 h-0.5 bg-[#007048] transition-all" />
          <span className="w-4 h-0.5 bg-[#007048] transition-all self-start ml-1" />
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[#007048]/15 flex flex-col gap-3 font-sora text-lg animate-slideUp">
          <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Accueil</Link>
          <Link href="/cancers" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Les 5 Cancers</Link>
          <Link href="/alimentation" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Alimentation Préventive</Link>
          <Link href="/questionnaire" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Test de Risque</Link>
          <Link href="/centres" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Centres Bénin</Link>
          <Link href="/infirmier" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg bg-[#c25b3a]/10 text-[#c25b3a] font-bold">Parler à un Infirmier</Link>
          <Link href="/tableau-de-bord" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-[#e6f7f0]">Mon Espace Suivi</Link>
          <div className="flex gap-4 pt-2">
            <a href="tel:136" className="flex-1 py-3 text-center bg-[#e6f7f0] text-[#007048] font-bold rounded-xl text-sm">
              Appeler le 136
            </a>
            <Link href="/#inscription" onClick={() => setMobileOpen(false)} className="flex-1 py-3 text-center bg-[#00a86b] text-white font-bold rounded-xl text-sm">
              S&apos;inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
