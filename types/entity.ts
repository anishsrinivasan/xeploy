import { Database } from "@/types/supabase";
import { z } from "zod";

export type Feature = Database["public"]["Tables"]["features"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Environments = Database["public"]["Tables"]["environments"]["Row"];

export const featuresWithMappingSchema = z.object({
  featureId: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  environments: z.array(
    z.object({
      envId: z.string(),
      name: z.string(),
      enabled: z.boolean(),
    })
  ),
});

export type FeaturesWithMapping = z.infer<typeof featuresWithMappingSchema>;
