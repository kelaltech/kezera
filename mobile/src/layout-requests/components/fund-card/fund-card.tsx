import React from 'react'
import { Button, Text } from 'react-native'
import { Card } from 'react-native-elements'

import useLocale from '../../../shared/hooks/use-locale/use-locale'

export interface IFundProps {
  request: any
}
export default function FundMobileCard({ request }: IFundProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <Card title={request.name} image={request.picture}>
        <Text>{request.fundraising.amount}</Text>
        <Button
          title={'Attend'}
          onPress={() => {
            /* todo */
          }}
        >{t`donate`}</Button>
      </Card>
    )
  )
}
