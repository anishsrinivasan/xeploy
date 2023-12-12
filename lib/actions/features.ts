"use server";
import { FeaturesWithMapping } from "@/types/entity";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getProjectEnvKey, clearCache } from "@/utils/upstash/cache";

export async function getProjectStats(projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { count: totalFeautres } = await supabase
    .from("features")
    .select("featureId", { count: "exact" })
    .eq("projectId", projectId);

  const { count: totalEnv } = await supabase
    .from("environments")
    .select("envId", { count: "exact" })
    .eq("projectId", projectId);

  return {
    totalFeautres: totalFeautres ?? 0,
    totalEnv: totalEnv ?? 0,
    totalRequests: 10,
  };
}

export async function getFeatures(projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("features")
    .select()
    .eq("projectId", projectId);

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getFeaturesWithMappings(projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("features_env_mapping")
    .select(
      `featureId, projectId,envId,  enabled, features(name, description, createdAt), environments(name)`
    )
    .eq("projectId", projectId)
    .order("featureId", { ascending: true });

  if (error || !data) {
    return [];
  }

  const featuresWithMapping: FeaturesWithMapping[] = [];

  for (const feature of data) {
    const index = featuresWithMapping.findIndex(
      (x) => x.featureId === feature.featureId
    );

    if (index > -1) {
      featuresWithMapping[index].environments = [
        ...featuresWithMapping[index].environments,
        {
          envId: feature.envId,
          name: feature.environments?.name || "",
          enabled: feature.enabled,
        },
      ];
      continue;
    }

    featuresWithMapping.push({
      featureId: feature.featureId,
      projectId: feature.projectId,
      description: feature?.features?.description || "",
      name: feature.features?.name || "",
      environments: [
        {
          envId: feature.envId,
          name: feature.environments?.name || "",
          enabled: feature.enabled,
        },
      ],
    });
  }

  return featuresWithMapping;
}

export async function updateFeatureStatus(
  projectId: string,
  featureId: string,
  envId: string,
  enabled: boolean
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const cacheKey = getProjectEnvKey(projectId, envId);

  const { error } = await supabase
    .from("features_env_mapping")
    .update({
      enabled,
    })
    .eq("projectId", projectId)
    .eq("featureId", featureId)
    .eq("envId", envId);
  await clearCache(cacheKey);

  if (!error) {
    revalidatePath(`/dashboard/project/${projectId}/features`);
  }

  return { error };
}
