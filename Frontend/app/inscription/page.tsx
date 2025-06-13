// "use client"
// import { motion } from "framer-motion"
// import type React from "react"

// import { useState } from "react"
// import Navigation from "@/components/layout/navbar"
// import Footer from "@/components/layout/footer"
// import { User, Lock, Users, Settings, Shield, Brain } from "lucide-react"

// export default function InscriptionPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     birthDate: "",
//     gender: "",
//     userType: "",
//     preferences: [],
//     acceptTerms: false,
//   })

//   const userTypes = [
//     { id: "student", label: "Étudiant", icon: "🎓", description: "Analyses adaptées aux besoins étudiants" },
//     { id: "parent", label: "Parent", icon: "👨‍👩‍👧‍👦", description: "Protection familiale et contrôle parental" },
//     { id: "professional", label: "Professionnel", icon: "💼", description: "Analyses business et conformité" },
//     { id: "senior", label: "Senior", icon: "👴", description: "Interface simplifiée et support prioritaire" },
//   ]

//   const preferences = [
//     { id: "privacy", label: "Protection des données personnelles", icon: "🔒" },
//     { id: "finance", label: "Clauses financières et frais", icon: "💰" },
//     { id: "cancellation", label: "Conditions de résiliation", icon: "❌" },
//     { id: "liability", label: "Responsabilité et garanties", icon: "⚖️" },
//     { id: "international", label: "Transferts internationaux", icon: "🌍" },
//     { id: "children", label: "Protection des mineurs", icon: "👶" },
//   ]

//   const handlePreferenceChange = (prefId: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       preferences: prev.preferences.includes(prefId)
//         ? prev.preferences.filter((p) => p !== prefId)
//         : [...prev.preferences, prefId],
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Logique d'inscription
//     console.log("Inscription:", formData)
//   }

//   return (
//     <main className="min-h-screen">
//       <Navigation />

//       <section className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30 dark:from-slate-900 dark:to-slate-800 pt-32">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-center mb-12"
//             >
//               <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
//                 Créez votre profil ClairContrat
//               </h1>
//               <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
//                 Plus vous personnalisez votre profil, plus notre IA peut vous protéger efficacement des clauses
//                 dangereuses.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-cyan-100 dark:border-cyan-800/20 overflow-hidden"
//             >
//               <div className="grid lg:grid-cols-2">
//                 {/* Formulaire */}
//                 <div className="p-8 lg:p-12">
//                   <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Informations de base */}
//                     <div className="space-y-6">
//                       <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
//                         <User className="w-6 h-6 text-cyan-600" />
//                         Informations de base
//                       </h3>

//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                             Nom complet *
//                           </label>
//                           <input
//                             type="text"
//                             required
//                             value={formData.name}
//                             onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
//                             className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                             placeholder="Votre nom complet"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                             Email *
//                           </label>
//                           <input
//                             type="email"
//                             required
//                             value={formData.email}
//                             onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
//                             className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                             placeholder="votre@email.com"
//                           />
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Date de naissance *
//                             </label>
//                             <input
//                               type="date"
//                               required
//                               value={formData.birthDate}
//                               onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
//                               className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Sexe *
//                             </label>
//                             <select
//                               required
//                               value={formData.gender}
//                               onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
//                               className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                             >
//                               <option value="" disabled>
//                                 Sélectionnez votre sexe
//                               </option>
//                               <option value="homme">Homme</option>
//                               <option value="femme">Femme</option>
//                             </select>
//                           </div>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Mot de passe *
//                             </label>
//                             <input
//                               type="password"
//                               required
//                               value={formData.password}
//                               onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
//                               className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                               placeholder="Mot de passe sécurisé"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                               Confirmer *
//                             </label>
//                             <input
//                               type="password"
//                               required
//                               value={formData.confirmPassword}
//                               onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
//                               className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
//                               placeholder="Confirmer le mot de passe"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Type d'utilisateur */}
//                     <div className="space-y-6">
//                       <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
//                         <Users className="w-6 h-6 text-cyan-600" />
//                         Type d'utilisateur
//                       </h3>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {userTypes.map((type) => (
//                           <button
//                             key={type.id}
//                             type="button"
//                             onClick={() => setFormData((prev) => ({ ...prev, userType: type.id }))}
//                             className={`p-4 rounded-xl border-2 transition-all text-left ${
//                               formData.userType === type.id
//                                 ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
//                                 : "border-slate-200 dark:border-slate-600 hover:border-cyan-300"
//                             }`}
//                           >
//                             <div className="text-3xl mb-2">{type.icon}</div>
//                             <div className="font-medium text-slate-800 dark:text-white mb-1">{type.label}</div>
//                             <div className="text-sm text-slate-500 dark:text-slate-400">{type.description}</div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Préférences */}
//                     <div className="space-y-6">
//                       <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
//                         <Settings className="w-6 h-6 text-cyan-600" />
//                         Préférences d'analyse
//                       </h3>

//                       <div className="grid md:grid-cols-2 gap-3">
//                         {preferences.map((pref) => (
//                           <label
//                             key={pref.id}
//                             className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-slate-200 dark:border-slate-600"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={formData.preferences.includes(pref.id)}
//                               onChange={() => handlePreferenceChange(pref.id)}
//                               className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
//                             />
//                             <span className="text-2xl">{pref.icon}</span>
//                             <span className="text-slate-700 dark:text-slate-300 font-medium">{pref.label}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Conditions */}
//                     <div className="space-y-4">
//                       <label className="flex items-start gap-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           required
//                           checked={formData.acceptTerms}
//                           onChange={(e) => setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
//                           className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mt-0.5"
//                         />
//                         <span className="text-sm text-slate-600 dark:text-slate-300">
//                           J'accepte les{" "}
//                           <a href="/conditions" className="text-cyan-600 hover:underline">
//                             conditions d'utilisation
//                           </a>{" "}
//                           et la{" "}
//                           <a href="/confidentialite" className="text-cyan-600 hover:underline">
//                             politique de confidentialité
//                           </a>
//                         </span>
//                       </label>
//                     </div>

//                     {/* Bouton de création */}
//                     <button
//                       type="submit"
//                       className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//                     >
//                       Créer mon profil ClairContrat
//                     </button>

//                     <p className="text-center text-sm text-slate-500 dark:text-slate-400">
//                       Déjà un compte ?{" "}
//                       <a href="/connexion" className="text-cyan-600 hover:underline font-medium">
//                         Se connecter
//                       </a>
//                     </p>
//                   </form>
//                 </div>

//                 {/* Illustration */}
//                 <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
//                   <div className="text-center text-white space-y-8">
//                     <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
//                       <Shield className="w-12 h-12" />
//                     </div>
//                     <h3 className="text-3xl font-bold">Protection personnalisée</h3>
//                     <p className="text-cyan-100 leading-relaxed text-lg">
//                       Votre profil nous aide à identifier les risques qui vous concernent le plus et à vous fournir des
//                       conseils adaptés à votre situation unique.
//                     </p>
//                     <div className="space-y-4 text-left">
//                       <div className="flex items-center gap-4">
//                         <Brain className="w-6 h-6" />
//                         <span>Analyses IA personnalisées</span>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Shield className="w-6 h-6" />
//                         <span>Alertes ciblées en temps réel</span>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Users className="w-6 h-6" />
//                         <span>Conseils d'experts juridiques</span>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Lock className="w-6 h-6" />
//                         <span>Données 100% sécurisées</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }


"use client"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"
import axios from "axios"
import Navigation from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { User, Lock, Users, Settings, Shield, Brain, CheckCircle, AlertCircle } from "lucide-react"

export default function InscriptionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    userType: "",
    preferences: [],
    acceptTerms: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  // Map frontend user types to backend values
  const userTypeMapping = {
    student: "particulier",
    parent: "particulier", 
    professional: "professionnel",
    senior: "particulier"
  }

  // Map frontend preferences to backend values
  const preferenceMapping = {
    privacy: "Données personnelles",
    finance: "Clauses financières", 
    cancellation: "Résiliation",
    liability: "Responsabilité",
    international: "Modification contrat",
    children: "Protection des mineurs"
  }

  const userTypes = [
    { id: "student", label: "Étudiant", icon: "🎓", description: "Analyses adaptées aux besoins étudiants" },
    { id: "parent", label: "Parent", icon: "👨‍👩‍👧‍👦", description: "Protection familiale et contrôle parental" },
    { id: "professional", label: "Professionnel", icon: "💼", description: "Analyses business et conformité" },
    { id: "senior", label: "Senior", icon: "👴", description: "Interface simplifiée et support prioritaire" },
  ]

  const preferences = [
    { id: "privacy", label: "Protection des données personnelles", icon: "🔒" },
    { id: "finance", label: "Clauses financières et frais", icon: "💰" },
    { id: "cancellation", label: "Conditions de résiliation", icon: "❌" },
    { id: "liability", label: "Responsabilité et garanties", icon: "⚖️" },
    { id: "international", label: "Transferts internationaux", icon: "🌍" },
    { id: "children", label: "Protection des mineurs", icon: "👶" },
  ]

  const handlePreferenceChange = (prefId: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(prefId)
        ? prev.preferences.filter((p) => p !== prefId)
        : [...prev.preferences, prefId],
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Le nom est requis" })
      return false
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "L'email est requis" })
      return false
    }
    if (!formData.password) {
      setMessage({ type: "error", text: "Le mot de passe est requis" })
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" })
      return false
    }
    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères" })
      return false
    }
    if (!formData.birthDate) {
      setMessage({ type: "error", text: "La date de naissance est requise" })
      return false
    }
    if (!formData.gender) {
      setMessage({ type: "error", text: "Le sexe est requis" })
      return false
    }
    if (!formData.userType) {
      setMessage({ type: "error", text: "Le type d'utilisateur est requis" })
      return false
    }
    if (!formData.acceptTerms) {
      setMessage({ type: "error", text: "Vous devez accepter les conditions d'utilisation" })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Prepare data for backend
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        birth_date: formData.birthDate,
        gender: formData.gender,
        user_type: userTypeMapping[formData.userType],
        accept_terms: formData.acceptTerms,
        preferences: formData.preferences.map(prefId => preferenceMapping[prefId]).filter(Boolean)
      }

      console.log("Sending registration data:", registrationData)

      // Make API call to backend
      const response = await axios.post("https://contract-backend-1riz.onrender.com/api/inscription", registrationData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      })

      console.log("Registration response:", response.data)

      if (response.status === 201) {
        setMessage({ 
          type: "success", 
          text: "Inscription réussie ! Vous pouvez maintenant vous connecter." 
        })
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          birthDate: "",
          gender: "",
          userType: "",
          preferences: [],
          acceptTerms: false,
        })

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/connexion"
        }, 2000)
      }
    } catch (error) {
      console.error("Registration error:", error)
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error || error.response.data?.message || "Erreur lors de l'inscription"
        setMessage({ type: "error", text: errorMessage })
      } else if (error.request) {
        // Network error
        setMessage({ 
          type: "error", 
          text: "Erreur de connexion. Vérifiez votre connexion internet et réessayez." 
        })
      } else {
        // Other error
        setMessage({ 
          type: "error", 
          text: "Une erreur inattendue s'est produite. Veuillez réessayer." 
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30 dark:from-slate-900 dark:to-slate-800 pt-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                Créez votre profil ClairContrat
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Plus vous personnalisez votre profil, plus notre IA peut vous protéger efficacement des clauses
                dangereuses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-cyan-100 dark:border-cyan-800/20 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                {/* Formulaire */}
                <div className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Message d'état */}
                    {message.text && (
                      <div className={`p-4 rounded-xl flex items-center gap-3 ${
                        message.type === "success" 
                          ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                          : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                      }`}>
                        {message.type === "success" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span>{message.text}</span>
                      </div>
                    )}

                    {/* Informations de base */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <User className="w-6 h-6 text-cyan-600" />
                        Informations de base
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                            placeholder="Votre nom complet"
                            disabled={isLoading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                            placeholder="votre@email.com"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Date de naissance *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.birthDate}
                              onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                              disabled={isLoading}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Sexe *
                            </label>
                            <select
                              required
                              value={formData.gender}
                              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                              disabled={isLoading}
                            >
                              <option value="" disabled>
                                Sélectionnez votre sexe
                              </option>
                              <option value="homme">Homme</option>
                              <option value="femme">Femme</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Mot de passe *
                            </label>
                            <input
                              type="password"
                              required
                              value={formData.password}
                              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                              placeholder="Mot de passe sécurisé"
                              disabled={isLoading}
                              minLength={6}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Confirmer *
                            </label>
                            <input
                              type="password"
                              required
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-800 dark:text-white"
                              placeholder="Confirmer le mot de passe"
                              disabled={isLoading}
                              minLength={6}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Type d'utilisateur */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <Users className="w-6 h-6 text-cyan-600" />
                        Type d'utilisateur
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            disabled={isLoading}
                            onClick={() => setFormData((prev) => ({ ...prev, userType: type.id }))}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              formData.userType === type.id
                                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                                : "border-slate-200 dark:border-slate-600 hover:border-cyan-300"
                            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <div className="text-3xl mb-2">{type.icon}</div>
                            <div className="font-medium text-slate-800 dark:text-white mb-1">{type.label}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{type.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Préférences */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <Settings className="w-6 h-6 text-cyan-600" />
                        Préférences d'analyse
                      </h3>

                      <div className="grid md:grid-cols-2 gap-3">
                        {preferences.map((pref) => (
                          <label
                            key={pref.id}
                            className={`flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-slate-200 dark:border-slate-600 ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.preferences.includes(pref.id)}
                              onChange={() => !isLoading && handlePreferenceChange(pref.id)}
                              className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                              disabled={isLoading}
                            />
                            <span className="text-2xl">{pref.icon}</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{pref.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-4">
                      <label className={`flex items-start gap-3 cursor-pointer ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}>
                        <input
                          type="checkbox"
                          required
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
                          className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mt-0.5"
                          disabled={isLoading}
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          J'accepte les{" "}
                          <a href="/conditions" className="text-cyan-600 hover:underline">
                            conditions d'utilisation
                          </a>{" "}
                          et la{" "}
                          <a href="/confidentialite" className="text-cyan-600 hover:underline">
                            politique de confidentialité
                          </a>
                        </span>
                      </label>
                    </div>

                    {/* Bouton de création */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                        isLoading ? "opacity-50 cursor-not-allowed transform-none" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Création en cours...
                        </div>
                      ) : (
                        "Créer mon profil ClairContrat"
                      )}
                    </button>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                      Déjà un compte ?{" "}
                      <a href="/connexion" className="text-cyan-600 hover:underline font-medium">
                        Se connecter
                      </a>
                    </p>
                  </form>
                </div>

                {/* Illustration */}
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white space-y-8">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold">Protection personnalisée</h3>
                    <p className="text-cyan-100 leading-relaxed text-lg">
                      Votre profil nous aide à identifier les risques qui vous concernent le plus et à vous fournir des
                      conseils adaptés à votre situation unique.
                    </p>
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-4">
                        <Brain className="w-6 h-6" />
                        <span>Analyses IA personnalisées</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Shield className="w-6 h-6" />
                        <span>Alertes ciblées en temps réel</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Users className="w-6 h-6" />
                        <span>Conseils d'experts juridiques</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Lock className="w-6 h-6" />
                        <span>Données 100% sécurisées</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
