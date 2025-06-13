"use client"
import { motion } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { Send, Upload, FileText, MessageCircle, AlertCircle, Brain, Trash2, Copy, Download, Home, ArrowLeft, Settings } from "lucide-react"
import axios from "axios"
import { MessageFormatter } from "@/lib/message-formatter"
import MessageRenderer from "@/components/message-renderer"
import "./modern-sidebar.css"
import "./enhanced-chat.css"
import "./sidebar-scrollbar.css"
import "./message-renderer.css"
import "./ai-message-styles.css"
import "./simple-message-styles.css"
import "./message-indicators.css"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [contractText, setContractText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreference, setUserPreference] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [messages, setMessages] = useState<Array<{
    type: string;
    content: string;
    timestamp: string;
    indicator?: string;
    analysisType?: string;
  }>>([
    {
      type: "ai",
      content: "👋 Salut ! Je suis Consent Radar AI, votre assistant intelligent pour l'analyse de contrats. Comment puis-je vous aider ?",
      timestamp: new Date().toLocaleTimeString(),
      indicator: "🤖 ASSISTANT IA"
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialiser côté client
  useEffect(() => {
    setIsClient(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effet pour traiter les paramètres de l'extension
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      const title = urlParams.get('title');
      const content = urlParams.get('content');
      const url = urlParams.get('url');

      if (source === 'extension') {
        // Message de bienvenue de l'extension
        const welcomeMessage = {
          type: "ai",
          content: `🚀 **Analyse depuis l'extension ClairContrat !**

✅ J'ai détecté que vous venez de l'extension avec un contrat à analyser.

${title ? `📄 **Document détecté :** ${title}` : ''}
${url ? `🌐 **Source :** ${url}` : ''}

${content ? 
`**Voici un aperçu du contenu détecté :**
\`\`\`
${content.substring(0, 500)}${content.length > 500 ? '...' : ''}
\`\`\`

🤖 **Collez le contenu complet** dans le chat pour une analyse détaillée, ou utilisez les commandes suivantes :
- \`/resume\` - Pour un résumé rapide
- \`/points-cles\` - Pour extraire les points clés
- \`/risques\` - Pour identifier les risques potentiels` : 
'🤖 **Collez votre contrat** dans le chat pour commencer l\'analyse !'}`,
          timestamp: new Date().toLocaleTimeString(),
          indicator: "🚀 EXTENSION"
        };

        setMessages(prev => [...prev, welcomeMessage]);

        // Nettoyer l'URL après traitement
        window.history.replaceState({}, '', '/chat');
      }
    }
  }, [isClient]);

  // Composant de particules flottantes pour l'arrière-plan
  const FloatingParticles = () => {
    if (!isClient) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Particules principales */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 100,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -100,
            }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8,
          }}
        />
      ))}        {/* Particules géométriques */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute w-2 h-2 border border-blue-400/20 rotate-45"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 50,
              rotate: 0,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -50,
              rotate: 360,
            }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}        {/* Particules lumineuses */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-sm"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 200,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * windowSize.width,
              y: -200,
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 12,
            }}
          />
        ))}
      </div>
    )
  }

  const quickQuestions = [
    "Résume-moi ce contrat", // → SUMMARY*"Analyse personnalisée selon mon profil", 
    "Bonjour, comment ça marche ?", // → CHAT
    "Quels sont mes risques pour moi ?", // → RISK-ALERT (si profil sélectionné)
    "Comment puis-je résilier ?", // → CHAT
    "Explique-moi cette clause" // → CHAT
  ]

  const userPreferences = [
    { value: "", label: "Sélectionnez votre profil" },
    { value: "football_fan", label: "⚽ Passionné de Football" },
    { value: "basketball_fan", label: "🏀 Fan de Basketball" },
    { value: "anime_lover", label: "🎌 Amateur d'Anime" },
    { value: "gamer", label: "🎮 Joueur/Gameuse" },
    { value: "music_lover", label: "🎵 Mélomane" },
    { value: "movie_buff", label: "🎬 Cinéphile" },
    { value: "tech_enthusiast", label: "💻 Passionné de Tech" },
    { value: "social_media_user", label: "📱 Utilisateur de Réseaux Sociaux" },
    { value: "student", label: "🎓 Étudiant(e)" },
    { value: "parent", label: "👨‍👩‍👧‍👦 Parent" }
  ]

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Gestion du scroll pour afficher/masquer le bouton "scroll to top"
  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (!chatContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollTop(!isNearBottom && scrollTop > 200)
    }

    chatContainer.addEventListener('scroll', handleScroll)
    return () => chatContainer.removeEventListener('scroll', handleScroll)
  }, [])

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Fonction pour coller un contrat
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text")
    if (pastedText.length > 100) {
      setContractText(pastedText)
      // Ne pas ajouter "Analyse ce contrat :" automatiquement
      // L'utilisateur peut taper ce qu'il veut
      setMessage(pastedText.substring(0, 500)) // Juste coller le texte
      e.preventDefault()
    }
  }

  // Fonction ULTRA-INTELLIGENTE pour déterminer quel endpoint utiliser
  const detectMessageType = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // 🚫 D'ABORD : Exclure "analyse ce contrat : [courte question]" (vont vers CHAT)
    // Si le message contient "analyse ce contrat :" mais est court (< 800 caractères), c'est une question
    const containsAnalyseContrat = lowerMessage.includes('analyse ce contrat :')
    const isShortMessage = message.length < 800
    
    if (containsAnalyseContrat && isShortMessage) {
      console.log('🔍 Détecté: "analyse ce contrat" + question courte → CHAT')
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // 🚫 ENSUITE : Exclure les demandes d'explication/clarification (vont vers CHAT)
    const explanationKeywords = [
      'explique', 'explique en details', 'explique-moi', 'clarrifie', 'clarifie', 'que signifie', 'qu\'est-ce que', 'c\'est quoi',
      'que veut dire', 'ça veut dire quoi', 'comment comprendre', 'peux-tu expliquer',
      'détaille', 'détaille-moi', 'précise', 'éclaircis', 'éclairci', 'pourquoi'
    ]
    
    const hasExplanationRequest = explanationKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // Si c'est une demande d'explication, toujours vers CHAT (même si ça dit "analyse")
    if (hasExplanationRequest) {
      return contractText ? 'contract_question' : 'general_chat'
    }
    
    // 1. 📋 SUMMARY : SEULEMENT pour résumé complet d'un NOUVEAU contrat
    
    // Demandes TRÈS explicites de résumé complet SEULEMENT
    const summaryOnlyKeywords = [
      'résume tout ce contrat', 'résumer entièrement ce contrat', 'résumé complet du contrat', 
      'fais moi un résumé général', 'résume moi l\'ensemble de ce contrat',
      'résumé global', 'vue d\'ensemble du contrat'
    ]
    
    const hasExplicitSummaryRequest = summaryOnlyKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // Détection d'un VRAI nouveau contrat complet collé (très restrictif)
    const contractKeywords = [
      'conditions d\'utilisation', 'conditions générales', 'cgu', 'cgv', 'cgs',
      'politique de confidentialité', 'privacy policy', 'termes et conditions',
      'accord utilisateur', 'licence utilisateur', 'contrat de service'
    ]
    
    const hasContractKeywords = contractKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    const isVeryLongText = message.length > 1500 // Seuil ENCORE plus élevé
    const hasLegalStructure = /article|clause|section|paragraphe|§|\d+\.|alinéa/i.test(message)
    const hasContractPhrase = /nous collectons|vous acceptez|en utilisant|ce service|cette application/i.test(message)
    const hasMultipleClauses = (message.match(/article|clause|section/gi) || []).length >= 3
    
    // SUMMARY SEULEMENT si :
    // - Demande TRÈS explicite de résumé complet OU
    // - TRÈS long texte + mots-clés contrat + structure légale + plusieurs clauses
    if (hasExplicitSummaryRequest || 
        (isVeryLongText && hasContractKeywords && hasLegalStructure && hasMultipleClauses)) {
      return 'contract_analysis'
    }

    // 2. 🚨 RISK-ALERT : Demandes d'analyse personnalisée avec profil
    const riskAnalysisKeywords = [
      'analyse personnalisée', 'selon mon profil', 'pour moi spécifiquement', 'adapté à mon profil',
      'risques pour moi', 'mes risques spécifiques', 'danger pour moi', 'préoccupant pour mon profil',
      'en tant que joueur', 'en tant que parent', 'en tant qu\'étudiant',
      'alerte personnalisée', 'risques selon mon profil', 'adapte à mon profil de'
    ]
    
    const hasRiskKeywords = riskAnalysisKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    // RISK-ALERT seulement avec contexte contrat ET profil ET demande TRÈS explicite
    if (contractText && userPreference && hasRiskKeywords) {
      return 'risk_alert'
    }

    // Questions directes sur un contrat existant - REDIRECTION VERS CHAT
    // Utilisation de 'general_chat' pour toutes les questions sur le contrat existant
    // 🚫 Commenté: Ne plus utiliser le type 'contract_question'
    /*
    const contractQuestionKeywords = [
      'explique', 'explique-moi', 'que signifie', 'qu\'est-ce que', 'c\'est quoi',
      'cette clause', 'ce point', 'cette partie', 'ce passage', 'cette section',
      'peux-tu expliquer', 'comment ça marche', 'pourquoi cette', 'comment cette',
      'est-ce que je peux', 'ai-je le droit', 'puis-je faire',
      'comment résilier', 'comment annuler', 'comment me désabonner',
      'que veut dire', 'ça veut dire quoi', 'signification de'
    ]
    
    const hasQuestionKeywords = contractQuestionKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (contractText && hasQuestionKeywords) {
      return 'contract_question'
    }
    */

    // 4. 🤖 GENERAL_CHAT : Tout le reste (conversations, aide générale, questions sur contrat)
    return 'general_chat'
  }

  // Fonction principale pour le chat intelligent
  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const currentMessage = message
    setMessage("")
    setIsLoading(true)
    
    // Ajouter le message utilisateur
    const newUserMessage = {
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
    }
    
    setMessages(prev => [...prev, newUserMessage])

    try {
      // Détecter le type de message et utiliser l'endpoint approprié
      const messageType = detectMessageType(currentMessage)
      console.log('🎯 Type de message détecté:', messageType)
      console.log('📝 Message:', currentMessage.substring(0, 100) + '...')
      console.log('📋 Contrat existant:', !!contractText)
      console.log('👤 Profil utilisateur:', userPreference || 'Aucun')
      
      let response
      let aiResponse = ""

      switch (messageType) {
        case 'contract_analysis':
          // 📋 SUMMARY: Analyser un nouveau contrat OU demande explicite de résumé
          console.log('📋 Résumé de contrat → Utilisation du SUMMARY')
          response = await axios.post('https://contract-backend-1riz.onrender.com/contract/summary', {
            contractText: currentMessage
          })
          aiResponse = response.data.summary
          setContractText(currentMessage) // Sauvegarder le contrat pour la suite
          break

        case 'risk_alert':
          // 🚨 RISK-ALERT: Analyse personnalisée selon le profil
          console.log('🚨 Analyse personnalisée → Utilisation du RISK-ALERT')
          if (!contractText || !userPreference) {
            aiResponse = "⚠️ Pour une analyse personnalisée, j'ai besoin d'un contrat et que vous sélectionniez votre profil dans la barre latérale."
          } else {
            response = await axios.post('https://contract-backend-1riz.onrender.com/contract/risk-alert', {
              contractText,
              userPreference,
              followUpQuestion: currentMessage
            })
            aiResponse = response.data.riskAlert
          }
          break

        case 'contract_question':
          // 🚫 Ce cas ne devrait plus jamais être atteint - gardé pour compatibilité
          console.log('💡 Question sur le contrat → Redirection vers CHAT (compatibilité)')
          const chatHistoryForQuestion = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))
          
          response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
            message: currentMessage,
            conversationHistory: chatHistoryForQuestion,
            contractContext: contractText || null,
            userProfile: userPreference || null,
            // Indiquer que c'est une question sur contrat pour le prompt
            messageType: 'contract_question'
          })
          
          aiResponse = response.data.response
          break

        case 'general_chat':
        default:
          // 🤖 CHAT: Conversations générales, questions, clarifications, questions sur contrat
          console.log('🤖 Conversation générale/Question sur contrat → Utilisation du CHAT')
          const conversationHistory = messages.map(msg => ({
            type: msg.type,
            content: msg.content
          }))

          response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
            message: currentMessage,
            conversationHistory: conversationHistory,
            contractContext: contractText || null,
            userProfile: userPreference || null
          })
          
          aiResponse = response.data.response
          break
      }
      
      // Ajouter des indicateurs visuels selon le type d'analyse
      const typeIndicators = {
        'contract_analysis': '📋 RÉSUMÉ AUTOMATIQUE',
        'risk_alert': '🚨 ANALYSE PERSONNALISÉE',
        'contract_question': '💡 RÉPONSE CIBLÉE',
        'general_chat': '🤖 CONVERSATION'
      }
      
      const newAIMessage = {
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        analysisType: messageType,
        indicator: typeIndicators[messageType]
      }
      
      setMessages(prev => [...prev, newAIMessage])
      
    } catch (error: any) {
      console.error('Erreur Chat API:', error)
      const errorMessage = {
        type: "ai" as const,
        content: "❌ Désolé, une erreur s'est produite. Vérifiez que le backend est démarré sur le port 4600.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message),
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour cliquer sur une question rapide
  const handleQuickQuestion = (question: string) => {
    setMessage(question)
  }

  // Fonction pour effacer la conversation
  const clearConversation = () => {
    setMessages([
      {
        type: "ai",
        content: "👋 Conversation effacée ! Comment puis-je vous aider ?",
        timestamp: new Date().toLocaleTimeString(),
        indicator: "🤖 ASSISTANT IA"
      },
    ])
    setContractText("")
  }

  // Fonction automatique pour générer une alerte dès qu'une préférence est sélectionnée
  const handlePreferenceChange = async (newPreference: string) => {
    setUserPreference(newPreference)
    
    // Si il y a un contrat ET une préférence sélectionnée, générer automatiquement l'alerte
    if (contractText && newPreference) {
      setIsLoading(true)
      
      const selectedProfile = userPreferences.find(p => p.value === newPreference)?.label
      const alertMessage = `🚨 Analyse personnalisée automatique pour : ${selectedProfile}`
      
      // Ajouter le message utilisateur dans le chat
      const newUserMessage = {
        type: "user",
        content: alertMessage,
        timestamp: new Date().toLocaleTimeString(),
        indicator: undefined // Ajout pour correspondre au type
      }
      
      setMessages(prev => [...prev, newUserMessage])

      try {
        // Utiliser le CHAT INTELLIGENT pour l'analyse personnalisée automatique
        console.log('🚨 Génération automatique d\'alerte personnalisée via CHAT')
        console.log('📤 Envoi vers backend CHAT:', {
          contractText: contractText.substring(0, 100) + '...',
          userPreference: newPreference
        })
        
        // Construire l'historique de conversation
        const conversationHistory = messages.map(msg => ({
          type: msg.type,
          content: msg.content
        }))

        // Utiliser le chat intelligent avec messageType = 'risk_alert'
        const response = await axios.post('https://contract-backend-1riz.onrender.com/ai/chat', {
          message: `Analyse personnalisée selon mon profil ${selectedProfile}`,
          conversationHistory: conversationHistory,
          contractContext: contractText,
          userProfile: newPreference,
          messageType: 'risk_alert'
        })
        
        console.log('📥 Réponse complète du backend CHAT:', response.data)
        console.log('📋 Contenu response:', response.data.response)
        
        // Vérifier si la réponse existe
        const riskAlertContent = response.data?.response || "Aucune analyse générée"
        
        // Ajouter la réponse de l'IA avec l'indicateur approprié
        const newAIMessage = {
          type: "ai",
          content: `🚨 **Analyse personnalisée (${selectedProfile}) :**\n\n${riskAlertContent}\n\n🎯 *Cette analyse est adaptée automatiquement à votre profil. Changez de profil pour une nouvelle analyse !*`,
          timestamp: new Date().toLocaleTimeString(),
          analysisType: 'risk_alert',
          indicator: '🚨 ANALYSE PERSONNALISÉE'
        }
        
        setMessages(prev => [...prev, newAIMessage])
        
      } catch (error: any) {
        console.error('Erreur alerte risque:', error)
        console.error('Détails de l\'erreur:', error.response?.data)
        const errorMessage = {
          type: "ai" as const,
          content: "❌ Erreur lors de la génération automatique de l'alerte personnalisée.\n\n🔧 **Détails :** " + (error.response?.data?.error || error.message || "Erreur inconnue"),
          timestamp: new Date().toLocaleTimeString(),
          indicator: '❌ ERREUR'
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Afficher un loader pendant l'hydratation côté client
  if (!isClient) {
    return (
      <main className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <FloatingParticles />

      {/* Barre de navigation simplifiée en haut */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Retour */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour à l'accueil</span>
                <span className="sm:hidden">Accueil</span>
              </motion.button>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-bold text-slate-800 dark:text-white">Chat IA</span>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => window.location.href = '/historique'}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-xs font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-3 h-3" />
                Historique
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/profil'}
                className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-xs font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-3 h-3" />
                <span className="hidden sm:inline">Profil</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="py-6 bg-white dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Interface de Chat Active
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3">
                Chat avec l'IA
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
                Posez vos questions directement à notre IA spécialisée dans l'analyse de contrats numériques
              </p>
              
              {/* Badges d'information */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.div
                  className="flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200/50 dark:border-cyan-800/20 rounded-full px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Brain className="w-4 h-4" />
                  IA Disponible
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/20 rounded-full px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <FileText className="w-4 h-4" />
                  Analyse Instantanée
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/20 rounded-full px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Alertes Personnalisées
                </motion.div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8 h-[750px]">
              {/* Barre latérale moderne */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1 h-full overflow-y-auto scrollbar-hide space-y-3"
              >
                {/* Statistiques en temps réel - Nouvelle section captivante */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl p-4 shadow-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        📊 Session actuelle
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">En ligne</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div 
                        className="text-center p-2 bg-white/40 dark:bg-slate-800/40 rounded-xl border border-white/20 dark:border-slate-700/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {messages.length}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Messages</div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center p-2 bg-white/40 dark:bg-slate-800/40 rounded-xl border border-white/20 dark:border-slate-700/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          {contractText ? Math.round(contractText.length / 1000) : 0}K
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Caractères</div>
                      </motion.div>
                    </div>
                    
                    {userPreference && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 p-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-xl border border-emerald-300/30"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <span className="text-xs">🎯</span>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 truncate">
                            {userPreferences.find(p => p.value === userPreference)?.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                {/* Import de document - Design moderne avec glassmorphism */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                          <Upload className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Importer un contrat
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Zone de drop modernisée */}
                        <motion.button 
                        className="relative w-full group/drop overflow-hidden shine-effect"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover/drop:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-white dark:bg-slate-700/50 border-2 border-dashed border-cyan-300 dark:border-cyan-500/50 rounded-2xl p-6 text-center group-hover/drop:border-cyan-400 dark:group-hover/drop:border-cyan-400 transition-all duration-300 neon-border">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="float-animation"
                          >
                            <FileText className="w-10 h-10 text-cyan-500 mx-auto mb-3 group-hover/drop:text-cyan-600 transition-colors" />
                          </motion.div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Glissez un PDF ici
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            ou cliquez pour parcourir
                          </p>
                        </div>
                      </motion.button>
                      
                      {/* Bouton coller modernisé */}
                      <motion.button 
                        className="w-full relative overflow-hidden group/paste morph-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover/paste:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl py-3 px-5 text-sm font-semibold shadow-lg animated-gradient">
                          <span className="flex items-center justify-center gap-2">
                            <Copy className="w-4 h-4" />
                            Coller du texte
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Contrôles de conversation - Style glassmorphism */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Conversation
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.button
                        onClick={clearConversation}
                        className="w-full bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/30 dark:hover:to-rose-900/30 text-red-700 dark:text-red-400 rounded-2xl py-3 px-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-red-200/50 dark:border-red-800/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Effacer le chat
                      </motion.button>
                      
                      {contractText && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/20 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                              Contrat actif
                            </p>
                          </div>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">
                            {contractText.length.toLocaleString()} caractères
                          </p>
                        </motion.div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-700/20 rounded-xl p-3">
                        <span>Messages</span>
                        <span className="font-bold text-cyan-600 dark:text-cyan-400">{messages.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Questions rapides - Nouveau design avec animations */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Questions rapides
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      {quickQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setMessage(question)}
                          className="w-full text-left text-sm bg-white/50 dark:bg-slate-700/30 hover:bg-white dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-xl p-3 transition-all duration-300 border border-slate-200/30 dark:border-slate-600/20 hover:border-indigo-300 dark:hover:border-indigo-500/50 group/question"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover/question:opacity-100 transition-opacity"></div>
                            {question}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Alerte de risque personnalisée - Design futuriste */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-orange-600 p-2 rounded-xl">
                          <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        Analyse personnalisée
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                          🎯 Votre profil pour une analyse sur-mesure
                        </label>
                        <div className="relative">
                          <select
                            value={userPreference}
                            onChange={(e) => handlePreferenceChange(e.target.value)}
                            disabled={!contractText || isLoading}
                            className="w-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl p-3 text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus:border-red-400 dark:focus:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800/20 transition-all duration-300 appearance-none cursor-pointer"
                          >
                            <option value="">✨ Choisissez votre profil...</option>
                            {userPreferences.map((pref, index) => (
                              <option key={index} value={pref.value}>
                                {pref.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r-2 border-b-2 border-slate-400 dark:border-slate-500 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* États visuels améliorés */}
                      {!contractText && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-400 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                                Contrat requis
                              </p>
                              <p className="text-xs text-amber-700 dark:text-amber-400">
                                Importez d'abord un contrat pour l'analyse
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {contractText && !userPreference && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-400 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                              <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                                Prêt pour l'analyse !
                              </p>
                              <p className="text-xs text-blue-700 dark:text-blue-400">
                                Sélectionnez votre profil → Analyse automatique
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {contractText && userPreference && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-l-4 border-emerald-400 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                ✅
                              </motion.div>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                Profil actif
                              </p>
                              <p className="text-xs text-emerald-700 dark:text-emerald-400 truncate">
                                {userPreferences.find(p => p.value === userPreference)?.label}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {isLoading && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-l-4 border-cyan-400 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-300">
                                Analyse en cours...
                              </p>
                              <p className="text-xs text-cyan-700 dark:text-cyan-400">
                                Génération de votre rapport personnalisé
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interface de chat modernisée */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                {/* Container principal avec effet glassmorphism */}
                <motion.div 
                  className="relative group/chat"
                  whileHover={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Effet de halo lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-3xl blur-2xl group-hover/chat:blur-3xl transition-all duration-500 opacity-75"></div>
                  
                  {/* Interface principale */}
                  <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl h-[750px] flex flex-col overflow-hidden">
                    
                    {/* En-tête du chat amélioré */}
                    <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-6 rounded-t-3xl overflow-hidden">
                      {/* Particules flottantes dans l'en-tête */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            initial={{
                              x: Math.random() * 400,
                              y: 50,
                            }}
                            animate={{
                              x: Math.random() * 400,
                              y: -10,
                            }}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Avatar IA animé */}
                          <motion.div 
                            className="relative w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30"
                            animate={{ 
                              boxShadow: ["0 0 20px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.2)"],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Brain className="w-6 h-6 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                          </motion.div>
                          
                          <div>
                            <motion.h3 
                              className="font-bold text-xl"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              Consent Radar AI
                            </motion.h3>
                            <motion.div 
                              className="flex items-center gap-2 text-sm text-cyan-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span>En ligne</span>
                              </div>
                              <span>•</span>
                              <span>Spécialisé en contrats numériques</span>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Indicateurs de statut */}
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-3 py-1 text-xs font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                              IA Active
                            </span>
                          </motion.div>
                          {contractText && (
                            <motion.div 
                              className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-3 py-1 text-xs font-medium"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Contrat chargé
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Messages avec design modernisé */}
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 p-6 overflow-y-auto space-y-6 relative"
                    >
                      {/* Pattern d'arrière-plan subtil */}
                      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148,163,184) 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                          onMouseEnter={() => setHoveredMessage(index)}
                          onMouseLeave={() => setHoveredMessage(null)}
                        >
                          <div className={`relative max-w-[85%] ${msg.type === "user" ? "ml-auto" : "mr-auto"}`}>
                            {/* Message container avec glassmorphism */}
                            <motion.div
                              className={`relative ${
                                msg.type === "user"
                                  ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                                  : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 text-slate-800 dark:text-slate-200 shadow-xl"
                              } rounded-3xl p-5 relative overflow-hidden group/message message-bubble`}
                              whileHover={{ 
                                scale: 1.02,
                                y: -2,
                                transition: { type: "spring", stiffness: 400 }
                              }}
                            >
                              {/* Effet brillant au survol */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/message:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                              
                              {/* Indicateur de type d'analyse modernisé */}
                              {msg.type === "ai" && msg.indicator && (
                                <motion.div 
                                  className={`message-indicator ${
                                    msg.indicator.includes('CONVERSATION') ? 'conversation' :
                                    msg.indicator.includes('ASSISTANT') ? 'assistant' :
                                    msg.indicator.includes('RÉSUMÉ') || msg.indicator.includes('ANALYSE') ? 'analysis' :
                                    msg.indicator.includes('ALERTE') || msg.indicator.includes('RISQUE') ? 'alert' :
                                    msg.indicator.includes('EXTENSION') ? 'extension' :
                                    'assistant' // Par défaut, classifier comme assistant au lieu de conversation
                                  }`}
                                  initial={{ scale: 0, rotate: -10 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: 0.2, type: "spring" }}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  title={`Badge: ${msg.indicator} | Type: ${
                                    msg.indicator.includes('CONVERSATION') ? 'conversation' :
                                    msg.indicator.includes('ASSISTANT') ? 'assistant' :
                                    msg.indicator.includes('RÉSUMÉ') || msg.indicator.includes('ANALYSE') ? 'analysis' :
                                    msg.indicator.includes('ALERTE') || msg.indicator.includes('RISQUE') ? 'alert' :
                                    msg.indicator.includes('EXTENSION') ? 'extension' :
                                    'assistant'
                                  }`}
                                  style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: 'white',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                    minWidth: 'fit-content'
                                  }}
                                >
                                  {msg.indicator}
                                </motion.div>
                              )}
                              
                              {/* Avatar pour les messages IA */}
                              {msg.type === "ai" && (
                                <motion.div 
                                  className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 avatar-breathing"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.3, type: "spring" }}
                                >
                                  <Brain className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                              
                              {/* Contenu du message */}
                              <div className={`${msg.type === "ai" ? "ml-4" : ""} relative z-10`}>
                                {msg.type === "ai" ? (
                                  <div className="text-sm leading-relaxed">
                                    <MessageRenderer 
                                      content={msg.content} 
                                      messageType={msg.analysisType}
                                    />
                                  </div>
                                ) : (
                                  <MessageRenderer 
                                    content={msg.content} 
                                    messageType="user"
                                  />
                                )}
                                
                                {/* Métadonnées du message */}
                                <div className={`flex items-center justify-between mt-3 text-xs ${
                                  msg.type === "user" ? "text-cyan-100" : "text-slate-500 dark:text-slate-400"
                                }`}>
                                  <span className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-current rounded-full status-pulse"></div>
                                    {msg.timestamp}
                                    {msg.analysisType && (
                                      <span className="ml-2 opacity-70">• {msg.analysisType}</span>
                                    )}
                                  </span>
                                  
                                  {/* Actions rapides */}
                                  <div className={`flex items-center gap-1 message-reactions ${
                                    hoveredMessage === index ? 'opacity-100' : 'opacity-0'
                                  } transition-all duration-300`}>
                                    <motion.button
                                      className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.8 }}
                                      onClick={() => navigator.clipboard.writeText(msg.content)}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </motion.button>
                                    {msg.type === "ai" && (
                                      <motion.button
                                        className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                      >
                                        <Download className="w-3 h-3" />
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Indicateur de chargement modernisé */}
                      {isLoading && (
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <div className="relative">
                            {/* Avatar IA pour le chargement */}
                            <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 avatar-breathing">
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                            
                            <motion.div 
                              className="ml-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 text-slate-800 dark:text-slate-200 rounded-3xl p-5 shadow-xl shimmer"
                              animate={{ 
                                boxShadow: ["0 10px 30px rgba(0,0,0,0.1)", "0 10px 40px rgba(0,0,0,0.15)", "0 10px 30px rgba(0,0,0,0.1)"]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="flex items-center gap-3">
                                {/* Animation de typing dots améliorée */}
                                <div className="typing-dots">
                                  {[0, 1, 2].map((i) => (
                                    <div key={i} className="typing-dot" />
                                  ))}
                                </div>
                                
                                <div>
                                  <motion.span 
                                    className="text-sm font-medium"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    L'IA analyse votre message...
                                  </motion.span>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Génération en cours • IA Consent Radar
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Bouton de scroll vers le haut */}
                      {showScrollTop && (
                        <motion.button
                          className="fixed bottom-32 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center neon-glow"
                          onClick={scrollToTop}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <div className="w-4 h-4 border-l-2 border-t-2 border-white transform rotate-45 -translate-y-0.5"></div>
                        </motion.button>
                      )}
                      
                      {/* Référence pour le scroll automatique */}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Zone de saisie modernisée */}
                    <div className="relative p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/20">
                      {/* Effet de halo sur la zone de saisie */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
                      
                      <div className="relative flex items-end gap-4">
                        {/* Champ de saisie avec design amélioré */}
                        <div className="flex-1 relative">
                          <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onPaste={handlePaste}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                                  e.preventDefault()
                                  handleSendMessage()
                                }
                              }}
                              disabled={isLoading}
                              placeholder="💬 Collez un contrat ou posez une question... (Shift+Enter pour nouvelle ligne)"
                              rows={message.split('\n').length || 1}
                              className="w-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-xl border-2 border-slate-200/50 dark:border-slate-600/50 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-4 focus:ring-cyan-200/20 dark:focus:ring-cyan-800/20 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 transition-all duration-300 resize-none min-h-[60px] max-h-32 shadow-lg font-medium text-sm leading-relaxed"
                            />
                            
                            {/* Indicateur de caractères */}
                            <div className="absolute bottom-2 right-16 text-xs text-slate-400 dark:text-slate-500">
                              {message.length > 0 && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`px-2 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm ${
                                    message.length > 5000 ? 'text-red-500' : 'text-slate-500'
                                  }`}
                                >
                                  {message.length.toLocaleString()}
                                </motion.span>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        {/* Bouton d'envoi avec animations */}
                        <motion.button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isLoading}
                          className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/send"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {/* Effet de brillance */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/send:translate-x-[100%] transition-transform duration-700"></div>
                          
                          <div className="relative flex items-center justify-center">
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <motion.div
                                whileHover={{ x: 2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Send className="w-5 h-5" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      </div>

                      {/* Suggestions rapides d'actions */}
                      {!isLoading && message.length === 0 && (
                        <motion.div 
                          className="mt-4 flex flex-wrap gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {[
                            { icon: "📋", text: "Analyser un contrat", color: "blue" },
                            { icon: "🤔", text: "Poser une question", color: "purple" },
                            { icon: "🚨", text: "Alerte personnalisée", color: "red" },
                          ].map((action, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setMessage(action.text === "Analyser un contrat" ? "Résume-moi ce contrat" : action.text === "Poser une question" ? "Bonjour, comment ça marche ?" : "Analyse personnalisée selon mon profil")}
                              className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-${action.color}-50 to-${action.color}-100 dark:from-${action.color}-900/20 dark:to-${action.color}-800/20 border border-${action.color}-200/50 dark:border-${action.color}-800/20 rounded-xl text-${action.color}-700 dark:text-${action.color}-300 text-xs font-medium hover:scale-105 transition-all duration-200`}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                            >
                              <span>{action.icon}</span>
                              {action.text}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton d'aide flottant */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => {
            const helpMessage = `🎯 **Guide rapide :**

**Pour analyser un contrat :**
• Collez le texte dans la zone de chat
• Ou utilisez "Résume-moi ce contrat"

**Pour une analyse personnalisée :**
• Sélectionnez votre profil dans la barre latérale
• L'analyse s'adaptera automatiquement !

**Navigation :**
• ← Retour à l'accueil : bouton en haut à gauche
• Historique et Profil : en haut à droite

**Besoin d'aide ?** Tapez simplement "Comment ça marche ?" 😊`
            
            setMessages(prev => [...prev, {
              type: "ai",
              content: helpMessage,
              timestamp: new Date().toLocaleTimeString(),
              indicator: "💡 AIDE"
            }])
          }}
          className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white dark:border-slate-800"
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ 
              y: [0, -2, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <span className="text-xl">💡</span>
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Guide d'utilisation
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Bouton de raccourci pour nouvelle conversation */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => {
            clearConversation()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white dark:border-slate-800"
          whileHover={{ 
            scale: 1.1, 
            rotate: -5,
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <span className="text-xl">🔄</span>
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Nouvelle conversation
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Notification contextuelle pour les nouveaux utilisateurs */}
      {messages.length <= 1 && (
        <motion.div
          className="fixed top-24 right-6 z-40 max-w-sm"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 3, type: "spring", stiffness: 200 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
        >
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-800/20 rounded-2xl p-4 shadow-xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm">👋</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-cyan-800 dark:text-cyan-300 text-sm mb-1">
                  Bienvenue dans Chat IA !
                </h4>
                <p className="text-xs text-cyan-700 dark:text-cyan-400">
                  Collez un contrat ou posez une question pour commencer. 
                  Cliquez sur 💡 pour plus d'aide.
                </p>
              </div>
              <motion.button
                onClick={() => {
                  const notification = document.querySelector('[data-notification]')
                  if (notification) notification.remove()
                }}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Fermer</span>
                ✕
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  )
}