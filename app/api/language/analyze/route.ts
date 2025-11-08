// app/api/language/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';

const KIND_MAP = {
  sentiment: 'SentimentAnalysis',
  keyphrases: 'KeyPhraseExtraction',
  pii: 'PiiEntityRecognition',
} as const;

type KindKey = keyof typeof KIND_MAP | 'summarize';

async function postJson(url: string, body: any, key: string, region: string) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}

export async function POST(req: NextRequest) {
  try {
    const urlObj = new URL(req.url);
    const kindParam = (urlObj.searchParams.get('kind') || 'sentiment').toLowerCase() as KindKey;

    const body = await req.json().catch(() => ({}));
    const text: string | undefined = body?.text;
    if (!text) return NextResponse.json({ error: 'text is required' }, { status: 400 });

    const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT as string; // must end with '/'
    const region = (process.env.AZURE_LANGUAGE_REGION || 'australiaeast') as string;
    const key = process.env.AZURE_LANGUAGE_KEY as string;

    // ----- Summarization via jobs endpoint (latest api-version) -----
    if (kindParam === 'summarize') {
      const jobsUrl = `${endpoint}language/analyze-text/jobs?api-version=2025-11-01`;

      const jobsPayload = {
        displayName: 'Abstractive summarization via jobs',
        analysisInput: { documents: [{ id: '1', language: 'en', text }] },
        tasks: [
          {
            kind: ((urlObj.searchParams.get("mode") || "abstractive") === "extractive" ? "ExtractiveSummarization" : "AbstractiveSummarization"),
            taskName: 'abstractive',
            parameters: { summaryLength: (urlObj.searchParams.get("summary") || "short") }
          }
        ]
      };

      const submit = await postJson(jobsUrl, jobsPayload, key, region);
      if (!submit.ok) {
        const errText = await submit.text();
        return NextResponse.json({ error: 'Azure summarize submit failed', detail: errText }, { status: 502 });
      }

      const opLoc = submit.headers.get('operation-location');
      if (!opLoc) return NextResponse.json({ error: 'Missing operation-location header from Azure' }, { status: 502 });

      // poll
      const maxWaitMs = 60000;
      const intervalMs = 750;
      const deadline = Date.now() + maxWaitMs;
      let lastResp: any = null;

      while (Date.now() < deadline) {
        const poll = await fetch(opLoc, {
          method: 'GET',
          headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': region,
          },
          cache: 'no-store',
        });

        const data = await poll.json().catch(() => ({}));
        lastResp = data;

        const status = data?.status?.toLowerCase?.();
        if (status === 'succeeded') return NextResponse.json(data);
        if (status === 'failed' || !status) {
          return NextResponse.json({ error: 'Azure summarize job failed', detail: data }, { status: 502 });
        }
        await new Promise(r => setTimeout(r, intervalMs));
      }
      return NextResponse.json({ error: 'Azure summarize job timed out', detail: lastResp }, { status: 504 });
    }

    // ----- Sync analyze-text for other kinds -----
    const azureKind = KIND_MAP[kindParam as keyof typeof KIND_MAP];
    if (!azureKind) {
      return NextResponse.json(
        { error: `invalid kind. use one of: sentiment, keyphrases, pii, summarize` },
        { status: 400 }
      );
    }

    const analyzeUrl = `${endpoint}language/:analyze-text?api-version=2025-11-01`;
    const payload: any = {
      kind: azureKind,
      analysisInput: { documents: [{ id: '1', language: 'en', text }] },
    };
    if (kindParam === 'sentiment') payload.parameters = { opinionMining: true };

    const r = await postJson(analyzeUrl, payload, key, region);
    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json({ error: 'Azure request failed', detail: errText }, { status: 502 });
    }

    const data = await r.json();
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: 'Server error', detail: msg }, { status: 500 });
  }
}
