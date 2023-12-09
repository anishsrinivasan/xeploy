import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Snowfall from "@/components/Snowfall";
import { getFlag } from "@/utils/flag/client";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FlagSafe.app",
  description: "A fail safe way to deploy new features.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snowFlag = await getFlag("let_it_snow", false);

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {snowFlag ? <Snowfall /> : <></>}
          {children}
        </main>
      </body>
    </html>
  );
}
