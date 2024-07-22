import { createContext, useContext, useState } from 'react';

const ChatMessageContext = createContext();

export const ChatMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(
    'Hello, I would like to make an enquiry.'
  );
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ChatMessageContext.Provider
      value={{ message, setMessage, isVisible, setIsVisible }}
    >
      {children}
    </ChatMessageContext.Provider>
  );
};

export const useChatMessage = () => useContext(ChatMessageContext);
