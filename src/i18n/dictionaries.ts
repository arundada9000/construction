import en from './en.json';
import ne from './ne.json';

const dictionaries = { en, ne } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.en;
};

export const locales: Locale[] = ['en', 'ne'];
