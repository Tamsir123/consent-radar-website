"use client"
import { motion } from "framer-motion"
import { NavbarButton } from "@/components/ui/resizable-navbar"
import { Brain, FileText, Shield, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-emerald-50/20 pt-32 pb-20"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Comprenez ce que vous{" "}
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    signez
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-600 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Grâce à l'IA, obtenez un résumé clair de vos contrats numériques, en un clic. Protégez-vous des
                  clauses cachées et prenez des décisions éclairées.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <NavbarButton variant="primary" className="text-lg px-8 py-4">
                  Analyser un contrat maintenant
                </NavbarButton>
                <NavbarButton variant="secondary" className="text-lg px-8 py-4">
                  Voir une démo
                </NavbarButton>
              </motion.div>

              {/* Statistiques */}
              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">10k+</div>
                  <div className="text-sm text-slate-600">Contrats analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">98%</div>
                  <div className="text-sm text-slate-600">Précision IA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5min</div>
                  <div className="text-sm text-slate-600">Temps moyen</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-cyan-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Contrat Instagram</h3>
                      <p className="text-sm text-slate-500">Conditions d'utilisation</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Niveau de risque: Modéré</p>
                        <p className="text-xs text-slate-500">Collecte de données personnelles</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Résiliation: Facile</p>
                        <p className="text-xs text-slate-500">Possible à tout moment</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">IA recommande</p>
                        <p className="text-xs text-slate-500">Vérifiez les paramètres de confidentialité</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Effet de brillance */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-15 blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
