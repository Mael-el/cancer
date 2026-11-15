'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, PhoneCall, HeartHandshake, Sparkles } from 'lucide-react';
import { BoutonAudio } from './BoutonAudio';
import { BoutonInfirmier } from './BoutonInfirmier';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  texte: string;
  categorie?: 'prevention' | 'orientation' | 'refus' | 'signe_suspect';
  horodatage: string;
  audioUrlFon?: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      texte: "Kú abɔ̀ (Bonjour) ! Je suis votre conseiller Ayidodé+. Posez-moi vos questions sur le dépistage gratuit au Bénin, le vaccin VPH des filles, la protection du foie ou l'alimentation saine. Vous n'êtes pas seuls.",
      categorie: 'prevention',
      horodatage: 'À l’instant',
      audioUrlFon: '/audio/capsules/prevention_fon.mp3'
    }
  ]);
  const [inputTexte, setInputTexte] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [langue, setLangue] = useState<'fr' | 'fon'>('fr');
  const [modeAudio, setModeAudio] = useState(false);
  const [rateLimitCount, setRateLimitCount] = useState(0);
  const [rateLimitError, setRateLimitError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Réinitialiser le compteur de requêtes toutes les 60 secondes (rate limit 10/min)
  useEffect(() => {
    const timer = setInterval(() => {
      setRateLimitCount(0);
      setRateLimitError('');
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const texte = inputTexte.trim();
    if (!texte || isLoading) return;

    if (rateLimitCount >= 10) {
      setRateLimitError('Limite atteinte (10 messages/minute). Merci de patienter quelques instants pour la sécurité du service.');
      return;
    }

    setRateLimitCount(prev => prev + 1);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      texte,
      horodatage: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputTexte('');
    setIsLoading(true);

    try {
      // Détection locale immédiate de signe suspect pour prioriser la sécurité
      const lower = texte.toLowerCase();
      const isSigneSuspect =
        lower.includes('boule') ||
        lower.includes('masse') ||
        lower.includes('saignement') ||
        lower.includes('sang') ||
        lower.includes('douleur') ||
        lower.includes('plaie') ||
        lower.includes('gonflement');

      // Appel à l'Edge Function Supabase chat
      const res = await fetch('/api/chat-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.texte })),
          session_id: 'session-' + (typeof window !== 'undefined' ? (window.sessionStorage.getItem('ayidode_sid') || 'anon') : 'anon'),
          langue,
          mode_audio: modeAudio
        })
      }).catch(() => null);

      let botReply = '';
      let botCat: 'prevention' | 'orientation' | 'refus' | 'signe_suspect' = 'prevention';
      let audioFon: string | undefined = undefined;

      if (res && res.ok) {
        const json = await res.json();
        botReply = json.reply;
        botCat = json.categorie || 'prevention';
        audioFon = json.audio_url;
      } else {
        // Moteur de secours éthique conforme aux règles PNLMNT / OMS Bénin
        if (isSigneSuspect) {
          botCat = 'signe_suspect';
          botReply =
            "Ces signes nécessitent un contrôle simple par un agent de santé. Ne vous inquiétez pas. Vous pouvez demander un appel infirmier gratuit ci-dessous ou vous rendre dans le centre public le plus proche (ex: CNHU-HKM, CHUD Ouémé). Le cancer n'est pas une fatalité : dépister tôt sauve la vie.";
          audioFon = '/audio/capsules/signe_suspect_fon.mp3';
        } else if (lower.includes('diagnostic') || lower.includes('ai-je') || lower.includes('est-ce un cancer')) {
          botCat = 'refus';
          botReply =
            "Je ne pose aucun diagnostic médical. Seul un médecin ou une sage-femme peut vous examiner. Rendez-vous au centre de dépistage le plus proche ou contactez la ligne verte 136.";
        } else if (lower.includes('aflatoxine') || lower.includes('foie') || lower.includes('nourriture') || lower.includes('arachide') || lower.includes('maïs')) {
          botCat = 'prevention';
          botReply =
            "Pour préserver le foie, triez rigoureusement vos arachides et le maïs au marché en jetant tout grain noirci. Préférez le niébé bien sec, les feuilles de gboma et l'afitin traditionnel. Chaque petit geste compte.";
          audioFon = '/audio/aliments/aflatoxines_fon.mp3';
        } else if (lower.includes('vph') || lower.includes('vaccin') || lower.includes('fille')) {
          botCat = 'prevention';
          botReply =
            "Au Bénin, la vaccination contre le VPH est 100% gratuite pour les jeunes filles de 9 à 14 ans dans tous les centres publics. Elle protège contre le cancer du col avant le début de la vie sexuelle.";
          audioFon = '/audio/cancers/col_uterus_fon.mp3';
        } else {
          botCat = 'prevention';
          botReply =
            "Le dépistage précoce du col et l'adoption d'aliments sains locaux sont nos meilleurs boucliers. Vous n'êtes pas seuls : notre équipe et nos soignants sont à vos côtés.";
          audioFon = '/audio/capsules/prevention_fon.mp3';
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          texte: botReply,
          categorie: botCat,
          horodatage: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          audioUrlFon: audioFon
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          texte: "Va au centre de dépistage le plus proche ou appelle le numéro vert 136 pour une assistance directe. La prévention est un droit, pas un luxe.",
          categorie: 'orientation',
          horodatage: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chat-section" className="card-ayidode p-6 md:p-8 bg-white max-w-4xl mx-auto shadow-2xl border-t-4 border-[#007048]">
      {/* En-tête du Chatbot */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#007048]/15">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-[20px_20px_6px_20px] bg-[#007048] flex items-center justify-center text-white font-fraunces text-2xl font-bold">
              Ay
            </div>
            {/* Animation pulse 2s infinite */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00a86b] border-2 border-white animate-pulseSoft" />
          </div>
          <div>
            <h3 className="font-fraunces text-2xl font-bold text-[#1a2e28]">
              Conseiller Santé Ayidodé+
            </h3>
            <p className="font-atkinson text-sm text-[#007048] font-bold flex items-center gap-1.5">
              <span>● En ligne 24/7</span> • Non-diagnostique • Conforme APDP Bénin
            </p>
          </div>
        </div>

        {/* Bouton Parler à un Infirmier & Sélecteur de Langue */}
        <div className="flex flex-wrap items-center gap-3">
          <BoutonInfirmier label="Parler à un infirmier" />

          <div className="flex items-center gap-1 bg-[#e6f7f0] p-1 rounded-[16px] text-xs font-sora font-bold">
            <button
              type="button"
              onClick={() => setLangue('fr')}
              className={`px-3 py-1.5 rounded-[12px] transition-all ${
                langue === 'fr' ? 'bg-[#007048] text-white shadow-sm' : 'text-[#007048] hover:bg-white/50'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLangue('fon')}
              className={`px-3 py-1.5 rounded-[12px] transition-all ${
                langue === 'fon' ? 'bg-[#c25b3a] text-white shadow-sm' : 'text-[#007048] hover:bg-white/50'
              }`}
            >
              FƆN
            </button>
          </div>
        </div>
      </div>

      {/* Phrase d'espoir discrète */}
      <div className="pt-3 pb-1 text-center font-fraunces italic text-[#007048] text-base">
        "Le cancer n'est pas une fatalité. Poser une question aujourd'hui peut tout changer."
      </div>

      {/* Zone des messages à bulles asymétriques */}
      <div
        className="h-[380px] overflow-y-auto my-4 pr-2 space-y-5"
        role="log"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
          >
            <div
              className={`max-w-[85%] p-5 text-xl font-atkinson ${
                m.role === 'user'
                  ? 'bg-[#007048] text-white rounded-[28px_28px_4px_28px] shadow-md'
                  : m.categorie === 'signe_suspect'
                  ? 'bg-[#faf3ee] text-[#1a2e28] border-2 border-[#c25b3a] rounded-[28px_28px_28px_4px] shadow-md'
                  : 'bg-[#e6f7f0] text-[#1a2e28] border border-[#00a86b]/30 rounded-[28px_28px_28px_4px] shadow-sm'
              }`}
            >
              {m.categorie === 'signe_suspect' && (
                <div className="flex items-center justify-between gap-2 mb-2 text-[#c25b3a] font-sora text-sm font-bold">
                  <span>⚠️ Orientation immédiate sans panique</span>
                  <a href="tel:136" className="underline hover:text-[#a94829]">Appel 136</a>
                </div>
              )}
              <p className="leading-relaxed whitespace-pre-line">{m.texte}</p>
              
              <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-black/5 text-xs font-sora font-semibold">
                <span className={m.role === 'user' ? 'text-white/75' : 'text-[#1a2e28]/60'}>
                  {m.horodatage}
                </span>

                {m.role === 'assistant' && (
                  <BoutonAudio
                    texte={m.texte}
                    audioUrlFon={m.audioUrlFon}
                    langueParDefaut={langue}
                    taille="compacte"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-[#e6f7f0] p-4 rounded-[24px_24px_24px_4px] text-base font-sora text-[#007048] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#007048] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#007048] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#007048] animate-bounce [animation-delay:0.4s]" />
              <span>Réflexion avec les directives médicales...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {rateLimitError && (
        <div className="p-3 mb-4 rounded-xl bg-[#faf3ee] text-[#c25b3a] font-sora text-sm font-bold border border-[#c25b3a]/30">
          {rateLimitError}
        </div>
      )}

      {/* Suggestions rapides adaptées au Bénin */}
      <div className="flex flex-wrap gap-2 pb-4">
        {[
          "Où faire le dépistage à Cotonou ?",
          "Le vaccin VPH est-il payant ?",
          "Aflatoxines dans le maïs : que faire ?",
          "J'ai une boule au sein",
          "Que manger avec 1 000 FCFA ?"
        ].map((sugg, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInputTexte(sugg)}
            className="px-3.5 py-1.5 rounded-full bg-[#faf8f3] hover:bg-[#e6f7f0] border border-[#007048]/20 text-[#1a2e28] font-sora text-sm font-semibold transition-colors"
          >
            {sugg}
          </button>
        ))}
      </div>

      {/* Formulaire d'envoi */}
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          value={inputTexte}
          onChange={(e) => setInputTexte(e.target.value)}
          placeholder="Posez votre question (ex: symptômes, adresses, prix)..."
          className="flex-1 min-h-[60px] px-6 text-xl rounded-[20px_20px_6px_20px] bg-[#faf8f3] border-2 border-[#007048]/30 focus:border-[#00a86b] text-[#1a2e28] placeholder:text-[#1a2e28]/50 font-atkinson"
          aria-label="Votre question sur la prévention du cancer"
        />
        <button
          type="submit"
          disabled={isLoading || !inputTexte.trim()}
          className="btn-ayidode bg-[#00a86b] text-white px-8 text-xl disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
