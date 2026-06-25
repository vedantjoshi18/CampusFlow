import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey);

export const createClient = (): SupabaseClient => {
  if (!hasSupabaseConfig) {
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({
          data: { session: null, user: null },
          error: new Error("Supabase environment variables are not configured."),
        }),
        signOut: async () => ({ error: null }),
      },
    } as unknown as SupabaseClient;
  }

  return createBrowserClient(supabaseUrl!, supabaseKey!);
};
