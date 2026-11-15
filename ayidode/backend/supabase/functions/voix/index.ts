// Edge Function: voix (Synthèse TTS Français & Audios natifs Fon)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const voixSchema = z.object({
  texte: z.string().min(1).max(2000),
  langue: z.enum(["fr", "fon"]),
  type_contenu: z.enum(["cancer", "aliment", "conseil", "alerte"]).optional()
});

// Mapping des capsules pré-enregistrées en Fɔngbe par des locuteurs natifs
const FON_AUDIO_REGISTRY: Record<string, { url: string; duree: number }> = {
  "col_uterus": { url: "/audio/cancers/col_uterus_fon.mp3", duree: 45 },
  "sein": { url: "/audio/cancers/sein_fon.mp3", duree: 52 },
  "foie": { url: "/audio/cancers/foie_fon.mp3", duree: 48 },
  "colorectal": { url: "/audio/cancers/colorectal_fon.mp3", duree: 41 },
  "prostate": { url: "/audio/cancers/prostate_fon.mp3", duree: 44 },
  "aflatoxines": { url: "/audio/aliments/aflatoxines_fon.mp3", duree: 38 },
  "niebe": { url: "/audio/aliments/niebe_fon.mp3", duree: 35 },
  "marche_budget": { url: "/audio/alimentation/marche_budget_fon.mp3", duree: 50 },
  "signe_suspect": { url: "/audio/capsules/signe_suspect_fon.mp3", duree: 32 },
  "espoir": { url: "/audio/capsules/espoir_fon.mp3", duree: 28 }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parseResult = voixSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Validation échouée", details: parseResult.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { texte, langue, type_contenu } = parseResult.data;

    // 1. Traitement pour la langue Fɔngbe (uniquement locuteurs natifs pré-enregistrés)
    if (langue === "fon") {
      // Recherche de correspondance par mot-clé
      const lower = texte.toLowerCase();
      let matchKey = "";
      if (lower.includes("col") || lower.includes("vph") || lower.includes("vǐjí")) matchKey = "col_uterus";
      else if (lower.includes("sein") || lower.includes("anɔ̌")) matchKey = "sein";
      else if (lower.includes("foie") || lower.includes("ayi") || lower.includes("hépatite")) matchKey = "foie";
      else if (lower.includes("colorectal") || lower.includes("adɔvǐ")) matchKey = "colorectal";
      else if (lower.includes("prostate") || lower.includes("adɔɖoxó")) matchKey = "prostate";
      else if (lower.includes("aflatoxine") || lower.includes("arachide") || lower.includes("azǐin")) matchKey = "aflatoxines";
      else if (lower.includes("budget") || lower.includes("marché") || lower.includes("niébé")) matchKey = "marche_budget";
      else if (lower.includes("boule") || lower.includes("saignement") || lower.includes("danger")) matchKey = "signe_suspect";
      else matchKey = "espoir";

      const fonAudio = FON_AUDIO_REGISTRY[matchKey];
      if (fonAudio) {
        return new Response(
          JSON.stringify({
            audio_url: fonAudio.url,
            langue: "fon",
            duree_secondes: fonAudio.duree,
            note: "Capsule authentique enregistrée par un soignant locuteur natif Fon"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Règle stricte : jamais de synthèse vocale artificielle en Fon pour préserver les tons
      return new Response(
        JSON.stringify({
          audio_url: null,
          langue: "fon",
          duree_secondes: 0,
          message: "Pas de synthèse artificielle en langue Fɔngbe afin de respecter la tonalité linguistique."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Traitement pour la langue Française (Synthèse vocale Google Cloud TTS ou voix fluide)
    const googleApiKey = Deno.env.get("GOOGLE_TTS_API_KEY");
    let audioUrl = "";

    if (googleApiKey) {
      try {
        const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`;
        const ttsResponse = await fetch(ttsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: { text: texte },
            voice: {
              languageCode: "fr-FR",
              name: "fr-FR-Neural2-A", // Voix chaleureuse, posée, bienveillante
              ssmlGender: "FEMALE"
            },
            audioConfig: {
              audioEncoding: "MP3",
              speakingRate: 0.92 // Débit légèrement ralenti pour faciliter la compréhension
            }
          })
        });

        if (ttsResponse.ok) {
          const ttsData = await ttsResponse.json();
          if (ttsData.audioContent) {
            audioUrl = `data:audio/mp3;base64,${ttsData.audioContent}`;
          }
        }
      } catch (ttsErr) {
        console.error("Erreur Google TTS:", ttsErr);
      }
    }

    // Si pas de clé ou fallback, utilisation de l'URL du synthétiseur Web Speech ou audio pré-packagé
    if (!audioUrl) {
      audioUrl = `/audio/fr_default_preview.mp3`;
    }

    // Estimation durée : ~140 mots par minute à débit ralenti
    const wordCount = texte.trim().split(/\s+/).length;
    const dureeEstimee = Math.max(3, Math.round((wordCount / 130) * 60));

    return new Response(
      JSON.stringify({
        audio_url: audioUrl,
        langue: "fr",
        duree_secondes: dureeEstimee,
        type: audioUrl.startsWith("data:") ? "base64_audio" : "static_audio"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Erreur interne voix", message: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
