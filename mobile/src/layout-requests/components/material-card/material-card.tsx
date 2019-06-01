import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Button, View } from 'react-native'
import { Card } from 'react-native-elements'
import { throwStatement } from '@babel/types'
import clock = jasmine.clock

export interface IMaterialProps {
  request: any
}
export default function MaterialMobileCard({ request }: IMaterialProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <Card title={request.name} image={request.picture}>
        <Button title={'Attend'} onPress={clock}>{t`attend`}</Button>
      </Card>
    )
  )
}