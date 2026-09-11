import { createClient } from '@supabase/supabase-js';
// Leemos las variables del archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function makeStub() {
	const noop = () => ({
		data: null,
		error: { message: 'Supabase no configurado en VITE_SUPABASE_URL/VITE_SUPABASE_PUBLISHABLE_KEY' },
	});
	const chainable = () => ({
		select: () => chainable(),
		eq: () => chainable(),
		order: () => chainable(),
		update: () => chainable(),
		single: async () => noop(),
		maybeSingle: async () => ({ data: null }),
		insert: async () => ({ error: { message: 'Supabase no configurado' } }),
	});
	return {
		from: () => chainable(),
	};
}

let supabase;
try {
	if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase env missing');
	supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
	// Evitar que un error en la creaciÃ³n de cliente rompa la app en desarrollo
	// y exportar un stub que devuelva respuestas seguras.
	// En producciÃ³n debes configurar correctamente las variables de entorno.
	console.warn('Supabase no configurado â€” usando stub:', err.message || err);
	supabase = makeStub();
}

export { supabase };
