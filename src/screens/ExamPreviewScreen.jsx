/* eslint-disable react/prop-types */
import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import loadExamQuestions from "../utilities/loadExamQuestions";
import Latex from "react-latex-next";

function QuestionBox({ subject, question, options, index }) {
  const setSubject = (subject) => {
    if (
      subject == "Mathematics" ||
      subject == "Physics" ||
      subject == "Chemistry"
    ) {
      return 1;
    } else return 0;
  };
  return (
    <Flex direction={"column"} gap={2}>
      <Text as={"p"} fontWeight={"bold"} display={"flex"}>
        {index}.&nbsp;
        {setSubject(subject) ? (
          <div>
            <Latex>{question}</Latex>
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: question }} />
        )}
      </Text>

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
            <Text as={"p"}>
              {" "}
              {setSubject(subject) ? (
                <Latex>{option.text}</Latex>
              ) : (
                <>{option.text}</>
              )}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

// eslint-disable-next-line no-unused-vars
export default function ExamPreviewScreen({ subjectExamId, subject }) {
  const examQuestions = loadExamQuestions(subjectExamId);
  return (
    <Box p={4} bg={"white"} rounded={"lg"}>
      <Flex direction={"column"} gap={8}>
        {examQuestions.map((question, index) => (
          <QuestionBox
            subject={subject.subject}
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
