import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getProjects() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("projects").select();

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getProject(projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: project, error } = await supabase
    .from("projects")
    .select()
    .eq("projectId", projectId)
    .single();

  if (error) {
    return notFound();
  }

  const { count: totalFeautres } = await supabase
    .from("features")
    .select("featureId", { count: "exact" })
    .eq("projectId", projectId);

  const { count: totalEnv } = await supabase
    .from("environments")
    .select("envId", { count: "exact" })
    .eq("projectId", projectId);

  return {
    project,
    totalFeautres: totalFeautres ?? 0,
    totalEnv: totalEnv ?? 0,
    totalRequests: 10,
  };
}
