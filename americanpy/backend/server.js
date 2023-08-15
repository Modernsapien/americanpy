const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.post('/get_eco_friendly_transportation', async (req, res) => {
  const { start_destination, end_destination } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that provides travel suggestions and carbon emissions calculations.',
          },
          {
            role: 'user',
            content: `Suggest eco-friendly travel options from ${start_destination} to ${end_destination}.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );

    const suggestion = response.data.choices[0].message.content;
    const totalCarbonEmission = 'Estimated carbon emissions: ...';

    res.json({ suggestion, totalCarbonEmission });
  } catch (error) {
    console.error('Error fetching suggestion or carbon emissions:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
