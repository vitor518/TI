import type React from "react"
import type { Metadata } from "next"
// MUDANÇA: Importando a fonte Inter do Google Fonts
import { Inter, Space_Mono } from "next/font/google" 
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

// USO CORRIGIDO: Configurando a Inter como fonte principal sans-serif
// e Space Mono para a mono.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" })

// Você pode aplicar as classes Tailwind CSS globais no globals.css usando estas variáveis
// ou aplicá-las diretamente no <html>, como mostrado abaixo.

export const metadata: Metadata = {
  // <CHANGE> Updated metadata for the platform
  title: "Tecnologia da Informação | Universidade Brasileira Livre",
  description:
    "O curso mais completo de TI do Brasil. 12 semestres, 6 especializações, conteúdo de universidades de elite mundial. 100% gratuito.",
  keywords: [
    "tecnologia da informação",
    "programação",
    "curso gratuito",
    "ciência de dados",
    "cybersecurity",
    "cloud computing",
  ],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // A classe do font é aplicada no <html>, garantindo que a fonte seja carregada
    <html lang="pt-BR" className={`${inter.variable} ${spaceMono.variable}`}>
      {/* Removemos a classe font-sans da body se você estiver usando Tailwind, pois já está no <html> */}
      <body className={`antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}