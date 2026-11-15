"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface BoutonAudioProps {
  texte?: string;
  audioUrlFr?: string;
  audioUrlFon?: string;
  titre?: string;
  langueParDefaut?: "fr" | "fon";
  taille?: "normale" | "compacte";
  className?: string;
}

export const BoutonAudio: React.FC<BoutonAudioProps> = ({
  texte,
  audioUrlFr,
  audioUrlFon,
  titre = "Écouter l'explication",
  langueParDefaut = "fr",
  taille = "normale",
  className = ""
}) => {
  const [langue, setLangue] = useState<"fr" | "fon">(langueParDefaut);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chargement, setChargement] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioSource = () => {
    if (langue === "fon") {
      return audioUrlFon || "/audio/capsules/prevention_fon.mp3";
    }
    return audioUrlFr || null;
  };

  const toggleLecture = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    const source = getAudioSource();

    if (source) {
      if (!audioRef.current) {
        audioRef.current = new Audio(source);
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onerror = () => {
          setIsPlaying(false);
          setChargement(false);
          fallbackSpeechSynthesis();
        };
      } else {
        audioRef.current.src = source;
      }

      try {
        setChargement(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setChargement(false);
      } catch (e) {
        console.warn("Échec lecture audio direct, bascule sur synthèse vocale navigateur:", e);
        setChargement(false);
        fallbackSpeechSynthesis();
      }
    } else {
      fallbackSpeechSynthesis();
    }
  };

  const fallbackSpeechSynthesis = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && texte) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texte);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Bouton Principal de Lecture */}
      <button
        onClick={toggleLecture}
        disabled={chargement}
        aria-label={isPlaying ? `Mettre en pause l'audio en ${langue === "fr" ? "Français" : "Fɔngbe"}` : `Écouter l'audio en ${langue === "fr" ? "Français" : "Fɔngbe"}`}
        className="h-[52px] min-w-[52px] px-4 rounded-full bg-vert-brume border-2 border-vert-principal text-vert-profond font-sora font-semibold text-[17px] flex items-center gap-2.5 transition-all hover:bg-vert-principal hover:text-white active:scale-95 shadow-sm"
      >
        {chargement ? (
          <span className="w-5 h-5 border-2 border-vert-profond border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
        <span className="hidden sm:inline">
          {isPlaying ? "Pause" : `Écouter (${langue === "fr" ? "Français" : "Fɔngbe"})`}
        </span>
      </button>

      {/* Switch Français / Fon */}
      {audioUrlFon && (
        <div className="flex bg-creme-fond border border-ocre/30 rounded-full p-1 text-[15px] font-sora font-bold">
          <button
            onClick={() => {
              if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
              }
              setLangue("fr");
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              langue === "fr" ? "bg-vert-profond text-white shadow-sm" : "text-encre/70 hover:text-encre"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => {
              if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
              }
              setLangue("fon");
            }}
            className={`px-3 py-1 rounded-full transition-colors ${
              langue === "fon" ? "bg-terracotta text-white shadow-sm" : "text-encre/70 hover:text-encre"
            }`}
          >
            FƆN
          </button>
        </div>
      )}

      {/* Animation d'onde si actif */}
      {isPlaying && (
        <div className="flex items-center gap-1 h-5 pl-1" aria-hidden="true">
          <span className="w-1 bg-vert-principal h-3 animate-pulse" />
          <span className="w-1 bg-vert-principal h-5 animate-pulse delay-75" />
          <span className="w-1 bg-vert-principal h-2 animate-pulse delay-150" />
          <span className="w-1 bg-vert-principal h-4 animate-pulse delay-100" />
        </div>
      )}
    </div>
  );
};
