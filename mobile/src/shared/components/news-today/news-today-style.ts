import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  newsTodayParent: {
    position: 'relative'
  },
  cardStyle: {
    borderRadius: 15,
    height: 250,
    ...classes.marginSmall
  },

  imageStyle: {
    height: 250
  },

  actionStyle: {
    position: 'absolute',
    bottom: 40,
    ...classes.row
  },

  actionChild: {
    ...classes.grow,
    ...classes.paddingBottomSmall
  }
})
