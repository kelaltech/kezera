import { StyleSheet } from 'react-native'

import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

export default StyleSheet.create({
  imageCont: {
    position: 'relative'
  },
  newsImage: {
    // height: 400
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: values.fontSize.big * 1.5,
    bottom: 100,
    ...classes.paddingHorizontalBig,
    color: values.color.whitish
  },
  by: {
    ...classes.paddingHorizontalBig,
    ...classes.paddingVerticalBig,
    color: values.color.secondary
  },
  actionStyle: {
    backgroundColor: values.color.whitish,
    ...classes.marginSmall,
    ...classes.row
  },

  actionChild: {
    marginTop: values.space.small,
    ...classes.grow,
    ...classes.paddingBottomSmall,
    ...classes.row,
    justifyContent: 'center'
  }
})
