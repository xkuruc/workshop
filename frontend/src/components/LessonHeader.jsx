export default function LessonHeader({
  lessons,
  currentLessonIndex,
  onSelectLesson,
  currentLesson,
  progressLabel,
}) {
  return (
    <section className="panel lesson-overview-panel">
      <div className="lesson-overview-top">
        <div>
          <p className="eyebrow">Interaktívny workshop</p>
          <h2 className="lesson-title">{currentLesson.title}</h2>
          <p className="lesson-summary">{currentLesson.summary}</p>
        </div>

        <div className="lesson-progress-card">
          <span className="lesson-progress-label">Priebeh</span>
          <strong>{progressLabel}</strong>
          <span>{currentLesson.showEditor ? "Obsahuje praktický editor" : "Teoretická lekcia"}</span>
        </div>
      </div>

      <div className="lesson-tab-list" aria-label="Zoznam lekcií">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            type="button"
            className={`lesson-tab ${index === currentLessonIndex ? "active" : ""}`}
            onClick={() => onSelectLesson(index)}
          >
            <span className="lesson-tab-step">Lekcia {index + 1}</span>
            <span className="lesson-tab-title">{lesson.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
