import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Auth Template",
  description:
    "Fully customizable Next.js App Router authentication template built with Auth.js(NextAuth), Resend and Shadcn UI components.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-full">
        <body className={cn("h-full", inter.className)}>
          <main className="flex h-full justify-center items-center p-2">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
