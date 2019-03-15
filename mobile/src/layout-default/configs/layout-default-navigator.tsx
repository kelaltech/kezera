import { createDrawerNavigator } from 'react-navigation'

import Sample from '../screens/sample/sample'

const LayoutDefaultNavigator = createDrawerNavigator(
  {
    Sample
  },
  {
    initialRouteName: 'Sample' // todo: temp
  }
)

export default LayoutDefaultNavigator
