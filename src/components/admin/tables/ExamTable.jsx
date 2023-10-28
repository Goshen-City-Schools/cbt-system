// import { useEffect, useState } from "react";
// import api from "./api"; // Import your data fetching functions (you may need to customize this)

import DataTable from "../../../widgets/Table.widget";

import { Box } from "@chakra-ui/react";

import { examsData } from "../../../data/exams.data";

function ExamTable() {
  //   const [examData, setExamData] = useState([]);

  const examData = examsData;

  // Define the table columns
  const columns = [
    {
      Header: "Class",
      accessor: "class", // Replace with the actual data key for class
    },
    {
      Header: "Subject",
      accessor: "subject", // Replace with the actual data key for subject
    },
    {
      Header: "Date",
      accessor: "date", // Replace with the actual data key for date
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
    },
  ];

  return (
    <Box bg={"white"} p={6} mt={8}>
      <DataTable data={examData} columns={columns} />
    </Box>
  );
}

export default ExamTable;
