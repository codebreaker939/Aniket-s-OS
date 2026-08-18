import type { Metadata, Viewport } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner }]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080a"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
