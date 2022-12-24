const express = require("express");
const { generateImage } = require("../controllers/generate");

const router = express.Router();

router.get("/", generateImage);

module.exports = router;
