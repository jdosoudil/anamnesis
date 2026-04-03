import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

interface ChatInputProps {
    disabled: boolean;
    clickCallback: (string) => void;
}

const ChatInput = (props: ChatInputProps, context) => {
  const [noInputYet, setNoInputYet] = useState(true);
  const [userInput, setUserInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const intl = useIntl();
  
  const send = (cb) => {
    if (cb && userInput)
        cb(userInput);

    setUserInput("");
    textareaRef.current?.focus();
  }

  const onSubmit = cb => event => {
    event.preventDefault();
    send(cb);
  }

  const onEnterPress = cb => event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      send(cb);
    }
  }

  const onValueChange = event => {
    setUserInput(event.target.value);

    if (noInputYet)
      setNoInputYet(false);
  }

  return (
    <form
        className="flex flex-col items-start gap-4"
        onSubmit={onSubmit(props.clickCallback)}>
        <div className="font-archivo-black text-purple-700 text-base">
          <FormattedMessage id="inputTitle" />
        </div>
        <textarea
          ref={textareaRef}
          name="reply"
          value={userInput}
          placeholder={noInputYet ? intl.formatMessage({ id: "inputPlaceholder" }) : ""}
          onKeyDown={onEnterPress(props.clickCallback)}
          onChange={onValueChange}
          className={"w-medium h-[100px] px-2 py-2 outline outline-1 outline-gray-300 font-anonymous-pro font-bold text-xl placeholder:text-gray-600"}
          autoFocus />
        <button
          type="submit"
          id="chat-submit"
          className="text-base bg-black hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2.5 px-6 transition-all duration-300"
          disabled={props.disabled}>
            <FormattedMessage id="inputSubmit" />
        </button>
    </form>
  )
}

export default ChatInput;