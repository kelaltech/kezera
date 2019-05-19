import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  newsTodayParent: {
    position: 'relative'
  },
  cardStyle: {
    height: 250,
    borderRadius: 15,
    ...classes.marginSmall
  },

  imageStyle: {
    height: 250
  },

  actionStyle: {
    position: 'absolute',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: values.color.whitish,
    bottom: 35,
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
