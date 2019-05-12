/*
import React, { useEffect, useState } from 'react'
import { View, Text, Image, Picker, TextInput, TouchableHighlight } from 'react-native'
import {style} from './comment-style'
import { Divider, Button, Icon, Input, Overlay, ListItem } from 'react-native-elements'
import Axios from 'axios'
import { Schema } from 'mongoose'
import { ICommentRequest } from '../../../../../../api/modules/comment/comment.apiv'
import values from '../../../../assets/styles/values'
import { useAccountState } from '../../../../app/stores/account/account-provider'
import { func } from 'prop-types'

const primary=values.color.primary;
const secondary=values.color.secondary;

interface ICommentProps {
  reply?:ICommentRequest
  id?:string
  fetch?:()=>void
  body?:string
}

function AddComment(props:ICommentProps) {
  let [comment,setComment]=useState({
    body:''
  })
  let AddComment=function(){
    if(comment.body.trim()!= ''){
      let formData = new FormData()
      formData.append('body', comment.body)
      formData.append('type', 'EVENT')
      formData.append('TypeId', props.id)
      Axios.post('/api/comment/add', formData)
        .then(()=>{
          if(props.fetch)
            props.fetch()
      })
        .catch(console.error)
    }
  }
  return(
    <View style={{flex:1,flexDirection:"row"}}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={"message..."}
          underlineColorAndroid={"grey"}
          style={style.messageInputText}
          value={comment.body}
          onChangeText={body => setComment({ ...comment, body})}
        />
      </View>
      <View style={style.sendButtonContainer}>
        <Icon
          name={"send"}
          type={"material"}
          color={primary}
          onPress={()=> AddComment() }
          iconStyle={{padding:10}}
        />
      </View>
      <Divider/>
    </View>
  )
}

function EditComment(props:ICommentProps) {
  let [comment,setComment]=useState({
    body:props.body
  })
  let EditComment=function(){
    if(comment.body!=undefined && comment.body.trim()!= ''){
      let formData = new FormData()
      formData.append('body', comment.body)
      Axios.put(`/api/comment/${props.id}`, formData)
        .then(() => {})
        .catch(console.error)
    }
  }

  return(
    <View style={{flex:1,flexDirection:"row"}}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={"message..."}
          underlineColorAndroid={"grey"}
          style={style.messageInputText}
          value={comment.body}
          onChangeText={body => setComment({ ...comment, body})}
        />
      </View>
      <View style={style.sendButtonContainer}>
        <Icon
          name={"send"}
          type={"material"}
          color={primary}
          onPress={()=> EditComment() }
          iconStyle={{padding:10}}
        />
      </View>
      <Divider/>
    </View>
  )
}

export function Comment(props:ICommentProps) {
  let [open,setOpen]=useState(false)
  let [editMessage,setEditMessage]=useState(false)
  let [replyForm,setReplyForm]=useState(false)
  let [comments,setComments]=useState([])
  let [replies,setReplies]=useState([])
  let {account}=useAccountState()
  let FetchComments = function() {
    Axios.get(`/api/event/${props.id}/comments`)
      .then(resp => setComments(resp.data))
      .catch(console.error)
  }

  let FetchReplies = function(id: Schema.Types.ObjectId) {
    Axios.get(`/api/comment/${id}/replies`)
      .then(resp => {
        setReplies(resp.data)
      })
      .catch(console.error)
  }
  let DeletComment=function(id:string){
    // Axios.delete()
  }
  useEffect(()=>{
   FetchComments()
  },[])

  return(
    <View style={style.commentContainer}>
      <AddComment id={props.id} fetch={()=>FetchComments()}/>
      {comments.length != 0?
       <View>
         {comments.map((comment:ICommentRequest,index)=>
         <View key={index}>
          <View style={style.commentDetail}>
            <View style={style.userImage}>
              <Image source={require("../../../../assets/images/event.jpg")} style={{width:40,height:40,borderRadius:50}}/>
            </View>
            <View style={style.commentUser}>
              <Text> {comment.displayName}</Text>
              <Text> 3 min.</Text>
            </View>
            <View  style={style.reply}>
              <Button
                type={'clear'}
                icon={
                  <Icon
                    name="reply"
                    type={'material'}
                    size={15}
                    color={primary}
                  />
                }
                onPress={()=>{
                  setReplyForm(!replyForm)
                }}
              />
              <Text>&nbsp;</Text>
              <Icon
                name={'ellipsis-v'}
                type={'font-awesome'}
                iconStyle={{color:primary,fontWeight:"100"}}
                containerStyle={{paddingTop:10}}
                onPress={()=>{setOpen(!open)}}
               />
               <Overlay onBackdropPress={()=>setOpen(!open)} isVisible={open} width={150} height={'auto'} onDismiss={()=>setOpen(!open)}>
                 <>
                   {comment._by.toString() === account!._id ?
                     <>
                       <ListItem
                         leftIcon={{ name: "edit", color: primary }}
                         title={"Edit"}
                         titleProps={{
                           onPress: () => {
                             setEditMessage(!editMessage);
                             setOpen(!open)
                           }
                         }
                         }
                       />
                     </>
                     : <></>
                   }
                   {comment._by.toString() === account!._id?
                     <>
                       <Divider/>
                       <ListItem
                         leftIcon={{name:"delete",color:secondary}}
                         title={"Delete"}
                         titleProps={{onPress:()=>{
                           }
                         }
                         }
                       />
                     </>:<></>}

                     <Divider/>
                     <ListItem
                       leftIcon={{name:"reply",color:primary}}
                       title={"Report"}
                       titleProps={{onPress:()=>{
                          }
                         }
                       }
                     />
                   <Divider/>
                 </>
               </Overlay>
            </View>
          </View>
           {editMessage?
             <>
               <EditComment id={comment._id} body={comment.body}/>
             </>:
             <>
               <View style={style.commentMessage}>
                 <Text style={style.messageText}>
                   {comment.body}
                 </Text>
               </View>
             </>}

          {comment.replies.length!=0?
            <View style={style.viewReplyButton}>
              <Button title={"View replies"} type={'clear'} onPress={()=>{}}/>
            </View>
          :<></>}
          <View key={index} style={{display:replyForm?"flex":"none", flex:1,flexDirection:"row"}}>
            <View style={style.messageInput}>
              <TextInput
                multiline={true}
                placeholder={"Add reply..."}
                underlineColorAndroid={"grey"}
                style={style.messageInputText}
              />
            </View>
            <View style={style.sendButtonContainer}>
              <Button title={"Send"} style={style.sendButton} titleStyle={{fontSize:12}}/>
            </View>
            <Divider/>
          </View>
        </View>
         )}
      </View>
        :<Text> No comments </Text>}
      <Divider/>
    </View>
  )
}*/

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

interface ICommentProps {
  reply?: ICommentRequest
  id?: string
  fetch?: () => void
  body?: string
}

export function Comment(props: ICommentProps) {
  let [comments, setComments] = useState([])
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
      <AddComment id={props.id} fetch={() => FetchComments} />
      {comments.length != 0 ? (
        <>
          {comments.map((comment: ICommentRequest, index) => (
            <CommentCard
              comment={comment}
              id={props.id!.toString()}
              parentId={comment._id}
            />
          ))}
        </>
      ) : (
        <Text> No Comments </Text>
      )}
    </View>
  )
}
function CommentCard(props: { comment: ICommentRequest; id: string; parentId?: string }) {
  let [reply, setReply] = useState({
    body: ''
  })
  let [replies, setReplies] = useState([])
  let [open, setOpen] = useState(false)
  let [replyForm, setReplyForm] = useState(false)
  let [editMessage, setEditMessage] = useState(false)
  let { account } = useAccountState()

  let HandleReply = function() {
    let formData = new FormData()
    formData.append('body', reply)
    Axios.post(`/api/comment/${props.comment._id}/reply`, formData)
      .then()
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
      .then()
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
          <Text> 3 min.</Text>
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
          <Icon
            name={'ellipsis-v'}
            type={'font-awesome'}
            iconStyle={{ color: values.color.primary, fontWeight: '100' }}
            containerStyle={{ paddingTop: 10 }}
            onPress={() => {
              setOpen(!open)
            }}
          />
          <Overlay
            onBackdropPress={() => setOpen(!open)}
            isVisible={open}
            width={150}
            height={'auto'}
            onDismiss={() => setOpen(!open)}
          >
            <>
              {props.comment._by.toString() === account!._id ? (
                <>
                  <ListItem
                    leftIcon={{ name: 'edit', color: values.color.primary }}
                    title={'Edit'}
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
                    title={'Delete'}
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
                title={'Report'}
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
            <EditComment id={props.comment._id} body={props.comment.body} />
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
            placeholder={'Add reply...'}
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
              HandleReply()
            }}
            iconStyle={{ padding: 10 }}
          />
        </View>
        <Divider />
      </View>
      {props.comment.replies.length != 0 ? (
        <View style={style.viewReplyButton}>
          <Button
            title={'View replies'}
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
        })
        .catch(console.error)
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={'message...'}
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
  let [comment, setComment] = useState({
    body: props.body
  })
  let EditComment = function() {
    if (comment.body != undefined && comment.body.trim() != '') {
      let formData = new FormData()
      formData.append('body', comment.body)
      Axios.put(`/api/comment/${props.id}`, formData)
        .then(() => {})
        .catch(console.error)
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={style.messageInput}>
        <TextInput
          multiline={true}
          placeholder={'message...'}
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
