import { useState } from "react";
import { useParams } from "react-router-dom";
import PageSectionHeader from "../../components/shared/PageSectionHeader";
import PageWrapper from "../../components/shared/PageWrapper";
import { Grid, GridItem, Button, Flex, Box, Text } from "@chakra-ui/react";
import QuestionNumbersBox from "../../components/shared/QuestionNumbersBox";
import Timer from "../../components/shared/TimerBox";
import QuestionBox from "../../components/shared/QuestionBox";
import { testData } from "../../data/tests.data";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MoodlePage() {
  const { assessmentID } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const subjectData = testData.find((subject) => subject.id == assessmentID);
  const questions = subjectData.questions;
  const [score, setScore] = useState(0); // Initialize score

  const handleOptionSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });

    const currentQuestionNumber = currentQuestionIndex + 1; // Calculate the current question number

    setAnsweredQuestions((prevAnsweredQuestions) => {
      if (!prevAnsweredQuestions.includes(currentQuestionNumber)) {
        return [...prevAnsweredQuestions, currentQuestionNumber];
      }
      return prevAnsweredQuestions;
    });

    // Check if the selected answer is correct and increment the score
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.correctOption === answer.label) {
      setScore(score + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex <= 0) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const calculateScore = () => {
    return score;
  };

  return (
    <PageWrapper>
      {/* <PageSectionHeader
        pageTitle={"Moodle"}
        pageCrumb={"Home / Exam / Start"}
      /> */}
      <Grid templateColumns={"1fr auto"} gap={4} alignItems={"start"}>
        <GridItem>
          <Flex direction={"column"} alignItems={"center"} w={"full"}>
            <QuestionBox
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onOptionSelect={handleOptionSelect}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
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
                onClick={handlePrevQuestion}
                leftIcon={<FaChevronLeft />}
              >
                Prev
              </Button>
              {/* <Timer
                initialTime={subjectData.duration}
                onTimerEnd={() => alert("Timer reached zero!")}
              /> */}
              <Button
                rightIcon={<FaChevronRight />}
                colorScheme="green"
                size={"sm"}
                onClick={handleNextQuestion}
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
            currentQuestionIndex={currentQuestionIndex + 1}
            answeredQuestions={answeredQuestions}
          />
          <Button bg={"accent.700"} size={"sm"} onClick={calculateScore}>
            Submit
          </Button>
          <Text as="p" fontSize={"lg"} fontWeight={"bold"} mt={2}>
            <Text as="strong">Score: {score}</Text>
          </Text>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}
