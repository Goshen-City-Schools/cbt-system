/* eslint-disable react/prop-types */

import { Button, Flex } from "@chakra-ui/react";

function NumberedQuestionList({
  questions,
  currentQuestionIndex,
  navigateToQuestion,
}) {
  return (
    <Flex className="question-list" gap={2}>
      {questions.map((question, index) => (
        <Button
          colorScheme="blue"
          size={"xs"}
          key={index}
          onClick={() => navigateToQuestion(index)}
          className={currentQuestionIndex === index ? "active" : ""}
        >
          {index + 1}
        </Button>
      ))}
    </Flex>
  );
}

export default NumberedQuestionList;
