import React from 'react';

type Animation = "fade-in" | "type";

interface ChatScreenMessageProps {
  title?: string;
  placeholder?: boolean;
  text?: string;
  highlighted?: boolean;
  animation: Animation;
}

const ChatScreenMessage = (props: ChatScreenMessageProps) => {
  const threeDots = <>
    <span className="animate-blink">.</span>
    <span className="animate-blink-250">.</span>
    <span className="animate-blink-500">.</span>
  </>;

  const msgCls = [
    "text-xl",
    (props.highlighted ? "font-bold" : null)
  ];

  const animCls = [
    (props.animation === "type" ? "animate-type" : "animate-fade-in"),
    (props.animation === "type" ? "type" : null)
  ];

  const animStyle = (props.animation === "type" && props.text) ? { "--n": props.text.length } as React.CSSProperties : {};

  return (
    <div className="font-anonymous-pro">
      {
        props.title
          ? <div className="text-sm">{props.title}</div>
          : null
      }
      {
        (props.placeholder === true)
          ? threeDots
          : (props.text
              ? <span className={[...msgCls, ...animCls].join(" ")} style={animStyle}>{props.text}</span>
              : null)
      }
    </div>
  )
}

export default ChatScreenMessage;