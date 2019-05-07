import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'

export default StyleSheet.create({
  main: {
    ...classes.grow,
    ...classes.paddingBig
  },

  logo: {
    ...classes.marginVerticalBig,
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

  buttonContainer: {
    ...classes.marginVertical
  },

  button: {
    ...classes.marginVertical
  },

  loginLink: {
    ...classes.marginVerticalBig
  }
})
