import { Text, Flex, Box } from "@chakra-ui/react";
import formatDate from "../../../utilities/formatDate.utils";

export default function AssesssmentTestCard() {
  return (
    <Flex
      h={"200px"}
      direction={"column"}
      justifyContent={"space-between"}
      p={6}
      w={"full"}
      maxW={"xs"}
      shadow={"md"}
      rounded={"md"}
    >
      <Box>
        <Text as="h2" mb={1} fontSize={"md"} fontWeight={"bold"}>
          English Language
        </Text>
        <Text as={"p"}>{formatDate(Date.now())}</Text>
      </Box>

      <Flex justifyContent={"space-between"}>
        <Text as={"small"}>Assesment Test I</Text>
        <Text as={"small"}>45 mins</Text>
      </Flex>
    </Flex>
  );
}
