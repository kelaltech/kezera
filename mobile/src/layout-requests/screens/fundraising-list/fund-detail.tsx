import React from 'react'
import { View } from 'react-native'

interface IFundProps {
  request: any
}
export default function FundMobileDetail({ request }: IFundProps) {
  return (
    <View>
      {request.fundraising.amountNeeded} {request.fundraising.currency}
    </View>
  )
}
