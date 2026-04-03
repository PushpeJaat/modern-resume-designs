import { corsHeaders } from "@supabase/supabase-js/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { html } = await req.json();

    if (!html || typeof html !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'html' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const BROWSERLESS_API_KEY = Deno.env.get("BROWSERLESS_API_KEY");
    if (!BROWSERLESS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Browserless API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call Browserless /pdf endpoint
    const browserlessUrl = `https://production-sfo.browserless.io/pdf?token=${BROWSERLESS_API_KEY}`;

    const response = await fetch(browserlessUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html,
        options: {
          format: "A4",
          printBackground: true,
          margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
          preferCSSPageSize: false,
          displayHeaderFooter: false,
        },
        gotoOptions: {
          waitUntil: "networkidle2",
          timeout: 30000,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Browserless error:", errorText);
      return new Response(
        JSON.stringify({ error: "PDF generation failed", details: errorText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
