// Edge Function: questionnaire
// Calcul d'algorithme de risque cancer et programmation des rappels de santé
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const questionnaireSchema = z.object({
  utilisateur_id: z.string().uuid().optional(),
  reponses: z.object({
    age: z.number().min(10).max(120),
    vaccin_vph: z.enum(["oui", "non", "incomplet"]),
    dernier_frottis: z.enum(["jamais", "moins_3ans", "plus_3ans"]),
    partenaires: z.enum(["unique", "multiples"]).optional(),
    tabac: z.enum(["oui", "non"])
  })
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const parsed = questionnaireSchema.safeParse(rawBody);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Format invalide", details: parsed.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { utilisateur_id, reponses } = parsed.data;

    // Calcul du score basé sur les protocoles PNLMNT Bénin
    let points = 0;
    if (reponses.age >= 25 && reponses.age <= 49) points += 2;
    if (reponses.vaccin_vph === "non") points += 2;
    if (reponses.vaccin_vph === "incomplet") points += 1;
    if (reponses.dernier_frottis === "jamais") points += 3;
    if (reponses.dernier_frottis === "plus_3ans") points += 2;
    if (reponses.tabac === "oui") points += 2;

    let score: "bas" | "moyen" | "eleve" = "bas";
    if (points >= 6) {
      score = "eleve";
    } else if (points >= 3) {
      score = "moyen";
    }

    // Définition des recommandations scientifiques
    const recommandations = [];
    if (score === "eleve") {
      recommandations.push("Dépistage IVA urgent recommandé dans le centre de santé ou maternité publique de votre commune.");
      recommandations.push("Si vous avez des filles de 9 à 14 ans, vérifiez qu'elles reçoivent le vaccin VPH gratuit.");
    } else if (score === "moyen") {
      recommandations.push("Programmez un contrôle de dépistage dans les 3 mois.");
      recommandations.push("Consommez des légumes riches en antioxydants locaux (gboma, amanvivè) et triez soigneusement vos graines d'arachide et maïs.");
    } else {
      recommandations.push("Votre statut est rassurant. Maintenez le contrôle de routine tous les 3 ans.");
    }

    const prochainsRappels = [];
    const datePrevue = new Date();

    if (score === "eleve") {
      datePrevue.setDate(datePrevue.getDate() + 7);
      prochainsRappels.push({ type: "depistage", date: datePrevue.toISOString().slice(0, 10), priorite: "urgente" });
    } else {
      datePrevue.setDate(datePrevue.getDate() + 90);
      prochainsRappels.push({ type: "depistage", date: datePrevue.toISOString().slice(0, 10), priorite: "normale" });
    }

    // Sauvegarde si utilisateur_id fourni
    if (utilisateur_id) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
      );

      await supabaseAdmin.from("profils_risque").insert({
        utilisateur_id,
        cancer: "col_uterus",
        score,
        reponses_anonymisees: reponses
      });

      await supabaseAdmin.from("rappels").insert({
        utilisateur_id,
        type: "depistage",
        date_prevue: prochainsRappels[0].date,
        canal: "whatsapp",
        statut: "planifie",
        categorie: `bilan_${score}`
      });
    }

    return new Response(
      JSON.stringify({
        score,
        recommandations,
        prochains_rappels: prochainsRappels
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
