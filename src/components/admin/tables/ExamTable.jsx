/* eslint-disable react/prop-types */
import dayjs from "dayjs";
// import api from "./api"; // Import your data fetching functions (you may need to customize this)

import DataTable from "../../../widgets/Table.widget";

import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  List,
  ListItem,
  Flex,
  Text,
  Select,
} from "@chakra-ui/react";
import useExamsData from "../../../hooks/useExamsData";
import { useNavigate } from "react-router-dom";
import loadExamQuestions from "../../../utilities/loadExamQuestions";
import { PiGraduationCapLight } from "react-icons/pi";

// import { examsData } from "../../../data/exams.data";

function ExamTable() {
  const examsData = useExamsData();
  const navigate = useNavigate();

  function handleOptionClick(action, examid) {
    if (action === "edit") {
      // Find the exam with the specified examid
      const exam = examsData.find((exam) => exam.id === examid);
      console.log("Exam:", exam);
      if (exam) {
        const examId = exam.id;
        const examQuestions = loadExamQuestions(examId);

        console.log(examId, examQuestions);
        console.log("Exam Questions:", examQuestions);

        // Navigate to the last question of the exam
        const lastQuestionIndex = examQuestions.length - 1;
        console.log("Last Question Index:", lastQuestionIndex);

        if (lastQuestionIndex >= 0) {
          return navigate(`/admin/exams/${examid}/${lastQuestionIndex}`);
        } else return navigate(`/admin/exams/${examid}/0`);
      }
    } else if (action === "delete") {
      // Handle delete action
      console.log(`Delete clicked for exam with ID: ${examid}`);
    }
  }

  // Define the table columns
  const columns = [
    {
      Header: "Subject",
      accessor: "subject", // Replace with the actual data key for subject
      Cell: ({ cell: { value } }) => {
        // Format the time to twelve-hour format
        return (
          <Text as={"p"} fontWeight={"bold"}>
            {value}
          </Text>
        );
      },
    },
    {
      Header: "Class",
      accessor: "class", // Replace with the actual data key for class
    },

    {
      Header: "Date",
      accessor: "date", // Replace with the actual data key for date
      Cell: ({ cell: { value } }) => {
        // Format the time to twelve-hour format
        const formattedDate = dayjs(value).format("DD MMM YYYY");
        return <span>{formattedDate}</span>;
      },
    },
    {
      Header: "Time",
      accessor: "time", // Replace with the actual data key for time
    },
    {
      Header: "Duration",
      accessor: "duration", // Replace with the actual data key for time
    },
    {
      Header: "Action",
      accessor: "action", // Replace with the actual data key for action
      Cell: (
        { row } // Use the 'row' prop to get the current row's data
      ) => (
        <Popover>
          <PopoverTrigger>
            <Button size={"sm"} variant="link">
              Options
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <List spacing={2}>
                <ListItem>
                  <Button
                    size={"sm"}
                    variant="link"
                    onClick={() => handleOptionClick("edit", row.original.id)}
                  >
                    Edit
                  </Button>
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <Box bg={"white"} px={6} py={4} mt={8} mb={8} shadow={"xs"} rounded={"lg"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={2}
        mb={8}
      >
        <Flex alignItems={"center"} gap={"3"} w={"full"}>
          <Text as={"p"} fontSize={"sm"} fontWeight={"bold"}>
            Filter:&nbsp;{" "}
          </Text>

          <Select fontSize={"sm"} height={8} w={"full"} maxW={"xs"}>
            <option value="">Select Subject</option>
          </Select>
          <Select fontSize={"sm"} height={8} w={"full"} maxW={"xs"}>
            <option value="">Select Class</option>
          </Select>
        </Flex>
        <Flex gap={4} fontSize={"sm"}>
          <Button
            colorScheme="blue"
            size={"sm"}
            color={"neutral.100"}
            onClick={() => navigate("/admin/exams/new")}
            leftIcon={<PiGraduationCapLight />}

            // onClick={() => openPortal(<CreateStaffPortal />)}
          >
            New Exam
          </Button>
        </Flex>
      </Flex>
      <DataTable data={examsData} columns={columns} />
    </Box>
  );
}

export default ExamTable;
