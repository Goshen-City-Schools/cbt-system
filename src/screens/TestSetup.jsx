import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";
import PageWrapper from "../components/shared/PageWrapper";

import PageSectionHeader from "../components/shared/PageSectionHeader";
import { useNavigate } from "react-router-dom";
import CustomTimePicker from "../components/shared/CustomTimePicker";
import generateId from "../utilities/generateId";
import { MdKeyboard, MdUpload } from "react-icons/md";
import DisplaySubjectsOptions from "../utilities/DisplaySubjectsOptions";
import DisplaySchoolClassesOptions from "../utilities/DisplaySchoolClassesOptions";

function TestSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    subject: "",
    class: "",
    date: "",
    time: "",
    duration: "",
    testMarks: "",
  });

  useEffect(() => {
    // Check if exasmData is already in localStorage
    if (!localStorage.getItem("testsData")) {
      localStorage.setItem("testsData", JSON.stringify([]));
    } else {
      // Load the data from localStorage and set it in the form
      const storedData = JSON.parse(localStorage.getItem("testsData"));
      if (storedData) {
        setFormData(storedData);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDurationChange = (e) => {
    setFormData({ ...formData, duration: e.target.value });
  };

  const handleUploadQuestions = () => {
    // Add validation if needed
    if (
      !formData.subject ||
      !formData.class ||
      !formData.date ||
      !formData.time ||
      !formData.type ||
      !formData.duration ||
      !formData.testMarks
    ) {
      console.log(formData);

      alert("Please fill in all required fields before submitting.");
    } else {
      const testsData = {
        id: generateId(),
        subject: formData.subject,
        class: formData.class,
        type: formData.type,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        testMarks: formData.testMarks,
      };

      // Retrieve the existing exam data from localStorage (if any)
      const existingTestsData =
        JSON.parse(localStorage.getItem("testsData")) || [];

      // Add the new exam data to the array
      const newTestsData = [...existingTestsData, testsData];

      // Store the updated array in localStorage
      localStorage.setItem("testsData", JSON.stringify(newTestsData));

      // Redirect to the upload page
      navigate(`/admin/tests/${testsData.id}/upload`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.subject ||
      !formData.class ||
      !formData.date ||
      !formData.time ||
      !formData.type ||
      !formData.duration ||
      !formData.testMarks
    ) {
      alert("Please fill in all required fields before submitting.");
      console.log(formData);
    } else {
      const testsData = {
        id: generateId(),
        subject: formData.subject,
        class: formData.class,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        duration: formData.duration,
        testMarks: formData.testMarks,
      };

      // Retrieve the existing exam data from localStorage (if any)
      const existingTestsData =
        JSON.parse(localStorage.getItem("testsData")) || [];

      // Add the new exam data to the array
      const newTestsData = [...existingTestsData, testsData];

      // Store the updated array in localStorage
      localStorage.setItem("testsData", JSON.stringify(newTestsData));

      // Redirect to the page for typing questions
      navigate(`/admin/tests/${testsData.id}`);
    }
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"New Test Setup"}
        pageCrumb={"Home / Tests / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <form
          className="rounded-lg px-8 bg-white py-6 flex-col flex gap-x-6 gap-y-8"
          onSubmit={handleSubmit}
        >
          <FormControl id="class">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Class
            </FormLabel>
            <DisplaySchoolClassesOptions
              name="class"
              size={"sm"}
              value={formData.class}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="subject">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Subject
            </FormLabel>
            <DisplaySubjectsOptions
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              size={"sm"}
            />
          </FormControl>

          <FormControl id="date">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Date
            </FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="time">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Time
            </FormLabel>
            <CustomTimePicker
              selectedTime={formData.time}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="type">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Test Type
            </FormLabel>
            <Select
              size={"sm"}
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">__ Selest Test Type__</option>

              <option value="test1">Test I</option>
              <option value="test2">Test II</option>
              <option value="test3">Test III</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl id="duration">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Duration
            </FormLabel>
            <Select
              size={"sm"}
              name="duration"
              value={formData.duration}
              onChange={handleDurationChange}
            >
              <option value="">__ -- __</option>

              <option value="30mins">30 minutes</option>
              <option value="1hr">1 hour</option>
              <option value="45mins">45 minutes</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Test Marks
            </FormLabel>
            <Input
              type="number"
              name="testMarks"
              defaultValue={40}
              value={formData.testMarks}
              onChange={handleChange}
            />
          </FormControl>
          <Flex
            direction={"column"}
            gap={4}
            w={"full"}
            justifyContent={"space-between"}
          >
            <Button
              w={"full"}
              id="upload"
              leftIcon={<MdUpload />}
              mt={4}
              colorScheme="teal"
              type="button"
              onClick={handleUploadQuestions}
            >
              Upload Questions
            </Button>
            <Button
              w={"full"}
              leftIcon={<MdKeyboard />}
              variant={"outline"}
              colorScheme="teal"
              type="submit"
            >
              Start typing
            </Button>
          </Flex>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default TestSetup;
