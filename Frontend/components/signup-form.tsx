"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { User, Lock, Users, Settings } from "lucide-react"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    preferences: [],
  })

  const userTypes = [
    { id: "student", label: "Étudiant", icon: "🎓" },
    { id: "parent", label: "Parent", icon: "👨‍👩‍👧‍👦" },
    { id: "professional", label: "Professionnel", icon: "💼" },
    { id: "senior", label: "Senior", icon: "👴" },
  ]

  const preferences = [
    { id: "privacy", label: "Protection des données personnelles" },
    { id: "finance", label: "Clauses financières et frais" },
    { id: "cancellation", label: "Conditions de résiliation" },
    { id: "liability", label: "Responsabilité et garanties" },
    { id: "international", label: "Transferts internationaux" },
  ]

  const handlePreferenceChange = (prefId: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(prefId)
        ? prev.preferences.filter((p) => p !== prefId)
        : [...prev.preferences, prefId],
    }))
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Créez votre profil</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Plus vous personnalisez, plus on peut vous protéger.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              {/* Formulaire */}
              <div className="p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Informations de base */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <User className="w-6 h-6 text-cyan-600" />
                      Informations de base
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="Votre nom complet"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="Mot de passe sécurisé"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Type d'utilisateur */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <Users className="w-6 h-6 text-cyan-600" />
                      Type d'utilisateur
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {userTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFormData((prev) => ({ ...prev, userType: type.id }))}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            formData.userType === type.id
                              ? "border-cyan-500 bg-cyan-50"
                              : "border-slate-200 hover:border-cyan-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="font-medium text-slate-800">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Préférences */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <Settings className="w-6 h-6 text-cyan-600" />
                      Préférences d'analyse
                    </h3>

                    <div className="space-y-3">
                      {preferences.map((pref) => (
                        <label
                          key={pref.id}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.preferences.includes(pref.id)}
                            onChange={() => handlePreferenceChange(pref.id)}
                            className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                          />
                          <span className="text-slate-700">{pref.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bouton de création */}
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                    Créer mon profil
                  </button>
                </div>
              </div>

              {/* Illustration */}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center text-white space-y-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold">Protection personnalisée</h3>
                  <p className="text-cyan-100 leading-relaxed">
                    Votre profil nous aide à identifier les risques qui vous concernent le plus et à vous fournir des
                    conseils adaptés à votre situation.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Analyses personnalisées</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Alertes ciblées</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Conseils d'experts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
