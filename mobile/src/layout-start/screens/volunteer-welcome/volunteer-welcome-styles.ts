import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  main: {
    ...classes.grow,
    ...classes.paddingBig,

    backgroundColor: values.color.whitish
  },

  wordmark: {
    margin: values.space.big,
    marginBottom: 0,

    width: 174,
    height: 50,

    alignSelf: 'center'
  },

  motto: {
    margin: values.space.big,
    marginTop: values.space.big / 2,

    paddingTop: values.space.big / 2,

    borderTopWidth: values.space.small / 2,
    borderStyle: 'solid',
    borderTopColor: values.color.white,

    fontSize: values.fontSize.normal,
    fontWeight: '100',
    alignSelf: 'center',

    color: values.color.blackish,

    opacity: 0.7
  },

  welcome: {
    margin: values.space.big,
    marginTop: values.space.big * 4,

    fontSize: values.fontSize.big * 2,
    fontWeight: '100',
    alignSelf: 'center',

    color: values.color.blackish,
    opacity: 0.6
  },

  emoji: {
    marginTop: values.space.big,

    fontSize: values.fontSize.big * 3,
    alignSelf: 'center'
  }
})
