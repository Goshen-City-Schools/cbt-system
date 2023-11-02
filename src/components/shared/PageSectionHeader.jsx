/* eslint-disable react/prop-types */

import { Flex, Text } from "@chakra-ui/react";

export default function PageSectionHeader({ pageTitle, pageCrumb }) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
      className="no-print"
    >
      <Text
        as={"h2"}
        mt={0}
        className=""
        fontSize={"xl"}
        color={"neutral.700"}
        fontWeight={"bold"}
      >
        {pageTitle}
      </Text>
      <Text as={"small"}>{pageCrumb}</Text>
    </Flex>
  );
}
