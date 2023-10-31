/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HorizontalScrollableTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <Flex className="horizontal-scrollable-tabs" overflowX="auto" mb={"2"}>
      {tabs.map((tab) => (
        <Box
          key={tab.id}
          pb={2}
          pl={4}
          pr={6}
          fontSize={"sm"}
          fontWeight={"bold"}
          borderBottom={"3px solid transparent"}
          borderColor={tab.id === activeTab ? "brand.900" : "gray.200"}
          color={tab.id === activeTab ? "brand.900" : "gray.600"}
          cursor="pointer"
          onClick={() => onTabClick(tab.id)}
        >
          {tab.link ? <Link to={tab.link}>{tab.label}</Link> : <>{tab.label}</>}
        </Box>
      ))}
    </Flex>
  );
};

export default HorizontalScrollableTabs;
