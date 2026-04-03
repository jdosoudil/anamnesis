import React from 'react';

const ChatScreen = (props) => {
  return (
    <div id="chat-area" className="w-full max-w-medium h-[350px] flex flex-col gap-4 py-4 overflow-y-scroll">
        {props.children}
    </div>
  )
}

export default ChatScreen;