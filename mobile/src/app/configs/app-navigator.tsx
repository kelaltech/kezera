import { createStackNavigator } from 'react-navigation'

import LayoutDefault from '../../layout-default/layout-default'

const AppNavigator = createStackNavigator(
  {
    LayoutDefault
  },
  {
    initialRouteName: 'LayoutDefault',
    headerMode: 'none'
  }
)

export default AppNavigator
