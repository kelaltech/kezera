import { getI18n } from 'react-i18next'
import i18n from 'i18next'
import { NativeModules, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// am
import amCommon from '../locales/am/common.json'

// en
import enCommon from '../locales/en/common.json'

// until dynamic imports gets supported by react native
const translations: any = {
  am: {
    common: amCommon
  },
  en: {
    common: enCommon
  }
}

export type Language = 'am' | 'en'
export const supportedLanguages = ['am', 'en']
export const defaultLanguage: Language = 'en'

export type Namespace = 'common'
export const supportedNamespaces = ['common']
export const defaultNamespaces: Namespace[] = ['common']

export async function checkLanguage(lng: string): Promise<void> {
  if (!supportedLanguages.includes(lng)) throw Error(`language "${lng}" is not supported`)
}

export async function checkNamespaces(namespaces: string[]): Promise<void> {
  for (const namespace of namespaces)
    if (!supportedNamespaces.includes(namespace))
      throw Error(`namespace "${namespace}" is not supported`)
}

export async function getLanguage(): Promise<Language> {
  let lng =
    (await AsyncStorage.getItem('lng')) ||
    Platform.select({
      ios:
        NativeModules.SettingsManager &&
        NativeModules.SettingsManager.settings.AppleLocale,
      android: NativeModules.I18nManager && NativeModules.I18nManager.localeIdentifier
    })

  if (lng) lng = lng.slice(0, 2)

  if (lng && supportedLanguages.includes(lng.toLowerCase())) return lng as Language
  else {
    console.warn(
      `language "${lng}" not supported; using the default "${defaultLanguage}" instead.`
    )
    return defaultLanguage
  }
}

export async function loadNamespaces(
  namespaces: Namespace[],
  otherLng?: Language,
  i18nInstance?: i18n.i18n
): Promise<void> {
  const i18n = i18nInstance || getI18n()

  await checkNamespaces(namespaces)

  const lng = otherLng || (await getLanguage())
  await checkLanguage(lng)

  await Promise.all(
    namespaces.map(async namespace => {
      try {
        const resource = translations[`${lng}`][`${namespace}`] // note line 4
        i18n.addResourceBundle(lng, namespace, resource)
        return i18n.loadNamespaces(namespace)
      } catch (e) {
        throw Error(
          `Unable to load or add "${lng}" translation resource using namespace: "${namespace}"`
        )
      }
    })
  )

  if (lng !== defaultLanguage) {
    // fallback resource
    loadNamespaces(namespaces, defaultLanguage, i18n).catch()
  }
}

export async function setLanguage(
  lng?: Language,
  namespaces = defaultNamespaces,
  i18nInstance?: i18n.i18n
): Promise<void> {
  const i18n = i18nInstance || getI18n()

  if (lng) await checkLanguage(lng)
  else lng = await getLanguage()

  await loadNamespaces(namespaces, lng)

  await AsyncStorage.setItem('lng', lng)
  await i18n.changeLanguage(lng)
}

export function _(
  key: TemplateStringsArray | string,
  namespaces?: Namespace[],
  i18nInstance?: i18n.i18n
) {
  const i18n = i18nInstance || getI18n()

  if (namespaces) checkNamespaces(namespaces).catch(console.error)

  return i18n.t(key.toString(), {
    ns: namespaces || defaultNamespaces
  })
}
