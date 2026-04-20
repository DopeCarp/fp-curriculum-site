import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SiteShell } from "@/components/shared/site-shell";

export const metadata: Metadata = {
  title: "Public & Foundation Courses",
  description: "Bilingual curriculum prototype for the F+P Group design school.",
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
