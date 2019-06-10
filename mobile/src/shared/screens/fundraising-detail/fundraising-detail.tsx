import React from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
interface IFundProps {
  request: any
}
function FundraisingDetail({  }: NavigationInjectedProps<{}>, { request }: IFundProps) {
  const { loading, t } = useLocale([])

  return (
    loading || (
      <>
        <Header title={t`fundraising:fundraising`} showBack />
        {request.fundraising.amountNeeded} {request.fundraising.currency}
      </>
    )
  )
}

export default withNavigation(FundraisingDetail)
