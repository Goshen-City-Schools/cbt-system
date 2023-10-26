/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../../screens/Loading.screen";
import defaultConfigValues from "../../data/defaultConfigValues";

export default function PageWrapper({ children, overflowX = "hidden" }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a few seconds (adjust this as needed)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 3 seconds
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen height="92vh" timer={2100} mt={"80px"} />
      ) : (
        <Box p={6} className="page-wrapper" overflowX={overflowX}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={defaultConfigValues.pageVariants}
          >
            {children}
          </motion.div>
        </Box>
      )}

      <style>
        {`
      @media print {
        .page-wrapper{
          margin-top: 0px;
        }
      }
    `}
      </style>
    </>
  );
}
