/* eslint-disable react/prop-types */

function NumberedQuestionList({
  questions,
  currentQuestionIndex,
  navigateToQuestion,
}) {
  return (
    <div className="question-list">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => navigateToQuestion(index)}
          className={currentQuestionIndex === index ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default NumberedQuestionList;
