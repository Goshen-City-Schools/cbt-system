/* eslint-disable react/prop-types */
import { Text, Flex, Box } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { FaClock, FaCalendar } from "react-icons/fa";

import formatDate from "../../../utilities/formatDate.utils";
import IconComponent from "../Icon.component";

export default function AssesssmentTestCard({ subject, date, duration, id }) {
  return (
    <Link className="w-full max-w-max block" to={`/assessments/${id}`}>
      <Flex
        h={"120px"}
        direction={"column"}
        justifyContent={"space-between"}
        p={6}
        w={"xs"}
        shadow={"md"}
        rounded={"md"}
        bg={"brand.100"}
        flexShrink={0}
      >
        <Box>
          <Text as="h2" mb={1} fontSize={"md"} fontWeight={"bold"}>
            {subject}
          </Text>
        </Box>

        <Flex justifyContent={"space-between"}>
          <Text
            as={"small"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconComponent>
              <FaCalendar />
            </IconComponent>{" "}
            {formatDate(date)}
          </Text>
          <Text
            as={"small"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconComponent>
              <FaClock />
            </IconComponent>{" "}
            {duration}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
