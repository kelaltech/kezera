import { createStackNavigator } from 'react-navigation'

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

const AppNavigator = createStackNavigator(
  {
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
    EventDetail
  },
  {
    initialRouteName: 'LayoutStart', // todo: if account? 'LayoutStart'
    headerMode: 'none'
  }
)

export default AppNavigator
