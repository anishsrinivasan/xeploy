"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getEnvironments(projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("environments")
    .select()
    .eq("projectId", projectId);

  if (error || !data) {
    return [];
  }

  return data;
}
