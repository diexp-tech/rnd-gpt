import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState, SetState } from "@/types/store";
import instance from "../middleware/api";
import { IUser } from "../models/models";

// Create a context to manage the global state
const StoreContext = createContext<[IState, SetState] | undefined>(undefined);

// Provide the global state using the context provider
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IState>({ isLoading: true, user: null });

  useEffect(() => {
    (async () => {
      const response = await instance.get<IUser>("users/my");
      setState((prevState) => ({ ...prevState, isLoading: false, user: response.data }));
    })();
  }, []);

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and setter function
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
