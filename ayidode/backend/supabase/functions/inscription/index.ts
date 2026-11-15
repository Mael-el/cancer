// Edge Function: inscription
// Inscription sécurisée conforme APDP Bénin (AES-256, hash, rappels initiaux)
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const inscriptionSchema = z.object({
  telephone: z.string().regex(/^(\+229|00229)?[0-9]{8,10}$/, "Format béninois invalide"),
  langue: z.enum(["fr", "fon"]).default("fr"),
  canal_prefere: z.enum(["whatsapp", "sms", "web"]).default("whatsapp"),
  profil: z.enum(["femme", "parent", "asc", "admin"]).default("femme"),
  consentement_rappels: z.boolean().refine(val => val === true, "Consentement obligatoire"),
  consentement_sondages: z.boolean().default(false)
});

// Chiffrement AES-GCM 256 bits pour le stockage sécurisé du numéro
async function encryptData(text: string, secretKeyStr: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(secretKeyStr.padEnd(32, "0").slice(0, 32)),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    keyMaterial,
    enc.encode(text)
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

// Hash SHA-256 pour la recherche sans déchiffrement (Minimisation des données)
async function hashData(text: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parsed = inscriptionSchema.safeParse(rawBody);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Données invalides", details: parsed.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { telephone, langue, canal_prefere, profil, consentement_rappels, consentement_sondages } = parsed.data;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const secretKey = Deno.env.get("ENCRYPTION_SECRET_KEY") || "AyidodeBeninSant2026SecretKeyAES";
    const telephoneChiffre = await encryptData(telephone, secretKey);
    const telephoneHash = await hashData(telephone);

    // 1. Insertion ou mise à jour de l'utilisateur
    const { data: user, error: userError } = await supabaseAdmin
      .from("utilisateurs")
      .upsert(
        {
          telephone_chiffre: telephoneChiffre,
          telephone_hash: telephoneHash,
          langue,
          canal_prefere,
          profil,
          consentement_rappels,
          consentement_sondages,
          derniere_connexion: new Date().toISOString()
        },
        { onConflict: "telephone_hash" }
      )
      .select("id")
      .single();

    if (userError || !user) {
      throw new Error(userError?.message || "Échec de création utilisateur");
    }

    // 2. Création du profil de risque par défaut
    await supabaseAdmin.from("profils_risque").insert({
      utilisateur_id: user.id,
      cancer: "col_uterus",
      score: "moyen",
      reponses_anonymisees: { profil, langue, date_inscription: new Date().toISOString() }
    });

    // 3. Programmation du rappel initial (D+30 pour dépistage ou rappel vaccin)
    const datePrevue = new Date();
    datePrevue.setDate(datePrevue.getDate() + 30);

    await supabaseAdmin.from("rappels").insert({
      utilisateur_id: user.id,
      type: profil === "parent" ? "vaccination" : "depistage",
      date_prevue: datePrevue.toISOString().slice(0, 10),
      canal: canal_prefere === "web" ? "sms" : canal_prefere,
      statut: "planifie",
      categorie: "premier_rappel"
    });

    const messageBienvenue =
      langue === "fon"
        ? "Kú abɔ̀ ! Ayidodé+ do gbejí nú we. Mǐ ná sɛ́ nǔnywɛ́ kpo hweɖenu kpo dó lanmɛ na nɔ ganjí tɔn nú we."
        : "Bienvenue sur Ayidodé+ ! Vos rappels de santé préventifs sont activés. Votre vie privée est protégée par la loi béninoise.";

    return new Response(
      JSON.stringify({
        success: true,
        user_id: user.id,
        message_bienvenue: messageBienvenue
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
