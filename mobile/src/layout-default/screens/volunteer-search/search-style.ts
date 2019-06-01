import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  searchContainer : {
    justifyContent: 'center',
    alignContent: 'center'
  },
  searchInput: {
    alignSelf: 'center',
    flex: 2
  },
  displayHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...classes.paddingHorizontal,
    ...classes.paddingVertical
  }
})
