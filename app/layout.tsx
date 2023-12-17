import "./globals.css";
import Snowfall from "@/components/Snowfall";
import { getFlag } from "@/utils/flag/client";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { PUBLIC_URL } from "@/constants";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL(PUBLIC_URL),
  title: "Xeploy - Launch your Features safely with on-demand rollback.",
  description: " Xeploy is a feature-flagging app that simplifies the process of deploying features.",
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
