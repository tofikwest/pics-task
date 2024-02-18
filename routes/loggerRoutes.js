const express = require("express");
const { getAllLogs, getOneLog } = require("../controllers/loggerController");

const router = express.Router();

router.route("/").get(getAllLogs);
router.route("/:id").get(getOneLog);

module.exports = router;
