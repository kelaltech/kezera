import React from 'react'
import { Text } from 'react-native'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

function VolunteerSearch() {
  const { loading, t } = useLocale([])

  return loading || <Text>{t`app-name`}: VolunteerSearch Screen (in LayoutDefault)</Text>
}

export default VolunteerSearch
