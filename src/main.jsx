import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import { AnimatePresence } from "framer-motion";

import defaultConfigValues from "./data/defaultConfigValues.js";

const colors = defaultConfigValues.colors;
const fonts = defaultConfigValues.fonts;

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </ChakraProvider>
  </React.StrictMode>
);
