import { createContext, useContext } from "react";

// Custom hook to access the CBT context

export function useCBT() {
  const CBTContext = createContext();

  const context = useContext(CBTContext);
  if (!context) {
    throw new Error("useCBT must be used within a CBTProvider");
  }
  return context;
}
