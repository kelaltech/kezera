import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { _ } from '../../lib/language'
import values from '../../assets/styles/values'

import TaskList from '../screens/task-list/task-list'
import MaterialList from '../screens/material-list/material-list'
import FundraisingList from '../screens/fundraising-list/fundraising-list'
import OrganList from '../screens/organ-list/organ-list'
import FundMobileDetail from '../screens/fund-mobile-detail/fund-mobile-detail'

const LayoutRequestsNavigator = createMaterialTopTabNavigator(
  {
    Sample: {
      screen: FundMobileDetail,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`task:tasks`}</TabBarLabel>
      }
    },
    TaskList: {
      screen: TaskList,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`task:tasks`}</TabBarLabel>
      }
    },
    MaterialList: {
      screen: MaterialList,
      navigationOptions: {
        tabBarLabel: () => (
          <TabBarLabel>{_`material-donation:material-donations`}</TabBarLabel>
        )
      }
    },
    FundraisingList: {
      screen: FundraisingList,
      navigationOptions: {
        tabBarLabel: () => <TabBarLabel>{_`fundraising:fundraising`}</TabBarLabel>
      }
    },
    OrganList: {
      screen: OrganList,
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
