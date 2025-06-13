"use client"
import { motion } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ExternalLink, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function ResumesPopulairesPage() {
  const summaries = [
    {
      name: "Instagram",
      icon: "📸",
      summary:
        "Collecte extensive de données personnelles incluant photos, messages, géolocalisation. Partage avec Meta et partenaires publicitaires. Algorithme de recommandation opaque.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: [
        "Données partagées avec Facebook et WhatsApp",
        "Géolocalisation collectée en permanence",
        "Résiliation facile mais données conservées",
      ],
    },
    {
      name: "TikTok",
      icon: "🎵",
      summary:
        "Accès très large aux données personnelles, transferts vers la Chine, algorithme hautement personnalisé. Collecte de données biométriques et comportementales avancées.",
      riskLevel: "Élevé",
      riskColor: "text-red-600",
      highlights: [
        "Données envoyées vers des serveurs chinois",
        "Accès aux contacts et calendrier",
        "Suppression de compte complexe",
      ],
    },
    {
      name: "YouTube",
      icon: "📺",
      summary:
        "Intégration complète avec l'écosystème Google. Historique de visionnage détaillé, recommandations basées sur l'IA. Contrôles de confidentialité disponibles.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: [
        "Contrôle granulaire des données",
        "Historique effaçable facilement",
        "Transparence sur l'utilisation des données",
      ],
    },
    {
      name: "WhatsApp",
      icon: "💬",
      summary:
        "Messages chiffrés de bout en bout, mais métadonnées collectées. Partage limité avec Meta depuis 2021. Sauvegardes non chiffrées sur le cloud.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: [
        "Chiffrement bout en bout des messages",
        "Métadonnées de connexion collectées",
        "Sauvegarde cloud optionnelle",
      ],
    },
    {
      name: "Spotify",
      icon: "🎧",
      summary:
        "Analyse approfondie des goûts musicaux, partage avec labels et artistes. Publicités ciblées basées sur l'écoute. Données d'humeur et d'activité collectées.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: [
        "Profil musical détaillé créé",
        "Partage avec l'industrie musicale",
        "Export de données personnelles possible",
      ],
    },
    {
      name: "Netflix",
      icon: "🎬",
      summary:
        "Historique de visionnage complet, analyse des préférences, profils familiaux. Recommandations basées sur l'IA. Contrôle parental avancé disponible.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: ["Contrôle parental robuste", "Données de visionnage analysées", "Résiliation simple sans pénalités"],
    },
  ]

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Élevé":
        return <AlertTriangle className="w-4 h-4" />
      case "Modéré":
        return <Shield className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30 dark:from-slate-900 dark:to-slate-800 pt-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">Résumés populaires</h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Découvrez ce que cachent vraiment les conditions d'utilisation des applications que vous utilisez
                quotidiennement. Analyses détaillées par notre IA.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {summaries.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <CardSpotlight className="h-full">
                    <div className="relative z-20 space-y-6">
                      {/* En-tête */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{app.icon}</div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{app.name}</h3>
                            <div className={`flex items-center gap-2 ${app.riskColor}`}>
                              {getRiskIcon(app.riskLevel)}
                              <span className="text-sm font-medium">Risque {app.riskLevel}</span>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate-400 hover:text-cyan-600 cursor-pointer transition-colors" />
                      </div>

                      {/* Résumé */}
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{app.summary}</p>

                      {/* Points clés */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800 dark:text-white">Points clés :</h4>
                        <ul className="space-y-2">
                          {app.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bouton d'action */}
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                        Lire l'analyse complète
                      </button>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>

            {/* Bandeau de confiance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-cyan-100 dark:border-cyan-800/20"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Votre contrat n'est pas dans la liste ?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Analysez n'importe quel contrat avec notre IA en quelques secondes
                </p>
                <button className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                  Analyser un nouveau contrat
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
