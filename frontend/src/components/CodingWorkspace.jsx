import OutputPanel from "./OutputPanel";
import PythonEditor from "./PythonEditor";
import SettingsPanel from "./SettingsPanel";


export default function CodingWorkspace({
  workspace,
  settings,
  onSettingsChange,
  onSaveSettings,
  onRunCode,
  onStopCode,
  onCodeChange,
  backendConnected,
  backendRunning,
  busy,
  stopBusy,
}) {
  return (
    <div className="coding-workshop-layout">
      <div className="coding-settings-row">
        <SettingsPanel
          settings={settings}
          onChange={onSettingsChange}
          onSave={onSaveSettings}
          onRun={onRunCode}
          onStop={onStopCode}
          backendConnected={backendConnected}
          backendRunning={backendRunning}
          busy={busy}
          stopBusy={stopBusy}
        />
      </div>

      <section className="coding-main-column">
        <PythonEditor
          code={workspace.code}
          onChange={onCodeChange}
          disabled={workspace.result.status === "running"}
          pythonExecutable={settings.pythonExecutable}
          workingDirectory={settings.workingDirectory}
        />
        <OutputPanel
          result={workspace.result}
          notice={workspace.notice}
          errorMessage={workspace.errorMessage}
        />
      </section>
    </div>
  );
}
