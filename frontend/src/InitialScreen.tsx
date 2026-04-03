import React from 'react';
import { useTranslation } from 'react-i18next'

const InitialScreen = () => {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang) =>
  {
    i18n.changeLanguage("de")
  }

  return (
    <div id="chat-area" className="w-full max-w-medium h-[350px] flex flex-col gap-4 py-4 items-center justify-center text-gray-600">
        Test
    </div>
  )
}

export default InitialScreen;