import PageWrapper from "../../../components/shared/PageWrapper";
import PageSectionHeader from "../../../components/shared/PageSectionHeader";
import AllClassesCategoriesList from "../../../components/shared/AllClassesCategoriesList";

import { Flex, Button } from "@chakra-ui/react";
import IconComponent from "../../../components/shared/Icon.component";
import { MdUploadFile } from "react-icons/md";

export default function SetNewTestPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Set Test Questions"}
        pageCrumb={"Home / Assessments / New"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <div>&nbsp;</div>

        <Flex gap={4} fontSize={"sm"}>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            // onClick={() => openPortal(<CreateStaffPortal />)}
          >
            <IconComponent>
              <MdUploadFile />
            </IconComponent>
            Upload Questions
          </Button>
        </Flex>
      </Flex>

      <AllClassesCategoriesList />
    </PageWrapper>
  );
}
