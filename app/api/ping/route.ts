import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const runtime = "edge"; // 'nodejs' is the default

export async function GET(_: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
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
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      features,
      error,
    },
    {
      status: 200,
    }
  );
}
