"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { User, Settings, Bell, Shield, Eye, Download, Edit } from "lucide-react"

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    userType: "parent",
    preferences: ["privacy", "finance", "cancellation"],
    notifications: {
      email: true,
      push: false,
      weekly: true,
    },
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

  const stats = [
    { label: "Contrats analysés", value: "23", icon: "📄" },
    { label: "Risques détectés", value: "8", icon: "⚠️" },
    { label: "Temps économisé", value: "12h", icon: "⏰" },
    { label: "Score de protection", value: "85%", icon: "🛡️" },
  ]

  const recommendations = [
    {
      title: "Vérifiez vos paramètres Instagram",
      description: "Votre analyse récente montre des risques de confidentialité",
      priority: "Haute",
      color: "text-red-600",
    },
    {
      title: "Renouvelez votre abonnement Netflix",
      description: "Votre abonnement expire dans 5 jours",
      priority: "Moyenne",
      color: "text-amber-600",
    },
    {
      title: "Nouvelle analyse disponible",
      description: "TikTok a mis à jour ses conditions d'utilisation",
      priority: "Faible",
      color: "text-emerald-600",
    },
  ]

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
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">Mon Profil</h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Gérez vos préférences et consultez vos recommandations personnalisées
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Informations du profil */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Informations personnelles */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                      <User className="w-6 h-6 text-cyan-600" />
                      Informations personnelles
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-900/40 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing ? "Sauvegarder" : "Modifier"}
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Nom complet
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                          />
                        ) : (
                          <p className="text-slate-800 dark:text-white font-medium">{userProfile.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                          />
                        ) : (
                          <p className="text-slate-800 dark:text-white font-medium">{userProfile.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Type d'utilisateur */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Type d'utilisateur
                      </label>
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-3">
                          {userTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setUserProfile((prev) => ({ ...prev, userType: type.id }))}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${
                                userProfile.userType === type.id
                                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                                  : "border-slate-200 dark:border-slate-600 hover:border-cyan-300"
                              }`}
                            >
                              <div className="text-2xl mb-2">{type.icon}</div>
                              <div className="font-medium text-slate-800 dark:text-white">{type.label}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{userTypes.find((t) => t.id === userProfile.userType)?.icon}</span>
                          <span className="font-medium text-slate-800 dark:text-white">
                            {userTypes.find((t) => t.id === userProfile.userType)?.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Préférences d'analyse */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-cyan-600" />
                    Préférences d'analyse
                  </h2>

                  <div className="space-y-3">
                    {preferences.map((pref) => (
                      <label
                        key={pref.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={userProfile.preferences.includes(pref.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUserProfile((prev) => ({
                                ...prev,
                                preferences: [...prev.preferences, pref.id],
                              }))
                            } else {
                              setUserProfile((prev) => ({
                                ...prev,
                                preferences: prev.preferences.filter((p) => p !== pref.id),
                              }))
                            }
                          }}
                          className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                          disabled={!isEditing}
                        />
                        <span className="text-slate-700 dark:text-slate-300">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Paramètres de notification */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-cyan-600" />
                    Notifications
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-white">Notifications par email</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Recevez des alertes importantes par email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userProfile.notifications.email}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, email: e.target.checked },
                          }))
                        }
                        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-white">Notifications push</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Notifications instantanées sur votre appareil
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userProfile.notifications.push}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, push: e.target.checked },
                          }))
                        }
                        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-white">Résumé hebdomadaire</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Rapport hebdomadaire de vos analyses
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={userProfile.notifications.weekly}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, weekly: e.target.checked },
                          }))
                        }
                        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar avec statistiques et recommandations */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Statistiques */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Mes statistiques</h3>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{stat.icon}</span>
                          <span className="text-slate-600 dark:text-slate-300">{stat.label}</span>
                        </div>
                        <span className="font-bold text-cyan-600">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommandations IA */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recommandations IA</h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-slate-800 dark:text-white">{rec.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${rec.color} bg-current bg-opacity-10`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{rec.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Actions rapides</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <Download className="w-5 h-5 text-cyan-600" />
                      <span className="text-slate-700 dark:text-slate-300">Exporter mes données</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-700 dark:text-slate-300">Rapport de sécurité</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <Eye className="w-5 h-5 text-amber-600" />
                      <span className="text-slate-700 dark:text-slate-300">Audit de confidentialité</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
