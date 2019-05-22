import React, { useState } from 'react'
import { Content, Block, TextArea, Button, Title } from 'gerami'
import Comment from '../../../components/comment/comment'
import Axios from 'axios'
import { useEffect } from 'react'
import { socket } from '../../../../app/app'
import useLocale from '../../../hooks/use-locale/use-locale'
import { useAccountState } from '../../../../app/stores/account/account-provider'

export default function Comments(props: any) {
  /*let [comments, setComments] = useState([])
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
  )*/
}
