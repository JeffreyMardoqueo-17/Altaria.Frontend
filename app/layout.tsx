import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración completa de Metadatos y Open Graph para WhatsApp / Redes Sociales
export const metadata: Metadata = {
  title: "Altaria",
  description: "Displays inteligentes con tecnología NFC y código QR para convertir visitas en nuevas oportunidades y conseguir más reseñas en Google. Sin mensualidades.",
  generator: "Next.js",
  applicationName: "Altaria",
  authors: [{ name: "Altaria Team" }],
  keywords: ["NFC", "Código QR", "Google Reviews", "Reseñas Google", "Displays Inteligentes", "Marketing para Negocios", "El Salvador"],
  
  // Configuración para WhatsApp, Facebook y LinkedIn (Open Graph)
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "https://altariaa", // Reemplaza con tu dominio final cuando esté en producción
    title: "Altaria",
    description: "Haz tu negocio imposible de olvidar. Consigue más reseñas en Google con tecnología NFC y código QR de forma rápida y sencilla.",
    siteName: "Altaria",
    images: [
      {
        url: "/logo.jpeg", // Archivo ubicado en tu carpeta /public/logo.jpeg
        width: 800,
        height: 800,
        alt: "Logo Altaria - Displays Inteligentes",
      },
    ],
  },

  // Configuración para Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Altaria",
    description: "Haz tu negocio imposible de olvidar. Consigue más reseñas en Google con tecnología NFC y código QR.",
    images: ["/logo.jpeg"],
  },

  // Iconos y Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}