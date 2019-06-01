import React from 'react'
import { View } from 'react-native'

interface IOrganProps {
  request: any
}
export default function OrganMobileDetail({ request }: IOrganProps) {
  return <View>{request.organ.organType}</View>
}
