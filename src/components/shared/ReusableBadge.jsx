/* eslint-disable react/prop-types */
import { Badge } from "@chakra-ui/react";

const ReusableBadge = ({ colorScheme, variant, children }) => {
  return (
    <Badge colorScheme={colorScheme} variant={variant}>
      {children}
    </Badge>
  );
};

export default ReusableBadge;
