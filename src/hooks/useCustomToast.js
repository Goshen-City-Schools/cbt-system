import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  // Define custom toast functions
  const showToast = (options) => toast(options);
  const showErrorToast = (title, description) => {
    showToast({
      title,
      description,
      status: "error",
      duration: 2500, // Adjust the duration as needed
      isClosable: true,
    });
  };

  // Add more custom toast functions as needed

  return {
    showToast,
    showErrorToast,
    // Add other custom toast functions here
  };
};

export default useCustomToast;
