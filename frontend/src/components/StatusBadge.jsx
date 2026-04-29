const STATUS_LABELS = {
  idle: "Idle",
  running: "Running",
  success: "Success",
  error: "Error",
  timeout: "Timed Out",
  stopped: "Stopped",
};

export default function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;

  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}
