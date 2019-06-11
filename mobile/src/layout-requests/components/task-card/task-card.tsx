import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text } from 'react-native'

function TaskCard({  }: NavigationInjectedProps & { request: IRequestResponse }) {
  return (
    <>
      <Text>Task card</Text>
    </>
  )
}

export default withNavigation(TaskCard)
