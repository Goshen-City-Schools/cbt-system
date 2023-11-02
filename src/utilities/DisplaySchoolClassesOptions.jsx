/* eslint-disable react/prop-types */
import schoolDataOptions from "../data/schoolDataOptions";

import { Select } from "@chakra-ui/react";

export default function DisplaySchoolClassesOptions({
  name,
  value,
  size,
  onChange,
}) {
  const classes = schoolDataOptions.classes;

  return (
    <Select name={name} value={value} size={size} onChange={onChange}>
      <option>-- -- --</option>
      {classes.map((schoolClass, index) => (
        <option key={index} value={schoolClass}>
          {schoolClass}
        </option>
      ))}
    </Select>
  );
}
