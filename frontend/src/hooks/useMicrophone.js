// src/hooks/useMicrophone.js
import { useRef, useState, useCallback } from "react";
import { transcriptSocket } from "../utils/websocket";

const CHUNK_INTERVAL_MS = 5000; // Record 5 seconds, then send full clip

export function useMicrophone() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]); // ← collect ALL chunks here

  const startListening = useCallback(async () => {
    setError(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      // Collect chunks into buffer
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // When a 5-second segment stops, send the COMPLETE blob (with header)
      mediaRecorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const completeBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          transcriptSocket.sendAudio(completeBlob);
          chunksRef.current = []; // reset for next segment
        }
      };

      // Restart recorder every 5 seconds to create complete segments
      const recordSegment = () => {
        if (streamRef.current?.active) {
          chunksRef.current = [];
          const rec = new MediaRecorder(stream, {
            mimeType: "audio/webm;codecs=opus",
          });
          mediaRecorderRef.current = rec;

          rec.ondataavailable = (e) => {
            if (e.data?.size > 0) chunksRef.current.push(e.data);
          };

          rec.onstop = () => {
            if (chunksRef.current.length > 0) {
              const blob = new Blob(chunksRef.current, { type: "audio/webm" });
              transcriptSocket.sendAudio(blob);
            }
            // Start next segment if still listening
            if (streamRef.current?.active) {
              setTimeout(recordSegment, 100);
            }
          };

          rec.start();
          setTimeout(() => {
            if (rec.state === "recording") rec.stop();
          }, CHUNK_INTERVAL_MS);
        }
      };

      recordSegment();
      setIsListening(true);

    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError("Microphone access denied. Please allow mic access in your browser.");
      } else {
        setError(`Mic error: ${err.message}`);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    // Stop the stream — onstop will fire and send final chunk
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsListening(false);
  }, []);

  return { isListening, startListening, stopListening, error };
}