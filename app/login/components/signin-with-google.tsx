"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { PUBLIC_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function SignInWithGoogle() {
  const signIn = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${PUBLIC_URL}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login");
    }
  };

  return (
    <Button className="w-[300px] md:w-[400px]" onClick={signIn}>
      <Icons.google className="mr-2 h-4 w-4" /> Sign in with Google
    </Button>
  );
}
