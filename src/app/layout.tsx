import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SiteShell } from "@/components/shared/site-shell";

export const metadata: Metadata = {
  title: "公共与基础课程 / Public & Foundation Courses",
  description: "F+P 学组双语课程原型网站 / Bilingual curriculum prototype for the F+P Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
