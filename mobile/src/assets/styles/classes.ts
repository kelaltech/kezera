import { StyleSheet } from 'react-native'
import values from './values'

export default StyleSheet.create({
  /*
   Layout
   */

  grow: { flex: 1 },

  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  column: { flexDirection: 'column' },
  columnReverse: { flexDirection: 'column-reverse' },

  /*
   Space
   */

  marginSmall: { margin: values.space.small },
  margin: { margin: values.space.normal },
  marginBig: { margin: values.space.big },

  marginTopSmall: { marginTop: values.space.small },
  marginTop: { marginTop: values.space.normal },
  marginTopBig: { marginTop: values.space.big },

  marginRightSmall: { marginRight: values.space.small },
  marginRight: { marginRight: values.space.normal },
  marginRightBig: { marginRight: values.space.big },

  marginBottomSmall: { marginBottom: values.space.small },
  marginBottom: { marginBottom: values.space.normal },
  marginBottomBig: { marginBottom: values.space.big },

  marginLeftSmall: { marginLeft: values.space.small },
  marginLeft: { marginLeft: values.space.normal },
  marginLeftBig: { marginLeft: values.space.big },

  marginVerticalSmall: { marginVertical: values.space.small },
  marginVertical: { marginVertical: values.space.normal },
  marginVerticalBig: { marginVertical: values.space.big },

  marginHorizontalSmall: { marginHorizontal: values.space.small },
  marginHorizontal: { marginHorizontal: values.space.normal },
  marginHorizontalBig: { marginHorizontal: values.space.big },

  paddingSmall: { padding: values.space.small },
  padding: { padding: values.space.normal },
  paddingBig: { padding: values.space.big },

  paddingTopSmall: { paddingTop: values.space.small },
  paddingTop: { paddingTop: values.space.normal },
  paddingTopBig: { paddingTop: values.space.big },

  paddingRightSmall: { paddingRight: values.space.small },
  paddingRight: { paddingRight: values.space.normal },
  paddingRightBig: { paddingRight: values.space.big },

  paddingBottomSmall: { paddingBottom: values.space.small },
  paddingBottom: { paddingBottom: values.space.normal },
  paddingBottomBig: { paddingBottom: values.space.big },

  paddingLeftSmall: { paddingLeft: values.space.small },
  paddingLeft: { paddingLeft: values.space.normal },
  paddingLeftBig: { paddingLeft: values.space.big },

  paddingVerticalSmall: { paddingVertical: values.space.small },
  paddingVertical: { paddingVertical: values.space.normal },
  paddingVerticalBig: { paddingVertical: values.space.big },

  paddingHorizontalSmall: { paddingHorizontal: values.space.small },
  paddingHorizontal: { paddingHorizontal: values.space.normal },
  paddingHorizontalBig: { paddingHorizontal: values.space.big },

  /*
   Text  
   */

  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  boldItalic: { fontWeight: 'bold', fontStyle: 'italic' },

  head1: { fontWeight: 'bold', fontSize: values.fontSize.big },
  head2: { fontWeight: 'bold', fontSize: values.fontSize.normal },
  head3: { fontWeight: 'bold', fontSize: values.fontSize.small },

  sub1: {}, // todo
  sub2: {}, // todo

  label: { opacity: 0.7 },

  link: { color: values.color.secondary, textDecorationLine: 'underline' }
})
