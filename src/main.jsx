import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import { AnimatePresence } from "framer-motion";

import defaultConfigValues from "./data/defaultConfigValues.js";

// Providers
import { CBTProvider } from "./contexts/CBTContext.jsx";

const colors = defaultConfigValues.colors;
const fonts = defaultConfigValues.fonts;

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <AnimatePresence>
          <CBTProvider>
            <App />
          </CBTProvider>
        </AnimatePresence>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
