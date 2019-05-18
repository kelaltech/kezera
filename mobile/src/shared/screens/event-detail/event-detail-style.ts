import { Dimensions, StyleSheet } from 'react-native'
const dimension = Dimensions.get('screen')
const primary = '#3f51b5'

export const eventDetailStyle = StyleSheet.create({
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  toggleLike: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: -30,
    marginRight: 5,
    padding: 13,
    backgroundColor: primary
  },
  eventImage: {
    width: dimension.width,
    height: 150
  },
  eventTitle: {
    padding: 5,
    fontSize: 25,
    color: '#3f51b5'
  },
  iconFields: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  eventDescription: {
    fontWeight: '100',
    fontSize: 11,
    padding: 5
  },
  eventAttendText: {
    paddingTop: 8,
    color: primary,
    fontWeight: 'bold'
  },
  eventAttendSwitch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  inlineBlock: {
    flex: 1,
    flexDirection: 'row'
  },
  commentText: {
    fontSize: 16,
    color: primary,
    padding: 5
  }
})
