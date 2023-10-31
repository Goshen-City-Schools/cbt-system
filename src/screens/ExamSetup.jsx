import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import PageWrapper from "../components/shared/PageWrapper";

import schoolDataOptions from "../data/schoolDataOptions";
import PageSectionHeader from "../components/shared/PageSectionHeader";
import { useNavigate } from "react-router-dom";
import CustomTimePicker from "../components/shared/CustomTimePicker";
import generateId from "../utilities/generateId";

function ExamSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    subject: "",
    session: "",
    term: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are set
    if (
      formData.subject &&
      formData.session &&
      formData.term &&
      formData.class &&
      formData.date &&
      formData.time &&
      formData.duration &&
      formData.examMarks
    ) {
      // Create a new object with only the relevant form data
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
      const existingExamsData = JSON.parse(localStorage.getItem("examsData"));

      // Add the new exam data to the array
      const newExamsData = [...existingExamsData, examsData];

      // Store the updated array in localStorage
      localStorage.setItem("examsData", JSON.stringify(newExamsData));

      navigate(`/admin/exams/${examsData.id}`);
    } else {
      // Display an error message or take appropriate action
      alert("Please fill in all required fields before submitting.");
    }
  };

  return (
    <PageWrapper>
      {" "}
      <PageSectionHeader
        pageTitle={"New Exam Setup"}
        pageCrumb={"Home / Exams / New"}
      />
      <Box w={"full"} mt={8} shadow={"sm"} maxW={"2xl"} mx={"auto"}>
        <form
          className="flex rounded-lg px-8 bg-white py-6 flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <FormControl id="class">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Class
            </FormLabel>
            <Select
              name="class"
              size={"sm"}
              value={formData.class}
              onChange={handleChange}
            >
              <option value="">__ -- __</option>

              {schoolDataOptions.classesOption.map((schoolClass, index) => (
                <option key={index} value={schoolClass}>
                  {schoolClass}
                </option>
              ))}
            </Select>{" "}
          </FormControl>

          <FormControl id="subject">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Subject
            </FormLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              size={"sm"}
            >
              <option value="">__ -- __</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              {/* Add more options */}
            </Select>
          </FormControl>

          <FormControl id="session">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Session
            </FormLabel>

            <Select
              name="session"
              value={formData.session}
              onChange={handleChange}
              size={"sm"}
            >
              <option value="">__ -- __</option>

              {schoolDataOptions.sessionOptions.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="term">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Term
            </FormLabel>
            <Select
              name="term"
              value={formData.term}
              size={"sm"}
              onChange={handleChange}
            >
              <option value="">__ -- __</option>

              {schoolDataOptions.termOptions.map((term, index) => (
                <>
                  <option key={index} value={term.name}>
                    {term.text}
                  </option>
                </>
              ))}
            </Select>
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

          <Button mt={4} colorScheme="teal" type="submit">
            Set Exam Details
          </Button>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default ExamSetup;
