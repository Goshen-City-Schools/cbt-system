import { Link } from "react-router-dom";

import { BsChevronDown } from "react-icons/bs";

import { Flex, Box, Image, Text } from "@chakra-ui/react";
import Timer from "./TimerBox";

export default function Header() {
  return (
    <Box
      bg={"white"}
      paddingX={6}
      className="h-20 sticky top-0 left-0 z-40 shadow-md w-full flex items-center justify-between"
    >
      <Flex alignItems={"center"}>
        <Image
          src="/public/images/Goshen-logo-trans.png"
          height={"60px"}
          width={"60px"}
          objectFit={"cover"}
        />
        <Flex direction={"column"} h={"full"} justifyContent={"center"}>
          <Text as={"h3"} fontSize={"md"} mt={2} lineHeight={1}>
            GOSHEN GROUP OF SCHOOLS
          </Text>
          <Text as={"h3"} fontWeight={"bold"}>
            CBT Portal
          </Text>
        </Flex>
      </Flex>

      <Box>
        <Timer
          initialTime={3600}
          onTimerEnd={() => alert("Timer reached zero!")}
        />
        <Text
          as={"h3"}
          fontSize={"sm"}
          mt={2}
          lineHeight={1}
          fontWeight={"bold"}
        >
          Engish Language (Test)
        </Text>
      </Box>

      <div className="flex items-center gap-4 text-sm">
        <div className="absolute top-20 hidden">
          <ul>
            <li>
              <Link>My Profile</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="font-bold first-letter:">2023/2024 session</p>
          <p>First Term</p>
        </div>

        <Link to="/dashboard/profile" className="flex gap-3 items-center">
          <div className="h-11 w-11 rounded-full shadow-md overflow-hidden relative">
            <img
              src="/images/avatar.png"
              alt="User avatar"
              className="absolute object-cover w-full h-full"
            />
          </div>
          <BsChevronDown size={18} />.
        </Link>
      </div>
    </Box>
  );
}
