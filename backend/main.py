import os
import tempfile
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import whisper
import numpy as np
import soundfile as sf
import io

app = FastAPI()

# Allow frontend (Vercel or localhost) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace * with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model once when server starts
# Options: "tiny", "base", "small", "medium"
# "base" is best balance of speed + accuracy for a laptop
print("Loading Whisper model... (this takes ~10 seconds on first run)")
model = whisper.load_model("base")
print("Whisper model ready!")


@app.get("/")
def health_check():
    return {"status": "ISL Translator backend is running"}


@app.websocket("/ws")
async def websocket_transcribe(websocket: WebSocket):
    await websocket.accept()
    print("Client connected")

    try:
        while True:
            # Receive raw audio bytes from browser
            audio_bytes = await websocket.receive_bytes()

            # Run Whisper in a thread so it doesn't block the event loop
            transcript = await asyncio.to_thread(transcribe_audio, audio_bytes)

            if transcript.strip():
                print(f"Transcribed: {transcript}")
                await websocket.send_json({
                    "type": "transcript",
                    "text": transcript.strip()
                })

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        await websocket.send_json({"type": "error", "text": str(e)})


def transcribe_audio(audio_bytes: bytes) -> str:
    # Ignore chunks that are too small to be real audio (< 1KB)
    if len(audio_bytes) < 5000:
        return ""

    try:
        with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        result = model.transcribe(
            tmp_path,
            task="transcribe",
            fp16=False,
            language="en"
        )

        os.unlink(tmp_path)
        return result["text"]

    except Exception as e:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        print(f"Skipping bad audio chunk: {e}")
        return ""   # ← return empty string instead of crashing
