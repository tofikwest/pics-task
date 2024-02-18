const express = require("express");
const { postEvents } = require("../controllers/eventController");

const router = express.Router();

router.route("/").post(postEvents);

module.exports = router;
