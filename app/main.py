from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os, httpx, asyncio
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

DEEPL_KEY  = os.getenv("DEEPL_AUTH_KEY", "")
DEEPL_BASE = os.getenv("DEEPL_BASE", "https://api.deepl.com").rstrip("/")
TRANSLATE_URL = f"{DEEPL_BASE}/v2/translate"

CODESPACE = os.getenv("CODESPACE_NAME", "")
allowed = [
    f"https://{CODESPACE}-3000.app.github.dev",
    f"https://{CODESPACE}-5175.app.github.dev",
    f"https://{CODESPACE}-8787.app.github.dev",
    f"https://{CODESPACE}-5174.app.github.dev",  # if you’ll use 5174
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in allowed if CODESPACE],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Payload(BaseModel):
    texts: List[str]
    target_lang: str
    source_lang: Optional[str] = None
    formality: Optional[str] = None

@app.get("/health")
def health():
    return {
        "ok": True,
        "port": int(os.getenv("PORT", "0")) or None,
        "deepl_key_present": bool(DEEPL_KEY),
        "deepl_base": DEEPL_BASE,
        "impl": "sync-httpx-in-thread",
    }

@app.post("/translate")
async def translate(p: Payload):
    if not DEEPL_KEY:
        raise HTTPException(status_code=500, detail="DEEPL_AUTH_KEY missing")

    # Build body as a dict; httpx will form-encode and repeat "text" fields.
    payload = {
        "target_lang": p.target_lang,
        "text": p.texts,  # list of strings is OK
    }
    if p.source_lang:
        payload["source_lang"] = p.source_lang
    if p.formality:
        payload["formality"] = p.formality

    def do_post():
        return httpx.post(
            TRANSLATE_URL,
            params={"auth_key": DEEPL_KEY},
            data=payload,       # no manual headers
            timeout=20.0,
        )

    try:
        r = await asyncio.to_thread(do_post)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e!s}")

    if r.status_code >= 400:
        try:
            detail = r.json()
        except Exception:
            detail = r.text
        raise HTTPException(status_code=502, detail={"deepl_status": r.status_code, "error": detail})

    data = r.json()
    translations = [item["text"] for item in data.get("translations", [])]
    return {"texts": translations}
