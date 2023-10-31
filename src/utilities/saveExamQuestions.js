// Function to save exam questions to local storage
export default function saveExamQuestions(subjectExamId, questions) {
  const examQuestions = localStorage.getItem("examQuestions");
  let examQuestionsData = examQuestions ? JSON.parse(examQuestions) : {};

  examQuestionsData[subjectExamId] = {
    subjectExamId: subjectExamId,
    questions: questions,
  };

  localStorage.setItem("examQuestions", JSON.stringify(examQuestionsData));
}
