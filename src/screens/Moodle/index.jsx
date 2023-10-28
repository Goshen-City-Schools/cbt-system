import { useParams } from "react-router-dom";
import PageWrapper from "../../components/shared/PageWrapper";
import { Grid, GridItem, Button, Flex, Text } from "@chakra-ui/react";
import QuestionNumbersBox from "../../components/shared/QuestionNumbersBox";
import QuestionBox from "../../components/shared/QuestionBox";
import { testData } from "../../data/tests.data";
import { useCBT } from "../../contexts/CBTContext";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CBTNotStarted from "../CBTNotStarted";

export default function MoodlePage() {
  const { assessmentID } = useParams();
  const { state, dispatch } = useCBT();

  const subjectData = testData.find((subject) => subject.id == assessmentID);

  if (!state.cbtStarted) {
    return <CBTNotStarted />;
  }

  if (!subjectData || !subjectData.questions) {
    return <p>Assessment not found or has no questions.</p>;
  }

  const questions = subjectData.questions;

  return (
    <PageWrapper>
      <Grid templateColumns={"1fr auto"} gap={4} alignItems={"start"}>
        <GridItem>
          <Flex direction={"column"} alignItems={"center"} w={"full"}>
            <QuestionBox
              question={questions[state.currentQuestionIndex].question}
              options={questions[state.currentQuestionIndex].options}
              onOptionSelect={(answer) => {
                dispatch({ type: "SELECT_ANSWER", answer });
              }}
              questionNumber={state.currentQuestionIndex + 1}
              selectedAnswer={state.selectedAnswers[state.currentQuestionIndex]}
            />
            <Flex
              gap={8}
              alignItems={"center"}
              w={"full"}
              justifyContent={"center"}
            >
              <Button
                colorScheme="red"
                size={"sm"}
                onClick={() => {
                  dispatch({ type: "PREV_QUESTION" });
                }}
                leftIcon={<FaChevronLeft />}
              >
                Prev
              </Button>
              <Button
                rightIcon={<FaChevronRight />}
                colorScheme="green"
                size={"sm"}
                onClick={() => {
                  dispatch({ type: "NEXT_QUESTION" });
                }}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          minW={"180px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"start"}
          flexDirection={"column"}
          gap={6}
          h={"65vh"}
        >
          <QuestionNumbersBox
            totalQuestions={questions.length}
            boxesPerRow={6}
            currentQuestionIndex={state.currentQuestionIndex + 1}
            answeredQuestions={state.answeredQuestions}
          />
          <Button
            bg={"accent.700"}
            size={"sm"}
            onClick={() => {
              dispatch({ type: "CALCULATE_SCORE", subjectData });
            }}
          >
            Submit
          </Button>
          <Text as="p" fontSize={"lg"} fontWeight={"bold"} mt={2}>
            <Text as="strong">Score: {state.score}</Text>
          </Text>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}
