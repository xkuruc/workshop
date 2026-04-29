import { startTransition, useEffect, useState } from "react";

import { getConfig, getHealth, runCode, saveConfig, stopCode } from "./api/client";
import CodingWorkspace from "./components/CodingWorkspace";
import LessonHeader from "./components/LessonHeader";
import LessonNavigation from "./components/LessonNavigation";
import LessonQuestions from "./components/LessonQuestions";
import LessonTheory from "./components/LessonTheory";
import { lessons, createInitialLessonWorkspaces } from "./content/lessons/index";
import { DEFAULT_CONFIG } from "./defaults";


const EMPTY_ANSWERS = {};


function normalizeConfig(config) {
  return {
    pythonExecutable: config.python_executable || "",
    workingDirectory: config.working_directory || "",
    timeoutSeconds: config.timeout_seconds || 20,
  };
}


function toApiConfig(settings) {
  return {
    python_executable: settings.pythonExecutable,
    working_directory: settings.workingDirectory,
    timeout_seconds: settings.timeoutSeconds,
  };
}


function createEmptyResult() {
  return {
    status: "idle",
    stdout: "",
    stderr: "",
    richOutputs: [],
    exitCode: null,
    durationSeconds: null,
  };
}


export default function App() {
  const [settings, setSettings] = useState(DEFAULT_CONFIG);
  const [backendState, setBackendState] = useState({
    connected: false,
    running: false,
  });
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonAnswers, setLessonAnswers] = useState({});
  const [lessonWorkspaces, setLessonWorkspaces] = useState(() => createInitialLessonWorkspaces());
  const [busy, setBusy] = useState(false);
  const [stopBusy, setStopBusy] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const nextLesson = lessons[currentLessonIndex + 1] || null;
  const currentWorkspace = currentLesson.showEditor ? lessonWorkspaces[currentLesson.id] : null;
  const currentAnswers = lessonAnswers[currentLesson.id] || EMPTY_ANSWERS;
  const progressLabel = `Lekcia ${currentLessonIndex + 1} z ${lessons.length}`;
  const navigationDisabled = busy || stopBusy || backendState.running;

  useEffect(() => {
    let cancelled = false;

    async function loadInitialState() {
      try {
        const [config, health] = await Promise.all([getConfig(), getHealth()]);
        if (cancelled) {
          return;
        }

        const normalized = normalizeConfig(config);
        startTransition(() => {
          setSettings({
            pythonExecutable: normalized.pythonExecutable,
            workingDirectory: normalized.workingDirectory,
            timeoutSeconds: normalized.timeoutSeconds,
          });
          setBackendState({
            connected: Boolean(health.ok),
            running: Boolean(health.running),
          });
        });
      } catch (error) {
        if (!cancelled) {
          setBackendState({ connected: false, running: false });
        }
      }
    }

    loadInitialState();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function refreshHealth() {
      try {
        const health = await getHealth();
        if (!cancelled) {
          setBackendState({
            connected: Boolean(health.ok),
            running: Boolean(health.running),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setBackendState({ connected: false, running: false });
        }
      }
    }

    refreshHealth();
    const intervalId = window.setInterval(refreshHealth, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  function updateSetting(field, value) {
    const normalizedValue =
      field === "timeoutSeconds"
        ? Math.min(600, Math.max(1, Number.isFinite(value) ? value : 20))
        : value;

    setSettings((current) => ({
      ...current,
      [field]: normalizedValue,
    }));
  }

  function updateWorkspace(lessonId, updater) {
    setLessonWorkspaces((current) => {
      const existingWorkspace = current[lessonId];
      if (!existingWorkspace) {
        return current;
      }

      return {
        ...current,
        [lessonId]: updater(existingWorkspace),
      };
    });
  }

  async function persistConfig() {
    const saved = await saveConfig(toApiConfig(settings));
    const normalized = normalizeConfig(saved);
    setSettings({
      pythonExecutable: normalized.pythonExecutable,
      workingDirectory: normalized.workingDirectory,
      timeoutSeconds: normalized.timeoutSeconds,
    });
  }

  async function handleSave() {
    if (!currentWorkspace) {
      return;
    }

    setBusy(true);
    updateWorkspace(currentLesson.id, (workspace) => ({
      ...workspace,
      notice: "",
      errorMessage: "",
    }));

    try {
      await persistConfig();
      updateWorkspace(currentLesson.id, (workspace) => ({
        ...workspace,
        notice: "Nastavenia boli uložené do local_config.json.",
        errorMessage: "",
      }));
    } catch (error) {
      updateWorkspace(currentLesson.id, (workspace) => ({
        ...workspace,
        notice: "",
        errorMessage: error.message,
      }));
    } finally {
      setBusy(false);
    }
  }

  async function handleRun() {
    if (!currentWorkspace) {
      return;
    }

    const lessonId = currentLesson.id;
    const workspace = lessonWorkspaces[lessonId];

    setBusy(true);
    updateWorkspace(lessonId, (current) => ({
      ...current,
      notice: "",
      errorMessage: "",
      result: {
        ...createEmptyResult(),
        status: "running",
      },
    }));

    try {
      await persistConfig();
      const response = await runCode({
        code: workspace.code,
        python_executable: settings.pythonExecutable,
        working_directory: settings.workingDirectory,
        timeout_seconds: settings.timeoutSeconds,
      });

      updateWorkspace(lessonId, (current) => ({
        ...current,
        result: {
          status: response.status || (response.success ? "success" : "error"),
          stdout: response.stdout || "",
          stderr: response.stderr || "",
          richOutputs: response.rich_outputs || [],
          exitCode: response.exit_code,
          durationSeconds: response.duration_seconds,
        },
        notice: "Spustenie prebehlo lokálne na tvojom počítači.",
        errorMessage: "",
      }));
      setBackendState((current) => ({ ...current, connected: true, running: false }));
    } catch (error) {
      updateWorkspace(lessonId, (current) => ({
        ...current,
        result: {
          ...createEmptyResult(),
          status: "error",
          stderr: error.message,
        },
        notice: "",
        errorMessage: error.message,
      }));
    } finally {
      setBusy(false);
    }
  }

  async function handleStop() {
    if (!currentWorkspace) {
      return;
    }

    setStopBusy(true);
    updateWorkspace(currentLesson.id, (workspace) => ({
      ...workspace,
      notice: "",
      errorMessage: "",
    }));

    try {
      const response = await stopCode();
      updateWorkspace(currentLesson.id, (workspace) => ({
        ...workspace,
        notice: response.message,
        errorMessage: "",
      }));
    } catch (error) {
      updateWorkspace(currentLesson.id, (workspace) => ({
        ...workspace,
        notice: "",
        errorMessage: error.message,
      }));
    } finally {
      setStopBusy(false);
    }
  }

  function handleCodeChange(nextCode) {
    if (!currentWorkspace) {
      return;
    }

    updateWorkspace(currentLesson.id, (workspace) => ({
      ...workspace,
      code: nextCode,
    }));
  }

  function handleAnswerChange(questionId, value) {
    setLessonAnswers((current) => ({
      ...current,
      [currentLesson.id]: {
        ...(current[currentLesson.id] || {}),
        [questionId]: value,
      },
    }));
  }

  function handleSelectLesson(nextIndex) {
    if (navigationDisabled) {
      return;
    }
    setCurrentLessonIndex(nextIndex);
  }

  function handleNextLesson() {
    if (currentLessonIndex < lessons.length - 1 && !navigationDisabled) {
      setCurrentLessonIndex((current) => current + 1);
    }
  }

  function handlePreviousLesson() {
    if (currentLessonIndex > 0 && !navigationDisabled) {
      setCurrentLessonIndex((current) => current - 1);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Local-first Python workshop</p>
          <h1>Interaktívne lekcie s teóriou, otázkami a voliteľným Python editorom</h1>
          <p className="hero-copy">
            Každá lekcia môže obsahovať LaTeX, obrázky, okamžite vyhodnocované otázky a podľa
            potreby aj lokálne spúšťaný Python editor na tvojej vlastnej mašine.
          </p>
        </div>
      </header>

      <main className="workshop-main">
        <LessonHeader
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          onSelectLesson={handleSelectLesson}
          currentLesson={currentLesson}
          progressLabel={progressLabel}
        />

        <LessonTheory lesson={currentLesson} />

        {currentLesson.showEditor && currentWorkspace ? (
          <CodingWorkspace
            workspace={currentWorkspace}
            settings={settings}
            onSettingsChange={updateSetting}
            onSaveSettings={handleSave}
            onRunCode={handleRun}
            onStopCode={handleStop}
            onCodeChange={handleCodeChange}
            backendConnected={backendState.connected}
            backendRunning={backendState.running || currentWorkspace.result.status === "running"}
            busy={busy}
            stopBusy={stopBusy}
          />
        ) : null}

        <LessonQuestions
          lesson={currentLesson}
          answers={currentAnswers}
          onAnswerChange={handleAnswerChange}
        />

        <LessonNavigation
          currentLessonIndex={currentLessonIndex}
          totalLessons={lessons.length}
          currentLesson={currentLesson}
          nextLesson={nextLesson}
          onPrevious={handlePreviousLesson}
          onNext={handleNextLesson}
          navigationDisabled={navigationDisabled}
        />
      </main>
    </div>
  );
}
