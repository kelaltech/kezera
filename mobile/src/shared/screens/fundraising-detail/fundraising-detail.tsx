import React from 'react'
import { View, Text } from 'react-native'

interface IFundProps {
  request: any
}
export default function FundraisingDetail({ request }: IFundProps) {
  return (
    <View>
      <Text>
        {request.fundraising.amount} {request.fundraising.currency}
      </Text>
    </View>
  )
}
