import React, { CSSProperties, useState } from 'react'

import './news-card.scss'
import { Anchor, Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import ShareListDialog from '../share-list-dialog/share-list-dialog'

export interface INewsCardProps {
  title: string
  likeCount: number
  commentCount: number
  description: string
  imgSrc: string
  _id: string | number | any
  style?: CSSProperties
  flex?: CSSProperties
}

function NewsCard(props: INewsCardProps) {
  const [likeClicked, setLikeClicked] = useState(0)
  let { description, commentCount, likeCount, title, imgSrc, _id } = props

  const [shareListPicker, setShareListPicker] = useState(false)
  function handleClick() {
    axios
      .put(`/api/news/${_id}/like`)
      .then(data => {
        setLikeClicked(data.data.likes)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className={'news-card-container'}>
      <Content className={'news-card-box'}>
        <div
          className={'news-card-image'}
          style={{
            backgroundImage: `url(${imgSrc})`
          }}
        />
        <div className={'news-card-content'}>
          {/*Content*/}
          <Anchor to={`/news/${_id}`} className={'news-title-anchor'}>
            <div className={'news-card-content-title'}>{title}</div>
          </Anchor>
          <div className={'news-card-content-desc'}>
            {description.toString().slice(0, 200)}
          </div>
          <div className={'news-card-content-stat'}>
            <span>
              <FontAwesomeIcon icon={['fas', 'heart']} />
              &nbsp; {likeCount == 0 ? '' : likeCount}
              {likeClicked === 0 ? '' : ' you liked this'}
            </span>
            <span>{commentCount == 0 ? '' : commentCount} comments</span>
          </div>
          <div className={'news-card-content-actions'}>
            {/*action*/}
            <span onClick={handleClick}>
              <FontAwesomeIcon className={'ico'} icon={['far', 'heart']} />
              &nbsp; Like
            </span>
            <span>
              <FontAwesomeIcon icon={['far', 'comment-alt']} />
              &nbsp; Comment
            </span>
            <span onClick={() => setShareListPicker(!shareListPicker)}>
              <FontAwesomeIcon icon={['fas', 'share-alt']} />
              &nbsp; Share
            </span>
            <ShareListDialog
              open={shareListPicker}
              onClose={() => setShareListPicker(!shareListPicker)}
              title={title}
              shareUrl={`http://localhost:3000/news/${_id}`}
            />
          </div>
        </div>
      </Content>
    </div>
  )
}

export default NewsCard
