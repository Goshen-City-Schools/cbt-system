/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

import { Box, Tag } from "@chakra-ui/react";

const CustomCard = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <Box>
      <Tag px={1} ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  );
});

export default CustomCard;
