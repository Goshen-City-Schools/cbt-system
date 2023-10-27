import PageWrapper from "../../../components/shared/PageWrapper";

import { Flex, Text } from "@chakra-ui/react";

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

      <Text as={"h1"} my={4}>
        Upcoming Assessments
      </Text>
      <Flex gap={"4"}>
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
