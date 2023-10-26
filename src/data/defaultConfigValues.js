const colors = {
  brand: {
    900: "#10296E",
    800: "#0845BE",
    700: "#2750B1",
    200: "#97c4fb",
    100: "#dcecff",
  },
  accent: {
    900: "#510074",
    800: "#6f009d",
    700: "#9440b7",
    200: "#e0a1fc",
    100: "#f5ddff",
  },
  neutral: {
    900: "#0A0D14",
    800: "#1B1F27",
    700: "#3f444d",
    300: "#F1F3F9",
    100: "#fcfcfc",
  },
  success: {
    900: "#066042",
    800: "#04724D",
    700: "#08875D",
    200: "#4AB392",
    100: "#DFFFF5",
  },
  warning: {
    900: "#80460D",
    800: "#96530F",
    700: "#B25E09",
    200: "#CCA762",
    100: "#FFF2DB",
  },
  error: {
    900: "#981B25",
    800: "#BA2532",
    700: "#E02D3C",
    200: "#E0747C",
    100: "#FCD8DB",
  },
};

const fonts = {
  body: "Open Sans, sans-serif",
};

const pageVariants = {
  initial: {
    y: "-2%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const user = JSON.parse(localStorage.getItem("user"));

export default { colors, pageVariants, fonts, user };
