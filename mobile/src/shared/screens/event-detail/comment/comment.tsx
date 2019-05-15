import { TextInput, View, Text, Image } from 'react-native'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import {
  ICommentRequest,
  ICommentResponse
} from '../../../../../../api/modules/comment/comment.apiv'
import { style } from './comment-style'
import { Button, Divider, Icon, ListItem, Overlay } from 'react-native-elements'
import values from '../../../../assets/styles/values'
import React from 'react'
import { useAccountState } from '../../../../app/stores/account/account-provider'
import { Schema } from 'mongoose'
import useLocale from '../../../hooks/use-locale/use-locale'

interface ICommentProps {
  reply?: ICommentRequest
  id?: string
  fetch?: () => void
  body?: string
  onChange?: () => void
}

function getDate(d: any) {
  var now = new Date()
  var date: any = new Date('' + d)
  var output = ''
  var difference = 0
  if (date.getFullYear() === now.getFullYear()) {
    if (date.getMonth() === now.getMonth()) {
      if (date.getDay() === now.getDay()) {
        if (date.getHours() === now.getHours()) {
          if (date.getMinutes() === now.getMinutes()) {
            output = now.getSeconds() + ' seconds ago'
          } else {
            difference = date.getMinutes() - now.getMinutes()
            output = (difference < 1 ? -1 * difference : difference) + ' minutes ago'
          }
        } else {
          difference = date.getHours() - now.getHours()
          output = (difference < 1 ? -1 * difference : difference) + ' hours ago'
        }
      } else {
        difference = date.getDate() - now.getDate()
        output = (difference < 1 ? -1 * difference : difference) + ' days ago'
      }
    } else {
      difference = date.getMonth() - now.getMonth()
      output = (difference < 1 ? -1 * difference : difference) + ' month ago'
    }
  } else {
    difference = date.getFullYear() - now.getFullYear()
    output = (difference < 1 ? -1 * difference : difference) + ' years ago'
  }
  console.log(output)
  return output
}

export function Comment(props: ICommentProps) {
  let [comments, setComments] = useState([])
  const { loading, t } = useLocale(['event'])

  let FetchComments = function() {
    Axios.get(`/api/event/${props.id}/comments`)
      .then(resp => setComments(resp.data))
      .catch(console.error)
  }

  useEffect(() => {
    FetchComments()
  }, [])

  return (
    <View>
      <AddComment id={props.id} fetch={FetchComments} />
      {comments.length != 0 ? (
        <>
          {comments.map((comment: ICommentRequest, index) => (
            <CommentCard
              comment={comment}
              id={props.id!.toString()}
              parentId={comment._id}
              fetch={FetchComments}
            />
          ))}
        </>
      ) : (
        <Text> {t`no comments`} </Text>
      )}
    </View>
  )
}

function CommentCard(props: {
  comment: ICommentRequest
  id: string
  parentId?: string
  fetch?: () => void
}) {
  let [reply, setReply] = useState({
    body: ''
  })
  const { loading, t } = useLocale(['event'])
  let [replies, setReplies] = useState([])
  let [open, setOpen] = useState(false)
  let [replyForm, setReplyForm] = useState(false)
  let [editMessage, setEditMessage] = useState(false)
  let { account } = useAccountState()

  let HandleReply = function(id: string) {
    let formData = new FormData()
    formData.append('body', reply)
    Axios.post(`/api/comment/${props.comment._id}/reply`, formData)
      .then(() => FetchReplies(id))
      .catch(console.error)
  }

  let FetchReplies = function(id: string) {
    Axios.get(`/api/comment/${id}/replies`)
      .then(resp => {
        setReplies(resp.data)
      })
      .catch(console.error)
  }

  let handleDelete = function(id: Schema.Types.ObjectId) {
    Axios.delete(
      `/api/comment/${id}/${'EVENT'}/${props.id}/${
        props.parentId ? props.parentId : `NULL`
      }`
    )
      .then(() => {
        if (props.fetch) props.fetch()
      })
      .catch()
  }

  return (
    <View>
      <View style={style.commentDetail}>
        <View style={style.userImage}>
          <Image
            source={require('../../../../assets/images/event.jpg')}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </View>
        <View style={style.commentUser}>
          <Text> {props.comment.displayName}</Text>
          <Text> {getDate(props.comment._at)} </Text>
        </View>
        <View style={style.reply}>
          <Button
            type={'clear'}
            icon={
              <Icon
                name="reply"
                type={'material'}
                size={15}
                color={values.color.primary}
              />
            }
            onPress={() => {
              setReplyForm(!replyForm)
            }}
          />
          <Text>&nbsp;</Text>
          <Button
            type={'clear'}
            icon={
              <Icon
                name={'ellipsis-v'}
                type={'font-awesome'}
                iconStyle={{ color: values.color.primary, fontWeight: '100' }}
              />
            } // containerStyle={{ paddingTop: 10,paddingRight:10}}
            onPress={() => {
              setOpen(!open)
            }}
          />
          <Overlay
            onBackdropPress={() => setOpen(!open)}
            isVisible={open}
            width={165}
            height={'auto'}
            onDismiss={() => setOpen(!open)}
          >
            <>
              {props.comment._by.toString() === account!._id ? (
                <>
                  <ListItem
                    leftIcon={{ name: 'edit', color: values.color.primary }}
                    title={t`edit`}
                    titleProps={{
                      onPress: () => {
                        setEditMessage(!editMessage)
                        setOpen(!open)
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {props.comment._by.toString() === account!._id ? (
                <>
                  <Divider />
                  <ListItem
                    leftIcon={{ name: 'delete', color: values.color.secondary }}
                    title={t`delete`}
                    titleProps={{
                      onPress: () => {
                        handleDelete(props.comment._id)
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Divider />
              <ListItem
                leftIcon={{ name: 'reply', color: values.color.primary }}
                title={t`report`}
                titleProps={{ onPress: () => {} }}
              />
              <Divider />
            </>
          </Overlay>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {editMessage ? (
          <>
            <EditComment
              id={props.comment._id}
              body={props.comment.body}
              fetch={() => {
                if (props.fetch) props.fetch()
              }}
              onChange={() => setEditMessage(!editMessage)}
            />
          </>
        ) : (
          <>
            <View style={style.commentMessage}>
              <Text style={style.messageText}>{props.comment.body}</Text>
            </View>
          </>
        )}
      </View>

      <View
        style={{ display: replyForm ? 'flex' : 'none', flex: 1, flexDirection: 'row' }}
      >
        <View style={style.messageInput}>
          <TextInput
            multiline={true}
            placeholder={t`add reply`}
            underlineColorAndroid={'grey'}
            style={style.messageInputText}
            onChangeText={body => setReply({ ...reply, body })}
          />
        </View>
        <View style={style.sendButtonContainer}>
          <Icon
            name={'send'}
            type={'material'}
            color={values.color.primary}
            onPress={() => {
              HandleReply(props.comment._id)
            }}
            iconStyle={{ padding: 10 }}
          />
        </View>
        <Divider />
      </View>
      {props.comment.replies.length != 0 ? (
        <View style={style.viewReplyButton}>
          <Button
            title={t`view replies`}
            type={'clear'}
            onPress={() => {
              FetchReplies(props.comment._id)
            }}
          />
        </View>
      ) : (
        <></>
      )}
      {replies.length > 0 ? (
        <>
          {replies.map((rep: ICommentRequest) => (
            <CommentCard comment={rep} id={props.id} parentId={props.comment._id} />
          ))}
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

function AddComment(props: ICommentProps) {
  const { loading, t } = useLocale(['event'])
  let [comment, setComment] = useState({
    body: ''
  })
  let AddComment = function() {
    if (comment.body.trim() != '') {
      let formData = new FormData()
      formData.append('body', comment.body)
      formData.append('type', 'EVENT')
      formData.append('TypeId', props.id)
      Axios.post('/api/comment/add', formData)
        .then(() => {
          if (props.fetch) props.fetch()
          setComment({ body: '' })
        })
        .catch(console.error)
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={t`message`}
          underlineColorAndroid={'grey'}
          style={style.messageInputText}
          value={comment.body}
          onChangeText={body => setComment({ ...comment, body })}
        />
      </View>
      <View style={style.sendButtonContainer}>
        <Icon
          name={'send'}
          type={'material'}
          color={values.color.primary}
          onPress={() => AddComment()}
          iconStyle={{ padding: 10 }}
        />
      </View>
      <Divider />
    </View>
  )
}

function EditComment(props: ICommentProps) {
  const { loading, t } = useLocale(['event'])
  let [comment, setComment] = useState({
    body: props.body
  })
  let EditComment = function() {
    if (comment.body != undefined && comment.body.trim() != '') {
      let formData = new FormData()
      formData.append('body', comment.body)
      Axios.put(`/api/comment/${props.id}`, formData)
        .then(() => {
          if (props.fetch) props.fetch()
          if (props.onChange) props.onChange()
        })
        .catch(console.error)
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={t`message`}
          underlineColorAndroid={'grey'}
          style={style.messageInputText}
          value={comment.body}
          onChangeText={body => setComment({ ...comment, body })}
        />
      </View>
      <View style={style.sendButtonContainer}>
        <Icon
          name={'send'}
          type={'material'}
          color={values.color.primary}
          onPress={() => EditComment()}
          iconStyle={{ padding: 10 }}
        />
      </View>
      <Divider />
    </View>
  )
}
