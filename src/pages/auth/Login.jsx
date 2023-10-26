import { useDispatch, useSelector } from "react-redux";
import { updateField, setLoginError } from "../app/redux/slices/formSlice";

import { motion } from "framer-motion";

import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import determineUserType from "../helpers/determinUserType";
import LoadingScreen from "./Loading.screen";
import defaultConfigValues from "../data/defaultConfigValues";
// import { pageVariants } from "../components/PageWrapper";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);

  const { userID, password, loginError } = useSelector((state) => state.form);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    // Validate the userID and password
    if (!/^GSHN\/(STF|STU)\/\d{4}$/.test(userID) || password.trim() === "") {
      dispatch(setLoginError({ errorMessage: "Invalid login details" }));
      setTimeout(() => {
        dispatch(setLoginError({ errorMessage: "" }));
      }, 2000);
      return;
    }

    // Hit Backend Validate, if true and User type is STAFF, Send OTP

    // Clear any previous error message
    dispatch(setLoginError({ errorMessage: "" }));

    // Define typedUserID
    let typedUserID;

    // Set the userID based on what the user typed in
    dispatch(updateField({ fieldName: "userID", fieldValue: typedUserID }));

    // Simulate a successful login and set user data
    const userData = {
      "userID": typedUserID,
      "name": "Nkechinyere Harrison",
      "userType": determineUserType(userID),
      "isAuthenticated": true,
    };

    const userDataString = JSON.stringify(userData);

    localStorage.setItem("user", userDataString);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (userData.userType == "Student") {
        return navigate("/");
      } else return navigate("/admin");
    }, 2000);
  }

  if (loggedInUser && loggedInUser.userType == "Staff")
    return <LoadingScreen navigateToPath={"/admin"} timer={1500} />;

  if (loggedInUser && loggedInUser.userType == "Student")
    return <LoadingScreen navigateToPath={"/"} timer={1500} />;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={defaultConfigValues.pageVariants}
    >
      <Grid
        height={"100vh"}
        templateColumns={{ "base": "1fr", "md": "repeat(2, 1fr)" }}
      >
        <GridItem
          display={{ "base": "none", "md": "flex" }}
          flexDirection={"column"}
          height={"full"}
          bg={"brand.700"}
          justifyContent={"start"}
          alignItems={"center"}
          gap={8}
        >
          <Flex
            direction={"column"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              position={"relative"}
              height={"48"}
              width={"48"}
              overflow={"hidden"}
            >
              <img
                src="/Goshen-logo-trans.png"
                alt="Goshen group of Schools logo"
                className="absolute object-contain w-full h-full"
              />
            </Box>
            <Text as={"h3"} fontSize={"3xl"} fontWeight={"bold"}>
              GOSHEN GROUP OF SCHOOLS
            </Text>
            <Text as={"p"} fontSize={"sm"}>
              Wisdom, the principal thing
            </Text>{" "}
          </Flex>

          <Box
            w={"100%"}
            h={"380px"}
            mt={12}
            position={"relative"}
            overflow={"hidden"}
          >
            <img
              src="/Illustration.png"
              alt=""
              className="absolute top-0 h-full w-full object-contain"
            />
          </Box>
        </GridItem>
        {/*  */}
        <GridItem
          display={"flex"}
          padding={{ "base": "6", "md": "12" }}
          height={"full"}
          justifyContent={"center"}
          flexDirection={"column"}
          w={{ "base": "100%", "md": "80%" }}
          marginX={"auto"}
        >
          {/* Welcome Text */}
          <Box
            position={"relative"}
            height={"48"}
            width={"48"}
            overflow={"hidden"}
            mx={{ "base": "auto" }}
            display={{ "base": "flex", "md": "none" }}
          >
            <img
              src="/Goshen-logo-trans.png"
              alt="Goshen group of Schools logo"
              className="absolute object-contain w-full h-full"
            />
          </Box>

          <Flex
            direction={"column"}
            alignItems={{ "base": "center", "md": "start" }}
            marginBottom={12}
          >
            <Text
              as={"h3"}
              fontSize={{ "base": "2xl", "md": "4xl" }}
              fontWeight={"bold"}
            >
              Welcome back
            </Text>
            <Text as={"small"} fontSize={"md"}>
              Fill in your details below to login
            </Text>
          </Flex>

          {/* Form Submission */}
          <form onSubmit={handleSubmit}>
            {/* UserID */}
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Student / Staff ID</FormLabel>
              <Input
                type="text"
                name="userID"
                height={"56px"}
                value={userID}
                onChange={handleInputChange}
                placeholder="Enter your ID number"
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel fontSize={"sm"}>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                height={"56px"}
                placeholder="Enter password"
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Error message */}
            <FormControl>
              <FormHelperText color={"error.700"}>{loginError}</FormHelperText>
            </FormControl>

            <Button
              mt={4}
              bg={"brand.900"}
              color={"white"}
              isLoading={isLoading}
              type="submit"
              py={"6"}
              height={"48px"}
            >
              Login
            </Button>
          </form>
        </GridItem>
      </Grid>
    </motion.div>
  );
}
