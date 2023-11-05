/* eslint-disable react/prop-types */
// Libraries
import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Hooks
import { useNavigate } from "react-router-dom";
import useExamsData from "../../../hooks/useExamsData";

// Components
import IconComponent from "../../shared/Icon.component";

// Utilities
import DisplaySubjectsOptions from "../../../utilities/DisplaySubjectsOptions";
import DisplaySchoolClassesOptions from "../../../utilities/DisplaySchoolClassesOptions";
import loadExamQuestions from "../../../utilities/loadExamQuestions";

// Widgets
import DataTable from "../../../widgets/Table.widget";

// Icons
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { PiGraduationCapLight } from "react-icons/pi";

// Chakra Compoennts
import { Box, Button, Flex, Text, useToast, Tooltip } from "@chakra-ui/react";
import CustomCard from "../../shared/CustomTooltip";

function ExamTable() {
  const storedExamsData = useExamsData();
  const navigate = useNavigate();
  const [examsData, setExamsData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setExamsData(storedExamsData);
  }, [storedExamsData]);

  function handleEditAction(examid) {
    // Find the exam with the specified examid
    const exam = examsData.find((exam) => exam.id === examid);

    if (exam) {
      const examId = exam.id;
      const examQuestions = loadExamQuestions(examId);
      const lastQuestionIndex = examQuestions.length - 1;

      if (lastQuestionIndex >= 0) {
        return navigate(`/admin/exams/${examid}/${lastQuestionIndex}`);
      } else return navigate(`/admin/exams/${examid}/0`);
    }
  }

  const handleDeleteAction = (examid) => {
    // Filter the exam with the specified examid

    const ExamDataToDelete = examsData.filter((exam) => exam.id == examid);

    if (
      window.confirm(
        `Are you sure to delete ${ExamDataToDelete[0].subject} Exam for ${ExamDataToDelete[0].class}?`
      )
    ) {
      const newExamData = examsData.filter((exam) => exam.id !== examid); // Update the state to re-render the component
      setExamsData(newExamData);
      toast({
        title: `Deleted ${ExamDataToDelete[0].class} ${ExamDataToDelete[0].subject} Exam`,
        duration: "2000",
        status: "warning",
      });

      // Update localStorage
      localStorage.setItem("examsData", JSON.stringify(newExamData));
    }
  };

  // Define the table columns
  const columns = [
    {
      Header: "Subject",
      accessor: "subject", // Replace with the actual data key for subject
      Cell: ({ cell: { value } }) => (
        <Text as={"p"} fontWeight={"bold"}>
          {value}
        </Text>
      ),
    },
    {
      Header: "Class",
      accessor: "class", // Replace with the actual data key for class
    },
    {
      Header: "Date",
      accessor: "date", // Replace with the actual data key for date
      Cell: ({ cell: { value } }) => {
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
      accessor: "duration", // Replace with the actual data key for duration
    },
    {
      Header: "Action",
      accessor: "action", // Replace with the actual data key for action
      Cell: ({ row }) => (
        <Flex gap={2}>
          <Tooltip label={"Delete"} aria-label="hi">
            <CustomCard>
              <IconComponent
                click={() => handleDeleteAction(row.original.id)}
                className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
              >
                <MdDeleteOutline size={20} />
              </IconComponent>
            </CustomCard>
          </Tooltip>

          <Tooltip label={"Preview"} aria-label="hi">
            <CustomCard>
              <IconComponent className="text-blue-700 cursor-pointer hover:scale-110 transition duration-300">
                <FaRegEye size={16} />
              </IconComponent>
            </CustomCard>
          </Tooltip>

          <Tooltip label={"Delete"} aria-label="hi">
            <CustomCard>
              <IconComponent
                className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
                click={() => handleEditAction(row.original.id)}
              >
                <MdModeEditOutline size={17} />
              </IconComponent>
            </CustomCard>
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <Box bg="white" px={6} py={4} mt={8} mb={8} shadow="xs" rounded="lg">
      <Flex justifyContent="space-between" alignItems="center" mt={2} mb={8}>
        {storedExamsData.length > 0 ? (
          <>
            {" "}
            <Flex alignItems="center" gap={3} w="full">
              <Text as="p" fontSize="sm" fontWeight="bold" color="accent.700">
                Filter:{" "}
              </Text>
              <DisplaySubjectsOptions height="32px" maxW="sm" />
              <DisplaySchoolClassesOptions height="32px" maxW="sm" />
            </Flex>{" "}
          </>
        ) : (
          <Text as={"small"} fontWeight={"bold"} color={"neutral.700"}>
            No Exams set yet!&nbsp;
          </Text>
        )}
        <Flex gap={4} fontSize="sm">
          <Button
            colorScheme="blue"
            size="sm"
            color="neutral.100"
            onClick={() => navigate("/admin/exams/new")}
            leftIcon={<PiGraduationCapLight />}
          >
            New Exam
          </Button>
        </Flex>
      </Flex>

      {storedExamsData.length > 0 ? (
        <DataTable data={examsData} columns={columns} />
      ) : (
        ""
      )}
    </Box>
  );
}

export default ExamTable;
