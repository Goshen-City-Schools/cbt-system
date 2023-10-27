/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { Grid } from "@chakra-ui/react";

function Timer({ initialTime, onTimerEnd }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          if (onTimerEnd) {
            onTimerEnd();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [initialTime, onTimerEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <Grid
        placeItems={"center"}
        h={"50px"}
        rounded={"md"}
        px={4}
        bg={"red.700"}
        color={"white"}
        fontSize={"xl"}
        fontWeight={"bold"}
        letterSpacing={2}
      >
        {formatTime(time)}
      </Grid>
    </div>
  );
}

export default Timer;
