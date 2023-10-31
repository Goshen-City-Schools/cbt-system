/* eslint-disable react/prop-types */
import { Box, Select } from "@chakra-ui/react";
import dayjs from "dayjs";

function CustomTimePicker({ selectedTime, onChange }) {
  const timeOptions = [];

  // Generate time options for the Select component from 7 AM to 5 PM
  for (let hour = 7; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = dayjs().hour(hour).minute(minute);
      timeOptions.push(time.format("h:mm A"));
    }
  }

  return (
    <Box>
      <Select name="time" value={selectedTime} onChange={onChange}>
        {timeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default CustomTimePicker;
