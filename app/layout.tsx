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
  metadataBase: new URL("https://altariaa.com"), 
  title: "Altaria | Una pequeña pieza. Una gran diferencia.",
  description: "En segundos, tu cliente puede calificar y compartir su experiencia. Más reseñas, más confianza y mayor visibilidad para tu negocio en Google.",
  generator: "Next.js",
  applicationName: "Altaria",
  authors: [{ name: "Altaria Team" }],
  keywords: ["NFC", "Código QR", "Google Reviews", "Reseñas Google", "Displays Inteligentes", "Marketing para Negocios", "El Salvador"],
  
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "https://altariaa.com", 
    title: "Altaria | Una pequeña pieza. Una gran diferencia.",
    description: "En segundos, tu cliente puede calificar y compartir su experiencia. Más reseñas, más confianza y mayor visibilidad para tu negocio en Google.",
    siteName: "Altaria",
    images: [
      {
        url: "https://altariaa.com/publico.jpeg", // obligatoria para redes
        width: 800,
        height: 800,
        alt: "Logo Altaria - Displays Inteligentes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Altaria | Una pequeña pieza. Una gran diferencia.",
    description: "En segundos, tu cliente puede calificar y compartir su experiencia. Más reseñas, más confianza y mayor visibilidad para tu negocio en Google.",
    images: ["https://altariaa.com/publico.jpeg"], //
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/publico.jpeg",
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