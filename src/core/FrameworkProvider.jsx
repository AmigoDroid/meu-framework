import { createContext } from "react";
export const FrameworkContext = createContext();
export function FrameworkProvider({ children }) {
    const value = {
        name: "Meu Framework",
        version: "1.0.0",
        description: "Um framework React personalizado para demonstração."
    }
  return (
    <FrameworkContext.Provider value={value}>
        {children}
    </FrameworkContext.Provider>
  );
}