import React, { useState, useEffect } from 'react'
import './comment.scss'
import {
  Button,
  Content,
  Block,
  Image,
  Title,
  MenuDrop,
  MenuItem,
  TextArea
} from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { Schema } from 'mongoose'
import { socket } from '../../../app/app'
import { ICommentRequest } from '../../../apiv/comment.apiv'

interface ICommentProps {
  ParentId: Schema.Types.ObjectId
  Type: String
  TypeId: String | Schema.Types.ObjectId
  comment: ICommentRequest // Change these any
}

export default function Comment(props: ICommentProps) {
  let [comments, setComments] = useState([])
  let [open, setOpen] = useState(false)
  let [reply, setReply] = useState(false)
  let [replies, setReplies] = useState([])
  let [edit, setEdit] = useState(false)

  useEffect(() => {
    ListenSocket()
  }, [])

  let ListenSocket = function() {
    socket.on('CommentAltered', function() {
      FetchReplies(props.comment._id)
    })
  }

  let handleReply = function(e: any) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('body', e.target.body.value)
    Axios.post(`/api/comment/${props.comment._id}/reply`, formData)
      .then(() => {
        FetchReplies(props.ParentId)
      })
      .catch(console.error)
  }

  let handleDelete = function(id: Schema.Types.ObjectId) {
    Axios.delete(
      `/api/comment/${id}/${props.Type}/${props.TypeId}/${
        props.ParentId ? props.ParentId : `NULL`
      }`
    )
      .then(() => {
        FetchReplies(props.ParentId)
        socket.emit('CommentAltered')
        socket.emit('CommentDeleted')
      })
      .catch()
  }

  let handleEdit = function(e: any, id: Schema.Types.ObjectId) {
    e.preventDefault()
    setEdit(false)
    let formData = new FormData()
    formData.append('body', e.target.body.value)
    Axios.put(`/api/comment/${id}`, formData)
      .then(() => {
        socket.emit('CommentAltered')
        FetchReplies(props.ParentId)
      })
      .catch(console.error)
  }

  let FetchReplies = function(id: Schema.Types.ObjectId) {
    Axios.get(`/api/comment/${id}/replies`)
      .then(resp => {
        setReplies(resp.data)
      })
      .catch(console.error)
  }

  let GetDate = function(date: Date) {
    let D = new Date(date)
    let now = new Date()
    let returnDate = '2 hours ago'
    return returnDate
  }

  return (
    <Content
      transparent
      className="margin-left-normal margin-left-normal flex CommentContainer middle inline-block"
    >
      <Block className="flex CommentHead inline-block">
        <div className={'middle inline-block'}>
          <Image
            src={
              'https://helpx.adobe.com/in/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg'
            }
            className={'inline-block  CommentImage'}
          />
          &emsp;
        </div>
        <div className={'middle inline-block'}>
          <div>
            <Title className={'CommentName middle'}>
              {' '}
              <b>{props.comment.displayName}</b>{' '}
            </Title>
          </div>
          <div>
            <span className={'font-S'}>
              {' '}
              <i> {GetDate(props.comment._at)} </i>{' '}
            </span>
          </div>
        </div>
        <div className={'inline-block right'}>
          <Button onClick={() => setReply(!reply)} className={'ActionButtons'}>
            {' '}
            <FontAwesomeIcon icon={'reply'} /> &nbsp; Reply
          </Button>
          &emsp;
          <button onClick={() => setOpen(!open)} className={'ActionButtons'}>
            <FontAwesomeIcon size={'1x'} icon={'ellipsis-v'} />
          </button>
          <MenuDrop open={open} onClose={() => setOpen(false)}>
            <MenuItem>
              {' '}
              <Button
                onClick={() => {
                  setEdit(true)
                  setOpen(false)
                }}
                className="ActionButtons"
              >
                {' '}
                <FontAwesomeIcon icon={'pencil-alt'} /> &nbsp; Edit{' '}
              </Button>{' '}
            </MenuItem>
            <MenuItem>
              {' '}
              <Button className="ActionButtons">
                {' '}
                <FontAwesomeIcon icon={'reply'} /> &nbsp; Report{' '}
              </Button>{' '}
            </MenuItem>
            <MenuItem>
              {' '}
              <Button
                className="ActionButtons"
                onClick={() => {
                  setOpen(false)
                  handleDelete(props.comment._id)
                }}
              >
                {' '}
                <FontAwesomeIcon icon={'trash'} /> &nbsp; Delete{' '}
              </Button>{' '}
            </MenuItem>
          </MenuDrop>
        </div>
      </Block>
      <Block className={'CommentMessage'}>
        {edit ? (
          <>
            <form onSubmit={e => handleEdit(e, props.comment._id)}>
              <TextArea
                className="full-width"
                defaultValue={props.comment.body}
                name="body"
              />
              <div className="right">
                <Button type="submit"> Update </Button>
                &emsp;
                <Button onClick={() => setEdit(false)}> Cancel </Button>
              </div>
            </form>
          </>
        ) : (
          props.comment.body
        )}
      </Block>
      {props.comment.replies.length > 0 ? (
        <div>
          <Button
            onClick={() => FetchReplies(props.comment._id)}
            className={'margin-small ActionButtons LeftPadding'}
          >
            View replies
          </Button>
        </div>
      ) : (
        ''
      )}
      <Block style={{ display: reply ? 'block' : 'none' }}>
        <form onSubmit={e => handleReply(e)}>
          <TextArea className={'full-width'} name={'body'} placeholder={'message...'} />
          <Block className={'right'}>
            <Button type="submit" onClick={() => setReply(false)}>
              {' '}
              Send{' '}
            </Button>
            &emsp;
            <Button onClick={() => setReply(false)}> Cancel </Button>
          </Block>
        </form>
      </Block>
      {replies.length > 0 ? (
        <>
          {replies.map((rep: any) => (
            <Comment
              Type={'REPLY'}
              TypeId={'REPLY'}
              comment={rep}
              ParentId={props.comment._id}
            />
          ))}
        </>
      ) : (
        ''
      )}
    </Content>
  )
}
