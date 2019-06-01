import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Button, View } from 'react-native'
import { Card } from 'react-native-elements'

export interface ITaskProps {
  request: any
}
export default function TaskMobileCard({ request }: ITaskProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <Card title={request.name} image={request.picture}>
        <h6>{request.task.numberNeeded}</h6>
        <Button
          title={'Attend'}
          onPress={() => {
            /* todo */
          }}
        >{t`attend`}</Button>
      </Card>
    )
  )
}