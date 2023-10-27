/* eslint-disable react/prop-types */
import { Box, Text, Flex } from "@chakra-ui/react";

function QuestionBox({
  question,
  questionNumber,
  options,
  onOptionSelect,
  selectedAnswer,
}) {
  return (
    <Box
      height={"65vh"}
      bg={"white"}
      width={"full"}
      overflowY={"scroll"}
      px={8}
      py={4}
      mb={8}
      rounded={"lg"}
    >
      <Text
        as={"h2"}
        mb={6}
        fontSize={"xl"}
        fontWeight={"bold"}
        display={"flex"}
        gap={4}
      >
        <span>{questionNumber}.</span> {question}
      </Text>

      <div>
        {options.map((option, index) => (
          <Flex key={index} gap={2}>
            <input
              type="radio"
              name="answer"
              value={option}
              id={`option-${index}`}
              onChange={() => onOptionSelect(option)}
              checked={option === selectedAnswer}
            />
            <label htmlFor={`option-${index}`}>{option.text}</label>
          </Flex>
        ))}
      </div>
    </Box>
  );
}

export default QuestionBox;
