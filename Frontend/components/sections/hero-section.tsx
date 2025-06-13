"use client"
import { motion } from "framer-motion"
import { NavbarButton } from "@/components/ui/resizable-navbar"
import { Brain, FileText, Shield, Zap } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/30 to-brand-50/20 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 pt-32 pb-20">
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
                  className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Comprenez ce que vous{" "}
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                    signez
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Grâce à l'intelligence artificielle, obtenez un résumé clair et des alertes personnalisées sur vos
                  contrats numériques. Protégez-vous des clauses cachées et prenez des décisions éclairées en toute
                  confiance.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <NavbarButton variant="primary" className="text-lg px-8 py-4" href="/chat">
                  Analyser un contrat maintenant
                </NavbarButton>
                <NavbarButton variant="secondary" className="text-lg px-8 py-4" href="/demo">
                  Voir une démo
                </NavbarButton>
              </motion.div>

              {/* Statistiques */}
              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-navy-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">15k+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Contrats analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">98%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Précision IA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">2min</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Temps moyen</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Illustration - Contrat simplifié avec IA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-navy-800 rounded-3xl shadow-2xl p-8 border border-brand-100 dark:border-brand-800/20">
                <div className="space-y-6">
                  {/* En-tête du contrat */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Conditions d'utilisation</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Instagram • 47 pages</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Analyse IA */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Niveau de risque: Modéré
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Collecte étendue de données personnelles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Résiliation: Facile</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Suppression possible à tout moment</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">IA recommande</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Vérifiez vos paramètres de confidentialité
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score de lisibilité */}
                  <div className="bg-slate-50 dark:bg-navy-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Score de lisibilité
                      </span>
                      <span className="text-sm font-bold text-amber-600">6/10</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-navy-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>

                {/* Effets de brillance */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full opacity-15 blur-xl"></div>
              </div>
            </motion.div>
          </div>

          {/* Section "Comment ça marche" intégrée */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Trois étapes simples pour protéger vos droits numériques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Coller ou importer",
                  description:
                    "Collez le texte de votre contrat ou importez un fichier PDF. Notre OCR traite même les images de contrats.",
                  color: "from-brand-400 to-brand-600",
                },
                {
                  icon: Brain,
                  title: "Résumé instantané",
                  description:
                    "Notre IA analyse le contrat en quelques secondes et identifie automatiquement les points clés et les risques potentiels.",
                  color: "from-brand-500 to-brand-700",
                },
                {
                  icon: Shield,
                  title: "Conseils personnalisés",
                  description:
                    "Recevez des recommandations adaptées à votre profil et des alertes sur les clauses importantes à surveiller.",
                  color: "from-brand-400 to-brand-600",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-navy-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Numéro d'étape */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Flèche de connexion */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-brand-300 to-brand-400"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-brand-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bandeau de confiance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg border border-brand-100 dark:border-brand-800/20"
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Faites confiance à ClairContrat</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Rejoignez des milliers d'utilisateurs qui protègent leurs droits numériques avec notre IA
              </p>
              <div className="flex justify-center items-center gap-8 mt-8 opacity-60">
                <div className="text-3xl">📸</div>
                <div className="text-3xl">🎵</div>
                <div className="text-3xl">📺</div>
                <div className="text-3xl">💬</div>
                <div className="text-3xl">🎧</div>
                <div className="text-3xl">🎬</div>
                <div className="text-3xl">🛒</div>
                <div className="text-3xl">💳</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
