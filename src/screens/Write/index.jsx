/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";

import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { FaPlus, FaSave } from "react-icons/fa";
import saveExamQuestions from "../../utilities/saveExamQuestions";
import loadExamQuestions from "../../utilities/loadExamQuestions";
import calculateTotalAllottedMarks from "../../utilities/totalAlottedMarks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NumberedQuestionList from "../../components/shared/NumberedQuestionList";

const Options = ({ questionToEdit, handleOptionChange }) => {
  return (
    <Flex direction="column" fontSize="sm" gap={4}>
      {questionToEdit.id
        ? questionToEdit.options.map((option) => (
            <Flex key={option.label} gap={4} alignItems="center">
              <span className="font-bold w-6">{option.label}:</span>
              <Input
                size={"sm"}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(option.label, e.target.value)
                }
              />
            </Flex>
          ))
        : questionToEdit.options.map((option) => (
            <Flex key={option.label} gap={4} alignItems={"center"}>
              <span className="font-bold w-6">{option.label}:</span>
              <Input
                size={"sm"}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(option.label, e.target.value)
                }
              />
            </Flex>
          ))}
    </Flex>
  );
};

export default function WritePage({
  subject,
  subjectExamId,
  questions,
  setQuestions,
  newQuestion,
  setNewQuestion,
}) {
  // const [questions, setQuestions] = useState([]);
  const { questionIndex } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigateToQuestion = (index) => {
    navigate(`/admin/exams/${subjectExamId}/${index}`);
    setCurrentQuestionIndex(index);
  };

  const parsedQuestionIndex = parseInt(questionIndex, 10);
  const currentIndex =
    !isNaN(parsedQuestionIndex) &&
    parsedQuestionIndex >= 0 &&
    parsedQuestionIndex < questions.length
      ? parsedQuestionIndex
      : null;

  const [viewIndex, setViewIndex] = useState(currentIndex + 1);
  const navigate = useNavigate();
  const [ctq, setCTQ] = useState(0);

  // const [newQuestion, setNewQuestion] = useState(initialQuestion);

  useEffect(() => {
    const loadedQuestions = loadExamQuestions(subjectExamId);
    setQuestions(loadedQuestions);

    setCTQ(calculateTotalAllottedMarks(loadedQuestions));

    if (
      !isNaN(parsedQuestionIndex) &&
      parsedQuestionIndex >= 0 &&
      parsedQuestionIndex < loadedQuestions.length
    ) {
      setNewQuestion(loadedQuestions[parsedQuestionIndex]);
      setViewIndex(parsedQuestionIndex + 1);
    } else if (
      !isNaN(parsedQuestionIndex) &&
      parsedQuestionIndex === loadedQuestions.length
    ) {
      setViewIndex(parsedQuestionIndex + 1);
    } else {
      setViewIndex(0);
    }
  }, [subjectExamId, questionIndex]);

  const handleSaveQuestion = () => {
    if (newQuestion.question.trim() === "") {
      // Check if the question is empty
      alert("Please enter a question before saving.");
      return;
    }

    // Check if any option is empty
    if (newQuestion.options.some((option) => option.text.trim() === "")) {
      alert("Please fill in all options before saving.");
      return;
    }

    const updatedQuestions = [...questions];

    if (currentIndex !== null) {
      // If currentIndex is valid, update the existing question
      updatedQuestions[currentIndex] = newQuestion;
    } else {
      // If currentIndex is null, it means this is a new question, so add it to the end
      updatedQuestions.push(newQuestion);
    }

    const totalAllottedMarks = calculateTotalAllottedMarks(updatedQuestions);
    setCTQ(totalAllottedMarks);

    setQuestions(updatedQuestions);

    saveExamQuestions(subjectExamId, updatedQuestions);
  };

  function handleCorrectOptionChange(option) {
    setNewQuestion({ ...newQuestion, correctOption: option });
  }

  function handleAllotedMarkChange(mark) {
    setNewQuestion({ ...newQuestion, allotedMark: parseInt(mark, 10) });
  }

  function handleNewQuestionChange(value) {
    setNewQuestion({ ...newQuestion, question: value });
  }

  function handleNewOptionChange(optionLabel, value) {
    const updatedOptions = newQuestion.options.map((option) =>
      option.label === optionLabel ? { ...option, text: value } : option
    );
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  }

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ "header": 1 }, { "header": 2 }], // custom button values
    [{ "list": "ordered" }, { "list": "bullet" }],
    [{ "script": "sub" }, { "script": "super" }], // superscript/subscript

    [{ "size": ["small", false, "large", "huge"] }], // custom dropdown

    [{ "color": [] }, { "background": [] }], // dropdown with defaults from theme
    [{ "font": [] }],
    [{ "align": [] }],

    ["link", "image"],

    ["clean"], // remove formatting button
  ];
  const module = { toolbar: toolbarOptions };

  const examDetails = {
    session: subject.session,
    term: subject.term,
    subject: subject.subject,
    class: subject.class,
    date: subject.date,
    time: subject.time,
    duration: subject.duration,
    "exam Marks": `${subject.examMarks} marks`,
  };

  return (
    <Flex gap={4} color={"neutral.900"}>
      <Box>
        <Box mt={0} px={6} py={4} bg={"white"} rounded={"lg"}>
          <Text as={"h2"} fontWeight={"bold"} mb={4}>
            QUESTION {viewIndex}:
          </Text>{" "}
          <ReactQuill
            theme="snow"
            value={newQuestion.question}
            onChange={handleNewQuestionChange}
            modules={module}
            className="h-full"
          />
        </Box>

        <Box my={4} px={6} py={4} bg={"white"} rounded={"lg"} w={"full"}>
          <Options
            handleOptionChange={handleNewOptionChange}
            questionToEdit={newQuestion}
          />
          <Button
            mt={6}
            colorScheme="purple"
            size={"xs"}
            w={"max-content"}
            variant={"outline"}
            leftIcon={<FaPlus />}
          >
            Add Option
          </Button>
        </Box>

        <Flex w={"full"} justifyContent={"space-between"} gap={4} my={2}>
          <Box w={"full"} px={6} py={4} bg={"white"} rounded={"lg"}>
            <Text as={"h2"} fontSize={"sm"} fontWeight={"bold"} mb={2}>
              CORRECT OPTION:
            </Text>{" "}
            <Input
              size={"sm"}
              value={newQuestion.correctOption}
              onChange={(e) => handleCorrectOptionChange(e.target.value)}
              w={"max-content"}
            />
          </Box>

          <Box w={"full"} px={6} py={4} bg={"white"} rounded={"lg"}>
            <Text as={"h2"} fontSize={"sm"} fontWeight={"bold"} mb={2}>
              SET MARK:
            </Text>{" "}
            <Input
              type="number"
              size={"sm"}
              value={newQuestion.allotedMark}
              onChange={(e) => handleAllotedMarkChange(e.target.value)}
              w={"max-content"}
            />
          </Box>
        </Flex>

        <Flex justifyContent={"space-between"} gap={4}>
          <NumberedQuestionList
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            navigateToQuestion={navigateToQuestion}
          />

          <Button
            mt={6}
            colorScheme="red"
            // bg={"brand.900"}
            rounded={"none"}
            size={"sm"}
            w={"max-content"}
            display={"flex"}
            alignItems={"center"}
            rightIcon={<FaSave />}
            onClick={handleSaveQuestion}
          >
            Save Question
          </Button>
        </Flex>
      </Box>
      {/* Exam Details Side Bar */}
      <Box
        rounded={"lg"}
        border={"1px dotted"}
        w={"full"}
        maxW={"xs"}
        bg={"white"}
        p={6}
        h={"max-content"}
      >
        <Box>
          <Text
            as={"h2"}
            mb={4}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            color={"neutral.700"}
            w={"max-content"}
            pb={1}
            borderBottom={"1px solid"}
          >
            EXAM Details
          </Text>
          <Flex direction={"column"} textTransform={"uppercase"} gap={2}>
            {Object.keys(examDetails).map((key) => (
              <Flex justifyContent={"space-between"} key={key}>
                <Text as={"small"}>{key}:</Text>
                <Text as={"small"} fontWeight={"bold"}>
                  {examDetails[key]}
                </Text>
              </Flex>
            ))}
          </Flex>{" "}
        </Box>

        <Flex direction={"column"} gap={4} mt={8}>
          <Box
            px={4}
            py={2}
            border={"1px dotted"}
            borderColor={"neutral.900"}
            rounded={"lg"}
            fontWeight={"bold"}
          >
            <Text
              as={"p"}
              mb={3}
              fontSize={"xs"}
              color={"neutral.700"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}
            >
              Accumulated total marks
            </Text>
            <Text as={"p"} mb={3} fontSize={"sm"} textTransform={"uppercase"}>
              {ctq}
            </Text>
          </Box>{" "}
          <Box
            px={4}
            py={2}
            border={"1px dotted"}
            borderColor={"neutral.900"}
            rounded={"lg"}
            fontWeight={"bold"}
          >
            <Text
              as={"p"}
              mb={3}
              fontSize={"xs"}
              color={"neutral.700"}
              fontWeight={"semibold"}
              textTransform={"uppercase"}
            >
              Total Questions:
            </Text>
            <Text as={"p"} mb={3} fontSize={"sm"} textTransform={"uppercase"}>
              {questions.length}
            </Text>
          </Box>{" "}
        </Flex>
      </Box>

      {/* End of Exam Details Side Bar */}
    </Flex>
  );
}
