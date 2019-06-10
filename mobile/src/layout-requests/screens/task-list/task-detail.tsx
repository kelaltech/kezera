import React from 'react'
import { View } from 'react-native'

interface ITaskProps {
  request: any
}
export default function TaskMobileDetail({ request }: ITaskProps) {
  return <View>{request.task.numberNeeded}</View>
}
