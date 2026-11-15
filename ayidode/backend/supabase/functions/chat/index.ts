// Edge Function: chat
// Assistant de prévention du cancer au Bénin (Sécurisé & Conforme APDP)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1).max(1000)
    })
  ).min(1),
  session_id: z.string().min(3).max(128),
  langue: z.enum(["fr", "fon"]).default("fr"),
  mode_audio: z.boolean().optional().default(false)
});

// Cache mémoire en cluster pour le rate limiting (10 requêtes / minute par IP / session)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }
  if (now - entry.timestamp > 60000) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }
  if (entry.count >= 10) {
    return false;
  }
  entry.count += 1;
  return true;
}

const SYSTEM_PROMPT = `
Tu es un assistant de prévention du cancer au Bénin pour la plateforme Ayidodé+. Tu ne poses JAMAIS de diagnostic médical.

RÈGLES ABSOLUES :
1. Jamais "vous avez un cancer" ou "ce n'est rien".
2. Jamais de prescription ni posologie.
3. Français simple, phrases courtes (maximum 15 mots par phrase).
4. Exemples béninois concrets (marché Dantokpa/Ouando, prix en FCFA, aliments locaux).
5. Si diagnostic demandé : "Va au centre de dépistage le plus proche ou appelle le numéro vert 136."
6. Si signe suspect (boule au sein, saignement anormal, plaie persistante, douleur) :
   - Message rassurant et non-anxiogène
   - Orientation immédiate vers maternité ou hôpital public
   - Propose "Parler à un infirmier"
   - Mentionner un suivi conseillé à J+7
7. Réponses limitées strictement à 120 mots au maximum.
8. Sources de référence : OMS, CIRC, PNLMNT Bénin, CNHU-HKM.
9. Termine toujours avec bienveillance par une phrase d'espoir comme : "Le cancer n'est pas une fatalité.", "Chaque petit geste compte.", ou "Dépister tôt, c'est protéger ceux qu'on aime."

CONTEXTE BÉNINOIS :
- Aflatoxines (céréales/arachides mal séchées) → facteur majeur de cancer du foie. Tri rigoureux des graines.
- Virus du Papillome Humain (VPH) → cancer du col de l'utérus.
- Vaccin VPH gratuit au Bénin pour toutes les jeunes filles de 9 à 14 ans.
- Dépistage par IVA (inspection visuelle) gratuit ou accessible dans les centres de santé publics.
- Budget alimentaire moyen d'une famille : 1 000 FCFA/jour.
- Alternatives locales : niébé, gari, feuilles de gboma, afitin, lanhouin de qualité.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parseResult = chatSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Validation échouée", details: parseResult.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, session_id, langue, mode_audio } = parseResult.data;

    // Vérification Rate Limit (10/min)
    const clientIp = req.headers.get("x-forwarded-for") || session_id;
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Trop de requêtes. Limite de 10 messages par minute dépassée." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const latestUserMsg = messages[messages.length - 1].content.toLowerCase();

    // Détection de catégorie pour la conformité APDP
    let categorie: "prevention" | "orientation" | "refus" | "signe_suspect" = "prevention";
    let isSuspect = false;

    if (
      latestUserMsg.includes("boule") ||
      latestUserMsg.includes("saignement") ||
      latestUserMsg.includes("masse") ||
      latestUserMsg.includes("douleur") ||
      latestUserMsg.includes("plaie")
    ) {
      categorie = "signe_suspect";
      isSuspect = true;
    } else if (
      latestUserMsg.includes("diagnostic") ||
      latestUserMsg.includes("ai-je un cancer") ||
      latestUserMsg.includes("ordonnance") ||
      latestUserMsg.includes("médicament")
    ) {
      categorie = "refus";
    } else if (
      latestUserMsg.includes("centre") ||
      latestUserMsg.includes("hôpital") ||
      latestUserMsg.includes("adresse") ||
      latestUserMsg.includes("cotonou") ||
      latestUserMsg.includes("calavi")
    ) {
      categorie = "orientation";
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    let reply = "";

    if (geminiApiKey) {
      // Appel API Gemini sécurisé côté serveur
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
      const payload = {
        contents: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          ...messages.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.3
        }
      };

      const geminiRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (geminiRes.ok) {
        const geminiJson = await geminiRes.json();
        reply = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    }

    // Réponse de secours certifiée conforme si Gemini indisponible ou réponse incomplète
    if (!reply) {
      if (isSuspect) {
        reply =
          "Ces signes nécessitent un contrôle simple par un agent de santé. Ne vous inquiétez pas. Vous pouvez demander un appel infirmier gratuit ou vous rendre dans le centre le plus proche. Le cancer n'est pas une fatalité : dépister tôt sauve la vie.";
      } else if (categorie === "refus") {
        reply =
          "Je ne pose aucun diagnostic médical. Rendez-vous au centre de santé le plus proche ou contactez le numéro vert 136 du Ministère. Vous n'êtes pas seuls.";
      } else {
        reply =
          "Le vaccin VPH pour les filles (9-14 ans) et le dépistage du col sont gratuits au Bénin. Une alimentation saine et des graines bien triées protègent le foie et le corps. Chaque petit geste compte.";
      }
    }

    // Gestion Audio si demandé
    let audioUrl: string | undefined = undefined;
    if (mode_audio) {
      if (langue === "fon") {
        audioUrl = isSuspect ? "/audio/capsules/signe_suspect_fon.mp3" : "/audio/capsules/prevention_fon.mp3";
      } else {
        audioUrl = `/audio/tts/chat_reply_${Date.now()}.mp3`;
      }
    }

    // APDP : Stockage STRICTEMENT ANONYMISÉ (Hash SHA-256 uniquement, zéro contenu texte)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const encoder = new TextEncoder();
    const dataToHash = encoder.encode(latestUserMsg + session_id);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataToHash);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const contenuHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    await supabaseAdmin.from("messages_chat").insert({
      session_id,
      role: "user",
      contenu_hash: contenuHash,
      categorie,
      langue
    });

    return new Response(
      JSON.stringify({
        reply,
        categorie,
        orientation: isSuspect ? "Centre hospitalier ou maternité publique de référence" : undefined,
        audio_url: audioUrl,
        bouton_infirmier: true
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Erreur interne", message: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
