import "intl-pluralrules";

import i18n, { changeLanguage, use, type Module } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import { LOCALE } from "@/src/constants/common";
import { storage } from "@/src/utils/storage";

import { getLocales } from "expo-localization";

const DEFAULT_LOCALE = "en";
const DEFAULT_TEXT_DIRECTION = "ltr";

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: (callback: (language: string) => void) => {
    function setDefaultLanguage() {
      const { languageCode, textDirection } = getLocales()[0] ?? {
        languageCode: DEFAULT_LOCALE,
        textDirection: DEFAULT_TEXT_DIRECTION,
      };

      I18nManager.forceRTL(textDirection === "rtl");
      callback(languageCode ?? DEFAULT_LOCALE);
    }

    const language = storage.getString(LOCALE);

    if (!language) {
      setDefaultLanguage();
    } else {
      callback(language);
    }
  },
  init: () => {
    //
  },
  cacheUserLanguage: (language: string) => {
    storage.set(LOCALE, language);
  },
} as Module;

export const setI18nConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  use(LANGUAGE_DETECTOR)
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        switch (language) {
          case "en":
            if (namespace === "common") {
              return require("./locales/en/common.json");
            }
            break;
          default:
            break;
        }
      })
    )
    .init({
      ns: ["common"],
      defaultNS: "common",
      fallbackLng: DEFAULT_LOCALE,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false, // Disable suspense for mobile
      },
      cache: {
        enabled: true,
      },
      // debug: __DEV__,
      // Add mobile-specific options
      // compatibilityJSON: "v4", // Required for Android
      // load: "languageOnly", // Simplify language codes
      returnNull: false, // Return key instead of null on missing translations
      returnEmptyString: false, // Return key instead of empty string
    });
};

export const getLocale = () => {
  // fallback if no available language fits
  const locale = storage.getString(LOCALE);
  if (locale) {
    return locale;
  }
  const { languageTag } = getLocales()[0] ?? {};
  return languageTag ?? DEFAULT_LOCALE;
};

export const changeLocale = async ({
  locale = DEFAULT_LOCALE,
}: {
  locale: string;
}) => {
  await changeLanguage(locale);
  storage.set(LOCALE, locale);
};

export default i18n;
