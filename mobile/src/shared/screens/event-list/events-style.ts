import { StyleSheet } from 'react-native'

export const eventStyle = StyleSheet.create({
  sections: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3f51b5',
    margin: 5
  },
  sectionTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewMoreButton: {
    paddingTop: 10,
    paddingRight: 5,
    fontSize: 11,
    textDecorationLine: 'underline'
  }
})
