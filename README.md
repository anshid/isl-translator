# 🤟 ISL Translator — Phase 1: Speech to Text

Real-time speech → live transcript → (ISL signs coming in Phase 2)

---

## 📁 Project Structure

```
isl-translator/
│
├── backend/                  ← Python + FastAPI + Whisper
│   ├── main.py               ← Main server file
│   ├── requirements.txt      ← Python packages
│   └── .env.example          ← Environment variable reference
│
├── frontend/                 ← React app (student-facing UI)
│   ├── src/
│   │   ├── App.jsx           ← Main UI component
│   │   ├── App.css           ← All styles
│   │   ├── main.jsx          ← React entry point
│   │   ├── components/
│   │   │   ├── LiveTranscript.jsx   ← Rolling transcript display
│   │   │   └── StatusBar.jsx        ← Connection + mic status
│   │   ├── hooks/
│   │   │   └── useMicrophone.js     ← Mic capture logic
│   │   └── utils/
│   │       └── websocket.js         ← WebSocket connection manager
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.local            ← Backend URL config
│
├── .gitignore
└── README.md
```

---

## 🛠 ONE-TIME SETUP (do this once)

### Step 1 — Install Python (if not already installed)

Check if you have Python:
```bash
python --version
# Should say Python 3.9 or higher
```

If not, download from: https://www.python.org/downloads/

---

### Step 2 — Install Node.js (if not already installed)

Check if you have Node:
```bash
node --version
# Should say v18 or higher
```

If not, download from: https://nodejs.org/ (choose the LTS version)

---

### Step 3 — Set up the Backend

Open a terminal and run:

```bash
# Go into the backend folder
cd isl-translator/backend

# Create a virtual environment (keeps packages isolated)
python -m venv venv

# Activate it:
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install all required packages
pip install -r requirements.txt
```

⚠️ The first time you install `openai-whisper`, it will also install PyTorch (~1.5GB).
This is normal and only happens once. Let it finish.

---

### Step 4 — Set up the Frontend

Open a NEW terminal tab and run:

```bash
# Go into the frontend folder
cd isl-translator/frontend

# Install Node packages
npm install
```

---

## ▶️ RUNNING THE PROJECT (every time you want to use it)

You need TWO terminal windows open at the same time.

### Terminal 1 — Start the Backend

```bash
cd isl-translator/backend

# Activate virtual environment
source venv/bin/activate     # Mac/Linux
# OR
venv\Scripts\activate        # Windows

# Start the server
uvicorn main:app --reload
```

You should see:
```
Loading Whisper model... (this takes ~10 seconds on first run)
Whisper model ready!
INFO:     Uvicorn running on http://127.0.0.1:8000
```

The first time you run Whisper, it downloads the model (~140MB for "base").
After that it loads from cache in ~3 seconds.

---

### Terminal 2 — Start the Frontend

```bash
cd isl-translator/frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in 300ms
  ➜  Local:   http://localhost:5173/
```

---

### Open the App

Go to: **http://localhost:5173**

You should see the ISL Translator UI with:
- ✅ "Backend Connected" status (green dot)
- A "Start Listening" button
- A transcript area

---

## 🧪 TESTING IT

1. Click **"Start Listening"**
2. Allow microphone access in your browser
3. Speak something (English or Hindi)
4. Wait ~4–5 seconds
5. Your speech should appear in the transcript box

---

## 🌐 SHARING WITH STUDENTS (ngrok — free)

When you want students to access this during class:

### Step 1 — Install ngrok
Download from: https://ngrok.com/download

### Step 2 — Make sure backend is running, then run ngrok:
```bash
ngrok http 8000
```

You'll get a URL like: `https://abc123def.ngrok-free.app`

### Step 3 — Update frontend to point to ngrok

Edit `frontend/.env.local`:
```
VITE_BACKEND_URL=wss://abc123def.ngrok-free.app
```
(Note: use `wss://` not `https://`)

Restart the frontend:
```bash
npm run dev
```

### Step 4 — Deploy frontend to Vercel (free, permanent URL)

```bash
npm install -g vercel
cd frontend
npm run build
vercel deploy --prod
```

Share the Vercel URL with students. Each class, you just:
1. Start your backend
2. Run ngrok
3. Update .env.local with new ngrok URL
4. Rebuild + redeploy

---

## ⚙️ CONFIGURATION

### Change Whisper model size

In `backend/main.py`, line: `model = whisper.load_model("base")`

| Model | Size | Speed | Accuracy |
|-------|------|-------|----------|
| tiny  | 75MB | Fastest | Lower |
| base  | 140MB | Fast | Good ← **recommended** |
| small | 460MB | Medium | Better |
| medium | 1.5GB | Slow | Best |

### Force a specific language

In `backend/main.py`, inside `transcribe_audio()`:
```python
result = model.transcribe(tmp_path, language="hi")   # force Hindi
result = model.transcribe(tmp_path, language="en")   # force English
# Leave blank (default) for auto-detect Hindi+English mix
```

---

## 🐛 TROUBLESHOOTING

**"Backend Disconnected" shown in UI**
→ Make sure backend terminal is running (`uvicorn main:app --reload`)
→ Check for errors in the backend terminal

**Mic access denied**
→ Click the lock icon in your browser address bar → Allow Microphone

**No transcript appearing**
→ Wait ~5 seconds after speaking (Whisper needs the full chunk)
→ Check backend terminal for any error messages

**Whisper takes too long**
→ Switch to `tiny` model in main.py for faster (less accurate) results

**Port already in use**
→ `uvicorn main:app --reload --port 8001` and update frontend .env.local accordingly

---

## 🔮 WHAT'S NEXT (Phase 2)

- [ ] Grammar reordering (English/Hindi → ISL word order)
- [ ] ISL video dictionary lookup
- [ ] Sign video playback synced with transcript
- [ ] Fingerspelling fallback for unknown words
