export default function SettingsPanel({
  settings,
  onChange,
  onSave,
  onRun,
  onStop,
  backendConnected,
  backendRunning,
  busy,
  stopBusy,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Execution Settings</h2>
      </div>

      <label className="field">
        <span>Python executable</span>
        <input
          type="text"
          value={settings.pythonExecutable}
          onChange={(event) => onChange("pythonExecutable", event.target.value)}
          placeholder="/Users/you/miniconda3/envs/qiskit/bin/python"
        />
      </label>

      <label className="field">
        <span>Working directory</span>
        <input
          type="text"
          value={settings.workingDirectory}
          onChange={(event) => onChange("workingDirectory", event.target.value)}
          placeholder="/Users/you/projects/my-python-project"
        />
      </label>

      <label className="field">
        <span>Timeout (seconds)</span>
        <input
          type="number"
          min="1"
          max="600"
          value={settings.timeoutSeconds}
          onChange={(event) => onChange("timeoutSeconds", Number(event.target.value))}
        />
      </label>

      <div className="connection-row">
        <span className={`connection-pill ${backendConnected ? "connected" : "disconnected"}`}>
          Backend: {backendConnected ? "Connected" : "Disconnected"}
        </span>
        <span className="connection-detail">
          Runner: {backendRunning ? "Busy" : "Ready"}
        </span>
      </div>

      <div className="button-row">
        <button type="button" className="secondary-button" onClick={onSave} disabled={busy}>
          Save settings
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={onRun}
          disabled={busy || !backendConnected}
        >
          Run
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={onStop}
          disabled={!backendRunning || stopBusy || !backendConnected}
        >
          Stop
        </button>
      </div>

      <p className="field-help">
        Code runs with the interpreter you choose here, so packages installed in that environment
        such as qiskit are available to your script.
      </p>
    </section>
  );
}
