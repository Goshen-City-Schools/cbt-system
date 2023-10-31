import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";
import ExamTable from "../../../components/admin/tables/ExamTable";
import IconComponent from "../../../components/shared/Icon.component";
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
        mb={6}
      >
        <SearchWidget
          text={"Search Class / Subject Examination"}
          asButton={true}
          height={"40px"}
        />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            size={"sm"}
            bg={"neutral.100"}
            border={"1px"}
            borderColor={"brand.700"}
          >
            <IconComponent>
              <MdIcecream />
            </IconComponent>{" "}
            Download
          </Button>
          <Button
            display={"flex"}
            gap={2}
            size={"sm"}
            bg={"accent.700"}
            color={"white"}
          >
            <IconComponent>
              <MdUploadFile />
            </IconComponent>{" "}
            Bulk Edit
          </Button>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            // onClick={() => openPortal(<CreateStaffPortal />)}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            Set Exam Questions
          </Button>
        </Flex>
      </Flex>

      <ExamTable />
    </PageWrapper>
  );
}
