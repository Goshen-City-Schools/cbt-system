import { Flex } from "@chakra-ui/react";
import StatCardComponent from "./StatCard.component";
import classCategories from "../../data/classes.data";

export default function AllClassesCategoriesList() {
  return (
    <Flex gap={4}>
      {classCategories.map(({ name }, index) => (
        <StatCardComponent key={index} text={name} />
      ))}
    </Flex>
  );
}
