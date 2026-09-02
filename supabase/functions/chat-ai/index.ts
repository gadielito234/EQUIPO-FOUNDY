const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    return jsonResponse({ error: 'GEMINI_API_KEY no esta configurada en Supabase.' }, 500);
  }

  try {
    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const context = body.context && typeof body.context === 'object' ? body.context : {};

    if (!message || message.length > 4000) {
      return jsonResponse({ error: 'La consulta es obligatoria y debe tener como maximo 4000 caracteres.' }, 400);
    }

    const prompt = [
      'Eres el asistente de proyectos de Foundy. Responde en espanol, con claridad y en un tono practico.',
      'Ayuda al emprendedor a validar, mejorar y comunicar su idea. No inventes datos financieros ni prometas rendimientos.',
      `Datos actuales del proyecto: ${JSON.stringify(context)}`,
      `Consulta: ${message}`,
    ].join('\n\n');

    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
        }),
      },
    );

    const result = await geminiResponse.json();
    if (!geminiResponse.ok) {
      console.error('Gemini API error:', result);
      return jsonResponse({ error: 'Gemini no pudo procesar la consulta.' }, 502);
    }

    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof reply !== 'string' || !reply.trim()) {
      return jsonResponse({ error: 'Gemini devolvio una respuesta vacia.' }, 502);
    }

    return jsonResponse({ reply: reply.trim() });
  } catch (error) {
    console.error('chat-ai error:', error);
    return jsonResponse({ error: 'No se pudo procesar la consulta.' }, 500);
  }
});
