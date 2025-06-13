// const { askAboutContract } = require("../services/geminiService");

// // Contrôleur pour répondre à une question sur un contrat
// exports.askContract = async (req, res) => {
//   try {
//     const { contractText, question } = req.body;
//     if (!contractText || !question) {
//       return res.status(400).json({ error: "Le texte du contrat et la question sont requis." });
//     }
//     const result = await askAboutContract(contractText, question);
//     res.json({ answer: result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
