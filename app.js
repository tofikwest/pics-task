const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConnections");
const isValidEnv = require("./utils/checkForValidEnv");
const errorHandler = require("./middleware/errorHandler");
const authenticateToken = require("./middleware/authentificateMiddleware");

// CHECKING FOR CRITICAL PROPERTYS
isValidEnv();

const isTestModeServer = process.env.SERVER_MODE === "test";

connectDB(isTestModeServer);

const app = express();

const PORT = isTestModeServer ? 4002 : process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/event", authenticateToken, require("./routes/eventRoutes"));

app.use("/api/logger", authenticateToken, require("./routes/loggerRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

module.exports = app;
