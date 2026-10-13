import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLocalFallbackReply } from './aiService.js';

test('fallback response is useful in Spanish and does not mention missing AI config', () => {
  const reply = buildLocalFallbackReply('hola quiero vender gaseosa en bolsa en el centro histórico', {
    nombre: 'Gaseosa del Centro',
    monto: 15000,
    ganancia_esperada: 3000,
    retorno_meses: 12,
  });

  assert.match(reply, /gaseosa|centro histórico|cliente|precio|ubicación|diferenciación/i);
  assert.doesNotMatch(reply, /Supabase|Gemini|not configured|not configured/i);
});
