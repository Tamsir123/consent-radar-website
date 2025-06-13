require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contractSummaryRoute = require("./routes/contractSummary");
const riskAlertRoute = require("./routes/riskAlert");
const authRoutes = require("./routes/auth");
const contractAskRoute = require("./routes/contractAsk");
const chatRoute = require("./routes/chat");
const db = require("./db"); 



const app = express();
const port = 4600;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/", authRoutes);
app.use("/contract", contractSummaryRoute);
app.use("/contract", riskAlertRoute);
// app.use("/contract", contractAskRoute);
app.use("/ai", chatRoute);


app.listen( port , () => {
    console.log('Démarrage et écoute sur le port  ' +port);
});