"use server";
import { MOCK_USER_ID } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { z } from "zod";

const CreateProjectSchema = z.object({
  name: z.string(),
});

const EditProjectSchema = z.object({
  name: z.string(),
  projectId: z.string(),
});

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

export async function createProject(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
  };

  const validatedFields = CreateProjectSchema.safeParse(baseData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error("CreateProjectValidationFailed");
    return {
      message: "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("projects")
    .insert({ name: validatedFields.data.name, userId: MOCK_USER_ID });

  if (error) {
    console.error("CreateProjectFailed", error);
    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  revalidatePath("/dashboard");
  return { error: null, message: "Project Created" };
}

export async function editProject(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
    projectId: formData.get("projectId"),
  };

  const validatedFields = EditProjectSchema.safeParse(baseData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error("EditProjectValidationFailed");
    return {
      message: "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("projects")
    .update({ name: validatedFields.data.name })
    .eq("projectId", validatedFields.data.projectId);

  if (error) {
    console.error("EditProjectFailed", error);
    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  revalidatePath(`/dashboard`, "layout");

  return { error: null, message: "Project Updated" };
}
