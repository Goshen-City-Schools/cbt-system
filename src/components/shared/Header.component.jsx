import { BsChevronDown } from "react-icons/bs";

import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
// import { useCBT } from "../../contexts/CBTContext"; // Import the useCBT hook
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/formSlice";
import { useDispatch } from "react-redux";
import IconComponent from "./Icon.component";
import { CiBellOn } from "react-icons/ci";

export default function Header() {
  // const { state } = useCBT(); // Access the CBT context
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    dispatch(logout());
    setTimeout(() => {
      navigate("/auth");
    }, 1000); // Adjust the delay as needed
  };

  return (
    <Box
      as="header"
      bg={"white"}
      paddingX={6}
      position={"sticky"}
      className="h-16 sticky top-0 left-0 z-40 shadow-xs w-full flex items-center justify-between"
    >
      <Text as={"h3"} fontWeight={"bold"}>
        Computer Based Test (CBT) Portal
      </Text>

      <div className="flex items-center gap-4 ">
        <div className="flex flex-col mr-12">
          <p className="font-bold text-sm">2023/2024 Session</p>
          <p className="text-xs">First Term</p>
        </div>

        <IconComponent>
          <CiBellOn size={28} />
        </IconComponent>

        <Popover>
          <PopoverTrigger>
            <Box className="flex gap-3 items-start" cursor="pointer" ml={6}>
              <div className="h-10 w-10 rounded-full relative shadow-md overflow-hidden">
                <img
                  src="/images/avatar.png"
                  alt="User avatar"
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <Flex direction={"column"}>
                <p className="font-bold first-letter text-sm">
                  Nkechinyere Harrison
                </p>
                <p className="text-xs">Student</p>
              </Flex>

              <div className="mt-1">
                <BsChevronDown size={14} />
              </div>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverBody>
              <Button
                variant="ghost"
                w="100%"
                justifyContent="flex-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </Box>
  );
}
