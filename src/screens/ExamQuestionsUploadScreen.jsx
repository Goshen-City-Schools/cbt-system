import { useState, useEffect } from "react";
import { MdUpload } from "react-icons/md";
import useExcelReader from "../hooks/useExcelReader";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Flex, Box, Text } from "@chakra-ui/react";
import PageWrapper from "../components/shared/PageWrapper";
import PageSectionHeader from "../components/shared/PageSectionHeader";

const ExamQuestionsUploadScreen = () => {
  const { subjectExamId } = useParams();
  const { excelData, handleFileChange } = useExcelReader();

  const [subjectExamQuestions, setSubjectExamQuestions] = useState([]);
  const [allottedMark, setAllottedMark] = useState(1);
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
    if (excelData) {
      const questions = excelData.slice(1).map((row) => {
        return {
          question: row[0],
          options: [
            { label: "A", text: row[1] },
            { label: "B", text: row[2] },
            { label: "C", text: row[3] },
            { label: "D", text: row[4] },
          ],
          correctOption: row[5],
          allottedMark,
        };
      });

      setSubjectExamQuestions(questions);
    }
  }, [excelData, allottedMark]);

  useEffect(() => {
    const examsData = JSON.parse(localStorage.getItem("examsData")) || [];
    const subject = examsData.find((item) => item.id === subjectExamId);
    if (subject) {
      setExamDetails(subject);
      const numericExamMarks = parseInt(subject.examMarks);
      if (subjectExamQuestions.length > 0) {
        setAllottedMark(
          Math.floor(numericExamMarks / subjectExamQuestions.length)
        );
      }
    }
  }, [subjectExamId, subjectExamQuestions]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleQuestionUpload = () => {
    if (!subjectExamId) {
      alert("Please enter a Subject Exam ID before uploading questions.");
      return;
    }

    const examQuestionsData =
      JSON.parse(localStorage.getItem("examQuestions")) || {};

    if (!examQuestionsData[subjectExamId]) {
      examQuestionsData[subjectExamId] = {
        subjectExamId,
        questions: [],
      };
    }

    // Add the uploaded questions to the subjectexamid
    examQuestionsData[subjectExamId].questions.push(...subjectExamQuestions);

    // Set allotted marks for each question
    examQuestionsData[subjectExamId].questions = examQuestionsData[
      subjectExamId
    ].questions.map((question) => ({
      ...question,
      allottedMark,
    }));

    localStorage.setItem("examQuestions", JSON.stringify(examQuestionsData));

    alert("Questions uploaded successfully!");
  };

  const handleDeleteQuestions = () => {
    setSubjectExamQuestions([]);
    setAllottedMark(1);
    handleFileChange(null);

    console.log(excelData);
  };

  return (
    <PageWrapper>
      {!excelData && (
        <>
          <PageSectionHeader
            pageTitle={"Upload Questions"}
            pageCrumb={`Home / Upload `}
          />
          <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        </>
      )}

      {subjectExamQuestions.length > 0 && examDetails && (
        <>
          <PageSectionHeader
            pageTitle={"Upload Questions"}
            pageCrumb={`Home / Upload / ${examDetails.subject}`}
          />
          <Flex gap={4} color={"neutral.900"}>
            <Box w={"full"} fontSize={"sm"}>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(subjectExamQuestions, null, 2)}
              </pre>
            </Box>

            <Box
              rounded={"lg"}
              border={"1px dotted"}
              w={"full"}
              maxW={"xs"}
              bg={"white"}
              p={6}
              h={"max-content"}
              position={"sticky"}
              top={0}
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
                  <input
                    type="text"
                    placeholder="Subject Exam ID"
                    value={subjectExamId}
                    readOnly
                  />
                  <input
                    type="number"
                    placeholder="Allotted Mark"
                    value={allottedMark}
                    onChange={(e) => setAllottedMark(e.target.value)}
                  />
                  <Button
                    leftIcon={<MdUpload />}
                    size={"sm"}
                    mt={4}
                    colorScheme="teal"
                    onClick={handleQuestionUpload}
                    type="button"
                  >
                    Upload Questions
                  </Button>
                  <Button
                    size={"sm"}
                    mt={2}
                    colorScheme="red"
                    onClick={handleDeleteQuestions}
                    type="button"
                  >
                    Delete Questions
                  </Button>
                </Flex>{" "}
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </PageWrapper>
  );
};

export default ExamQuestionsUploadScreen;
