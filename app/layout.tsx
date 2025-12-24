"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "../styles/globals.css";
import Header from '@/components/Header';
import { ThemeProvider } from "@/components/ThemeProvider";
import BubbleChat from "@/components/BubbleChat";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/login" || pathname === "/register";

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {!hideHeader && <Header />}
          <main className="w-full min-h-screen">
            {children}
            <BubbleChat />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}