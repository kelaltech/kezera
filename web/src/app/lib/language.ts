import i18n from 'i18next'

export type Language = 'am' | 'en'
export type Namespace = 'common'

export const defaultLanguage: Language = 'en'
export const defaultNamespaces: Namespace[] = ['common']

export async function getLanguage(): Promise<Language> {
  return (window.localStorage.getItem('lng') ||
    (window.navigator.language && window.navigator.language.slice(0, 2)) ||
    defaultLanguage) as Language
}

export async function loadNamespaces(namespaces: Namespace[], otherLng?: Language) {
  const lng = otherLng || (await getLanguage())

  await Promise.all(
    namespaces.map(async namespace => {
      const resource = await import(`../../locales/${lng}/${namespace}.json`)
      i18n.addResourceBundle(lng, namespace, resource)
    })
  )
}

export async function setLanguage(lng?: Language, namespaces = defaultNamespaces) {
  if (!lng) lng = await getLanguage()

  await loadNamespaces(namespaces, lng)

  window.localStorage.setItem('lng', lng)
  return i18n.changeLanguage(lng)
}

export function _(key: TemplateStringsArray | string, namespaces?: Namespace[]) {
  const t: string | (() => string) = i18n.t(key.toString(), {
    defaultValue: (): string => {
      console.warn(`missing translation for key "${key}"`)
      return key.toString()
    },
    ns: namespaces || defaultNamespaces
  })
  return typeof t === 'function' ? t() : t
}

export default _
