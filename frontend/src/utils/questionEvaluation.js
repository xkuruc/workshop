function normalizeFreeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}


export function hasAnswer(question, answer) {
  if (question.type === "multiple-choice") {
    return Boolean(answer);
  }

  return normalizeFreeText(answer).length > 0;
}


export function isQuestionCorrect(question, answer) {
  if (!hasAnswer(question, answer)) {
    return null;
  }

  if (question.type === "multiple-choice") {
    return answer === question.correctAnswer;
  }

  const acceptedAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer];

  const normalizedAnswer = normalizeFreeText(answer);
  return acceptedAnswers.some((accepted) => normalizeFreeText(accepted) === normalizedAnswer);
}


export function getDisplayCorrectAnswer(question) {
  const acceptedAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer];

  const answerWithDiacritics = acceptedAnswers.find((answer) => /[^\x00-\x7F]/.test(String(answer)));
  return answerWithDiacritics || acceptedAnswers[0] || "";
}


export function getLessonQuestionStats(questions, answers = {}) {
  const answered = questions.filter((question) => hasAnswer(question, answers[question.id])).length;
  const correct = questions.filter((question) => isQuestionCorrect(question, answers[question.id]) === true).length;

  return {
    answered,
    correct,
    total: questions.length,
  };
}
