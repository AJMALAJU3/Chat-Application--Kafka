import { ChatContext } from "@/pages/ChatProvider";
import { useContext } from "react";

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
      throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
  };
  