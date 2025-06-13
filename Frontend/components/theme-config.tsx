"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeConfig() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Définir les variables CSS personnalisées basées sur le logo
  useEffect(() => {
    setMounted(true)

    // Couleurs du logo
    const root = document.documentElement

    // Mode clair
    root.style.setProperty("--logo-primary", "#26b6ff") // Bleu ciel du logo
    root.style.setProperty("--logo-secondary", "#0099e6") // Version plus foncée
    root.style.setProperty("--logo-dark", "#00101a") // Bleu marine foncé du fond

    // Appliquer des styles supplémentaires basés sur le thème
    if (theme === "dark") {
      document.body.classList.add("logo-theme-dark")
    } else {
      document.body.classList.remove("logo-theme-dark")
    }
  }, [theme])

  if (!mounted) return null

  return null
}
