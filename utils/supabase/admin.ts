import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export const createClient = () =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { cookies: {} }
  );
