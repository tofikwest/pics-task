const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "20m",
  });
}
module.exports = {
  generateAccessToken,
};
