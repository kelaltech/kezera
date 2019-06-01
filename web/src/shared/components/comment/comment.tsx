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
// import { Menu } from '@material-ui/core'
import useLocale from '../../hooks/use-locale/use-locale'
import { useAccountState } from '../../../app/stores/account/account-provider'
import SpamReportDrop from '../spam-report-drop/spam-report-drop'

interface ICommentProps {
  ParentId: Schema.Types.ObjectId
  Type: String
  TypeId: String | Schema.Types.ObjectId
  comment: ICommentRequest // Change these any
}

function getDate(d: any) {
  let { t } = useLocale(['comment'])
  var now = new Date()
  var date: any = new Date('' + d)
  var output = ''
  var difference = 0
  if (date.getFullYear() === now.getFullYear()) {
    if (date.getMonth() === now.getMonth()) {
      if (date.getDay() === now.getDay()) {
        if (date.getHours() === now.getHours()) {
          if (date.getMinutes() === now.getMinutes()) {
            output = now.getSeconds() + ' ' + t`seconds ago`
          } else {
            difference = date.getMinutes() - now.getMinutes()
            output =
              (difference < 1 ? -1 * difference : difference) + ' ' + t`minutes ago`
          }
        } else {
          difference = date.getHours() - now.getHours()
          output = (difference < 1 ? -1 * difference : difference) + ' ' + t`hours ago`
        }
      } else {
        difference = date.getDate() - now.getDate()
        output = (difference < 1 ? -1 * difference : difference) + ' ' + t`days ago`
      }
    } else {
      difference = date.getMonth() - now.getMonth()
      output = (difference < 1 ? -1 * difference : difference) + ' ' + t`month ago`
    }
  } else {
    difference = date.getFullYear() - now.getFullYear()
    output = (difference < 1 ? -1 * difference : difference) + ' ' + t`years ago`
  }
  console.log(output)
  return output
}

export default function CommentComponent(props: any) {
  let [comments, setComments] = useState([])
  let { t } = useLocale(['event'])
  let handleComment = function(e: any) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('body', e.target.body.value)
    formData.append('type', 'EVENT')
    formData.append('TypeId', props._id)
    Axios.post('/api/comment/add', formData)
      .then(() => {
        socket.emit('CommentAdded')
      })
      .catch(console.error)
  }

  let ListenSocket = function() {
    socket.on('COMMENT_ADDED', function() {
      alert('comment altered')
      FetchComments()
    })

    socket.on('CommentDeleted', function() {
      FetchComments()
    })
  }

  let FetchComments = function() {
    Axios.get(`/api/event/${props._id}/comments`)
      .then(resp => setComments(resp.data))
      .catch(console.error)
  }

  useEffect(() => {
    ListenSocket()
    FetchComments()
  }, [])
  return (
    <>
      <Content className={' padding-normal'}>
        <form onSubmit={e => handleComment(e)}>
          <TextArea className={'full-width'} name={'body'} placeholder={t`message`} />
          <Block className={'right'}>
            <Button type="submit"> {t`send`} </Button>
          </Block>
        </form>
      </Content>
      <div>
        <Title size={'3XL'}> {t`comments`} </Title>
        {comments.length > 0 ? (
          <>
            {comments.map((comment: any) => (
              <Comment
                Type={'EVENT'}
                TypeId={props._id}
                comment={comment}
                ParentId={comment._id}
              />
            ))}
          </>
        ) : (
          <>{t`no comments`}</>
        )}
      </div>
    </>
  )
}

function Comment(props: ICommentProps) {
  let [open, setOpen] = useState(false)
  let [isSpamReportDropOpen, setIsSpamReportDropOpen] = useState(false)
  let [reply, setReply] = useState(false)
  let { loading, t } = useLocale(['event'])
  let { account } = useAccountState()
  let [replies, setReplies] = useState([])
  let [edit, setEdit] = useState(false)

  useEffect(() => {
    ListenSocket()
  }, [])

  let ListenSocket = function() {
    socket.on('CommentAltered', function() {
      FetchReplies(props.comment._id)
    })
    socket.on('Replied', function() {
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
        socket.emit('CommentReply')
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
              <i> {getDate(props.comment._at)} </i>{' '}
            </span>
          </div>
        </div>
        <div className={'inline-block right'}>
          <Button onClick={() => setReply(!reply)} className={'ActionButtons'}>
            {' '}
            <FontAwesomeIcon icon={'reply'} /> &nbsp; {t`reply`}
          </Button>
          &emsp;
          <button onClick={() => setOpen(!open)} className={'ActionButtons'}>
            <FontAwesomeIcon size={'1x'} icon={'ellipsis-v'} />
          </button>
          <MenuDrop open={open} onClose={() => setOpen(false)}>
            {account!._id === props.comment._by.toString() ? (
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
                  <FontAwesomeIcon icon={'pencil-alt'} /> &nbsp; {t`edit`}{' '}
                </Button>{' '}
              </MenuItem>
            ) : (
              ''
            )}
            {account!._id === props.comment._by.toString() ? (
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
                  <FontAwesomeIcon icon={'trash'} /> &nbsp; {t`delete`}{' '}
                </Button>{' '}
              </MenuItem>
            ) : (
              ''
            )}
            <MenuItem>
              {' '}
              <Button
                onClick={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
                className="ActionButtons"
              >
                {' '}
                <FontAwesomeIcon icon={'reply'} /> &nbsp; Report
              </Button>{' '}
            </MenuItem>
          </MenuDrop>
          <SpamReportDrop
            type={'ORGANIZATION'}
            ids={[props.comment._id]}
            open={isSpamReportDropOpen}
            onClose={() => setIsSpamReportDropOpen(!isSpamReportDropOpen)}
          />
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
                <Button type="submit"> {t`update`} </Button>
                &emsp;
                <Button onClick={() => setEdit(false)}> {t`cancel`} </Button>
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
            {t`view replies`}
          </Button>
        </div>
      ) : (
        ''
      )}
      <Block style={{ display: reply ? 'block' : 'none' }}>
        <form onSubmit={e => handleReply(e)}>
          <TextArea className={'full-width'} name={'body'} placeholder={t`add reply`} />
          <Block className={'right'}>
            <Button type="submit" onClick={() => setReply(false)}>
              {' '}
              {t`send`}{' '}
            </Button>
            &emsp;
            <Button onClick={() => setReply(false)}> {t`cancel`} </Button>
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

let CommentMenu = function(props: { open: boolean; onClose: () => void }) {
  return <div />
}
