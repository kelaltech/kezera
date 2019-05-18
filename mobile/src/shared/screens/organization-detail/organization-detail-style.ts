import { StyleSheet } from 'react-native'
import values from '../../../assets/styles/values'

export const style = StyleSheet.create({
  paddingMedium: {
    padding: 10
  },
  paddingTopMeduim: {
    paddingTop: 10
  },
  paddingBottomMeduim: {
    paddingBottom: 10
  },
  contact: {
    flex: 1,
    flexDirection: 'row',
    // alignContent:'center'
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: values.color.primary
  },
  inline: {
    flex: 1,
    flexDirection: 'row'
  },
  nameContainer: {
    padding: 10
  },
  descriptionContainer: {
    // flex:1,
    // flexDirection:'row',
    padding: 5
  },
  subscribedButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 100,
    padding: 5
  }
})
