import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  main: {
    ...classes.grow,
    ...classes.paddingBig
  },

  logo: {
    ...classes.marginBottomBig,
    alignSelf: 'center',
    height: 64,
    width: 64
  },

  inputContainers: {
    ...classes.marginVertical
  },

  inputs: {
    ...classes.marginVertical
  },

  forgotPassword: {
    ...classes.marginTop,
    alignSelf: 'flex-end'
  },

  buttonContainer: {
    ...classes.marginVertical
  },

  button: {
    ...classes.marginVertical
  },

  createNewAccount: {
    ...classes.marginVerticalBig
  }
})
