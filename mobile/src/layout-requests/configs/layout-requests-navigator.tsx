import { createMaterialTopTabNavigator } from 'react-navigation'

import values from '../../assets/styles/values'
import TaskList from '../screens/task-list/task-list'
import MaterialDonationList from '../screens/material-donation-list/material-donation-list'
import FundraisingList from '../screens/fundraising-list/fundraising-list'
import OrganDonationList from '../screens/organ-donation-list/organ-donation-list'

const LayoutRequestsNavigator = createMaterialTopTabNavigator(
  {
    TaskList,
    MaterialDonationList,
    FundraisingList,
    OrganDonationList
  },
  {
    initialRouteName: 'TaskList',
    tabBarOptions: {
      scrollEnabled: true,
      pressColor: values.color.secondary,
      style: {
        backgroundColor: values.color.primary
      }
    }
  }
)

export default LayoutRequestsNavigator
