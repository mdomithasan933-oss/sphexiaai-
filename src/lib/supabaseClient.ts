import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  // Create a dummy placeholder — API calls will fail gracefully
  supabase = new Proxy({} as SupabaseClient, {
    get() {
      return () => ({
        select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
          then: (r: any) => r({ data: [], error: { message: 'Supabase not configured' } }) }),
        then: (r: any) => r({ data: [], error: { message: 'Supabase not configured' } }),
      });
    },
  });
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
