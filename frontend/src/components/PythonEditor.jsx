import { useEffect, useRef } from "react";

import Editor from "@monaco-editor/react";

import { getCompletions } from "../api/client";

export default function PythonEditor({
  code,
  onChange,
  disabled,
  pythonExecutable,
  workingDirectory,
}) {
  const settingsRef = useRef({
    pythonExecutable,
    workingDirectory,
  });

  useEffect(() => {
    settingsRef.current = {
      pythonExecutable,
      workingDirectory,
    };
  }, [pythonExecutable, workingDirectory]);

  function handleBeforeMount(monaco) {
    monaco.languages.registerCompletionItemProvider("python", {
      triggerCharacters: ["."],
      provideCompletionItems: async (model, position) => {
        const { pythonExecutable: interpreter, workingDirectory: cwd } = settingsRef.current;
        if (!interpreter || !cwd) {
          return { suggestions: [] };
        }

        try {
          const response = await getCompletions({
            code: model.getValue(),
            line_number: position.lineNumber,
            column: position.column,
            python_executable: interpreter,
            working_directory: cwd,
            max_items: 80,
          });

          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const completionKindMap = {
            class: monaco.languages.CompletionItemKind.Class,
            file: monaco.languages.CompletionItemKind.File,
            function: monaco.languages.CompletionItemKind.Function,
            keyword: monaco.languages.CompletionItemKind.Keyword,
            module: monaco.languages.CompletionItemKind.Module,
            property: monaco.languages.CompletionItemKind.Property,
            value: monaco.languages.CompletionItemKind.Value,
            variable: monaco.languages.CompletionItemKind.Variable,
          };

          return {
            suggestions: response.items.map((item) => ({
              label: item.label,
              kind: completionKindMap[item.kind] || monaco.languages.CompletionItemKind.Value,
              detail: item.detail,
              insertText: item.insert_text || item.label,
              range,
            })),
          };
        } catch (error) {
          return { suggestions: [] };
        }
      },
    });
  }

  return (
    <section className="panel editor-panel">
      <div className="panel-header">
        <h2>Python Editor</h2>
      </div>

      <div className="editor-shell">
        <Editor
          beforeMount={handleBeforeMount}
          height="clamp(560px, 68vh, 920px)"
          defaultLanguage="python"
          theme="light"
          value={code}
          onChange={(value) => onChange(value || "")}
          loading={<div className="editor-loading">Loading editor...</div>}
          options={{
            automaticLayout: true,
            acceptSuggestionOnCommitCharacter: true,
            fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            tabCompletion: "on",
            wordWrap: "on",
            readOnly: disabled,
          }}
        />
      </div>
    </section>
  );
}
