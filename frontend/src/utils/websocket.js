// src/utils/websocket.js
// Manages WebSocket connection to the backend

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "ws://localhost:8000";

class TranscriptSocket {
  constructor() {
    this.ws = null;
    this.onTranscript = null;  // callback: (text) => void
    this.onStatus = null;      // callback: (status) => void
    this.onError = null;       // callback: (msg) => void
  }

  connect() {
    this.ws = new WebSocket(`${BACKEND_URL}/ws`);

    this.ws.onopen = () => {
      console.log("Connected to backend");
      this.onStatus?.("connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "transcript") {
        this.onTranscript?.(data.text);
      } else if (data.type === "error") {
        this.onError?.(data.text);
      }
    };

    this.ws.onclose = () => {
      console.log("Disconnected from backend");
      this.onStatus?.("disconnected");
    };

    this.ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      this.onStatus?.("error");
    };
  }

  sendAudio(audioBlob) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      // Convert Blob to ArrayBuffer and send
      audioBlob.arrayBuffer().then((buffer) => {
        this.ws.send(buffer);
      });
    }
  }

  disconnect() {
    this.ws?.close();
  }
}

export const transcriptSocket = new TranscriptSocket();
