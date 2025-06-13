const { analyzeContract } = require("../services/geminiService");

// Contrôleur pour l'analyse synthétique du contrat
exports.summarizeContract = async (req, res) => {
  try {
    const { contractText } = req.body;
    if (!contractText) {
      return res.status(400).json({ error: "Le texte du contrat est requis." });
    }
    const result = await analyzeContract(contractText);
    res.json({ summary: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
