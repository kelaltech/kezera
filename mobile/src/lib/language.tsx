import { getI18n } from 'react-i18next'
import i18n from 'i18next'
import { NativeModules, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// am
import amCommon from '../locales/am/common.json'
import amAccount from '../locales/am/account.json'
import amCertificate from '../locales/am/certificate.json'
import amComment from '../locales/am/comment.json'
import amEvent from '../locales/am/event.json'
import amFundraising from '../locales/am/fundraising.json'
import amMaterialDonation from '../locales/am/material-donation.json'
import amNews from '../locales/am/news.json'
import amOrganDonation from '../locales/am/organ-donation.json'
import amOrganization from '../locales/am/organization.json'
import amRequest from '../locales/am/request.json'
import amSpam from '../locales/am/spam.json'
import amTask from '../locales/am/task.json'
import amVolunteer from '../locales/am/volunteer.json'

// en
import enCommon from '../locales/en/common.json'
import enAccount from '../locales/en/account.json'
import enCertificate from '../locales/en/certificate.json'
import enComment from '../locales/en/comment.json'
import enEvent from '../locales/en/event.json'
import enFundraising from '../locales/en/fundraising.json'
import enMaterialDonation from '../locales/en/material-donation.json'
import enNews from '../locales/en/news.json'
import enOrganDonation from '../locales/en/organ-donation.json'
import enOrganization from '../locales/en/organization.json'
import enRequest from '../locales/en/request.json'
import enSpam from '../locales/en/spam.json'
import enTask from '../locales/en/task.json'
import enVolunteer from '../locales/en/volunteer.json'

// until dynamic imports gets supported by react native
const translations: any = {
  am: {
    common: amCommon,
    account: amAccount,
    certificate: amCertificate,
    comment: amComment,
    event: amEvent,
    fundraising: amFundraising,
    'material-donation': amMaterialDonation,
    news: amNews,
    'organ-donation': amOrganDonation,
    organization: amOrganization,
    request: amRequest,
    spam: amSpam,
    task: amTask,
    volunteer: amVolunteer
  },
  en: {
    common: enCommon,
    account: enAccount,
    certificate: enCertificate,
    comment: enComment,
    event: enEvent,
    fundraising: enFundraising,
    'material-donation': enMaterialDonation,
    news: enNews,
    'organ-donation': enOrganDonation,
    organization: enOrganization,
    request: enRequest,
    spam: enSpam,
    task: enTask,
    volunteer: enVolunteer
  }
}

export type Language = 'am' | 'en'
export const supportedLanguages = ['am', 'en']
export const defaultLanguage: Language = 'en'

export type Namespace =
  | 'common'
  | 'account'
  | 'certificate'
  | 'comment'
  | 'event'
  | 'fundraising'
  | 'material-donation'
  | 'news'
  | 'organ-donation'
  | 'organization'
  | 'request'
  | 'spam'
  | 'task'
  | 'volunteer'
export const supportedNamespaces: Namespace[] = [
  'common',
  'account',
  'certificate',
  'comment',
  'event',
  'fundraising',
  'material-donation',
  'news',
  'organ-donation',
  'organization',
  'request',
  'spam',
  'task',
  'volunteer'
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
  namespaces: Namespace[] = [],
  i18nInstance?: i18n.i18n
) {
  const i18n = i18nInstance || getI18n()

  if (namespaces) checkNamespaces(namespaces).catch(console.error)

  return i18n.t(key.toString(), {
    ns: namespaces.concat(defaultNamespaces)
  })
}
