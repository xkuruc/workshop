import { useEffect, useState } from "react";

import LessonMarkdown from "./LessonMarkdown";
import {
  getDisplayCorrectAnswer,
  getLessonQuestionStats,
  hasAnswer,
  isQuestionCorrect,
} from "../utils/questionEvaluation";


export default function LessonQuestions({ lesson, answers, onAnswerChange }) {
  const [draftAnswers, setDraftAnswers] = useState(answers);

  useEffect(() => {
    setDraftAnswers(answers);
  }, [lesson.id, answers]);

  const stats = getLessonQuestionStats(lesson.questions, answers);

  return (
    <section className="panel lesson-panel">
      <div className="panel-header">
        <h2>Questions</h2>
        <span className="lesson-question-summary">
          Correct {stats.correct} / {stats.total}
        </span>
      </div>

      <div className="question-list">
        {lesson.questions.map((question, index) => {
          const submittedAnswer = answers[question.id] || "";
          const draftAnswer = draftAnswers[question.id] ?? submittedAnswer;
          const isShortAnswer = question.type === "short-answer";
          const isDirtyShortAnswer = isShortAnswer && draftAnswer !== submittedAnswer;
          const answered = hasAnswer(question, submittedAnswer);
          const isCorrect = isQuestionCorrect(question, submittedAnswer);

          return (
            <article key={question.id} className="question-card">
              <div className="question-header">
                <span className="question-index">Question {index + 1}</span>
                {isDirtyShortAnswer ? (
                  <span className="question-status pending">Press Enter to submit</span>
                ) : answered ? (
                  <span className={`question-status ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                ) : (
                  <span className="question-status pending">Waiting for an answer</span>
                )}
              </div>

              <LessonMarkdown content={question.prompt} className="question-prompt" />

              {question.type === "multiple-choice" ? (
                <div className="option-list">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button ${submittedAnswer === option ? "selected" : ""} ${submittedAnswer === option && option === question.correctAnswer ? "correct" : ""}`}
                      onClick={() => {
                        setDraftAnswers((current) => ({
                          ...current,
                          [question.id]: option,
                        }));
                        onAnswerChange(question.id, option);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <label className="field">
                  <span className="visually-hidden">Short answer</span>
                  <input
                    type="text"
                    value={draftAnswer}
                    onChange={(event) =>
                      setDraftAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value,
                      }))
                    }
                    onKeyDown={(event) => {
                      if (event.key !== "Enter") {
                        return;
                      }

                      event.preventDefault();
                      onAnswerChange(question.id, draftAnswer);
                    }}
                    placeholder={question.placeholder || "Write your answer"}
                  />
                </label>
              )}

              {!isDirtyShortAnswer && answered && (question.explanation || (isShortAnswer && !isCorrect)) ? (
                <div className={`question-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                  {isShortAnswer && !isCorrect ? (
                    <p className="question-correct-answer">
                      <strong>Correct answer:</strong> {getDisplayCorrectAnswer(question)}
                    </p>
                  ) : null}
                  {question.explanation ? <LessonMarkdown content={question.explanation} /> : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
