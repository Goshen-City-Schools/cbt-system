// Function to load exam questions from local storage
export default function loadExamQuestions(subjectExamId) {
  const examQuestionsData = localStorage.getItem("examQuestions");
  if (examQuestionsData) {
    const parsedData = JSON.parse(examQuestionsData);
    if (parsedData[subjectExamId]) {
      return parsedData[subjectExamId].questions;
    }
  }
  return [];
}
