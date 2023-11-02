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

function ExamSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    subject: "",
    class: "",
    date: "",
    time: "",
    duration: "",
    examMarks: "",
  });

  useEffect(() => {
    // Check if exasmData is already in localStorage
    if (!localStorage.getItem("examsData")) {
      localStorage.setItem("examsData", JSON.stringify([]));
    } else {
      // Load the data from localStorage and set it in the form
      const storedData = JSON.parse(localStorage.getItem("examsData"));
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
      !formData.duration ||
      !formData.examMarks
    ) {
      alert("Please fill in all required fields before submitting.");
    } else {
      const examsData = {
        id: generateId(),
        subject: formData.subject,
        session: formData.session,
        term: formData.term,
        class: formData.class,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        examMarks: formData.examMarks,
      };

      // Retrieve the existing exam data from localStorage (if any)
      const existingExamsData =
        JSON.parse(localStorage.getItem("examsData")) || [];

      // Add the new exam data to the array
      const newExamsData = [...existingExamsData, examsData];

      // Store the updated array in localStorage
      localStorage.setItem("examsData", JSON.stringify(newExamsData));

      // Redirect to the upload page
      navigate(`/admin/exams/${examsData.id}/upload`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.subject ||
      !formData.class ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.examMarks
    ) {
      alert("Please fill in all required fields before submitting.");
    } else {
      const examsData = {
        id: generateId(),
        subject: formData.subject,
        session: formData.session,
        term: formData.term,
        class: formData.class,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        examMarks: formData.examMarks,
      };

      // Retrieve the existing exam data from localStorage (if any)
      const existingExamsData =
        JSON.parse(localStorage.getItem("examsData")) || [];

      // Add the new exam data to the array
      const newExamsData = [...existingExamsData, examsData];

      // Store the updated array in localStorage
      localStorage.setItem("examsData", JSON.stringify(newExamsData));

      // Redirect to the page for typing questions
      navigate(`/admin/exams/${examsData.id}`);
    }
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"New Exam Setup"}
        pageCrumb={"Home / Exams / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <form
          className="rounded-lg px-8 bg-white py-6 flex-col "
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
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

              {/* <Input
              type="time"
              name="time"
              size={"sm"}
              value={formData.time}
              onChange={handleChange}
            /> */}
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

            <FormControl id="date">
              <FormLabel fontWeight={"bold"} fontSize={"sm"}>
                Exam Marks
              </FormLabel>
              <Input
                type="number"
                name="examMarks"
                defaultValue={60}
                value={formData.examMarks}
                onChange={handleChange}
              />
            </FormControl>
          </div>
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
              size={"sm"}
              mt={8}
              colorScheme="teal"
              type="button"
              onClick={handleUploadQuestions}
            >
              Upload Questions
            </Button>
            <Button
              w={"full"}
              leftIcon={<MdKeyboard />}
              size={"sm"}
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

export default ExamSetup;
