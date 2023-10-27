/* eslint-disable react/prop-types */
import { Flex, Box } from "@chakra-ui/react";

const QuestionNumbersBox = ({
  totalQuestions,
  boxesPerRow,
  answeredQuestions,
  currentQuestionIndex, // Add currentQuestionIndex as a prop
}) => {
  const rows = Math.ceil(totalQuestions / boxesPerRow);

  const generateBoxes = (start, end) => {
    const boxes = [];
    for (let i = start; i <= end; i++) {
      const isAnswered = answeredQuestions.includes(i);
      const isActive = i === currentQuestionIndex; // Check if the question is active
      const boxColor = isAnswered
        ? "green.400"
        : isActive
        ? "blue.400"
        : "brand.200";

      boxes.push(
        <Flex
          key={i}
          w="36px"
          h="36px"
          bg={boxColor}
          m="4px"
          textAlign="center"
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"sm"}
          fontWeight={"bold"}
          rounded={"sm"}
        >
          {i}
        </Flex>
      );
    }
    return boxes;
  };

  const renderRows = () => {
    const rowsArray = [];
    let start = 1;
    for (let i = 0; i < rows; i++) {
      const end = Math.min(start + boxesPerRow - 1, totalQuestions);
      rowsArray.push(
        <Flex
          key={i}
          flexWrap="wrap"
          justifyContent={"flex-end"}
          w={"full"}
          alignItems={"flex-end"}
        >
          {generateBoxes(start, end)}
        </Flex>
      );
      start = end + 1;
    }
    return rowsArray;
  };

  return <Box>{renderRows()}</Box>;
};

export default QuestionNumbersBox;
