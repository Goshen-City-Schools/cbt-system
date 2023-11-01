/* eslint-disable react/prop-types */
import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import loadExamQuestions from "../utilities/loadExamQuestions";

function QuestionBox({ question, options, index }) {
  return (
    <Flex direction={"column"} gap={2}>
      <Text as={"p"} fontWeight={"bold"} display={"flex"}>
        {index}.&nbsp;
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </Text>

      {/* Question writeup */}
      {/* <Box mt={1}>
        <Text as={"p"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          reiciendis earum eius nemo! Soluta, nesciunt!{" "}
        </Text>
      </Box> */}

      {/* Options */}
      <Flex direction={"column"} gap={2} fontSize={"sm"} mt={1}>
        {options.map((option, index) => (
          <Flex key={index} gap={2} alignItems={"center"}>
            <Grid
              h={6}
              w={6}
              placeItems={"center"}
              border={"1px dotted"}
              borderColor={"brand.900"}
              color={"brand.700"}
              rounded={"full"}
            >
              <span className="text-xs">{option.name}</span>
            </Grid>
            <Text as={"p"}>{option.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

// eslint-disable-next-line no-unused-vars
export default function ExamPreviewScreen({ subjectExamId }) {
  const examQuestions = loadExamQuestions(subjectExamId);
  return (
    <Box p={4} bg={"white"} rounded={"lg"}>
      <Flex direction={"column"} gap={8}>
        {examQuestions.map((question, index) => (
          <QuestionBox
            key={index}
            question={question.question}
            options={question.options}
            index={index + 1}
          />
        ))}
      </Flex>
    </Box>
  );
}
