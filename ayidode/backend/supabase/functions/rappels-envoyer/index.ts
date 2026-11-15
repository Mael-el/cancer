// Edge Function: rappels-envoyer
// Cron horaire pour expédier les rappels 'planifie' via WhatsApp Business ou Africa's Talking
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

serve(async (_req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const aujourdhui = new Date().toISOString().slice(0, 10);

    // 1. Récupérer les rappels planifiés du jour
    const { data: rappels, error } = await supabaseAdmin
      .from("rappels")
      .select("id, utilisateur_id, type, canal, date_prevue")
      .eq("statut", "planifie")
      .lte("date_prevue", aujourdhui)
      .limit(50);

    if (error) throw error;

    let envoyes = 0;
    let echecs = 0;

    for (const rappel of rappels || []) {
      try {
        // En production : appel à WhatsApp Business API Meta Cloud ou Africa's Talking SMS API
        // Les clés secrètes proviennent de Deno.env.get("WHATSAPP_API_TOKEN") / Deno.env.get("AFRICAS_TALKING_KEY")
        
        // Simulation d'envoi réussi
        await supabaseAdmin
          .from("rappels")
          .update({
            statut: "envoye",
            envoye_le: new Date().toISOString()
          })
          .eq("id", rappel.id);

        envoyes++;
      } catch {
        echecs++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, envoyes, echecs }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
