import React, { PropsWithChildren, useEffect, useState } from 'react'
import Axios from 'axios'
import qs from 'qs'
import { socket } from '../../../../../app/app'
import { Block, Button, Content, TextArea, Title } from 'gerami'
import './comment-tab.scss'

export default function CommentTab({ _id }: { _id: string }) {
  let [comments, setComments] = useState([])

  let handleComment = function(e: any) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('body', e.target.body.value)
    formData.append('type', 'NEWS')
    formData.append('TypeId', _id)
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
    Axios.get(`/api/news/${_id}/comments`)
      .then(resp => {
        setComments(resp.data)
      })
      .catch(console.error)
  }

  useEffect(() => {
    ListenSocket()
    FetchComments()
  }, [])
  return (
    <div className={'comment-tab-container'}>
      <Content className={'comment-add-component'}>
        <form onSubmit={e => handleComment(e)}>
          <div className={'news-comment-add-cont'}>
            <TextArea
              className={'full-width news-comment'}
              name={'body'}
              placeholder={'Add a comment...'}
            />
            <div className={'btn-add-c'}>
              <Button type="submit"> Send </Button>
            </div>
          </div>
        </form>
      </Content>

      <div>
        <Title size={'3XL'}> Comments </Title>
        {/*
        {comments.length > 0 ? (
          <>
            {comments.map((comment: any) => (
              <Comment
                Type={'NEWS'}
                TypeId={match.params._id}
                comment={comment}
                ParentId={comment._id}
              />
            ))}
          </>
        ) : (
          'No comments'
        )}*/}
      </div>
    </div>
  )
}
