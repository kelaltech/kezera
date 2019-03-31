import React from 'react'

import useLocale from '../../hooks/use-locale/use-locale'

function OrganizationCard() {
  const { loading, t } = useLocale(['organization'])

  return loading || <>{t`organization`}</>
}

export default OrganizationCard
