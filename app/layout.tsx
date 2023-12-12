import "./globals.css";
import Snowfall from "@/components/Snowfall";
import { getFlag } from "@/utils/flag/client";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Xeploy",
  description: "Deploy your features safely with Xeploy!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snowFlag = await getFlag("let-it-snow", false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          fontSans.variable
        )}
      >
        <main className="relative min-h-screen flex flex-col items-center">
          {snowFlag ? <Snowfall /> : <></>}
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
