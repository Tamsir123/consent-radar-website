const express = require("express");
const router = express.Router();
const { generateRiskAlert } = require("../Controllers/riskAlertController");

// Route pour générer une alerte de risque personnalisée
router.post("/risk-alert", generateRiskAlert);

module.exports = router;
