// src/App.jsx
import { useState, useEffect, useCallback } from "react";
import { LiveTranscript } from "./components/LiveTranscript.jsx";
import { StatusBar } from "./components/StatusBar.jsx";
import { SignPlayer } from "./components/SignPlayer.jsx";
import { SignHistory } from "./components/SignHistory.jsx";
import { useMicrophone } from "./hooks/useMicrophone.js";
import { useSignQueue } from "./hooks/useSignQueue.js";
import { transcriptSocket } from "./utils/websocket.js";
import "./App.css";

export default function App() {
  const [transcriptLines, setTranscriptLines]     = useState([]);
  const [connectionStatus, setConnectionStatus]   = useState("disconnected");
  const [processingIndicator, setProcessingIndicator] = useState(false);

  const { isListening, startListening, stopListening, error } = useMicrophone();
  const {
    currentToken, queue, isPlaying, history,
    enqueue, onVideoEnded, onVideoError, clearQueue,
  } = useSignQueue();

  // Connect to backend WebSocket on mount
  useEffect(() => {
    transcriptSocket.onStatus = setConnectionStatus;

    transcriptSocket.onTranscript = (text) => {
      setProcessingIndicator(false);
      setTranscriptLines((prev) => [...prev, text]);
      enqueue(text);   // ← Feed transcript into sign queue
    };

    transcriptSocket.onError = (msg) => console.error("Transcript error:", msg);
    transcriptSocket.connect();

    return () => transcriptSocket.disconnect();
  }, [enqueue]);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setProcessingIndicator(true);
        setTimeout(() => setProcessingIndicator(false), 3000);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleToggleMic = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const handleClear = () => {
    setTranscriptLines([]);
    clearQueue();
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🤟</span>
          <div>
            <h1 className="logo-title">ISL Translator</h1>
            <p className="logo-subtitle">Indian Sign Language · Live</p>
          </div>
        </div>
        <StatusBar connectionStatus={connectionStatus} isListening={isListening} />
      </header>

      <main className="main">

        {/* Mic control */}
        <div className="control-panel">
          <button
            className={`mic-button ${isListening ? "mic-active" : ""}`}
            onClick={handleToggleMic}
            disabled={connectionStatus !== "connected"}
          >
            <span className="mic-icon">{isListening ? "⏹" : "🎙"}</span>
            <span className="mic-label">
              {isListening ? "Stop Listening" : "Start Listening"}
            </span>
          </button>

          {processingIndicator && (
            <div className="processing-badge">
              <span className="processing-dot" /> Processing speech...
            </div>
          )}
          {error && <div className="error-badge">⚠️ {error}</div>}
          {connectionStatus !== "connected" && (
            <div className="warning-badge">
              ⚠️ Backend not connected — make sure you ran <code>uvicorn main:app --reload</code>
            </div>
          )}
        </div>

        {/* Two column layout on wide screens */}
        <div className="columns">

          {/* Left: ISL Sign Player */}
          <div className="col-sign">
            <div className="panel">
              <div className="panel__header">
                <h2 className="section-title">ISL Signs</h2>
                {isPlaying && (
                  <span className="playing-badge">
                    <span className="processing-dot" /> Signing...
                  </span>
                )}
              </div>

              <SignPlayer
                token={currentToken}
                onVideoEnded={onVideoEnded}
                onVideoError={onVideoError}
              />

              <SignHistory history={history} queueLength={queue.length} />
            </div>
          </div>

          {/* Right: Live Transcript */}
          <div className="col-transcript">
            <div className="panel">
              <div className="panel__header">
                <h2 className="section-title">Live Transcript</h2>
                {transcriptLines.length > 0 && (
                  <button className="clear-btn" onClick={handleClear}>Clear</button>
                )}
              </div>
              <LiveTranscript lines={transcriptLines} />
            </div>
          </div>

        </div>

      </main>

      <footer className="footer">
        <p>Built for inclusive education · ISL Translator v0.2 (Phase 2)</p>
      </footer>
    </div>
  );
}
