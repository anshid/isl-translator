// src/components/SignPlayer.jsx
// Displays the current ISL sign — either a video or a text fallback

import { useRef, useEffect } from "react";

export function SignPlayer({ token, onVideoEnded, onVideoError }) {

  const videoRef = useRef(null);

  // Auto-play whenever token changes
  useEffect(() => {
    if (token?.type === "sign" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay blocked — call onVideoEnded to keep queue moving
        onVideoError?.();
      });
    }
  }, [token]);

  // Empty state
  if (!token) {
    return (
      <div className="sign-player sign-player--empty">
        <span className="sign-player__icon">🤟</span>
        <p className="sign-player__hint">Signs will appear here</p>
      </div>
    );
  }

  // Text fallback for unknown words
  if (token.type === "text") {
    return (
      <div className="sign-player sign-player--text">
        <div className="sign-player__text-badge">
          <span className="sign-player__text-label">No sign found</span>
          <span className="sign-player__text-word">{token.word}</span>
        </div>
      </div>
    );
  }

  // ISL sign video
  return (
    <div className="sign-player sign-player--video">
      <div className="sign-player__word-label">{token.word}</div>
      <video
        ref={videoRef}
        key={token.videoUrl}                   // force remount on new word
        className="sign-player__video"
        onEnded={onVideoEnded}
        onError={onVideoError}
        playsInline
        muted={false}
        controls={false}
      >
        <source src={token.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
