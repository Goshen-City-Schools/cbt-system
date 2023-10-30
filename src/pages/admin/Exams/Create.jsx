import { useState } from "react";
import HorizontalScrollableTabs from "../../../components/shared/HorizontalScrollableTabs.widget";
import PageWrapper from "../../../components/shared/PageWrapper";
import WritePage from "../../../screens/Write";

import { Box } from "@chakra-ui/react";

export default function CreateExamQuestionsPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Questions", component: <WritePage /> },
    { id: 2, label: "Preview", component: "" },
    { id: 3, label: "Settings", component: "" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
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
