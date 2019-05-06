import { StyleSheet } from 'react-native'

import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

export default StyleSheet.create({
  main: {
    ...classes.row,
    backgroundColor: values.color.primary
  },

  backBtn: {
    ...classes.paddingVertical,
    ...classes.paddingHorizontalSmall,
    borderRadius: 0,
    backgroundColor: 'transparent'
  },

  title: {
    ...classes.bold,
    ...classes.paddingVertical,
    ...classes.paddingHorizontal,
    textAlignVertical: 'center',
    fontSize: 18, // todo: add a fontSize global value (this is big)
    color: values.color.white
  }
})