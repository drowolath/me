import type { Metadata } from "next";
import { Source_Serif_4, Fira_Code } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thomas Ayih-Akakpo — Enterprise Systems Architect",
  description:
    "Integration & Data Engineering Lead. I find where distributed systems are structurally weak, and rebuild them to scale.",
  metadataBase: new URL("https://thomas.ayih-akakpo.org"),
  openGraph: {
    title: "Thomas Ayih-Akakpo — Enterprise Systems Architect",
    description:
      "Integration & Data Engineering Lead. I find where distributed systems are structurally weak, and rebuild them to scale.",
    url: "https://thomas.ayih-akakpo.org",
    siteName: "Thomas Ayih-Akakpo",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
