"use client"
import { motion } from "framer-motion"
import { Upload, Brain, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Coller ou importer",
      description: "Collez le texte de votre contrat ou importez un fichier PDF. Notre OCR traite même les images.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Brain,
      title: "Résumé instantané",
      description: "Notre IA analyse le contrat en quelques secondes et identifie les points clés et les risques.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: CheckCircle,
      title: "Conseils personnalisés",
      description: "Recevez des recommandations adaptées à votre profil et des alertes sur les clauses importantes.",
      color: "from-emerald-500 to-cyan-600",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Comment ça marche ?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trois étapes simples pour comprendre vos contrats et protéger vos droits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Numéro d'étape */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Flèche de connexion */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-300 to-blue-400"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
