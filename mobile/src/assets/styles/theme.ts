import { Theme } from 'react-native-elements'

import values from './values'

const theme: Theme = {
  colors: {
    primary: values.color.primary,
    secondary: values.color.secondary
  },

  Input: {
    containerStyle: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}

export default theme
