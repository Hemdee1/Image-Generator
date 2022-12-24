const express = require("express");
const generateImage = require("./Routes/generateImage");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log("App listening on port", port);
});

app.use("/generateImage", generateImage);
