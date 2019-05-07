import React, { useEffect, useState } from 'react'
import {
  useTranslation,
  UseTranslationOptions,
  UseTranslationResponse
} from 'react-i18next'

import {
  defaultLanguage,
  defaultNamespaces,
  getLanguage,
  Language,
  Namespace,
  setLanguage
} from '../../../lib/language'
import Loading from '../../components/loading/loading'

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
      .then(setLng)
      .catch(console.error)
  }, [])

  useEffect(() => {
    getLanguage()
      .then(setLng)
      .catch(console.error)
  }, [ut.i18n.language])

  useEffect(() => {
    setLanguage(lng, defaultNamespaces.concat(namespaces), ut.i18n)
      .then(() => setLoaded(true))
      .catch(console.error)
  }, [lng])

  return {
    loaded,
    loading: loaded ? null : loading === null ? null : loading || <Loading />,
    ...ut
  }
}

export default useLocale
