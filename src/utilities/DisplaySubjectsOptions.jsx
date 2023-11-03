/* eslint-disable react/prop-types */
import schoolDataOptions from "../data/schoolDataOptions";

import { Select } from "@chakra-ui/react";

export default function DisplaySubjectsOptions({
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
  const sortedSubjects = schoolDataOptions.subjects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
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
      <option>-- Choose Subject --</option>
      {sortedSubjects.map((subject, index) => (
        <option key={index} value={subject.name}>
          {subject.name}
        </option>
      ))}
    </Select>
  );
}
