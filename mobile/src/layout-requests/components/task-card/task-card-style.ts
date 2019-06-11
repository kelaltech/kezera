import { StyleSheet } from 'react-native'
import values from '../../../assets/styles/values'
import classes from '../../../assets/styles/classes'

export const taskCardStyle = StyleSheet.create({
  progressTracker: {
    backgroundColor: values.color.primary,
    flexGrow: 1,
    borderRadius: values.space.small,
    height: values.space.small,
    ...classes.marginVerticalBig
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    ...classes.marginVerticalSmall
  }
})
