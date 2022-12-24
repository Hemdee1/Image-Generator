require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { text, size } = req.body;

  const sizeInput =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: sizeInput,
    });

    const image_url = response.data.data[0].url;

    res.json({ data: image_url });
  } catch (error) {
    console.log(error.message);
    console.log(error.response);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { generateImage };
