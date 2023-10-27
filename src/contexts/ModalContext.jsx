// ModalContext.js
import { createContext, useState } from "react";

// eslint-disable-next-line react/prop-types
export function ModalProvider({ children }) {
  const ModalContext = createContext();
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
