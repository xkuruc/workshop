import LessonMarkdown from "./LessonMarkdown";


export default function LessonTheory({ lesson }) {
  return (
    <section className="panel lesson-panel">
      <div className="panel-header">
        <h2>Teória</h2>
      </div>

      <LessonMarkdown content={lesson.theory} className="lesson-markdown" />

      {lesson.images?.length ? (
        <div className="lesson-image-grid">
          {lesson.images.map((image) => (
            <figure key={image.src} className="lesson-figure">
              <img src={image.src} alt={image.alt} className="lesson-image" />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
