import { MessageRole } from "@/types/message-role.enum";
import { IMessage, IMessagesState } from "@/types/store";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../middleware/api";
import { useStore } from "./global";

// Create a context to manage the global state
const MessagesContext = createContext<IMessagesState | undefined>(undefined);

// Provide the global state using the context provider
export function MessagesProvider({ children }: { children: ReactNode }) {
  const [{ user }, setStoreState] = useStore();
  const [state, setState] = useState<IMessage[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const sendMessage = useCallback(async (text: string) => {
    setLoading(true);
    setState((prevState) => [...prevState, { text, role: MessageRole.USER }]);

    const result = await instance.post("/users/message", { message: text });

    setLoading(false);
    setState((prevState) => [...prevState, result.data]);
  }, []);

  useEffect(() => {
    if (user?.messages?.length) {
      setState(user.messages);
      const newUser = { ...user, messages: undefined };
      setStoreState(newUser);
    }
  }, [user]);

  return (
    <MessagesContext.Provider value={{ messages: state, isLoading, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

// Custom hook to access the global state and setter function
export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useStore must be used within a MessageProvider");
  }
  return context;
}
