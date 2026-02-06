import 'server-only'
import en from '@/locales/en.json'

const dictionaries = {
    en: () => import('@/locales/en.json').then((module) => module.default),
    tr: () => import('@/locales/tr.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
