import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { SanityLive } from "../sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "Éclat Cosméticos | Consultora Natura, Avon e Jequiti",
  description:
    "Consultora oficial multimarcas. Produtos originais de Natura, Avon e Jequiti com entrega em domicílio e atendimento personalizado pelo WhatsApp.",
  keywords: [
    "cosméticos",
    "Natura",
    "Avon",
    "Jequiti",
    "perfumes",
    "maquiagem",
    "revendedora",
    "consultora de beleza",
    "skincare",
    "entrega em domicílio",
  ],
  openGraph: {
    title: "Éclat Cosméticos | Consultora Multimarcas",
    description:
      "Produtos originais de Natura, Avon e Jequiti. Entrega em domicílio e atendimento via WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-[100vw] overflow-x-hidden`}
      >
        <CartProvider>
          {children}
        </CartProvider>
        <SanityLive />
      </body>
    </html>
  );
}
