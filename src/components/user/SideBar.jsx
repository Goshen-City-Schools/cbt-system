import { Box, List, Text, Flex, Image, Grid } from "@chakra-ui/react";

import { TbReport } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";

import "./SideMenu.style.css";

import { useDispatch, useSelector } from "react-redux";
import NavItemComponent from "../shared/NavItem.component";
import { toggleSideMenu } from "../../redux/slices/menuSlice";
import IconComponent from "../shared/Icon.component";
import { FaTimes } from "react-icons/fa";
import { useCBT } from "../../contexts/CBTContext";
import Timer from "../shared/TimerBox";

export default function UserSideBar() {
  const dispatch = useDispatch();
  const { state } = useCBT();

  const isSideMenuOpen = useSelector((state) => state.menu.isSideMenuOpen);

  const handleToggleSideMenu = () => {
    dispatch(toggleSideMenu());
  };

  return (
    <Flex
      direction={"column"}
      h={"full"}
      justifyContent={"flex-start"}
      bg={"brand.900"}
      width={{ "base": isSideMenuOpen ? "280px" : "0px", "md": "280px" }}
      position={"fixed"}
      top={0}
      fontSize={"sm"}
      zIndex={50}
      left={0}
      overflowY={"scroll"}
      height={"full"}
    >
      {/* Close Sidebar */}

      <Box
        position={"absolute"}
        top={"80px"}
        right={"0"}
        bg={"red.700"}
        color={"white"}
        h={10}
        w={10}
        rounded={"full"}
        zIndex={50}
        display={{ "base": "flex", "md": "none" }}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={handleToggleSideMenu}
      >
        <IconComponent>
          <FaTimes size={20} />
        </IconComponent>
      </Box>

      <Flex direction={"column"} alignItems={"center"} gap={4}>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src="/images/Goshen-logo-trans.png"
            height={"80px"}
            width={"80px"}
            objectFit={"cover"}
          />

          <Box
            width={"160px"}
            height={"160px"}
            rounded={"full"}
            border={"1px solid"}
            mt={4}
            overflow={"hidden"}
          >
            <Image
              src="/images/profile-picture.jpeg"
              height={"full"}
              w={"full"}
              objectFit={"cover"}
            />
          </Box>
        </Flex>

        <Flex color={"white"} textAlign={"center"} direction={"column"} gap={1}>
          <Text as={"h3"} fontSize={"md"} fontWeight={"bold"}>
            Nkechinyere Harrison
          </Text>
          <Text as={"small"} fontSize={"sm"}>
            SSS 1A
          </Text>
        </Flex>
      </Flex>

      <Box className="pl-5 py-6" color="neutral.100">
        <Text as="h3" marginBottom={2}>
          MENU
        </Text>

        <List className="memuList">
          <NavItemComponent link={"/exams"}>
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            My Exams
          </NavItemComponent>
          <NavItemComponent link={"/assessments"}>
            <div className="icon h-6 w-6 flex items-center justify-center">
              <MdOutlineAssignment size={18} />
            </div>
            Continous Assessment
          </NavItemComponent>
          <NavItemComponent link={"/view-scores"}>
            <div className="icon h-6 w-6 flex items-center justify-center">
              <TbReport size={18} />
            </div>
            View Scores
          </NavItemComponent>
        </List>
      </Box>

      {state.cbtStarted && (
        <Flex
          direction={"column"}
          w={"full"}
          alignItems={"center"}
          color={"white"}
          mt={6}
          justifySelf={"flex-end"}
          alignSelf={"flex-end"}
          mb={6}
        >
          <Text as={"h3"} fontSize={"lg"} fontWeight={"bold"}>
            Time remaining
          </Text>
          <Grid
            placeItems={"center"}
            width={"160px"}
            height={"160px"}
            rounded={"full"}
            border={"1px solid"}
            mt={4}
            overflow={"hidden"}
            bg={"white"}
          >
            <Timer
              initialTime={3600}
              onTimerEnd={() => alert("Timer reached zero!")}
            />
          </Grid>
        </Flex>
      )}
    </Flex>
  );
}
