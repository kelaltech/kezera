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
    ...classes.grow,
    ...classes.bold,
    ...classes.paddingVertical,
    ...classes.paddingHorizontal,
    textAlignVertical: 'center',
    fontSize: values.fontSize.big,
    color: values.color.white
  },

  accountCircle: {
    justifyContent: 'center'
  },
  accountCircleImage: {
    margin: values.space.small,
    borderRadius:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) / 2,
    width: values.fontSize.big + 2 * values.space.normal - values.space.small,
    height: values.fontSize.big + 2 * values.space.normal - values.space.small
  },
  accountCircleText: {
    margin: values.space.small,
    width: values.fontSize.big + 2 * values.space.normal - values.space.small,
    height: values.fontSize.big + 2 * values.space.normal - values.space.small,
    borderRadius:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) / 2,
    fontSize: values.fontSize.big,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: values.color.secondary,
    color: values.color.whitish
  }
})
