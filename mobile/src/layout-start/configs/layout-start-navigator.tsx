import { createStackNavigator } from 'react-navigation'

import VolunteerWelcome from '../screens/volunteer-welcome/volunteer-welcome'
import AccountRegister from '../screens/account-register/account-register'
import AccountLogin from '../screens/account-login/account-login'
import AccountResetStart from '../screens/account-reset-start/account-reset-start'

const LayoutStartNavigator = createStackNavigator(
  {
    VolunteerWelcome,
    AccountRegister,
    AccountLogin,
    AccountResetStart
  },
  {
    initialRouteName: 'VolunteerWelcome',
    headerMode: 'none'
  }
)

export default LayoutStartNavigator
