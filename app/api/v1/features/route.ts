import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getCache, getProjectEnvKey, setCache } from "@/utils/upstash/cache";
import { ERROR_MESSAGES } from "@/constants/errors";
import { verifyAPIToken } from "@/lib/auth/api-token";
import { API_CACHE_KEY } from "@/constants";
import { getErrorMessage } from "@/lib/helpers/error";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let projectId = "";
  let envId = "";

  try {
    const payload = await verifyAPIToken(req);
    projectId = payload.projectId;
    envId = payload.envId;
  } catch (err) {
    let message = "Token not valid, Authentication failed!";
    if (getErrorMessage(err) === "Token Missing") {
      message = "Token Missing, Authentication failed!";
    }
    return new NextResponse(
      JSON.stringify({
        message,
      }),
      { status: 401 }
    );
  }

  const cacheKey = getProjectEnvKey(projectId, envId);

  const cacheResponse = await getCache(cacheKey);
  if (cacheResponse.cached === "HIT") {
    return NextResponse.json(
      {
        features: cacheResponse.data,
        error: null,
      },
      {
        headers: {
          [API_CACHE_KEY]: "HIT",
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
    console.error("features_env_mapping Response Err", error);
    return NextResponse.json(
      {
        features: [],
        error: ERROR_MESSAGES.INTERNAL_ERROR,
      },
      {
        headers: {
          [API_CACHE_KEY]: "MISS",
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
        [API_CACHE_KEY]: "MISS",
      },
      status: 200,
    }
  );
}
