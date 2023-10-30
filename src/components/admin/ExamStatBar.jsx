import { Text, Flex } from "@chakra-ui/react";

export default function ExamStatBar() {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      mt={6}
      mb={6}
      px={4}
      py={2}
      fontSize={"sm"}
      rounded={"lg"}
      bg={"warning.100"}
    >
      <Text letterSpacing={1}>
        Subject: <span className="font-bold">English Language</span>
      </Text>
      <Text letterSpacing={1}>
        Duration: <span className="font-bold">1hr 45mins</span>
      </Text>
      <Text letterSpacing={1}>
        ETQM: <span className="font-bold">60 marks </span>
      </Text>
    </Flex>
  );
}
