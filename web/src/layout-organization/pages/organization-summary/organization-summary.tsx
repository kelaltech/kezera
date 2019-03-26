import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function OrganizationSummary() {
  const { loading, t } = useLocale(['organization'])

  return loading || <>{t`organization`}</>
}

export default OrganizationSummary
