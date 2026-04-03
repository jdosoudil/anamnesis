import React from 'react';
import { FormattedMessage } from 'react-intl';

const Title = () => {
  return (
    <div id="title" className="flex flex-col gap-5 text-center">
      <h1 className="text-7xl font-bold uppercase">
        <FormattedMessage id="title" />
      </h1>
      <h2 className="text-3xl font-bold">
        <FormattedMessage id="subtitle" />
      </h2>
    </div>
  )
}

export default Title;