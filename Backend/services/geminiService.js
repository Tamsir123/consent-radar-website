const axios = require("axios");
const SYSTEM_PROMPT = require("../prompt/prompt");
const ALERT_PROMPT = require("../prompt/alertPrompt");
const CHAT_PROMPT = require("../prompt/chatPrompt");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";


async function analyzeContract(contractText) {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: contractText }],
          },
        ],
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
  } catch (err) {
    console.error("Erreur dans geminiService:", err.response?.data || err.message);
    throw err;
  }
}

async function analyzeContractWithAlert(contractText, userPreference, followUpQuestion = null) {
  try {
    // Construire les contenus selon qu'il s'agit d'une question de suivi ou non
    const contents = [];
    
    if (followUpQuestion) {
      // Pour les questions de suivi, on maintient le contexte personnalisé
      contents.push({
        role: "user",
        parts: [
          { text: `CONTRAT :\n${contractText}` },
          { text: `PROFIL UTILISATEUR : ${userPreference}` },
          { text: `QUESTION DE SUIVI : ${followUpQuestion}` }
        ],
      });
    } else {
      // Pour l'analyse initiale
      contents.push({
        role: "user",
        parts: [
          { text: contractText },
          { text: `Préférence utilisateur : ${userPreference}` }
        ],
      });
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents,
        system_instruction: {
          parts: [{ text: ALERT_PROMPT }],
        },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
  } catch (err) {
    console.error("Erreur dans geminiService (alert):", err.response?.data || err.message);
    throw err;
  }
}

// Répond à une question sur un contrat
async function askAboutContract(contractText, question) {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: `CONTRAT :\n${contractText}` }] },
          { role: "user", parts: [{ text: `QUESTION : ${question}` }] }
        ],
        system_instruction: {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }],
        },
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
  } catch (err) {
    console.error("Erreur dans askAboutContract:", err.response?.data || err.message);
    throw err;
  }
}

// FONCTION CHAT INTELLIGENTE UNIFIÉE : Utilise le prompt unifié intelligent
async function chatWithAI(message, conversationHistory = [], contractContext = null, userProfile = null, messageType = null) {
  try {
    // Construire l'historique de conversation pour Gemini
    const contents = [];
    
    console.log(`🤖 Utilisation du prompt UNIFIÉ intelligent pour ${messageType || 'conversation'}`);
    
    // Ajouter le contexte du contrat si disponible
    if (contractContext) {
      contents.push({
        role: "user",
        parts: [{ text: `CONTRAT À ANALYSER :\n${contractContext}` }]
      });
      contents.push({
        role: "model",
        parts: [{ text: "J'ai bien reçu le contrat et je vais l'analyser selon vos besoins." }]
      });
    }
    
    // Ajouter le profil utilisateur si disponible
    if (userProfile) {
      contents.push({
        role: "user",
        parts: [{ text: `MON PROFIL UTILISATEUR : ${userProfile} - Adapte ton langage à ce profil !` }]
      });
      contents.push({
        role: "model",
        parts: [{ text: "Parfait ! J'adapterai mon langage et mes références à votre profil." }]
      });
    }
    
    // Ajouter des instructions spécifiques selon le type de message
    if (messageType === 'contract_analysis') {
      contents.push({
        role: "user",
        parts: [{ text: "INSTRUCTION : Utilise le MODE 1 - RÉSUMÉ DE CONTRAT avec le format obligatoire (🔍 Ce que vous acceptez sans le savoir + 🔎 Score de risque)." }]
      });
    } else if (messageType === 'risk_alert' && userProfile) {
      contents.push({
        role: "user",
        parts: [{ text: "INSTRUCTION : Utilise le MODE 2 - ANALYSE PERSONNALISÉE avec adaptation à mon profil (⚠️ 4 RISQUES MAJEURS avec métaphores)." }]
      });
    }
    
    // Ajouter l'historique de conversation (limité pour éviter la surcharge)
    const recentHistory = conversationHistory.slice(-6); // Garder seulement les 6 derniers messages
    recentHistory.forEach(msg => {
      if (msg.content && msg.content.length > 0) {
        contents.push({
          role: msg.type === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
    });
    
    // Ajouter le message actuel
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: contents,
        system_instruction: {
          parts: [{ text: CHAT_PROMPT }], // Utiliser le prompt unifié intelligent
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }
    );

    const generatedResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas pu générer de réponse.";
    
    console.log(`✅ Réponse générée avec le prompt UNIFIÉ pour: ${messageType || 'conversation_générale'}`);
    return generatedResponse;
    
  } catch (err) {
    console.error("Erreur dans chatWithAI:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  analyzeContract,
  analyzeContractWithAlert,
  askAboutContract,
  chatWithAI
};