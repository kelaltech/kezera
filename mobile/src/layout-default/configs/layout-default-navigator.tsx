import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import values from '../../assets/styles/values'
import { _ } from '../../lib/language'

import NewsList from '../screens/news-list/news-list'
import VolunteerSearch from '../screens/volunteer-search/volunteer-search'
import LayoutRequests from '../../layout-requests/layout-requests'
import EventList from '../screens/event-list/event-list'
import OrganizationSubscriptions from '../screens/organization-subscriptions/organization-subscriptions'

const iconHeight = 28
const iconMargin = iconHeight / 2

const LayoutDefaultNavigator = createBottomTabNavigator(
  {
    NewsList: {
      screen: NewsList,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) => (
          <TabBarLabel focused={focused}>{_`news:today`}</TabBarLabel>
        ),
        tabBarIcon: ({ focused }: any) => <TabBarIcon name={'home'} focused={focused} />
      }
    },
    VolunteerSearch: {
      screen: VolunteerSearch,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) => (
          <TabBarLabel focused={focused}>{_`volunteer:search`}</TabBarLabel>
        ),
        tabBarIcon: ({ focused }: any) => <TabBarIcon name={'search'} focused={focused} />
      }
    },
    LayoutRequests: {
      screen: LayoutRequests,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) => (
          <TabBarLabel focused={focused}>{_`request:requests`}</TabBarLabel>
        ),
        tabBarIcon: ({ focused }: any) => (
          <TabBarIcon name={'monetization-on'} focused={focused} />
        )
      }
    },
    EventList: {
      screen: EventList,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) => (
          <TabBarLabel focused={focused}>{_`event:events`}</TabBarLabel>
        ),
        tabBarIcon: ({ focused }: any) => <TabBarIcon name={'event'} focused={focused} />
      }
    },
    OrganizationSubscriptions: {
      screen: OrganizationSubscriptions,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) => (
          <TabBarLabel focused={focused}>{_`organization:my-subscriptions`}</TabBarLabel>
        ),
        tabBarIcon: ({ focused }: any) => <TabBarIcon name={'work'} focused={focused} />
      }
    }
  },
  {
    initialRouteName: 'NewsList',
    tabBarOptions: {
      showLabel: false,
      style: {
        height: iconHeight + iconMargin * 2
      }
    }
  }
)

export default LayoutDefaultNavigator

function TabBarLabel({
  children,
  focused
}: PropsWithChildren<{}> & { focused: boolean }) {
  return (
    <Text
      style={{
        fontSize: values.fontSize.small,
        alignSelf: 'center',
        color: focused ? values.color.secondary : values.color.primary,
        marginBottom: values.space.small
      }}
    >
      {children}
    </Text>
  )
}

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <Icon
      name={name}
      color={focused ? values.color.secondary : values.color.primary}
      size={iconHeight}
    />
  )
}
