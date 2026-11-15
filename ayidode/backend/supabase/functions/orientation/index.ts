// Edge Function: orientation
// Recherche géolocalisée des centres de dépistage et de vaccination du Bénin
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const orientationSchema = z.object({
  commune: z.string().optional(),
  service_recherche: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const parsed = orientationSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Paramètres invalides", details: parsed.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { commune, service_recherche } = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || ""
    );

    let query = supabase.from("centres").select("*").eq("actif", true);

    if (commune && commune !== "tous") {
      query = query.ilike("commune", `%${commune}%`);
    }

    const { data: centres, error } = await query;
    if (error) throw error;

    let resultats = centres || [];

    // Filtre sur les services JSONB
    if (service_recherche && service_recherche !== "tous") {
      resultats = resultats.filter((c: any) => {
        const servicesArray = Array.isArray(c.services) ? c.services : [];
        return servicesArray.some((s: string) =>
          s.toLowerCase().includes(service_recherche.toLowerCase())
        );
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: resultats.length,
        centres: resultats
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
