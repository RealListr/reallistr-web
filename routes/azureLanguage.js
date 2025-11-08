import express from 'express';
import axios from 'axios';

const router = express.Router();

const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;   // e.g. https://reallistr.cognitiveservices.azure.com/
const apiKey   = process.env.AZURE_LANGUAGE_KEY;        // Key1 or Key2

router.post('/analyze', async (req, res) => {
  try {
    const text = req.body?.text ?? '';
    if (!text) return res.status(400).json({ error: 'text is required' });

    const url = `${endpoint}language/:analyze-text?api-version=2023-04-15-preview`;
    const payload = {
      kind: 'SentimentAnalysis',
      analysisInput: { documents: [{ id: '1', language: 'en', text }] }
    };

    const { data } = await axios.post(url, payload, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });

    res.json(data);
  } catch (err) {
    const msg = err.response?.data || err.message;
    console.error('Azure Language error:', msg);
    res.status(502).json({ error: 'Azure request failed', detail: msg });
  }
});

export default router;
