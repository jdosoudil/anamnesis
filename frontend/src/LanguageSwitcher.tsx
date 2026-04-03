import { useIntl } from 'react-intl';

const EN_CAPTION = "EN";
const FR_CAPTION = "FR";
const IT_CAPTION = "IT";
const CS_CAPTION = "CS";

const LanguageSwitcher = () => {
  const intl = useIntl();

  return (
    <div id="language-switcher" className="font-anonymous-pro flex flex-row gap-[5px] text-2xl absolute left-[100px] top-[50px]">
        <a href="/en" className={(intl.locale === "en") ? "font-bold text-purple-700" : ""}>
            { EN_CAPTION }
        </a>
        |
        <a href="/fr" className={(intl.locale === "fr") ? "font-bold text-purple-700" : ""}>
            { FR_CAPTION }
        </a>
        |
        <a href="/it" className={(intl.locale === "it") ? "font-bold text-purple-700" : ""}>
            { IT_CAPTION }
        </a>
        |
        <a href="/cs" className={(intl.locale === "cs") ? "font-bold text-purple-700" : ""}>
            { CS_CAPTION }
        </a>
    </div>
  )
}

export default LanguageSwitcher;