const axios = require('axios');
require('dotenv').config();

async function transcribeWithWhisper(filePath) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('model', 'whisper-1');

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      ...formData.getHeaders()
    }
  });

  return response.data.text;
}
module.exports = { transcribeWithWhisper };
