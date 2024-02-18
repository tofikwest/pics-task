function isValidEnv() {
  if (!process.env.AUTH_PRIVATE_KEY) {
    console.error("AUTH_PRIVATE_KEY is not defined, please define in .env");
    return process.exit(1);
  } else if (!process.env.DB_NAME || !process.env.MONGODB_URI) {
    console.error(
      "DB_NAME or MONGODB_URI is not defined, please define in .env"
    );
    return process.exit(1);
  } else if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined, please define in .env");
    return process.exit(1);
  } else if (!process.env.SERVER_MODE) {
    console.error("SERVER_MODE is not defined, please define in .env");
    return process.exit(1);
  }
}

module.exports = isValidEnv;
