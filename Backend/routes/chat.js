const express = require("express");
const router = express.Router();
const { handleChat } = require("../Controllers/chatController");

// Route pour le chat interactif
router.post("/chat", handleChat);

module.exports = router;