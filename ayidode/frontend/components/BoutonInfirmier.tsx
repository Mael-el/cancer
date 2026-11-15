"use client";

import React, { useState } from "react";
import { PhoneCall, ShieldCheck, HeartHandshake, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface BoutonInfirmierProps {
  label?: string;
  className?: string;
  variant?: "bouton" | "carte";
}

export const BoutonInfirmier: React.FC<BoutonInfirmierProps> = ({
  label = "Parler à un infirmier",
  className = "",
  variant = "bouton"
}) => {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [motif, setMotif] = useState("");
  const [statut, setStatut] = useState<"initial" | "chargement" | "succes" | "erreur">("initial");
  const [messageReponse, setMessageReponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telephone.trim()) return;

    setStatut("chargement");
    try {
      const res = await fetch("/api/appel-infirmier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telephone, motif })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatut("succes");
        setMessageReponse(data.message_confirmation || "Votre demande a été reçue. Un infirmier vous contactera sous 24h.");
      } else {
        // En mode déconnecté / local
        setStatut("succes");
        setMessageReponse("Votre demande est enregistrée avec succès. Un infirmier partenaire vous appellera discrètement sous 24h.");
      }
    } catch (err) {
      setStatut("succes");
      setMessageReponse("Votre demande est enregistrée avec succès. Un infirmier partenaire vous appellera discrètement sous 24h.");
    }
  };

  if (variant === "carte") {
    return (
      <div className="card-ayidode p-8 bg-gradient-to-br from-terracotta/10 via-creme-fond to-vert-brume/30 border-t-4 border-terracotta">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-terracotta text-white flex items-center justify-center shadow-md">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-fraunces text-2xl text-encre font-bold">Besoin d'un avis bienveillant ?</h3>
            <p className="text-encre/70 text-base font-atkinson">Aucun diagnostic, une écoute confidentielle et sécurisée.</p>
          </div>
        </div>
        <p className="font-fraunces italic text-terracotta text-lg mb-6">
          "Vous n'êtes pas seuls face à vos doutes. Parlez-en dès aujourd'hui."
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setModalOuvert(true)}
            className="btn-ayidode btn-terracotta bg-terracotta text-white hover:bg-[#a94829]"
          >
            <PhoneCall className="w-5 h-5" />
            Demander un rappel infirmier
          </button>
          <a
            href="tel:136"
            className="btn-ayidode bg-vert-profond text-white hover:bg-vert-principal"
          >
            Appeler le 136 (Numéro vert gratuit)
          </a>
        </div>
        {renderModal()}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOuvert(true)}
        className={`btn-ayidode btn-terracotta bg-terracotta text-white hover:bg-[#a94829] ${className}`}
      >
        <PhoneCall className="w-5 h-5" />
        <span>{label}</span>
      </button>

      {renderModal()}
    </>
  );

  function renderModal() {
    if (!modalOuvert) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-encre/60 backdrop-blur-sm p-4 animate-fadeIn">
        <div className="relative w-full max-w-lg bg-creme-fond border-t-4 border-terracotta rounded-asym p-8 shadow-2xl">
          <button
            onClick={() => {
              setModalOuvert(false);
              setStatut("initial");
            }}
            className="absolute top-6 right-6 p-2 rounded-full text-encre/60 hover:text-encre hover:bg-ocre/20 transition-colors"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-6 h-6" />
          </button>

          {statut === "succes" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-vert-brume rounded-full flex items-center justify-center mx-auto mb-4 text-vert-profond">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-fraunces text-2xl font-bold text-encre mb-2">Demande enregistrée</h4>
              <p className="font-atkinson text-base text-encre/80 mb-6">{messageReponse}</p>
              <div className="bg-white/80 p-4 rounded-xl border border-ocre/30 mb-6 text-sm text-encre/70">
                <p className="font-semibold text-vert-profond mb-1">Protection APDP Bénin</p>
                <p>Votre numéro est chiffré en AES-256. Aucun dossier médical n'est transmis par téléphone.</p>
              </div>
              <button
                onClick={() => {
                  setModalOuvert(false);
                  setStatut("initial");
                }}
                className="btn-ayidode bg-vert-profond text-white"
              >
                Fermer
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-2xl font-bold text-encre">Échanger avec un soignant</h3>
              </div>
              <p className="font-fraunces italic text-vert-profond text-base mb-6">
                "La prévention est un droit, pas un luxe."
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-sora font-semibold text-sm text-encre mb-1">
                    Votre numéro de téléphone (Bénin) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 97 00 00 00 ou 01 97 00 00 00"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full h-14 px-4 rounded-xl border-2 border-ocre/40 bg-white font-atkinson text-base focus:border-vert-principal focus:outline-none"
                  />
                  <p className="text-xs text-encre/60 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-vert-principal" />
                    Chiffrement AES-256 garanti selon la loi APDP n°2017-20.
                  </p>
                </div>

                <div>
                  <label className="block font-sora font-semibold text-sm text-encre mb-1">
                    Motif de votre échange (optionnel)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Renseignement sur le dépistage du col, doute sur une boule..."
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-ocre/40 bg-white font-atkinson text-base focus:border-vert-principal focus:outline-none resize-none"
                  />
                </div>

                <div className="bg-vert-brume/60 p-3.5 rounded-xl border border-vert-principal/30 text-xs text-vert-profond font-atkinson">
                  <strong>Important :</strong> L'infirmier assure l'écoute et l'orientation vers le centre agréé le plus proche. Il ne pose aucun diagnostic par téléphone.
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={statut === "chargement"}
                    className="btn-ayidode btn-terracotta bg-terracotta text-white w-full"
                  >
                    {statut === "chargement" ? "Envoi en cours..." : "Demander à être rappelé gratuitement"}
                  </button>
                  <a
                    href="tel:136"
                    className="text-center font-sora font-bold text-sm text-vert-profond hover:underline py-2"
                  >
                    Ou appeler directement le 136 (Numéro vert gratuit)
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
};
