import { createContext, useContext, useState } from "react";

interface StoreContextType {
  value: number;
  setValue: (value: number) => void;
}

const storeContext = createContext<StoreContextType | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState(0);

  return (
    <storeContext.Provider value={{ value, setValue }}>
      {children}
    </storeContext.Provider>
  );
};

export const Store = () => {
  return useContext(storeContext);
};

