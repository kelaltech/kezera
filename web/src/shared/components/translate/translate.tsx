import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loading } from 'gerami'

import {
  defaultLanguage,
  defaultNamespaces,
  getLanguage,
  Language,
  Namespace,
  setLanguage
} from '../../../lib/language'

// todo: turn these into the args for the new HOC
interface Props extends PropsWithChildren<{}> {
  namespaces: Namespace[] // defaultNamespaces are always included by default
  // todo: add an option to disable the default defaultNamespace inclusion
}

// todo: turn this into a HOC (to support translation namespaces per page, nicely)
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
