import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'

import useLocale from '../../../shared/hooks/use-locale/use-locale'
import values from '../../../assets/styles/values'
import Header from '../../../shared/components/header/header'
import SubscribedCard from '../../components/subscribed-card/subscribed-card'
import Axios from 'axios'

function OrganizationSubscriptions({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['organization'])
  let [org, setOrg] = useState([])
  let organizations = function() {
    Axios.get('/api/organization/subscriptions')
      .then(res => {
        setOrg(res.data)
        console.log(res.data)
      })
      .catch()
  }
  useEffect(() => {
    organizations()
    console.log(org)
  }, [])
  return (
    loading || (
      <>
        <Header title={t`organization:my-subscriptions`} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {org.length != 0 ? (
            <>
              {org.map((organization, index) => (
                <SubscribedCard
                  navigation={navigation}
                  organization={organization}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>
              <Text style={{ fontSize: 16 }}>No subscribed organizations</Text>
            </>
          )}
        </View>
      </>
    )
  )
}

OrganizationSubscriptions.navigationOptions = {
  tabBarIcon: ({ focused }: any) => (
    <Icon name={'work'} color={focused ? values.color.secondary : values.color.primary} />
  )
}

export default withNavigation(OrganizationSubscriptions)
