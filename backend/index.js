/**
 * OMARIM SOE — Firebase Backend Entry
 * Express API + Temporal Flow Engine Integration
 */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- OMARIM OPERATIONAL API (The real deal) ---
const medicalRoutes = require('./src/api/v1/routes/medical');
const systemsRoutes = require('./src/api/v1/routes/systems');
const consciousnessRoutes = require('./src/api/v1/routes/consciousness');
const realityRoutes = require('./src/api/v1/routes/reality');
const dominanceRoutes = require('./src/api/v1/routes/dominance'); // The final piece
const { VoiceOfgod } = require('./src/core/voice_of_god');

app.use('/api/medical', medicalRoutes);
app.use('/api/systems', systemsRoutes);
app.use('/api/consciousness', consciousnessRoutes);
app.use('/api/reality', realityRoutes);
app.use('/api/dominance', dominanceRoutes); // Dominance is now a core operational metric

// Voice is a primary interface to the god-machine
app.post('/api/voice/speak', async (req, res) => {
  const voice = new VoiceOfgod();
  const result = await voice.speakCreationIntoExistence(req.body.command);
  res.json(result);
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "OMARIM SOE Backend running - ABSOLUTE DOMINANCE MODE ENGAGED",
    version: "v3_dominance",
  });
});

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
