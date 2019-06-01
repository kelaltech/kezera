import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  main: {
    ...classes.grow,
    ...classes.paddingVertical,
    backgroundColor: values.color.whitish
  },

  logo: {
    ...classes.marginVerticalBig,
    alignSelf: 'center',
    height: 147 / 3,
    width: 512 / 3
  },

  form: {
    ...classes.padding,
    ...classes.margin,
    borderRadius: values.space.small / 2,
    backgroundColor: values.color.white,
    elevation: 1
  },

  title: {
    ...classes.head1,
    ...classes.paddingVerticalSmall
  },

  inputContainers: {
    ...classes.marginVertical
  },

  inputs: {},

  forgotPassword: {
    ...classes.marginTop,
    alignSelf: 'flex-end'
  },

  buttonContainer: {
    ...classes.marginVertical
  },

  button: {},

  createNewAccount: {
    ...classes.paddingVertical
  }
})
