import React from 'react'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import { Button, View } from 'react-native'
import { Card } from 'react-native-elements'
import { throwStatement } from '@babel/types'
import clock = jasmine.clock

export interface IFundProps {
  request: any
}
export default function FundMobileCard({ request }: IFundProps) {
  const { loading, t } = useLocale(['request'])
  return (
    loading || (
      <Card title={request.name} image={request.picture}>
        x<h6>{request.fundraising.amount}</h6>
        <Button title={'Attend'} onPress={clock}>{t`donate`}</Button>
      </Card>
    )
  )
}
