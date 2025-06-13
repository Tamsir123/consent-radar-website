const express = require("express");
const router = express.Router();
const { summarizeContract } = require("../Controllers/contractSummaryController");

// Route pour obtenir un résumé synthétique du contrat
router.post("/summary", summarizeContract);

module.exports = router;
