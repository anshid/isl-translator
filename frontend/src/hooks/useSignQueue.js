// src/hooks/useSignQueue.js
// Manages a queue of sign tokens and plays them one by one

import { useState, useRef, useCallback, useEffect } from "react";
import { tokenizeSentence } from "../utils/tokenizer.js";

export function useSignQueue() {
  const [currentToken, setCurrentToken] = useState(null);  // currently showing
  const [queue, setQueue]               = useState([]);     // waiting tokens
  const [isPlaying, setIsPlaying]       = useState(false);
  const [history, setHistory]           = useState([]);     // last 4 shown words

  const queueRef    = useRef([]);
  const playingRef  = useRef(false);
  const timerRef    = useRef(null);

  // Add new sentence to queue
  const enqueue = useCallback((sentence) => {
    const tokens = tokenizeSentence(sentence);
    if (tokens.length === 0) return;

    queueRef.current = [...queueRef.current, ...tokens];
    setQueue([...queueRef.current]);

    // Auto-start playing if not already
    if (!playingRef.current) {
      playNext();
    }
  }, []);

  // Play the next token in queue
  const playNext = useCallback(() => {
    if (queueRef.current.length === 0) {
      playingRef.current = false;
      setIsPlaying(false);
      setCurrentToken(null);
      return;
    }

    playingRef.current = true;
    setIsPlaying(true);

    const next = queueRef.current[0];
    queueRef.current = queueRef.current.slice(1);
    setQueue([...queueRef.current]);
    setCurrentToken(next);

    // Add to history (keep last 4)
    setHistory(prev => [...prev.slice(-3), next]);

    // Duration per token:
    // - sign video: let the video's onEnded handle it
    // - text token: show for 1.5 seconds
    if (next.type === "text") {
      timerRef.current = setTimeout(playNext, 1500);
    }
    // for "sign" type, onVideoEnded callback will call playNext
  }, []);

  // Called by the video player when a sign video finishes
  const onVideoEnded = useCallback(() => {
    playNext();
  }, [playNext]);

  // Called if video fails to load — skip to next
  const onVideoError = useCallback(() => {
    timerRef.current = setTimeout(playNext, 500);
  }, [playNext]);

  // Clear queue
  const clearQueue = useCallback(() => {
    clearTimeout(timerRef.current);
    queueRef.current = [];
    setQueue([]);
    setCurrentToken(null);
    setHistory([]);
    playingRef.current = false;
    setIsPlaying(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return {
    currentToken,
    queue,
    isPlaying,
    history,
    enqueue,
    onVideoEnded,
    onVideoError,
    clearQueue,
  };
}
