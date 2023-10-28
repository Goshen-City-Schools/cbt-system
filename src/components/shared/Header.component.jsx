import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

import {
  Box,
  Image,
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
import { useCBT } from "../../contexts/CBTContext"; // Import the useCBT hook
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/formSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const { state } = useCBT(); // Access the CBT context
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch the logout action when the "Logout" button is clicked
    dispatch(logout());
    console.log("m");
    setTimeout(() => {
      navigate("/auth");
    }, 1000); // Adjust the delay as needed
  };

  return (
    <Box
      bg={"white"}
      paddingX={6}
      className="h-20 sticky top-0 left-0 z-40 shadow-md w-full flex items-center justify-between"
    >
      {state.cbtStarted ? ( // Display "for-cbt" box if CBT has started
        <Flex direction={"column"} className="for-cbt">
          <Text
            as={"h3"}
            fontSize={"md"}
            mt={2}
            lineHeight={1}
            fontWeight={"bold"}
          >
            <span>Subject: </span> Engish Language (Test)
          </Text>
          <Text
            as={"h3"}
            fontSize={"md"}
            mt={2}
            lineHeight={1}
            fontWeight={"bold"}
          >
            <span>Duration: </span> 1 hr
          </Text>
        </Flex>
      ) : (
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Image
            src="/images/Goshen-logo-trans.png"
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
      )}

      <div className="flex items-center gap-4">
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

        <Popover>
          <PopoverTrigger>
            <Box className="flex gap-3 items-center" cursor="pointer">
              <div className="h-11 w-11 rounded-full relative shadow-md overflow-hidden">
                <img
                  src="/images/avatar.png"
                  alt="User avatar"
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <BsChevronDown size={20} />
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
                onClick={() => navigate("/admin/profile")}
              >
                My Profile
              </Button>
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
