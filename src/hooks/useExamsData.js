import { useState, useEffect } from "react";

function useExamsData() {
  const [examsData, setExamsData] = useState([]);

  useEffect(() => {
    // Retrieve the examsData from localStorage
    const storedData = JSON.parse(localStorage.getItem("examsData"));

    // Check if there is data in localStorage
    if (storedData && Array.isArray(storedData)) {
      setExamsData(storedData);
    }
  }, []);

  return examsData;
}

export default useExamsData;
