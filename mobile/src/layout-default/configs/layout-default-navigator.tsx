import { createBottomTabNavigator } from 'react-navigation'

import LayoutRequests from '../../layout-requests/layout-requests'
import VolunteerSearch from '../screens/volunteer-search/volunteer-search'
import NewsList from '../screens/news-list/news-list'
import EventList from '../screens/event-list/event-list'
import OrganizationSubscriptions from '../screens/organization-subscriptions/organization-subscriptions'

const LayoutDefaultNavigator = createBottomTabNavigator(
  {
    LayoutRequests,
    VolunteerSearch,
    NewsList,
    EventList,
    OrganizationSubscriptions
  },
  {
    initialRouteName: 'LayoutRequests'
  }
)

export default LayoutDefaultNavigator
