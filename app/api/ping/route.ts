import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getCache, setCache } from "@/utils/upstash/cache";
import { MOCK_ENVIRONMENT_ID, MOCK_PROJECT_ID } from "@/app/constants";

export const runtime = "edge";

export async function GET(_: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const cacheKey = "ping";

  const projectId = MOCK_PROJECT_ID;
  const envId = MOCK_ENVIRONMENT_ID;

  const cacheResponse = await getCache(cacheKey);
  if (cacheResponse.cached === "HIT") {
    return NextResponse.json(
      {
        features: cacheResponse.data,
        error: null,
      },
      {
        headers: {
          "flag-cache": "HIT",
        },
        status: 200,
      }
    );
  }

  const { data: dbResponse, error } = await supabase
    .from("features_env_mapping")
    .select(`enabled, features(name)`)
    .eq("projectId", projectId)
    .eq("envId", envId);

  if (error) {
    return NextResponse.json(
      {
        features: [],
        error,
      },
      {
        headers: {
          "flag-cache": "MISS",
        },
        status: 500,
      }
    );
  }

  const features = dbResponse.map((x) => ({
    name: x.features?.name,
    enabled: x.enabled,
  }));

  setCache(cacheKey, features, 60 * 60);

  return NextResponse.json(
    {
      features,
      error,
    },
    {
      headers: {
        "flag-cache": "MISS",
      },
      status: 200,
    }
  );
}
