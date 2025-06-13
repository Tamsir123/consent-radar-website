import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { ThemeConfig } from "@/components/theme-config"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClairContrat - Comprenez ce que vous signez",
  description:
    "L'intelligence artificielle qui démystifie vos contrats numériques. Obtenez des résumés clairs, des alertes personnalisées et protégez-vous des clauses cachées.",
  keywords: [
    "contrat",
    "intelligence artificielle",
    "IA",
    "conditions d'utilisation",
    "CGU",
    "protection des données",
    "analyse de contrat",
  ],
  authors: [{ name: "ClairContrat" }],
  openGraph: {
    title: "ClairContrat - Comprenez ce que vous signez",
    description:
      "L'intelligence artificielle qui démystifie vos contrats numériques pour vous protéger des clauses cachées.",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ThemeConfig />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
