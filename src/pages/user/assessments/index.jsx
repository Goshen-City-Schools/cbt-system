import PageWrapper from "../../../components/shared/PageWrapper";

import { Flex } from "@chakra-ui/react";
import AssesssmentTestCard from "../../../components/shared/cards/AssesssmentTest";

export default function MyAssessmentTestPage() {
  return (
    <PageWrapper>
      <div className="">My Assessment Tests</div>

      <Flex>
        <AssesssmentTestCard />
      </Flex>
    </PageWrapper>
  );
}
