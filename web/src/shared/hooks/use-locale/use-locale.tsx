import React, { useEffect, useState } from 'react'
import {
  useTranslation,
  UseTranslationOptions,
  UseTranslationResponse
} from 'react-i18next'
import { Loading } from 'gerami'

import {
  defaultLanguage,
  defaultNamespaces,
  getLanguage,
  Language,
  Namespace,
  setLanguage
} from '../../../lib/language'

type UseLocaleResponse = UseTranslationResponse & {
  loaded: true | null
  loading: JSX.Element | null
}

type UseLocaleOptions = UseTranslationOptions & {
  loading?: JSX.Element | null
}

function useLocale(
  namespaces: Namespace[] = [],
  { loading, ...options }: UseLocaleOptions = {}
): UseLocaleResponse {
  const ut = useTranslation(namespaces, options)

  const [lng, setLng] = useState<Language>(defaultLanguage)
  const [loaded, setLoaded] = useState<true | null>(null)

  useEffect(() => {
    getLanguage()
      .then(lng => setLng(lng))
      .catch(console.error)
  })

  useEffect(() => {
    setLanguage(lng, defaultNamespaces.concat(namespaces), ut.i18n)
      .then(() => setLoaded(true))
      .catch(console.error)
  }, [lng])

  return {
    loaded,
    loading: loaded ? null : loading === null ? null : loading || <Loading delay />,
    ...ut
  }
}

export default useLocale
