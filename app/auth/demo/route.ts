import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD, PUBLIC_URL } from "@/constants";

export async function GET() {
  const email = DEMO_USER_EMAIL;
  const password = DEMO_USER_PASSWORD;
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return NextResponse.redirect(`${PUBLIC_URL}/dashboard`, {
    status: 307,
  });
}
