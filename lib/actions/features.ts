"use server";
import { FeaturesWithMapping } from "@/types/entity";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getProjectEnvKey, clearCache } from "@/utils/upstash/cache";
import { z } from "zod";
import { getEnvironments } from "./environments";
import { DB_ERROR_CODES } from "../db/codes";

const CreateFeatureSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  projectId: z.string(),
  envEnabled: z.array(z.string()).min(1, "Minimum 1 Environment is needed."),
});

const EditFeatureSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  projectId: z.string(),
  featureId: z.string(),
});

const DeleteFeatureSchema = z.object({
  projectId: z.string(),
  featureId: z.string(),
});

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

export async function CreateFeatureEnvMapping(
  projectId: string,
  featureId: string,
  envEnabled: string[]
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const environments = await getEnvironments(projectId);
  let error = null;

  for (const env of environments) {
    const { error: insertError } = await supabase
      .from("features_env_mapping")
      .insert({
        projectId,
        featureId,
        envId: env.envId,
        enabled: envEnabled.includes(env.envId),
      });

    if (insertError) {
      error = insertError;
      console.error("CreateFeatureEnvMappingErr", insertError, {
        projectId,
        featureId,
      });
      break;
    }
  }

  return { error };
}

export async function createFeature(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    envEnabled: formData.getAll("envEnabled"),
  };

  const validatedFields = CreateFeatureSchema.safeParse(baseData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error("CreateFeatureValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { projectId, envEnabled } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data: featureData } = await supabase
    .from("features")
    .insert({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      projectId: validatedFields.data.projectId,
    })
    .select();

  if (error) {
    console.error("CreateFeatureFailed", error);
    if (error.code === DB_ERROR_CODES.DUPLICATE_CONSTRAINT) {
      return {
        message: "The name already exists, Please use a different name!",
        error,
      };
    }

    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  const { error: featureEnvMappingError } = await CreateFeatureEnvMapping(
    projectId,
    featureData[0].featureId,
    envEnabled
  );

  if (featureEnvMappingError) {
    console.error("CreateFeatureMappingFailed", error);
    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Project Created" };
}

export async function editFeature(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    featureId: formData.get("featureId"),
  };

  const validatedFields = EditFeatureSchema.safeParse(baseData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error("EditFeatureValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { featureId } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data: featureData } = await supabase
    .from("features")
    .update({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
    })
    .eq("featureId", featureId);

  if (error) {
    console.error("EditFeatureFailed", error);
    if (error.code === DB_ERROR_CODES.DUPLICATE_CONSTRAINT) {
      return {
        message: "The name already exists, Please use a different name!",
        error,
      };
    }

    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Feature Updated" };
}

export async function deleteFeature(formData: FormData) {
  "use server";

  const baseData = {
    projectId: formData.get("projectId"),
    featureId: formData.get("featureId"),
  };

  const validatedFields = DeleteFeatureSchema.safeParse(baseData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.error("EditFeatureValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { featureId, projectId } = validatedFields.data;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error: deleteFeatureEnvMappingError } = await supabase
    .from("features_env_mapping")
    .delete()
    .eq("featureId", featureId)
    .eq("projectId", projectId);

  if (deleteFeatureEnvMappingError) {
    console.error(
      "DeleteFeatureEnvMappingFailed",
      deleteFeatureEnvMappingError
    );
    return {
      message: "Something went wrong, Try later",
      error: deleteFeatureEnvMappingError,
    };
  }

  const { error: deleteFeatureError } = await supabase
    .from("features")
    .delete()
    .eq("featureId", featureId)
    .eq("projectId", projectId);

  if (deleteFeatureError) {
    console.error("DeleteFeatureFailed", deleteFeatureError);
    return {
      message: "Something went wrong, Try later",
      error: deleteFeatureError,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Feature Deleted" };
}
