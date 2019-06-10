import React from 'react'
import { View } from 'react-native'

interface IMaterialProps {
  request: any
}
export default function MaterialMobileDetail({ request }: IMaterialProps) {
  return <View>{request.material.status}</View>
}
