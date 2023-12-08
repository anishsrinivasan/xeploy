import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Ping() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: ping, error } = await supabase
    .from("features_env_mapping")
    .select();

  return (
    <pre>
      {JSON.stringify(ping, null, 2)} - {JSON.stringify(error)}
    </pre>
  );
}
