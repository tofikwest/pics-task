const mongoose = require("mongoose");

const connectDB = async (isTestModeServer) => {
  try {
    if (isTestModeServer === false) {
      const connect = await mongoose.connect(process.env.MONGODB_URI);
      console.log(
        "Database connected",
        connect.connection.host,
        connect.connection.name
      );
    } else {
      console.log("\nWHILE CHECKING TEST CASES :: DB DISABLE\n");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
