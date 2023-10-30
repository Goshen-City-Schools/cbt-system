import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Input,
} from "@chakra-ui/react";

export default function ExamSettingsScreen() {
  return (
    <Box
      bg={"white"}
      p={4}
      maxW={"4xl"}
      w={"full"}
      mx={"auto"}
      rounded={"lg"}
      color={"neutral.700"}
    >
      <Flex direction={"column"} gap={4}>
        <Box py={4} borderBottom={"1px solid"} borderColor={"neutral.700"}>
          <Box>
            <Text
              lineHeight={1}
              as="h3"
              textTransform={"uppercase"}
              fontWeight={"semibold"}
              pb={1}
              width={"max-content"}
            >
              Exam
            </Text>
            <Text as={"small"} fontSize={"sm"}>
              Manage Exam Duration, Time and Date
            </Text>
          </Box>

          <Flex direction={"column"} gap={6} mt={8} px={2}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"p"}> Set Exam Duration</Text>
              <Select w={"max-content"} minW={"120px"} size={"sm"}>
                <option value="30mins">30 Minutes</option>
                <option value="1hr">1 Hour</option>
                <option value="1hr30mins">1 Hour and 30 Minutes</option>
              </Select>
            </Flex>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"p"}> Set Exam Date</Text>
              <Input type="date" w={"max-content"} minW={"120px"} size={"sm"} />
            </Flex>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"p"}> Set Exam Time</Text>
              <Input type="time" w={"max-content"} minW={"120px"} size={"sm"} />
            </Flex>
          </Flex>
        </Box>

        {/* Results Settings */}
        <Box py={4} borderBottom={"1px solid"} borderColor={"neutral.700"}>
          <Box>
            <Text
              lineHeight={1}
              as="h3"
              textTransform={"uppercase"}
              fontWeight={"semibold"}
              pb={1}
              width={"max-content"}
            >
              Results
            </Text>
            <Text as={"small"} fontSize={"sm"}>
              Manage how results are collected and protected
            </Text>
          </Box>

          <Flex direction={"column"} gap={6} mt={8} px={2}>
            <FormControl
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel htmlFor="recordStudentDetails">
                Record Students Details (S/N, name and ID)
              </FormLabel>
              <Switch id="recordStudentDetails" />
            </FormControl>
            <FormControl
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel htmlFor="recordStudentDetails">
                Record Students Scores
              </FormLabel>
              <Switch id="recordStudentDetails" />
            </FormControl>
            <FormControl
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel htmlFor="recordStudentDetails">
                Autosave Answered Questions
              </FormLabel>
              <Switch id="recordStudentDetails" />
            </FormControl>
          </Flex>
        </Box>

        {/* Presentation Settings */}
        <Box py={4} borderBottom={"1px solid"} borderColor={"neutral.700"}>
          <Box>
            <Text
              lineHeight={1}
              as="h3"
              textTransform={"uppercase"}
              fontWeight={"semibold"}
              pb={1}
              width={"max-content"}
            >
              Presentation
            </Text>
            <Text as={"small"} fontSize={"sm"}>
              Manage Exam and Results Presentation
            </Text>
          </Box>

          <Flex direction={"column"} gap={6} mt={8} px={2}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"p"}> Select Result Format</Text>
              <Select w={"max-content"} minW={"120px"} size={"sm"}>
                <option value="SecondaryFormat">
                  Secondary School Format{" "}
                </option>
                <option value="PrimaryFormat">Primary School Format</option>
              </Select>
            </Flex>
            <FormControl
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel htmlFor="recordStudentDetails">
                Submit immediately allocated time elapsed
              </FormLabel>
              <Switch id="recordStudentDetails" />
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
