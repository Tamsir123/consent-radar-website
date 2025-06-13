"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Search, FileText, Calendar, AlertTriangle, CheckCircle, Shield } from "lucide-react"

export default function HistoriquePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRisk, setFilterRisk] = useState("all")

  const contracts = [
    {
      id: 1,
      name: "Conditions d'utilisation Instagram",
      type: "Réseau social",
      date: "2024-01-15",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      summary: "Collecte extensive de données personnelles, partage avec Meta",
      status: "Analysé",
    },
    {
      id: 2,
      name: "Abonnement Netflix Premium",
      type: "Streaming",
      date: "2024-01-10",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Conditions claires, résiliation facile, pas de frais cachés",
      status: "Analysé",
    },
    {
      id: 3,
      name: "CGU TikTok",
      type: "Réseau social",
      date: "2024-01-08",
      riskLevel: "Élevé",
      riskColor: "text-red-600",
      summary: "Transferts de données vers la Chine, accès large aux données",
      status: "Analysé",
    },
    {
      id: 4,
      name: "Contrat Spotify Premium",
      type: "Musique",
      date: "2024-01-05",
      riskLevel: "Modéré",
      riskColor: "text-amber-600",
      summary: "Analyse des goûts musicaux, publicités ciblées",
      status: "Analysé",
    },
    {
      id: 5,
      name: "Conditions WhatsApp Business",
      type: "Messagerie",
      date: "2024-01-03",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Messages chiffrés, métadonnées collectées",
      status: "Analysé",
    },
    {
      id: 6,
      name: "Abonnement YouTube Premium",
      type: "Streaming",
      date: "2024-01-01",
      riskLevel: "Faible",
      riskColor: "text-emerald-600",
      summary: "Intégration Google, contrôles de confidentialité disponibles",
      status: "Analysé",
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

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || contract.type === filterType
    const matchesRisk = filterRisk === "all" || contract.riskLevel === filterRisk
    return matchesSearch && matchesType && matchesRisk
  })

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
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                Historique personnel
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Retrouvez tous les contrats que vous avez analysés avec ClairContrat. Recherchez, filtrez et révisez vos
                analyses précédentes.
              </p>
            </motion.div>

            {/* Barre de recherche et filtre */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Recherche */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un contrat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 dark:text-white"
                  />
                </div>

                {/* Filtres */}
                <div className="flex gap-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                  >
                    <option value="all">Tous les types</option>
                    <option value="Réseau social">Réseau social</option>
                    <option value="Streaming">Streaming</option>
                    <option value="Messagerie">Messagerie</option>
                    <option value="Musique">Musique</option>
                  </select>

                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                  >
                    <option value="all">Tous les risques</option>
                    <option value="Faible">Risque faible</option>
                    <option value="Modéré">Risque modéré</option>
                    <option value="Élevé">Risque élevé</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Liste des contrats */}
            <div className="space-y-4">
              {filteredContracts.map((contract, index) => (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{contract.name}</h3>
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                            {contract.type}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 mb-3">{contract.summary}</p>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-500 dark:text-slate-400">
                              {new Date(contract.date).toLocaleDateString("fr-FR")}
                            </span>
                          </div>

                          <div className={`flex items-center gap-2 ${contract.riskColor}`}>
                            {getRiskIcon(contract.riskLevel)}
                            <span className="font-medium">Risque {contract.riskLevel}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-slate-500 dark:text-slate-400">{contract.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        Télécharger
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5">
                        Revoir analyse
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message si aucun résultat */}
            {filteredContracts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">Aucun contrat trouvé</h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Essayez de modifier vos critères de recherche ou analysez votre premier contrat.
                </p>
                <button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200">
                  Analyser un contrat
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
