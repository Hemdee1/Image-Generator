const express = require("express");
const { generateImage } = require("../controllers/generate");

const router = express.Router();

router.post("/", generateImage);

module.exports = router;
