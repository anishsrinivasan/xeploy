import MainNavbar from "@/components/shared/main-navbar";
import "./../globals.css";
import { getUserData } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import Demobar from "@/components/shared/demo-bar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <MainNavbar />
      <Demobar />
      {children}
    </div>
  );
}
