"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { DB_ERROR_CODES } from "../db/codes";
import { getFeatures } from "./features";
import { generateToken } from "../auth/api-token";

const CreateEnvironmentSchema = z.object({
  name: z.string(),
  projectId: z.string(),
});

const EditEnvironmentSchema = z.object({
  name: z.string(),
  projectId: z.string(),
  envId: z.string(),
});

const DeleteEnvironmentSchema = z.object({
  projectId: z.string(),
  envId: z.string(),
});

const generateAPITokenSchema = z.object({
  projectId: z.string(),
  envId: z.string(),
});

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

export async function CreateFeatureEnvMapping(
  projectId: string,
  envId: string
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const features = await getFeatures(projectId);
  let error = null;

  for (const feature of features) {
    const { error: insertError } = await supabase
      .from("features_env_mapping")
      .insert({
        projectId,
        featureId: feature.featureId,
        envId: envId,
        enabled: false, // Disabling the features by default
      });

    if (insertError) {
      error = insertError;
      console.error("CreateFeatureEnvMappingErr", insertError, {
        projectId,
        envId,
      });
      break;
    }
  }

  return { error };
}

export async function createEnvironment(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
    projectId: formData.get("projectId"),
  };

  const validatedFields = CreateEnvironmentSchema.safeParse(baseData);

  if (!validatedFields.success) {
    console.error("CreateEnvironmentValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { projectId, name } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error, data: envData } = await supabase
    .from("environments")
    .insert({
      name: name,
      projectId: projectId,
    })
    .select();

  if (error) {
    console.error("CreateEnvironmentFailed", error);
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

  const envId = envData[0].envId;
  const { error: featureEnvMappingError } = await CreateFeatureEnvMapping(
    projectId,
    envId
  );

  if (featureEnvMappingError) {
    console.error("CreateFeatureMappingFailed", featureEnvMappingError);
    return {
      message: "Something went wrong, Try later",
      error: true,
    };
  }

  const generateAPITokenErr = await generateTokenAndUpdate(envId, projectId);
  if (generateAPITokenErr) {
    console.error("generateAPITokenFailed", generateAPITokenErr);
    return {
      message: "Something went wrong, Try later",
      error: true,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Environment Created" };
}

export async function editEnvironment(formData: FormData) {
  "use server";

  const baseData = {
    name: formData.get("name"),
    projectId: formData.get("projectId"),
    envId: formData.get("envId"),
  };

  const validatedFields = EditEnvironmentSchema.safeParse(baseData);

  if (!validatedFields.success) {
    console.error("EditEnvironmentValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { envId } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("environments")
    .update({
      name: validatedFields.data.name,
    })
    .eq("envId", envId);

  if (error) {
    console.error("EditEnvironmentFailed", error);
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
  return { error: null, message: "Environment Updated" };
}

export async function deleteEnvironment(formData: FormData) {
  "use server";

  const baseData = {
    projectId: formData.get("projectId"),
    envId: formData.get("envId"),
  };

  const validatedFields = DeleteEnvironmentSchema.safeParse(baseData);

  if (!validatedFields.success) {
    console.error("DeleteEnvironmentValidationFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { envId, projectId } = validatedFields.data;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error: deleteFeatureEnvMappingError } = await supabase
    .from("features_env_mapping")
    .delete()
    .eq("envId", envId)
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
    .from("environments")
    .delete()
    .eq("envId", envId)
    .eq("projectId", projectId);

  if (deleteFeatureError) {
    console.error("DeleteEnvironmentFailed", deleteFeatureError);
    return {
      message: "Something went wrong, Try later",
      error: deleteFeatureError,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Environment Deleted" };
}

export async function generateTokenAndUpdate(envId: string, projectId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const apiToken = await generateToken({ envId, projectId });
  const { error } = await supabase
    .from("environments")
    .update({
      apiToken: apiToken,
    })
    .eq("envId", envId)
    .eq("projectId", projectId);

  return error;
}

export async function generateAPIToken(formData: FormData) {
  "use server";

  const baseData = {
    projectId: formData.get("projectId"),
    envId: formData.get("envId"),
  };

  const validatedFields = generateAPITokenSchema.safeParse(baseData);

  if (!validatedFields.success) {
    console.error("generateAPITokenFailed");
    const errorMessage = validatedFields.error.issues
      .map((x) => x.message)
      .join(",");
    return {
      message: errorMessage || "Validation Failed",
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { envId, projectId } = validatedFields.data;
  const { data: isExistData, error: isExistError } = await supabase
    .from("environments")
    .select()
    .eq("envId", envId)
    .eq("projectId", projectId);

  if (!isExistData || isExistError || isExistData.length < 1) {
    return {
      error: true,
      message: "Oops, Something suspicious!",
    };
  }

  const error = await generateTokenAndUpdate(envId, projectId);
  if (error) {
    console.error("generateAPITokenFailed", error);
    return {
      message: "Something went wrong, Try later",
      error,
    };
  }

  revalidatePath(
    `/dashboard/project/${validatedFields.data.projectId}`,
    "layout"
  );
  return { error: null, message: "Token Updated" };
}
