require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "a boy with a crown walking on the moon",
      n: 1,
      size: "512x512",
    });

    const image_url = response.data.data[0].url;

    res.json({ data: image_url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { generateImage };
