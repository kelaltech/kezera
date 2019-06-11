import React from 'react'
import { View, Text } from 'react-native'

interface IMaterialProps {
  request: any
}
export default function MaterialMobileDetail({ request }: IMaterialProps) {
  return (
    <View>
      <Text>{request.material.status}</Text>
    </View>
  )
}
