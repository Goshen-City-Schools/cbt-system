export default function calculateTotalAllottedMarks(examQuestions) {
  // Filter the exam questions for the given subjectId

  // Calculate the total allotted mark by summing the 'allotedMark' of each question
  const totalAllottedMarks = examQuestions.reduce(
    (total, question) => total + question.allotedMark,
    0
  );

  return totalAllottedMarks;
}
