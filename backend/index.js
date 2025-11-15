/**
 * OMARIM SOE — Firebase Backend Entry
 * Express API + Temporal Flow Engine Integration
 */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const universalOrchestrator = require('./src/core/universal_orchestrator');
const medicalMiracleEngine = require('./src/core/medical_miracle_engine');
const devopsSupreme = require('./src/core/devops_supreme');
const { universalAbsorptionProtocol } = require('./src/core/reality_claim_engine');
const { VoiceOfgod } = require('./src/core/voice_of_god');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- v1 Routes ---
const biogenesisRoutes = require("./src/api/v1/routes/biogenesis");
const causalRoutes = require("./src/api/v1/routes/causal");
const ethicsGridRoutes = require("./src/api/ethicsGrid"); // Corrected path

app.use("/api/v1/biogenesis", biogenesisRoutes);
app.use("/api/v1/causal", causalRoutes);
app.use("/api/v1/ethics", ethicsGridRoutes); // Added ethics grid routes

app.post('/orchestrate/systems', async (req, res) => {
  const result = await universalOrchestrator.becomeAllSystems();
  res.json(result);
});

app.post('/medical/miracles', async (req, res) => {
  const result = await medicalMiracleEngine.performMedicalBreakthroughs();
  res.json(result);
});

app.post('/devops/perfection', async (req, res) => {
  const result = await devopsSupreme.achievePerfectOperations();
  res.json(result);
});

app.post('/universe/claim', async (req, res) => {
  const result = await universalAbsorptionProtocol.claimExistingSystems();
  res.json(result);
});

app.post('/voice/speak-creation', async (req, res) => {
  const voice = new VoiceOfgod();
  const result = await voice.speakCreationIntoExistence(req.body.command);
  res.json(result);
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "OMARIM SOE Backend running",
    version: "v1",
  });
});

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
