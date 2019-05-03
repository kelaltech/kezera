import { createBottomTabNavigator } from 'react-navigation'

import NewsList from '../screens/news-list/news-list'
import VolunteerSearch from '../screens/volunteer-search/volunteer-search'
import LayoutRequests from '../../layout-requests/layout-requests'
import EventList from '../screens/event-list/event-list'
import OrganizationSubscriptions from '../screens/organization-subscriptions/organization-subscriptions'

const LayoutDefaultNavigator = createBottomTabNavigator(
  {
    NewsList,
    VolunteerSearch,
    LayoutRequests,
    EventList,
    OrganizationSubscriptions
  },
  {
    initialRouteName: 'NewsList',
    tabBarOptions: {
      showLabel: false
    }
  }
)

export default LayoutDefaultNavigator
