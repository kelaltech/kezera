import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function CertificateDesign() {
  const { loading, t } = useLocale(['organization'])

  return loading || <>{t`organization`}</>
}

export default CertificateDesign
