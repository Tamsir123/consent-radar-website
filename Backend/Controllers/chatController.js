const { chatWithAI } = require("../services/geminiService");

// Chat interactif intelligent avec l'IA - Gère tous les cas
const handleChat = async (req, res) => {
  try {
    const { 
      message, 
      conversationHistory = [], 
      contractContext = null, 
      userProfile = null, 
      messageType = null 
    } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: "Le message est requis" 
      });
    }

    console.log(`📝 Nouveau message chat: ${message.substring(0, 100)}...`);
    console.log(`📚 Historique: ${conversationHistory.length} messages`);
    console.log(`📋 Contexte contrat: ${contractContext ? 'Oui' : 'Non'}`);
    console.log(`👤 Profil utilisateur: ${userProfile || 'Aucun'}`);
    console.log(`🎯 Type de message: ${messageType || 'Non spécifié'}`);

    // Appeler le service Gemini intelligent avec tous les paramètres
    const aiResponse = await chatWithAI(
      message, 
      conversationHistory, 
      contractContext, 
      userProfile, 
      messageType
    );

    console.log(`🤖 Réponse IA générée: ${aiResponse.substring(0, 100)}...`);

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      hasContext: !!contractContext,
      userProfile: userProfile,
      messageType: messageType
    });

  } catch (error) {
    console.error("❌ Erreur dans handleChat:", error);
    res.status(500).json({ 
      error: "Erreur lors du traitement du chat",
      details: error.message 
    });
  }
};

module.exports = {
  handleChat
};