import { MdAdd } from "react-icons/md";
import ExamTable from "../../../components/admin/tables/ExamTable";
import PageSectionHeader from "../../../components/shared/PageSectionHeader";
import PageWrapper from "../../../components/shared/PageWrapper";

import { Button, Flex } from "@chakra-ui/react";
import SearchWidget from "../../../widgets/Search.widget";

export default function ExamsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={"All Exams"} pageCrumb={"Home / Exams"} />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={4}
      >
        <SearchWidget
          text={"Search Class / Subject Examination"}
          height={"36px"}
        />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            colorScheme="blue"
            size={"sm"}
            color={"neutral.100"}
            leftIcon={<MdAdd />}
            // onClick={() => openPortal(<CreateStaffPortal />)}
          >
            Set Questions
          </Button>
        </Flex>
      </Flex>

      <ExamTable />
    </PageWrapper>
  );
}
