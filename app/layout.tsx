import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteFooter from "./components/shell/SiteFooter";
import SiteHeader from "./components/shell/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aztra.tech"),
  title: "AztraTech | Production-Ready Web3 Infrastructure",
  description:
    "AztraTech builds production-grade Web3 infrastructure | stablecoin payment rails, RWA tokenization, and security engineering for fintech and blockchain companies.",
  openGraph: {
    title: "AztraTech | Production-Ready Web3 Infrastructure",
    description:
      "We build the boring-but-critical layer that makes Web3 products survive enterprise pilots, regulatory reviews, and scale.",
    url: "https://aztra.tech",
    images: [{ url: "/og-image.png", width: 1128, height: 191 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
