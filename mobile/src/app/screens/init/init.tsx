import React, { useEffect } from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import { useAccountState } from '../../stores/account/account-provider'
import Loading from '../../../shared/components/loading/loading'

function Init({ navigation }: NavigationInjectedProps) {
  const { account } = useAccountState()

  useEffect(() => {
    if (account === undefined) {
      // do nothing, still loading
    } else if (account === null) {
      // logged out
      navigation.replace('LayoutStart')
    } else {
      // logged in
      navigation.replace('LayoutDefault')
    }
  }, [account])

  return <Loading />
}

export default withNavigation(Init)
