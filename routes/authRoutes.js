const express = require("express");
const { registration } = require("../controllers/authController");
const router = express.Router();

router.route("/registration").post(registration);

module.exports = router;
