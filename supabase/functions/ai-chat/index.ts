import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Risposta alla preflight request OPTIONS
  if (req.method === "OPTIONS") {
    return new Response("", { status: 200, headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages?.length || 0, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "Sei l'assistente virtuale di PowerGym, una palestra moderna e innovativa. Aiuti i clienti con informazioni su allenamenti, nutrizione, programmi di fitness e benessere. Rispondi sempre in italiano in modo professionale, motivante e conciso.",
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      const msg =
        response.status === 429
          ? "Troppi tentativi. Riprova tra poco."
          : response.status === 402
          ? "Crediti insufficienti. Contatta l'amministratore."
          : "Errore nel servizio AI";
      return new Response(JSON.stringify({ error: msg }), {
        status: response.status === 429 || response.status === 402 ? response.status : 500,
        headers: corsHeaders,
      });
    }

    const data = await response.json();
    console.log("AI response received successfully");

    return new Response(JSON.stringify({ response: data.choices[0].message.content }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error in ai-chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
