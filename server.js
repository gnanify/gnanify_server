require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const setupApolloServer = require("./graphql");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await setupApolloServer(app);

    app.listen(PORT, () => {
      console.log(`🚀 REST API running at http://localhost:${PORT}`);
      console.log(`🚀 GraphQL running at http://localhost:${PORT}/grapapi`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
}

startServer();
