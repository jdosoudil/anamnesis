import React from 'react';
import { FormattedMessage } from 'react-intl';

interface ForgetButtonProps {
  clickCallback: Function;
}

const ForgetButton = (props: ForgetButtonProps) => {
  const onClick = () => {
    if (props.clickCallback)
      props.clickCallback();

    window.location.reload();
  }

  return (
    <button
        className="border-4 border-purple-700 w-[300px] h-[125px] flex items-center justify-center text-3xl absolute right-[100px] top-[50px] uppercase hover:bg-purple-700 hover:text-white transition-all duration-300"
        onClick={onClick}>
        <FormattedMessage id="forgetButtonLabel" />
    </button>
  )
}

export default ForgetButton;