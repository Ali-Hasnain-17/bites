import "server-only";

import type { Locale } from "../../i18n-config";

const translations: any = {
  en: () => import("@/lang/en.json").then((module) => module.default),
  ar: () => import("@/lang/ar.json").then((module) => module.default),
};

export async function getTranslations(locale: Locale) {
  return translations[locale]();
}

export function getDirection(locale: Locale) {
  switch (locale) {
    case "ar":
      return "rtl";
    case "en":
      return "ltr";
  }
}
