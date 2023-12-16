import MainNavbar from "@/components/shared/main-navbar";
import "./../globals.css";
import { getUserData } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Xeploy",
  description: "Deploy your features even in the weekend!",
};

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
      {children}
    </div>
  );
}
