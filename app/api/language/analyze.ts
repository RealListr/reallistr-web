// pages/api/language/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text is required' });

    const url = `${process.env.AZURE_LANGUAGE_ENDPOINT}language/:analyze-text?api-version=2023-04-15-preview`;
    const payload = {
      kind: 'SentimentAnalysis',
      analysisInput: { documents: [{ id: '1', language: 'en', text }] }
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_LANGUAGE_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(502).json({ error: 'Azure request failed', detail: err });
    }

    const data = await r.json();
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: 'Server error', detail: e?.message });
  }
}
