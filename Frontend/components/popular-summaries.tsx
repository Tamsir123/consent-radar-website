"use client"
import { motion } from "framer-motion"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { ExternalLink, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function PopularSummaries() {
  const summaries = [
    {
      name: "Instagram",
      icon: "📸",
      summary: "Collecte extensive de données personnelles, partage avec Meta, publicités ciblées.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: ["Données partagées avec Facebook", "Géolocalisation collectée", "Résiliation facile"],
    },
    {
      name: "TikTok",
      icon: "🎵",
      summary: "Accès large aux données, algorithme opaque, transferts internationaux de données.",
      riskLevel: "Élevé",
      riskColor: "text-red-600",
      highlights: ["Données envoyées en Chine", "Accès aux contacts", "Difficile à supprimer"],
    },
    {
      name: "YouTube",
      icon: "📺",
      summary: "Intégration Google, historique de visionnage, recommandations personnalisées.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: ["Contrôle des données", "Historique effaçable", "Transparence Google"],
    },
    {
      name: "WhatsApp",
      icon: "💬",
      summary: "Messages chiffrés, métadonnées collectées, partage avec Meta limité.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: ["Chiffrement bout en bout", "Métadonnées collectées", "Sauvegarde optionnelle"],
    },
    {
      name: "Spotify",
      icon: "🎧",
      summary: "Données d'écoute, recommandations, partage avec partenaires publicitaires.",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      highlights: ["Goûts musicaux analysés", "Pub personnalisée", "Export de données possible"],
    },
    {
      name: "Netflix",
      icon: "🎬",
      summary: "Historique de visionnage, profils familiaux, recommandations basées sur l'IA.",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      highlights: ["Contrôle parental", "Données de visionnage", "Résiliation simple"],
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
    <section id="popular" className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Résumés populaires</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez ce que cachent les conditions d'utilisation des applications que vous utilisez quotidiennement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {summaries.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardSpotlight className="h-full">
                  <div className="relative z-20 space-y-6">
                    {/* En-tête */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{app.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800">{app.name}</h3>
                          <div className={`flex items-center gap-2 ${app.riskColor}`}>
                            {getRiskIcon(app.riskLevel)}
                            <span className="text-sm font-medium">Risque {app.riskLevel}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-400 hover:text-cyan-600 cursor-pointer transition-colors" />
                    </div>

                    {/* Résumé */}
                    <p className="text-slate-600 leading-relaxed">{app.summary}</p>

                    {/* Points clés */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Points clés :</h4>
                      <ul className="space-y-2">
                        {app.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-cyan-100"
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-800">Faites confiance à ClairContrat</h3>
              <p className="text-slate-600">
                Rejoignez des milliers d'utilisateurs qui protègent leurs droits numériques
              </p>
              <div className="flex justify-center items-center gap-8 mt-8 opacity-60">
                <div className="text-2xl">📸</div>
                <div className="text-2xl">🎵</div>
                <div className="text-2xl">📺</div>
                <div className="text-2xl">💬</div>
                <div className="text-2xl">🎧</div>
                <div className="text-2xl">🎬</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
