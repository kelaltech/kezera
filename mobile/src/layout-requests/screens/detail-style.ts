import { Dimensions, StyleSheet } from 'react-native'

const dimension = Dimensions.get('screen')

export const Style = StyleSheet.create({
  requestImage: {
    width: dimension.width,
    height: 250
  },
  byTitle: {
    color: '#3f51b5',
    fontSize: 18
  },
  requestedTitle: {
    padding: 5,
    fontSize: 18,
    color: '#3f51b5'
  },
  requestedAmount: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  button: {
    alignContent: 'center',
    width: dimension.width / 2
  },
  requestTitle: {
    padding: 5,
    fontSize: 25,
    color: '#3f51b5'
  },
  iconFields: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  description: {
    fontWeight: '100',
    fontSize: 14,
    padding: 10
  },
  inlineBlock: {
    flex: 1,
    flexDirection: 'row'
  }
})
