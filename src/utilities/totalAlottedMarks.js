export default function calculateTotalAllottedMarks(examQuestions) {
  // Filter the exam questions for the given subjectId

  // Calculate the total allotted mark by summing the 'allottedMark' of each question
  const totalAllottedMarks = examQuestions.reduce(
    (total, question) => total + question.allottedMark,
    0
  );

  return totalAllottedMarks;
}
