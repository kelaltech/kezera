import React from 'react'

import useLocale from '../../hooks/use-locale/use-locale'

function OrganizationCertificate() {
  const { loading, t } = useLocale(['organization'])

  return loading || <>{t`organization`}</>
}

export default OrganizationCertificate
