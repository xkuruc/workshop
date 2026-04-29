export default function LessonNavigation({
  currentLessonIndex,
  totalLessons,
  currentLesson,
  nextLesson,
  onPrevious,
  onNext,
  navigationDisabled,
}) {
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === totalLessons - 1;

  return (
    <section className="panel lesson-navigation-panel">
      <div>
        <p className="lesson-navigation-label">Navigácia</p>
        <h2 className="lesson-navigation-title">{currentLesson.title}</h2>
        <p className="lesson-navigation-copy">
          {isLastLesson
            ? "Si na poslednej lekcii workshopu."
            : `Ďalšia zastávka: ${nextLesson.title}`}
        </p>
      </div>

      <div className="button-row lesson-navigation-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onPrevious}
          disabled={isFirstLesson || navigationDisabled}
        >
          Predchádzajúca lekcia
        </button>
        <button
          type="button"
          className="primary-button"
          onClick={onNext}
          disabled={isLastLesson || navigationDisabled}
        >
          {isLastLesson ? "Koniec workshopu" : "Ďalšia lekcia"}
        </button>
      </div>
    </section>
  );
}
