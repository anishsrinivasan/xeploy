import MainNavbar from "@/shared/main-navbar";
import "./../globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Flagsafe",
  description: "The Safest way to deploy features!",
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
