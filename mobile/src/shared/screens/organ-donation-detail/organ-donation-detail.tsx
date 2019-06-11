import React from 'react'
import { View, Text } from 'react-native'

interface IOrganProps {
  request: any
}
export default function OrganMobileDetail({ request }: IOrganProps) {
  return (
    <View>
      <Text>{request.organ.type}</Text>
    </View>
  )
}
