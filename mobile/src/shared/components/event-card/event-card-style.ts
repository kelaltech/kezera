import { Dimensions, StyleSheet } from 'react-native'

const dimension = Dimensions.get('window')

export default StyleSheet.create({
  eventCardContainer: {},
  eventCardImage: {
    width: dimension.width - 20,
    height: 200,
    borderRadius: 5
  },
  eventTitle: {
    fontSize: 20,
    color: '#3f51b5'
  },
  eventDescription: {
    fontSize: 12,
    fontWeight: '100'
  },
  eventActionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  eventFields: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  fontSmall: {
    fontSize: 10,
    fontStyle: 'italic'
  }
})
