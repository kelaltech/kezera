import { StyleSheet } from 'react-native'

import classes from '../../../assets/styles/classes'
import values from '../../../assets/styles/values'

export default StyleSheet.create({
  photo: {
    width: '100%',
    height: 300
  },

  displayName: {
    ...classes.head1,

    padding: values.space.normal,
    paddingTop: values.space.big,

    fontSize: values.fontSize.big * 2,

    color: values.color.primary
  },

  titles: {
    ...classes.head1,

    padding: values.space.normal,
    paddingTop: values.space.big,
    paddingBottom: values.space.small
  },

  fields: {
    ...classes.row,

    padding: values.space.normal
  },

  iconContainers: {
    width: values.space.big * 2,

    alignItems: 'flex-start'
  },

  labels: {
    ...classes.label,
    ...classes.paddingRightSmall,

    width: '50%',

    alignSelf: 'center'
  },

  values: {
    ...classes.grow,

    alignSelf: 'center'
  },

  certificates: {
    ...classes.marginSmall,

    width: 284,
    height: 200,

    alignSelf: 'center',

    backgroundColor: values.color.whitish
  }
})
