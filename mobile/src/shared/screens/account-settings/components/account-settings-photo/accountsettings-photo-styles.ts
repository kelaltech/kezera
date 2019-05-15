import { StyleSheet } from 'react-native'

import values from '../../../../../assets/styles/values'

const scaleFactor = 2

export default StyleSheet.create({
  accountCircleImage: {
    width:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) * scaleFactor,
    height:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) * scaleFactor,
    borderRadius:
      ((values.fontSize.big + 2 * values.space.normal - values.space.small) *
        scaleFactor) /
      2,
    backgroundColor: values.color.blackish
  },
  accountCircleText: {
    width:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) * scaleFactor,
    height:
      (values.fontSize.big + 2 * values.space.normal - values.space.small) * scaleFactor,
    borderRadius:
      ((values.fontSize.big + 2 * values.space.normal - values.space.small) / 2) *
      scaleFactor,
    fontSize: values.fontSize.big * scaleFactor,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: values.color.secondary,
    color: values.color.whitish
  }
})
