import { useState } from "react";
import HorizontalScrollableTabs from "../../../components/shared/HorizontalScrollableTabs.widget";
import PageWrapper from "../../../components/shared/PageWrapper";
import WritePage from "../../../screens/Write";

import { Box, Flex, Button } from "@chakra-ui/react";
import ExamPreviewScreen from "../../../screens/ExamPreviewScreen";
import ExamSettingsScreen from "../../../screens/ExamSettingsScreen";
import useExamsData from "../../../hooks/useExamsData";
import { useNavigate, useParams } from "react-router-dom";
import IconComponent from "../../../components/shared/Icon.component";
import { FaPlus, FaRecycle } from "react-icons/fa";
import saveExamQuestions from "../../../utilities/saveExamQuestions";

export default function CreateExamQuestionsPage() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate(); // Initialize the navigation hook
  const { subjectExamId } = useParams(); // Get the examId from the URL

  const examsData = useExamsData();

  const subjectExam = examsData.find(
    (subjectExam) => subjectExam.id === subjectExamId
  );
  const initialQuestion = {
    question: "",
    options: [
      { label: "a", text: "" },
      { label: "b", text: "" },
      { label: "c", text: "" },
      { label: "d", text: "" },
    ],
    correctOption: "a",
    allotedMark: 5,
  };

  const [questions, setQuestions] = useState([]); // State to manage questions
  const [newQuestion, setNewQuestion] = useState(initialQuestion);

  const tabs = [
    {
      id: 1,
      label: "Questions",
      link: `/admin/exams/${subjectExamId}/${questions.length}`,
      component: (
        <WritePage
          subject={subjectExam}
          subjectExamId={subjectExamId}
          questions={questions}
          setQuestions={setQuestions}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          handleQuestionDelete={handleQuestionDelete}
          handleNewQuestion={handleNewQuestion}
        />
      ),
    },
    {
      id: 2,
      label: "Preview",
      link: `/admin/exams/${subjectExamId}/preview`,
      component: <ExamPreviewScreen subjectExamId={subjectExamId} />,
    },
    {
      id: 3,
      label: "Settings",
      link: `/admin/exams/${subjectExamId}/settings`,
      component: <ExamSettingsScreen />,
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  function handleNewQuestion() {
    // Calculate the index for the new question
    const newQuestionIndex = questions.length;

    // Save the current question before creating a new one
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
    updatedQuestions.push(newQuestion);
    setQuestions(updatedQuestions);

    // Reset newQuestion state for the next new question
    setNewQuestion(initialQuestion);
    saveExamQuestions(updatedQuestions);

    // Navigate to the new question
    navigate(`/admin/exams/${subjectExamId}/${newQuestionIndex}`);
  }

  function handleQuestionDelete() {
    if (questions.length > 0) {
      if (
        window.confirm("Are you sure you want to delete the current question?")
      ) {
        const deleteIndex = questions.length - 1;
        const updatedQuestions = [...questions];
        updatedQuestions.splice(deleteIndex, 1);
        setQuestions(updatedQuestions);

        // Update local storage to remove the deleted question
        saveExamQuestions(subjectExamId, updatedQuestions);

        const targetIndex = deleteIndex > 0 ? deleteIndex - 1 : 0;
        navigate(`/admin/exams/${subjectExamId}/${targetIndex}`);
      }
    }
  }

  if (!subjectExam) {
    // Redirect to "Page Not Found" if examId does not exist
    navigate("/admin/page-not-found"); // You should specify the correct URL for your "Page Not Found" page
    return null; // Prevent rendering the page content
  }

  if (!subjectExam) {
    // Redirect to "Page Not Found" if examId does not exist
    navigate("/admin/page-not-found"); // You should specify the correct URL for your "Page Not Found" page
    return null; // Prevent rendering the page content
  }

  return (
    <PageWrapper>
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <HorizontalScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        <IconComponent click={handleQuestionDelete}>
          <FaRecycle />
        </IconComponent>
      </Flex>

      <Box py={2} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
