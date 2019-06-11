import React from 'React'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { IRequestResponse } from '../../../../../api/modules/request/request.apiv'
import { Text } from 'react-native'

function MaterialCard({  }: NavigationInjectedProps & { request: IRequestResponse }) {
  return (
    <>
      <Text>Material Card</Text>
    </>
  )
}
export default withNavigation(MaterialCard)
