/* eslint-disable react/prop-types */
import dayjs from "dayjs";

import DataTable from "../../../widgets/Table.widget";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import useExamsData from "../../../hooks/useExamsData";
import { useNavigate } from "react-router-dom";
import loadExamQuestions from "../../../utilities/loadExamQuestions";
import { PiGraduationCapLight } from "react-icons/pi";
import DisplaySubjectsOptions from "../../../utilities/DisplaySubjectsOptions";
import DisplaySchoolClassesOptions from "../../../utilities/DisplaySchoolClassesOptions";
import IconComponent from "../../shared/Icon.component";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

function ExamTable() {
  const testsData = useExamsData();
  const navigate = useNavigate();

  function handleOptionClick(action, testid) {
    if (action === "edit") {
      // Find the test with the specified testid
      const test = testsData.find((test) => test.id === testid);
      console.log("Exam:", test);
      if (test) {
        const testId = test.id;
        const testQuestions = loadExamQuestions(testId);

        console.log(testId, testQuestions);
        console.log("Exam Questions:", testQuestions);

        // Navigate to the last question of the test
        const lastQuestionIndex = testQuestions.length - 1;
        console.log("Last Question Index:", lastQuestionIndex);

        if (lastQuestionIndex >= 0) {
          return navigate(`/admin/tests/${testid}/${lastQuestionIndex}`);
        } else return navigate(`/admin/tests/${testid}/0`);
      }
    } else if (action === "delete") {
      // Handle delete action
      console.log(`Delete clicked for test with ID: ${testid}`);
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
        <Flex gap={2}>
          <IconComponent
            className={
              "text-red-600 cursor-pointer hover:scale-110 transition duration-300"
            }
          >
            <MdDeleteOutline size={"20"} />
          </IconComponent>

          <IconComponent
            className={
              "text-blue-700 cursor-pointer hover:scale-110 transition duration-300"
            }
            click={() => handleOptionClick("edit", row.original.id)}
          >
            <FaRegEye size={"16"} />
          </IconComponent>

          <IconComponent
            className={
              "text-green-700 cursor-pointer hover:scale-110 transition duration-300"
            }
            click={() => handleOptionClick("edit", row.original.id)}
          >
            <MdModeEditOutline size={"17"} />
          </IconComponent>
        </Flex>
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
          <Text
            as={"p"}
            fontSize={"sm"}
            fontWeight={"bold"}
            color={"accent.700"}
          >
            Filter:&nbsp;{" "}
          </Text>
          <DisplaySubjectsOptions height={"32px"} maxW={"sm"} />

          <DisplaySchoolClassesOptions height={"32px"} maxW={"sm"} />
        </Flex>
        <Flex gap={4} fontSize={"sm"}>
          <Button
            colorScheme="blue"
            size={"sm"}
            color={"neutral.100"}
            onClick={() => navigate("/admin/tests/new")}
            leftIcon={<PiGraduationCapLight />}

            // onClick={() => openPortal(<CreateStaffPortal />)}
          >
            New Exam
          </Button>
        </Flex>
      </Flex>
      <DataTable data={testsData} columns={columns} />
    </Box>
  );
}

export default ExamTable;
