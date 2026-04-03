import React, { useState, useEffect, useRef } from 'react';
import Title from './Title.tsx';
import ChatScreen from './ChatScreen.tsx';
import ChatScreenMessage from './ChatScreenMessage.tsx';
import ChatInput from "./ChatInput.tsx";
import ForgetButton from './ForgetButton.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';

import { useIntl } from 'react-intl';

type MessageAuthor = "User" | "Anamnesis";

interface Message {
  author: MessageAuthor;
  text: string;
}

const App = () => {
  const [responseToLoad, setResponseToLoad] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const intl = useIntl();
  const saveToFileEndpoint = intl.formatMessage({ id: "backendEndpoints_save" });
  const chatEndpoint = intl.formatMessage({ id: "backendEndpoints_chat" });

  const saveToFile = async () => {
    try {
      const messageSession = messages
        .map(item => `> ${item.author}\n${item.text}`)
        .join('\n\n');

      const res = await fetch(saveToFileEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messageSession
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Saving failed.");
      }
    } catch (e: any) {
      setErrorMessage(e.message || "Saving failed.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, responseToLoad]);

  useEffect(() => {
    const fetchOpenaiResponse = async () => {
      const userMessage: Message = { author: "User", text: responseToLoad! };
      const updatedMessages = [...messages, userMessage];

      try {
        setErrorMessage(null);

        setMessages(updatedMessages);

        const res = await fetch(chatEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: responseToLoad,
            messages: updatedMessages
          })
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Chat request failed.");
        }

        if (data?.message) {
          const newMessage: Message = { author: "Anamnesis", text: data.message };
          setMessages(prev => [...prev, newMessage]);
        } else {
          const fallbackMessage: Message = {
            author: "Anamnesis",
            text: "No response text was returned."
          };
          setMessages(prev => [...prev, fallbackMessage]);
        }
      } catch (e: any) {
        setErrorMessage(e.message || "Unknown error.");
      } finally {
        setResponseToLoad(null);
      }
    };

    if (responseToLoad) {
      fetchOpenaiResponse();
    }
  }, [chatEndpoint, responseToLoad]);

  async function onChatButtonClick(inputValue: string) {
    if (!inputValue || inputValue.trim() === "") {
      return;
    }

    if (responseToLoad) {
      return;
    }

    setErrorMessage(null);
    setResponseToLoad(inputValue);
  }

  const isLoading = !!responseToLoad;

  return (
    <main className="font-archivo-black w-screen h-screen flex flex-col gap-12 items-center justify-center relative">
      <Title />

      <ChatScreen>
        {messages.map((message, i) => {
          const isUserMessage = message.author === "User";
          const animation = isUserMessage ? "fade-in" : "type";

          return (
            <ChatScreenMessage
              title={message.author}
              text={message.text}
              animation={animation}
              highlighted={isUserMessage}
              key={'message-' + i}
            />
          );
        })}

        {isLoading ? (
          <ChatScreenMessage
            placeholder={true}
            animation="fade-in"
          />
        ) : null}

        {errorMessage ? (
          <ChatScreenMessage
            title="Error"
            text={errorMessage}
            animation="fade-in"
            highlighted={false}
          />
        ) : null}

        <div ref={messagesEndRef} />
      </ChatScreen>

      <ChatInput clickCallback={onChatButtonClick} disabled={isLoading} />
      <ForgetButton clickCallback={saveToFile} />
      <LanguageSwitcher />
    </main>
  );
};

export default App;