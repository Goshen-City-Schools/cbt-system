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
import QuillToolbar, { formats, modules } from "../../widgets/QuiilToolbar";
import { MdDelete } from "react-icons/md";

const Options = ({
  questionToEdit,
  handleOptionChange,
  handleDeleteOption,
}) => {
  return (
    <Flex direction="column" fontSize="sm" gap={4}>
      {questionToEdit.options.map((option) => (
        <Flex key={option.label} gap={4} alignItems="center">
          <span className="font-bold w-6">{option.label}:</span>
          <Input
            size={"sm"}
            value={option.text}
            onChange={(e) => handleOptionChange(option.label, e.target.value)}
          />
          <Button
            size="xs"
            colorScheme="red"
            variant={"outline"}
            leftIcon={<MdDelete />}
            iconSpacing={"0"}
            onClick={() => handleDeleteOption(option.label)}
          ></Button>
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
  handleQuestionDelete,
  handleNewQuestion,
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

  const handleAddOption = () => {
    const newOptionLabel = String.fromCharCode(97 + newQuestion.options.length); // Generate labels 'a', 'b', 'c', ...
    const newOption = { label: newOptionLabel, text: "" };

    // Create a copy of the options array and add the new option
    const updatedOptions = [...newQuestion.options, newOption];

    // Update the questionToEdit with the new options
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };
  const handleDeleteOption = (optionLabel) => {
    // Filter out the option with the specified label
    const updatedOptions = newQuestion.options.filter(
      (option) => option.label !== optionLabel
    );

    // Reassign labels to the remaining options
    updatedOptions.forEach((option, index) => {
      option.label = String.fromCharCode(97 + index); // Assign letters 'a', 'b', 'c', ...
    });

    // Update the newQuestion with the updated options
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };
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
      <Box w={"full"}>
        <Box mt={0} px={6} py={4} bg={"white"} rounded={"lg"}>
          <Flex alignItems={"center"} mb={4} justifyContent={"space-between"}>
            <Text as={"h2"} fontWeight={"bold"}>
              QUESTION {viewIndex}:
            </Text>

            <Button
              size="xs"
              colorScheme="red"
              variant={"outline"}
              leftIcon={<MdDelete />}
              iconSpacing={"0"}
              onClick={handleQuestionDelete}
            ></Button>
          </Flex>
          <QuillToolbar toolbarId={"t1"} />
          <ReactQuill
            theme="snow"
            value={newQuestion.question}
            onChange={handleNewQuestionChange}
            className="h-full"
            modules={modules("t1")}
            formats={formats}
          />
        </Box>

        <Box my={4} px={6} py={4} bg={"white"} rounded={"lg"} w={"full"}>
          <Flex fontSize={"xs"} mb={6} alignItems={"center"}>
            <Flex>
              Mode:&nbsp;
              <Text as={"span"} fontWeight={"bold"} color={"accent.700"}>
                Options
              </Text>
            </Flex>

            <Button
              display={"flex"}
              ml={"auto"}
              colorScheme="purple"
              size={"xs"}
              w={"max-content"}
              leftIcon={<FaPlus />}
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </Flex>

          <Options
            handleOptionChange={handleNewOptionChange}
            questionToEdit={newQuestion}
            handleAddOption={handleAddOption}
            handleDeleteOption={handleDeleteOption}
          />
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

        <Flex justifyContent={"space-between"} gap={4} mt={6}>
          <Button
            colorScheme="blue"
            // bg={"brand.900"}
            rounded={"sm"}
            size={"sm"}
            w={"max-content"}
            variant={"outline"}
            display={"flex"}
            alignItems={"center"}
            leftIcon={<FaPlus />}
            onClick={handleNewQuestion}
            color={"brand.900"}
            borderColor={"brand.900"}
          >
            New Question
          </Button>
          <Button
            colorScheme="red"
            // bg={"brand.900"}
            rounded={"md"}
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
              Total Questions:
            </Text>
            <NumberedQuestionList
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              navigateToQuestion={navigateToQuestion}
            />
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
              Total Allloted Marks
            </Text>
            <Text as={"p"} mb={2} fontSize={"md"} textTransform={"uppercase"}>
              {`${ctq} marks`}
            </Text>
          </Box>{" "}
        </Flex>
      </Box>

      {/* End of Exam Details Side Bar */}
    </Flex>
  );
}
