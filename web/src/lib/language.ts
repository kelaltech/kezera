import { getI18n } from 'react-i18next'

export type Language = 'am' | 'en'
export const supportedLanguages = ['am', 'en']
export const defaultLanguage: Language = 'en'

export type Namespace = 'common' | 'account'
export const supportedNamespaces = ['common', 'account']
export const allNamespaces = ['common', 'account']
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
  otherLng?: Language
): Promise<void> {
  await checkNamespaces(namespaces)

  const lng = otherLng || (await getLanguage())
  await checkLanguage(lng)

  await Promise.all(
    namespaces.map(async namespace => {
      try {
        const resource = await import(`../locales/${lng}/${namespace}.json`)
        getI18n().addResources(lng, namespace, resource)
        return getI18n().loadNamespaces(namespace)
      } catch (e) {
        throw Error(
          `Unable to load or add "${lng}" translation resource using namespace: "${namespace}"`
        )
      }
    })
  )
}

export async function setLanguage(
  lng?: Language,
  namespaces = defaultNamespaces
): Promise<void> {
  if (lng) await checkLanguage(lng)
  else lng = await getLanguage()

  await loadNamespaces(namespaces, lng)

  window.localStorage.setItem('lng', lng)
  await getI18n().changeLanguage(lng)
}

export function _(key: TemplateStringsArray | string, namespaces?: Namespace[]) {
  if (namespaces) checkNamespaces(namespaces).catch(console.error)

  return getI18n().t(key.toString(), {
    ns: namespaces || defaultNamespaces
  })
}
