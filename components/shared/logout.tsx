"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function LogoutClient() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again after sometime!",
      });
    }

    router.push("/");
  };

  return <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>;
}
