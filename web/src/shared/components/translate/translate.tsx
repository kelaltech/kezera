import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loading } from 'gerami'

import {
  defaultLanguage,
  defaultNamespaces,
  getLanguage,
  Language,
  loadNamespaces,
  Namespace,
  setLanguage
} from '../../../lib/language'

interface Props extends PropsWithChildren<{}> {
  namespaces: Namespace[] // defaultNamespaces are always included by default
}

function Translate({ children, namespaces }: Props) {
  const { i18n } = useTranslation()

  const [lng, setLng] = useState<Language>(defaultLanguage)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getLanguage()
      .then(lng => setLng(lng))
      .catch(console.error)
  })

  useEffect(() => {
    setLanguage(lng, defaultNamespaces.concat(namespaces), i18n)
      .then(() => setLoaded(true))
      .catch(console.error)
  }, [lng])

  return (loaded && <>{children}</>) || <Loading delay />
}

export default Translate
