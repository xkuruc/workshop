import StatusBadge from "./StatusBadge";

export default function OutputPanel({ result, notice, errorMessage }) {
  const richOutputs = result.richOutputs || [];
  const hasOutput = result.stdout || result.stderr || richOutputs.length > 0;

  return (
    <section className="panel output-panel">
      <div className="panel-header">
        <h2>Output Console</h2>
        <StatusBadge status={result.status} />
      </div>

      <div className="output-meta">
        <span>Exit code: {result.exitCode ?? "n/a"}</span>
        <span>Runtime: {result.durationSeconds != null ? `${result.durationSeconds}s` : "n/a"}</span>
      </div>

      {notice ? <div className="notice-banner">{notice}</div> : null}
      {errorMessage ? <div className="error-banner">{errorMessage}</div> : null}

      {!hasOutput ? (
        <div className="empty-output">
          Run the current script to see stdout and stderr here.
        </div>
      ) : null}

      {richOutputs.length > 0 ? (
        <div className="rich-output-list">
          {richOutputs.map((item, index) => (
            <div key={`${item.type}-${index}`} className="rich-output-card">
              <div className="console-label">
                {item.title || "output"} {item.mime_type ? `(${item.mime_type})` : ""}
              </div>

              {item.type === "image" ? (
                <img
                  className="rich-output-image"
                  src={`data:${item.mime_type || "image/png"};base64,${item.content}`}
                  alt={item.title || `Rich output ${index + 1}`}
                />
              ) : null}

              {item.type === "html" ? (
                <iframe
                  className="rich-output-frame"
                  srcDoc={item.content}
                  title={item.title || `HTML output ${index + 1}`}
                />
              ) : null}

              {item.type === "text" ? <pre className="rich-output-text">{item.content}</pre> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="output-grid">
        <div className="console-block">
          <div className="console-label">stdout</div>
          <pre>{result.stdout || "(no stdout)"}</pre>
        </div>

        <div className="console-block stderr">
          <div className="console-label">stderr</div>
          <pre>{result.stderr || "(no stderr)"}</pre>
        </div>
      </div>
    </section>
  );
}
