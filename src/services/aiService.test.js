import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLocalFallbackReply } from './aiService.js';

test('fallback response is useful in Spanish and does not mention missing AI config', () => {
  const sodaReply = buildLocalFallbackReply('hola quiero vender gaseosa en bolsa en el centro histórico', {
    nombre: 'Gaseosa del Centro',
    monto: 15000,
    ganancia_esperada: 3000,
    retorno_meses: 12,
  });

  assert.match(sodaReply, /gaseosa|centro histórico|cliente|precio|ubicación|diferenciación/i);
  assert.doesNotMatch(sodaReply, /Supabase|Gemini|not configured|not configured/i);

  const tortillaReply = buildLocalFallbackReply('hola quiero vender tortillas en el centro histórico', {
    nombre: 'Tortitas del Centro',
    monto: 12000,
    ganancia_esperada: 2500,
    retorno_meses: 10,
  });

  assert.match(tortillaReply, /tortillas|cliente|precio|mercado|diferenciación|horas pico/i);
  assert.doesNotMatch(tortillaReply, /gaseosa en bolsa|gaseosa/i);
});
