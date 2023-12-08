import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getCache, setCache } from "@/utils/upstash/cache";

export const runtime = "edge"; // 'nodejs' is the default

export async function GET(_: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const cacheKey = "ping";

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

  const { data: features, error } = await supabase
    .from("features_env_mapping")
    .select();

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
