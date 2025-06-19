const express = require("express");
const treinoRoutes = require("./routes/treinoRoutes");
const app = express();
app.use(express.json());
app.use("/treinos", treinoRoutes);

module.exports = app;