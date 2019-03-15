import i18n from 'i18next'

let lngHasBeenSetAtLeastOnce = false

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
        i18n.addResourceBundle(lng, namespace, resource)
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
  await i18n.changeLanguage(lng)

  lngHasBeenSetAtLeastOnce = false
}

export function _(key: TemplateStringsArray | string, namespaces?: Namespace[]) {
  if (namespaces) checkNamespaces(namespaces).catch(console.error)

  return i18n.t(key.toString(), {
    defaultValue: ((): string => {
      if (lngHasBeenSetAtLeastOnce) console.warn(`missing translation for key "${key}"`)

      return key.toString()
    })(),
    ns: namespaces || defaultNamespaces
  })
}

export default _
