import { Box, List, Text, Flex, Image } from "@chakra-ui/react";

import { TbReport } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";

import "./SideMenu.style.css";

import { useDispatch, useSelector } from "react-redux";
import NavItemComponent from "../shared/NavItem.component";
import { toggleSideMenu } from "../../redux/slices/menuSlice";
import IconComponent from "../shared/Icon.component";
import { FaTimes } from "react-icons/fa";
import { useCBT } from "../../contexts/CBTContext";

export default function AdminSideBar() {
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
      justifyContent={state.cbtStarted ? "space-between" : "flex-start"}
      bg={"white"}
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
          gap={4}
          mt={6}
          mb={12}
        >
          <Image
            src="/images/Goshen-logo-trans.png"
            height={"100px"}
            width={"100px"}
            objectFit={"cover"}
          />

          <Text
            as={"h3"}
            fontWeight={"bold"}
            fontSize={"md"}
            color={"brand.900"}
          >
            GOSHEN GROUP OF SCHOOLS
          </Text>
        </Flex>
      </Flex>

      <Box className="px-4 py-6">
        <List className="memuList">
          <NavItemComponent link={"/admin/exams"}>
            <IconComponent>
              <BiEditAlt size={18} />
            </IconComponent>
            Set Exam Questions
          </NavItemComponent>
          <NavItemComponent link={"/admin/assessments"}>
            <IconComponent>
              <BiEditAlt size={18} />
            </IconComponent>
            Set Test Questions
          </NavItemComponent>{" "}
          <NavItemComponent link={"/admin/assessments/new"}>
            <IconComponent>
              <BiEditAlt size={18} />
            </IconComponent>
            Edit Test Questions
          </NavItemComponent>
          <NavItemComponent link={"/admin/exams/new"}>
            <IconComponent>
              <BiEditAlt size={18} />
            </IconComponent>
            Edit Exam Questions
          </NavItemComponent>
          <NavItemComponent link={"/admin/#"}>
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Sync Students Record
          </NavItemComponent>
          <NavItemComponent link={"/admin/results"}>
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Result Format
          </NavItemComponent>
          <NavItemComponent link={"/admin/results"}>
            <IconComponent>
              <TbReport size={18} />
            </IconComponent>
            Download Result
          </NavItemComponent>
        </List>
      </Box>
    </Flex>
  );
}
