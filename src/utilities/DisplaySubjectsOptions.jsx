/* eslint-disable react/prop-types */
import schoolDataOptions from "../data/schoolDataOptions";

import { Select } from "@chakra-ui/react";

export default function DisplaySubjectsOptions({
  name,
  value,
  size,
  onChange,
}) {
  const sortedSubjects = schoolDataOptions.subjects.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <Select name={name} value={value} size={size} onChange={onChange}>
      <option>-- -- --</option>
      {sortedSubjects.map((subject, index) => (
        <option key={index} value={subject.name}>
          {subject.name}
        </option>
      ))}
    </Select>
  );
}
