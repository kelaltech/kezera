import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Button, View } from 'react-native'
import { Card } from 'react-native-elements'

export interface IOrganProps {
  request: any
}
export default function OrganMobileCard({ request }: IOrganProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <Card title={request.name} image={request.picture}>
        <h6>{request.organ.organType}</h6>
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
