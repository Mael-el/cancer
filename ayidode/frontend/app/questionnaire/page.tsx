import React from 'react';
import Questionnaire from '../../components/Questionnaire';

export default function QuestionnairePage() {
  return (
    <div className="section-spacing px-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 text-center mb-10">
        <span className="px-4 py-1.5 rounded-full bg-[#e6f7f0] text-[#007048] font-sora text-sm font-bold inline-block">
          Auto-évaluation Préventive • 5 minutes
        </span>
        <h1 className="font-fraunces font-black text-4xl md:text-5xl text-[#1a2e28]">
          Évaluez votre niveau d&apos;exposition et recevez vos recommandations
        </h1>
        <p className="font-atkinson text-xl md:text-2xl text-[#1a2e28]/85 max-w-2xl mx-auto">
          Ce test est 100% anonyme et conforme aux exigences de l&apos;APDP Bénin. Aucune donnée nominative n&apos;est transmise.
        </p>
      </div>

      <Questionnaire />
    </div>
  );
}
