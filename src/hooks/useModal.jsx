import { createContext } from "react";
import { useContext } from "react";

const useModal = () => {
  const ModalContext = createContext();

  return useContext(ModalContext);
};
export default useModal;
