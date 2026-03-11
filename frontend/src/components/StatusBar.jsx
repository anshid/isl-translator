// src/components/StatusBar.jsx
// Shows connection + listening status

export function StatusBar({ connectionStatus, isListening }) {
  const connectionLabel = {
    connected: "Backend Connected",
    disconnected: "Backend Disconnected",
    error: "Connection Error",
  }[connectionStatus] || "Connecting...";

  const connectionColor = {
    connected: "#22c55e",
    disconnected: "#ef4444",
    error: "#f97316",
  }[connectionStatus] || "#facc15";

  return (
    <div className="status-bar">
      <div className="status-item">
        <span
          className="status-dot"
          style={{ background: connectionColor }}
        />
        <span>{connectionLabel}</span>
      </div>

      <div className="status-item">
        <span
          className="status-dot"
          style={{
            background: isListening ? "#22c55e" : "#64748b",
            animation: isListening ? "pulse 1.5s infinite" : "none",
          }}
        />
        <span>{isListening ? "Listening..." : "Mic Off"}</span>
      </div>
    </div>
  );
}
