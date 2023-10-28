import PageWrapper from "../../../components/shared/PageWrapper";

import { Flex } from "@chakra-ui/react";

import AssesssmentTestCard from "../../../components/shared/cards/AssesssmentTest";
import PageSectionHeader from "../../../components/shared/PageSectionHeader";

import { testData } from "../../../data/tests.data";

export default function MyAssessmentTestPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Assessments"}
        pageCrumb={"Home / Assessments"}
      />

      <Flex gap={"4"} mt={4}>
        {testData.map(({ id, subject, duration, date }) => (
          <AssesssmentTestCard
            key={id}
            subject={subject}
            duration={duration}
            date={date}
            id={id}
          />
        ))}
      </Flex>
    </PageWrapper>
  );
}
