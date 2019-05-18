import { getI18n } from 'react-i18next'
import i18n from 'i18next'

export type Language = 'am' | 'en'
export const supportedLanguages = ['am', 'en']
export const defaultLanguage: Language = 'en'

export type Namespace =
  | 'common'
  | 'account'
  | 'activity'
  | 'admin'
  | 'certificate'
  | 'comment'
  | 'event'
  | 'fundraising'
  | 'landing'
  | 'material-donation'
  | 'volunteer-my-organization'
  | 'news'
  | 'not-found'
  | 'organ-donation'
  | 'organization'
  | 'request'
  | 'portfolio'
  | 'search-result'
  | 'spam'
  | 'task'
  | 'verifier'
  | 'volunteer'
  | 'volunteer-discovery'
export const supportedNamespaces: Namespace[] = [
  'common',
  'account',
  'activity',
  'admin',
  'certificate',
  'comment',
  'event',
  'fundraising',
  'landing',
  'material-donation',
  'volunteer-my-organization',
  'news',
  'not-found',
  'organ-donation',
  'organization',
  'portfolio',
  'request',
  'search-result',
  'spam',
  'task',
  'verifier',
  'volunteer',
  'volunteer-discovery'
]
export const defaultNamespaces: Namespace[] = ['common']

export async function checkLanguage(lng: string): Promise<void> {
  if (!supportedLanguages.includes(lng)) throw Error(`language "${lng}" is not supported`)
}

export async function checkNamespaces(namespaces: string[]): Promise<void> {
  for (const namespace of namespaces)
    if (!supportedNamespaces.includes(namespace as Namespace))
      throw Error(`namespace "${namespace}" is not supported`)
}

export function getLanguage(): Language {
  let lng =
    window.localStorage.getItem('lng') ||
    (window.navigator.language && window.navigator.language)

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

  const lng = otherLng || getLanguage()
  await checkLanguage(lng)

  await Promise.all(
    namespaces.map(async namespace => {
      try {
        const resource = await import(`../locales/${lng}/${namespace}.json`)
        i18n.addResources(lng, namespace, resource)
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
  lng: Language = getLanguage(),
  namespaces = defaultNamespaces,
  i18nInstance?: i18n.i18n
): Promise<void> {
  const i18n = i18nInstance || getI18n()

  await checkLanguage(lng)
  await loadNamespaces(namespaces, lng, i18n)

  window.localStorage.setItem('lng', lng)
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
