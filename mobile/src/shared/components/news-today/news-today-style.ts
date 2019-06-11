import { Dimensions, StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
const dimension = Dimensions.get('window')
export default StyleSheet.create({
  newsTodayParent: {
    width: dimension.width
  },
  cardStyle: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  imageStyle: {
    height: 250
  },

  actionStyle: {
    // backgroundColor: values.color.whitish,
    marginBottom: values.space.small,
    marginTop: values.space.small,
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
