import { useState, useEffect } from "react";

function useExamsData() {
  const [examsData, setExamsData] = useState([]);

  useEffect(() => {
    // Retrieve the examsData from localStorage
    const storedData = localStorage.getItem("examsData");

    // Check if there is data in localStorage
    if (storedData) {
      const parsedStoredData = JSON.parse(storedData);

      if (Array.isArray(parsedStoredData)) {
        setExamsData(parsedStoredData); // Set the state with the parsed array
      }
    }
  }, []);

  return examsData;
}

export default useExamsData;
