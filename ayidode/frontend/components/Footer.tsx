import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2e28] text-[#faf8f3] pt-16 pb-12 px-6 border-t-4 border-[#007048]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Colonne 1 : Identité & Mission */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px_14px_4px_14px] bg-[#00a86b] text-white font-fraunces text-xl font-bold flex items-center justify-center">
              A+
            </div>
            <span className="font-fraunces text-2xl font-bold">Ayidodé+</span>
          </div>

          <p className="font-fraunces italic text-xl text-[#d4a574]">
            &quot;Le cancer n&apos;est pas une fatalité. Dépister tôt, c&apos;est protéger ceux qu&apos;on aime.&quot;
          </p>

          <p className="font-atkinson text-base text-[#faf8f3]/80 leading-relaxed">
            Plateforme béninoise d&apos;orientation, d&apos;éducation et de rappels personnalisés pour la prévention des cancers du col de l&apos;utérus, du sein, du foie, de la prostate et colorectal.
          </p>

          {/* Numéro Vert Clickable */}
          <a
            href="tel:136"
            className="block p-4 rounded-[16px_16px_4px_16px] bg-white/5 border border-white/10 hover:bg-[#007048]/40 transition-colors space-y-1"
          >
            <span className="font-sora text-xs uppercase tracking-wider font-bold text-[#d4a574] flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              Ligne d&apos;Écoute & Orientation Directe
            </span>
            <p className="font-sora text-xl font-black text-white">
              Numéro Vert Gratuit : <span className="text-[#00a86b]">136</span>
            </p>
          </a>
        </div>

        {/* Colonne 2 : Liens Rapides */}
        <div className="md:col-span-3 space-y-3 font-sora text-base">
          <h4 className="font-fraunces text-xl font-bold text-[#d4a574]">Navigation</h4>
          <ul className="space-y-2 text-[#faf8f3]/80">
            <li><Link href="/" className="hover:text-[#00a86b] transition-colors">Accueil</Link></li>
            <li><Link href="/cancers" className="hover:text-[#00a86b] transition-colors">Les 5 Cancers (Fiches & Audio)</Link></li>
            <li><Link href="/alimentation" className="hover:text-[#00a86b] transition-colors">Prévention & Marché (500 à 2 000 F)</Link></li>
            <li><Link href="/questionnaire" className="hover:text-[#00a86b] transition-colors">Test de Risque (5 questions)</Link></li>
            <li><Link href="/centres" className="hover:text-[#00a86b] transition-colors">Carte des Centres de Dépistage</Link></li>
            <li><Link href="/infirmier" className="text-[#c25b3a] hover:underline font-bold transition-colors">Parler à un Infirmier</Link></li>
            <li><Link href="/tableau-de-bord" className="hover:text-[#00a86b] transition-colors">Mon Espace Patient</Link></li>
            <li><Link href="/tableau-de-bord/asc" className="hover:text-[#00a86b] transition-colors">Espace Agent de Santé (ASC)</Link></li>
            <li><Link href="/tableau-de-bord/admin" className="hover:text-[#00a86b] transition-colors">Supervision Nationale Admin</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Engagement APDP Bénin */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="font-fraunces text-xl font-bold text-[#d4a574]">
            Conformité APDP Bénin (Loi 2017-20)
          </h4>
          <ul className="font-atkinson text-base text-[#faf8f3]/80 space-y-2">
            <li>✓ <strong>Chiffrement fort AES-256 :</strong> Téléphones et prénoms chiffrés.</li>
            <li>✓ <strong>Zéro stockage de messages :</strong> Messages hachés en SHA-256 immédiatement.</li>
            <li>✓ <strong>Droit à l&apos;effacement :</strong> Suppression intégrale des données sur simple demande sous 7 jours.</li>
            <li>✓ <strong>Audio natif Fɔngbe :</strong> Capsules certifiées respectant les tons sans voix artificielle.</li>
            <li>✓ <strong>Déontologie soignante :</strong> Zéro diagnostic virtuel, écoute et orientation physique uniquement.</li>
          </ul>
          <div className="pt-2 text-xs font-sora text-[#d4a574]">
            Partenaires scientifiques : Programme National de Lutte contre les Maladies Non Transmissibles (PNLMNT) • CNHU-HKM • OMS Bénin
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-sm text-[#faf8f3]/60 font-sora gap-4">
        <p>© {new Date().getFullYear()} Ayidodé+ Bénin. Tous droits réservés.</p>
        <p className="font-fraunces italic text-[#d4a574]">
          &quot;La prévention est un droit, pas un luxe.&quot;
        </p>
      </div>
    </footer>
  );
}
