const { Router } = require("express");

const router = Router();
const telega = require("../controllers/telega.controller");

router.post("/send-feedback", telega.sendFeedback);

module.exports = router;
