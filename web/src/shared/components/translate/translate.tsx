import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Loading } from 'gerami'

import { defaultNamespaces, loadNamespaces, Namespace } from '../../../lib/language'

interface Props extends PropsWithChildren<{}> {
  namespaces: Namespace[]
}

function Translate({ children, namespaces }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadNamespaces(defaultNamespaces.concat(namespaces), 'en')
      .then(() => setLoaded(true))
      .catch(console.error)
  })

  return (loaded && <>{children}</>) || <Loading delay />
}

export default Translate
