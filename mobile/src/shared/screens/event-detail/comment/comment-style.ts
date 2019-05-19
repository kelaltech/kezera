import { Dimensions, StyleSheet } from 'react-native'

const dimensions = Dimensions.get('screen')
export const style = StyleSheet.create({
  userImage: {
    borderRadius: 50
  },
  commentContainer: {
    margin: 5
  },
  commentDetail: {
    padding: 5,
    flex: 1,
    flexDirection: 'row'
  },
  commentUser: {
    padding: 5
  },
  reply: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  commentMessage: {
    paddingLeft: 40
  },
  messageText: {
    fontSize: 12,
    fontWeight: '200'
  },
  sendButton: {},
  sendButtonContainer: {
    width: 75,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  messageInput: {
    padding: 5
  },
  messageInputText: {
    width: dimensions.width - 80
  },
  viewReplyButton: {
    width: 120
  }
})
