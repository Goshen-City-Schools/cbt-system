import PageSectionHeader from "../../../components/shared/PageSectionHeader";
import PageWrapper from "../../../components/shared/PageWrapper";
import AssesssmentTestCard from "../../../components/shared/cards/AssesssmentTest";
import { examsData } from "../../../data/exams.data";

import { Flex } from "@chakra-ui/react";

export default function MyExamsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={"My Exams"} pageCrumb={"Home / Exams"} />

      <Flex gap={"4"} mt={4}>
        {examsData.map(({ id, subject, duration, date }) => (
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
