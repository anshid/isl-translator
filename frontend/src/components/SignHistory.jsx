// src/components/SignHistory.jsx
// Shows the last few words that were signed

export function SignHistory({ history, queueLength }) {
  if (history.length === 0) return null;

  return (
    <div className="sign-history">
      <div className="sign-history__label">Recent signs</div>
      <div className="sign-history__words">
        {history.map((token, i) => (
          <span
            key={i}
            className={`sign-history__word ${
              i === history.length - 1 ? "sign-history__word--current" : ""
            }`}
          >
            {token.word}
          </span>
        ))}
        {queueLength > 0 && (
          <span className="sign-history__queue-badge">
            +{queueLength} queued
          </span>
        )}
      </div>
    </div>
  );
}
