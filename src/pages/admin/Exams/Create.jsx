import { useState } from "react";
import HorizontalScrollableTabs from "../../../components/shared/HorizontalScrollableTabs.widget";
import PageWrapper from "../../../components/shared/PageWrapper";
import WritePage from "../../../screens/Write";

import { Box } from "@chakra-ui/react";
import ExamPreviewScreen from "../../../screens/ExamPreviewScreen";
import ExamSettingsScreen from "../../../screens/ExamSettingsScreen";
import useExamsData from "../../../hooks/useExamsData";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateExamQuestionsPage() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate(); // Initialize the navigation hook
  const { subjectExamId } = useParams(); // Get the examId from the URL

  const examsData = useExamsData();

  const subjectExam = examsData.find(
    (subjectExam) => subjectExam.id === subjectExamId
  );

  const tabs = [
    {
      id: 1,
      label: "Questions",
      component: (
        <WritePage subject={subjectExam} subjectExamId={subjectExamId} />
      ),
    },
    { id: 2, label: "Preview", component: <ExamPreviewScreen /> },
    { id: 3, label: "Settings", component: <ExamSettingsScreen /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  if (!subjectExam) {
    // Redirect to "Page Not Found" if examId does not exist
    navigate("/admin/page-not-found"); // You should specify the correct URL for your "Page Not Found" page
    return null; // Prevent rendering the page content
  }

  return (
    <PageWrapper>
      <HorizontalScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
      <Box py={2} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
