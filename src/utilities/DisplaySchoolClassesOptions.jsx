/* eslint-disable react/prop-types */
import schoolDataOptions from "../data/schoolDataOptions";

import { Select } from "@chakra-ui/react";

export default function DisplaySchoolClassesOptions({
  name,
  value,
  size,
  onChange,
  height,
  width,
  maxH,
  maxW,
  fontSize,
}) {
  const classes = schoolDataOptions.classes;

  return (
    <Select
      name={name}
      height={height}
      width={width}
      maxH={maxH}
      maxW={maxW}
      value={value}
      size={size}
      onChange={onChange}
      fontSize={!fontSize && "sm"}
    >
      <option>-- Select a Class --</option>
      {classes.map((schoolClass, index) => (
        <option key={index} value={schoolClass}>
          {schoolClass}
        </option>
      ))}
    </Select>
  );
}
