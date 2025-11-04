import type { Metadata } from "next";
import "../styles/globals.css";
import { calSemibold, geistMono, geistSans, inter, matter, robotoMono } from "../../public/fonts";
import { ToastProvider } from "@/components/ui/toast";
import Footer from "@/components/sections/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "Proofly - Blockchain-Based Document Verification Platform",
    template: "%s | Proofly",
  },
  description: "Proofly is a decentralized platform built on Internet Computer Protocol (ICP) for secure document verification and authentication. Verify certificates, degrees, and official documents with blockchain technology.",
  keywords: [
    "blockchain",
    "document verification",
    "ICP",
    "Internet Computer",
    "certificate verification",
    "degree authentication",
    "decentralized verification",
    "Web3",
    "document authentication",
    "blockchain certificates",
  ],
  authors: [{ name: "Proofly Team" }],
  creator: "Proofly",
  publisher: "Proofly",
  metadataBase: new URL('https://proofly.io'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://proofly.io",
    title: "Proofly - Blockchain-Based Document Verification Platform",
    description: "Verify certificates, degrees, and official documents securely with blockchain technology on the Internet Computer Protocol.",
    siteName: "Proofly",
    images: [
      {
        url: "/images/proofly-logo.png",
        width: 1200,
        height: 630,
        alt: "Proofly - Blockchain Document Verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proofly - Blockchain-Based Document Verification",
    description: "Verify certificates and documents securely with blockchain technology on ICP",
    images: ["/images/proofly-logo.png"],
    creator: "@proofly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/proofly-logo.png",
    apple: "/images/proofly-logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${calSemibold.variable} ${matter.variable} ${inter.variable} ${robotoMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased light`}
      >
        <AuthProvider>
          <ToastProvider>
            <ConditionalNavbar />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}