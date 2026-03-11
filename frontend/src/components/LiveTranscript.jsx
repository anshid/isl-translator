// src/components/LiveTranscript.jsx
// Displays the rolling live transcript

import { useEffect, useRef } from "react";

export function LiveTranscript({ lines }) {
  const bottomRef = useRef(null);

  // Auto-scroll to latest line
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  if (lines.length === 0) {
    return (
      <div className="transcript-empty">
        <span>Transcript will appear here when you start speaking...</span>
      </div>
    );
  }

  return (
    <div className="transcript-box">
      {lines.map((line, i) => (
        <p
          key={i}
          className={`transcript-line ${i === lines.length - 1 ? "current" : "past"}`}
        >
          {line}
        </p>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
