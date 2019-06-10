import { createStackNavigator } from 'react-navigation'

import Init from '../screens/init/init'
import LayoutStart from '../../layout-start/layout-start'
import LayoutDefault from '../../layout-default/layout-default'
import AccountSettings from '../../shared/screens/account-settings/account-settings'
import VolunteerPortfolio from '../../shared/screens/volunteer-portfolio/volunteer-portfolio'
import OrganizationDetail from '../../shared/screens/organization-detail/organization-detail'
import FundraisingDetail from '../../shared/screens/fundraising-detail/fundraising-detail'
import MaterialDonationDetail from '../../shared/screens/material-donation-detail/material-donation-detail'
import OrganDonationDetail from '../../shared/screens/organ-donation-detail/organ-donation-detail'
import TaskDetail from '../../shared/screens/task-detail/task-detail'
import NewsDetail from '../../shared/screens/news-detail/news-detail'
import EventDetail from '../../shared/screens/event-detail/event-detail'
import EventList from '../../shared/screens/event-list/event-list'
import NewsSearchList from '../../shared/screens/news-search-list/news-search-list'
import EventSearchList from '../../shared/screens/event-search-list/event-search-list'
import RequestSearchList from '../../shared/screens/request-search-list/request-search-list'
import OrganizationSearchList from '../../shared/screens/organization-search-list/organization-search-list'
import VolunteerSearchList from '../../shared/screens/volunteer-search-list/volunteer-search-list'
import CommentList from '../../shared/screens/comment-list/comment-list'

const AppNavigator = createStackNavigator(
  {
    Init,

    LayoutStart,
    LayoutDefault,

    AccountSettings,
    VolunteerPortfolio,
    OrganizationDetail,
    FundraisingDetail,
    MaterialDonationDetail,
    OrganDonationDetail,
    TaskDetail,
    NewsDetail,
    EventDetail,
    EventList,
    EventSearchList,
    NewsSearchList,
    RequestSearchList,
    OrganizationSearchList,
    VolunteerSearchList,
    CommentList
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none'
  }
)

export default AppNavigator
