// ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalContent, setPortalContent] = useState(null);

  const openPortal = (content) => {
    setPortalContent(content);
    setIsOpen(true);
  };

  const closePortal = () => {
    setPortalContent(null);
    setIsOpen(false);
  };

  const value = {
    isOpen,
    openPortal,
    closePortal,
    portalContent,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
