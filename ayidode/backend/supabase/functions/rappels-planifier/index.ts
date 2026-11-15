// Edge Function: rappels-planifier
// Cron quotidien (1x/jour à 8h) pour programmer les rappels de santé dus
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

serve(async (_req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const aujourdhui = new Date().toISOString().slice(0, 10);

    // 1. Récupérer les utilisateurs ayant consenti aux rappels sans effacement
    const { data: utilisateurs, error: errUsers } = await supabaseAdmin
      .from("utilisateurs")
      .select("id, canal_prefere, langue")
      .eq("consentement_rappels", true)
      .is("deleted_at", null);

    if (errUsers) throw errUsers;

    let rappelsCrees = 0;

    for (const u of utilisateurs || []) {
      // Vérifier si un rappel existe déjà pour aujourd'hui
      const { data: existants } = await supabaseAdmin
        .from("rappels")
        .select("id")
        .eq("utilisateur_id", u.id)
        .eq("date_prevue", aujourdhui)
        .limit(1);

      if (!existants || existants.length === 0) {
        // Priorisation WhatsApp > SMS
        const canalChoisi = u.canal_prefere === "sms" ? "sms" : "whatsapp";

        await supabaseAdmin.from("rappels").insert({
          utilisateur_id: u.id,
          type: "depistage",
          date_prevue: aujourdhui,
          canal: canalChoisi,
          statut: "planifie",
          categorie: "routine_quotidienne"
        });
        rappelsCrees++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, date: aujourdhui, rappels_crees: rappelsCrees }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
