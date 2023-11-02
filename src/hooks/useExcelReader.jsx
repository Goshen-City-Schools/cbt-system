import { useState } from "react";
import XLSX from "xlsx";

const useExcelReader = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(parsedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Handle the case when file is null (e.g., after deleting questions)
      setExcelData(null);
    }
  };

  return { excelData, handleFileChange };
};

export default useExcelReader;
