"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type UserMetaData = {
  id: string;
  avatarUrl: string;
  email: string;
  name: string;
};

export async function getUserData(): Promise<UserMetaData | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const userMetaData: UserMetaData = {
    id: data?.user?.id,
    name: data?.user?.user_metadata?.name,
    avatarUrl: data?.user?.user_metadata?.avatar_url,
    email: data?.user?.email || "",
  };

  return userMetaData;
}
