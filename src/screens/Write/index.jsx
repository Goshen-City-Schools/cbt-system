/* eslint-disable react/prop-types */

import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";

import { FaPlus, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import saveExamQuestions from "../../utilities/saveExamQuestions";
import loadExamQuestions from "../../utilities/loadExamQuestions";
import calculateTotalAllottedMarks from "../../utilities/totalAlottedMarks";

import QuillToolbar, { formats, modules } from "../../widgets/QuiilToolbar";

import NumberedQuestionList from "../../components/shared/NumberedQuestionList";

const Options = ({
  questionToEdit,
  handleOptionChange,
  handleDeleteOption,
}) => {
  return (
    <Flex direction="column" fontSize="sm" gap={4}>
      {questionToEdit?.options.map((option) => (
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
            iconSpacing={0}
            onClick={() => handleDeleteOption(option.label)}
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
}) {
  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const currentIndex = parseInt(questionIndex, 10) || 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(currentIndex);
  const [ctq, setCTQ] = useState(0);

  const initialNewQuestion = {
    question: "",
    options: [
      { label: "a", text: "" },
      { label: "b", text: "" },
      { label: "c", text: "" },
      { label: "d", text: "" },
    ],
    correctOption: "",
    allottedMark: 5,
  };

  const [newQuestion, setNewQuestion] = useState({ ...initialNewQuestion });
  const { question, options, correctOption } = newQuestion;

  // Use a ref to store the newQuestion state without triggering rerenders
  const newQuestionRef = useRef(initialNewQuestion);

  const isMounted = useRef(true);

  useEffect(() => {
    const loadedQuestions = loadExamQuestions(subjectExamId);
    setQuestions(loadedQuestions);
    setCTQ(calculateTotalAllottedMarks(questions));

    if (isMounted.current) {
      const parsedQuestionIndex = parseInt(questionIndex, 10);
      const currentIndex =
        !isNaN(parsedQuestionIndex) && parsedQuestionIndex >= 0
          ? parsedQuestionIndex
          : null;

      if (currentIndex !== null) {
        newQuestionRef.current = loadedQuestions[currentIndex];
        setCurrentQuestionIndex(currentIndex);
      } else {
        // Create a new question object
        newQuestionRef.current = {
          ...initialNewQuestion,
          question: "", // Clear the question text when creating a new question
        };
      }
      // Clear the newQuestion state when creating a new question
      setNewQuestion({ ...initialNewQuestion });
    }
  }, [subjectExamId, questionIndex]);

  // Handle changes to the question text
  function handleNewQuestionChange(value) {
    setNewQuestion({ ...newQuestion, question: value });
  }

  // Use an effect to watch for changes in the currentQuestionIndex and update newQuestion
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < questions.length) {
      newQuestionRef.current = questions[currentIndex];
      setNewQuestion({ ...newQuestionRef.current });
    } else {
      // Create a new question object
      newQuestionRef.current = {
        ...initialNewQuestion,
        question: "", // Clear the question text when creating a new question
      }; // Clear the newQuestion state when creating a new question
      setNewQuestion({ ...initialNewQuestion });
    }
    setCTQ(calculateTotalAllottedMarks(questions));
  }, [currentIndex, questions]);

  function handleOptionChange(optionLabel, value) {
    const optionIndex = options.findIndex(
      (option) => option.label === optionLabel
    );
    if (optionIndex !== -1) {
      options[optionIndex].text = value;
      setNewQuestion({ ...newQuestion, options: [...options] });
    }
  }
  function handleDeleteOption(optionLabel) {
    const updatedOptions = options
      .filter((option) => option.label !== optionLabel)
      .map((option, index) => ({
        ...option,
        label: String.fromCharCode(97 + index),
      }));
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  }

  const handleSaveQuestion = () => {
    if (question.trim() === "") {
      alert("Please enter a question before saving.");
      return;
    }

    if (options.length < 2) {
      alert("You must have at least two options for the question.");
      return;
    }

    if (options.some((option) => option.text.trim() === "")) {
      alert("Please fill in all options before saving.");
      return;
    }

    if (correctOption.trim() === "") {
      alert("Please enter the correct option before saving.");
      return;
    }

    const updatedQuestions = [...questions];
    if (currentIndex < updatedQuestions.length) {
      updatedQuestions[currentIndex] = newQuestion; // Make sure newQuestion has the correct edited data.
    } else {
      updatedQuestions.push(newQuestion);
    }

    const totalAllottedMarks = calculateTotalAllottedMarks(updatedQuestions);

    // Debugging: Inspect updatedQuestions before and after setting state.
    setCTQ(totalAllottedMarks);
    setQuestions(updatedQuestions);
    toast({
      title: `Question ${currentIndex + 1} Saved!`,
      duration: "2500",
      status: "success",
      isClosable: true,
      position: "top-right",
    });

    // Debugging: Confirm that the state has been updated.

    // Check if any errors occur while saving.
    try {
      saveExamQuestions(subjectExamId, updatedQuestions);
    } catch (error) {
      console.error("Error while saving:", error);
    }

    // Debugging: Confirm that the state has been updated.

    // Reset the newQuestion state to the initial state after saving
    setNewQuestion(initialNewQuestion);
  };

  // ... Rest of your component code

  const navigateToQuestion = (index) => {
    navigate(`/admin/exams/${subjectExamId}/${index}`);
    setCurrentQuestionIndex(index);
  };

  const handleQuestionDelete = () => {
    if (questions.length > 0) {
      if (
        window.confirm("Are you sure you want to delete the current question?")
      ) {
        const deleteIndex = currentIndex;
        if (questions[deleteIndex]) {
          const updatedQuestions = [...questions];
          updatedQuestions.splice(deleteIndex, 1);
          setQuestions(updatedQuestions);
          saveExamQuestions(subjectExamId, updatedQuestions);
          toast({
            title: `Question ${deleteIndex} Deleted!`,
            duration: "2000",
            status: "warning",
            isClosable: true,
            position: "top-right",
          });
          // Navigate to the previous question or to the list of questions if the current question was the first one.
          const targetIndex = deleteIndex > 0 ? deleteIndex - 1 : 0;
          navigate(`/admin/exams/${subjectExamId}/${targetIndex}`);
        } else if (deleteIndex > 0) {
          // If the current question doesn't exist, go to the previous question.
          const targetIndex = deleteIndex - 1;
          toast({
            title: `Question ${deleteIndex + 1} Deleted!`,
            duration: "2000",
            status: "warning",
            isClosable: true,
            position: "top-right",
          });
          navigate(`/admin/exams/${subjectExamId}/${targetIndex}`);
        }
      }
    }
  };

  useEffect(() => {
    setNewQuestion(newQuestionRef.current);
  }, [currentQuestionIndex]);

  const examDetails = {
    subject: subject.subject,
    class: subject.class,
    date: subject.date,
    time: subject.time,
    duration: subject.duration,
    "examMarks": `${subject.examMarks} marks`,
  };

  const handleNewQuestion = () => {
    if (question.trim() === "") {
      alert("Please enter a question before saving.");
      return;
    }

    if (options.some((option) => option.text.trim() === "")) {
      alert("Please fill in all options before saving.");
      return;
    }

    setCTQ(calculateTotalAllottedMarks(questions));
    setNewQuestion({ ...initialNewQuestion });
    navigate(`/admin/exams/${subjectExamId}/${questions.length}`);
  };

  const handleCorrectOptionChange = (option) => {
    setNewQuestion({ ...newQuestion, correctOption: option });
  };

  const handleAllottedMarkChange = (mark) => {
    setNewQuestion({ ...newQuestion, allottedMark: parseInt(mark, 10) });
  };

  const handleAddOption = () => {
    const newOptionLabel = String.fromCharCode(97 + options.length);
    const newOption = { label: newOptionLabel, text: "" };
    const updatedOptions = [...options, newOption];
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <Flex gap={4} color={"neutral.900"}>
      <Box w={"full"}>
        <Box mt={0} px={6} py={4} bg={"white"} rounded={"lg"}>
          <Flex alignItems={"center"} mb={4} justifyContent={"space-between"}>
            <Text as={"h2"} fontWeight={"bold"}>
              QUESTION {currentIndex + 1}:
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
            value={newQuestion?.question}
            onChange={handleNewQuestionChange}
            className="h-full"
            modules={modules("t1")}
            formats={formats}
          />{" "}
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
            handleOptionChange={handleOptionChange}
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
              value={newQuestion?.correctOption}
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
              value={newQuestion?.allottedMark}
              onChange={(e) => handleAllottedMarkChange(e.target.value)}
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
