import { StyleSheet, Dimensions} from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'
 const height = Dimensions.get('window').height
export default StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  searchInput: {
    /* alignSelf: 'center',
    flex: 2*/
  },
  displayHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...classes.paddingHorizontal,
    ...classes.paddingVertical
  },
  placeholderParent : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...classes.marginTopBig
  },
  columnContainer: {

  },
  iconContainer: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 10,
    ...classes.marginVerticalBig,
    ...classes.paddingBig,
    shadowColor: values.color.black,
    shadowRadius: values.space.normal
   },
  iconStyle: {
    fontSize: values.space.big + 10,
    color: values.color.primary,
    ...classes.marginVerticalSmall
  },
  iconLabel : {
    textAlign: 'center'
  }
})
