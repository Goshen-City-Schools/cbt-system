/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

import { Box, Text, Flex, Input, Button, Grid } from "@chakra-ui/react";
import { FaChevronLeft, FaPlus, FaSave } from "react-icons/fa";

import formatDate from "../../utilities/formatDate.utils";

const Options = ({ questionToEdit, handleOptionChange }) => {
  return (
    <Flex direction="column" fontSize="sm" gap={4}>
      {questionToEdit.id ? (
        questionToEdit?.options?.map((option) => (
          <Flex key={option.label} gap={4} alignItems="center">
            <span className="flex-shrink-0 font-bold h-6 w-6 border-dotted rounded-full">
              {option.label}:
            </span>
            <Input
              value={option.text}
              onChange={(e) => handleOptionChange(option.label, e.target.value)}
            />
          </Flex>
        ))
      ) : (
        <>
          {questionToEdit.options.map((option) => (
            <Flex key={option.label} gap={4} alignItems={"center"}>
              <Grid
                placeItems={"center"}
                className="flex-shrink-0 font-bold h-8 w-8 border-dotted border-2 rounded-full"
              >
                {option.label.toLocaleUpperCase()}
              </Grid>
              <Input
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(option.label, e.target.value)
                }
              />
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

export default function WritePage({ type, subject, subjectClass }) {
  const [questions, setQuestions] = useState([
    {
      id: "bbe6ba32-1518-41cc-bf97-3013eef9dc4d",
      question: "who are you?",
      options: [
        {
          label: "a",
          "text": "Hello",
        },
        {
          label: "b",
          "text": "Hello",
        },
        {
          label: "c",
          "text": "Hello",
        },
        {
          label: "d",
          "text": "Hello",
        },
      ],
      correctOption: "a",
    },
  ]);
  const [mark, setMark] = useState(5);
  const [questionToEdit, setQuestionToEdit] = useState({});
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [
      { label: "a", text: "" },
      { label: "b", text: "" },
      { label: "c", text: "" },
      { label: "d", text: "" },
    ],
    correctOption: "a",
  });

  function handleSetQuestion() {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setQuestionToEdit(newQuestion);
    // Reset newQuestion state for the next new question
    setNewQuestion({
      question: "",
      options: [
        { label: "a", text: "" },
        { label: "b", text: "" },
        { label: "c", text: "" },
        { label: "d", text: "" },
      ],
      correctOption: "a",
    });

    console.log(questions);
  }
  function handlePrevQuestion() {
    const prevQuestion = questions[1];

    console.log(prevQuestion);
    setQuestionToEdit(prevQuestion);
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
    session: "2023/2024",
    term: "First Term",
    subject: "Civic Education",
    class: "SSS 2",
    date: formatDate(Date.now()),
    time: "10:15 AM",
    duration: ["30", " ", "mins"],
  };

  return (
    <Flex gap={4} color={"neutral.900"}>
      <Box>
        <Box mt={0} px={6} py={4} bg={"white"} rounded={"lg"}>
          <Text as={"h2"} fontWeight={"bold"} mb={4}>
            QUESTION {questions.length + 1}:
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
            handleOptionChange={() => handleNewOptionChange()}
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
            <Input size={"sm"} w={"max-content"} />
          </Box>

          <Box w={"full"} px={6} py={4} bg={"white"} rounded={"lg"}>
            <Text as={"h2"} fontSize={"sm"} fontWeight={"bold"} mb={2}>
              SET MARK:
            </Text>{" "}
            <Input
              disabled
              size={"sm"}
              value={`${mark} ${mark == 1 ? "mark" : mark > 1 ? "marks" : ""}`}
              w={"max-content"}
            />
          </Box>
        </Flex>

        <Flex justifyContent={"space-between"} gap={4}>
          <Button
            mt={6}
            colorScheme="blue"
            variant={"outline"}
            size={"sm"}
            w={"max-content"}
            display={"flex"}
            alignItems={"center"}
            leftIcon={<FaPlus />}
            onClick={() => handlePrevQuestion()}
          >
            New Question
          </Button>

          <Button
            mt={6}
            colorScheme="blue"
            bg={"brand.900"}
            rounded={"none"}
            size={"sm"}
            w={"max-content"}
            display={"flex"}
            alignItems={"center"}
            rightIcon={<FaSave />}
            onClick={() => handleSetQuestion()}
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
              {questions.length}
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
              Expected Total Marks
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
