import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { _ } from '../../lib/language'
import values from '../../assets/styles/values'

import TaskMobileList from '../screens/task-list/task-list'
import MaterialMobileList from '../screens/material-donation-list/material-donation-list'
import FundMobileList from '../screens/fundraising-list/fundraising-list'
import OrganMobileList from '../screens/organ-donation-list/organ-donation-list'
import FundMobileDetail from '../screens/fund-mobile-detail/fund-mobile-detail'
const LayoutRequestsNavigator = createMaterialTopTabNavigator(
  {
    Detail: {
      screen: FundMobileDetail,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`task:tasks`}</TabBarLabel>
      }
    },
    TaskList: {
      screen: TaskMobileList,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`task:tasks`}</TabBarLabel>
      }
    },
    MaterialDonationList: {
      screen: MaterialMobileList,
      navigationOptions: {
        tabBarLabel: () => (
          <TabBarLabel>{_`material-donation:material-donations`}</TabBarLabel>
        )
      }
    },
    FundraisingList: {
      screen: FundMobileList,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`fundraising:fundraising`}</TabBarLabel>
      }
    },
    OrganDonationList: {
      screen: OrganMobileList,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`organ-donation:organ-donations`}</TabBarLabel>
      }
    }
  },
  {
    initialRouteName: 'TaskList',
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      pressColor: values.color.secondary,
      style: {
        height: values.fontSize.normal + values.space.normal * 2,
        backgroundColor: values.color.primary
      },
      tabStyle: {
        height: values.fontSize.normal + values.space.normal * 2
      },
      labelStyle: {
        paddingVertical: values.space.normal,
        fontSize: values.fontSize.normal
      },
      indicatorStyle: {
        backgroundColor: values.color.secondary
      }
    }
  }
)

export default LayoutRequestsNavigator

function TabBarLabel({ children }: PropsWithChildren<{}>) {
  return <Text style={{ color: values.color.white }}>{children}</Text>
}
