/* eslint-disable react/prop-types */

import { Flex, Box, Text } from "@chakra-ui/react";

export default function StatCardComponent({ color, imgSrc, text, number }) {
  return (
    <Box bgColor={"white"} width={"full"} px={6} py={4} rounded={"md"}>
      <Box p={2} h={12} w={12} rounded={"md"} bgColor={color} mb={3}>
        <img src={`/public/illustrations/${imgSrc}`} alt="" />
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text as={"p"} fontSize={"sm"}>
          {text}
        </Text>
        <Text as={"h3"} fontWeight={"bold"} fontSize={"2xl"}>
          {number}
        </Text>
      </Flex>
    </Box>
  );
}
