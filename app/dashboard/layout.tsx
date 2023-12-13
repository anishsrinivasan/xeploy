import MainNavbar from "@/components/shared/main-navbar";
import "./../globals.css";

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
  return (
    <div className="w-full">
      <MainNavbar />
      {children}
    </div>
  );
}
