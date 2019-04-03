import React, { Component, CSSProperties, useEffect, useState } from 'react'

import './news-card.scss'
import { Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export interface INewsCardProps {
  title: string
  likeCount: number
  commentCount: number
  description: string
  imgSrc: string
  _id: string
  style?:CSSProperties
  flex?:CSSProperties
}

function  NewsCard(props: INewsCardProps) {
  const [likeClicked, setLikeClicked] = useState(0)
  let { description, commentCount, likeCount, title, imgSrc, _id, style,flex } = props

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
    <div className={'news-card-container'} style={style}>
      <Content className={'news-card-box'} style={flex}>
        <div
          className={'news-card-image'}
          style={{
            backgroundImage: `url(${imgSrc})`
          }}
        />
        <div className={'news-card-content'}>
          {/*Content*/}
          <div className={'news-card-content-title'}>{title}</div>
          <div className={'news-card-content-desc'}>{description.toString().slice(0,200)}</div>
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
            <span>
              <FontAwesomeIcon icon={['fas', 'share-alt']} />
              &nbsp; Share
            </span>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default NewsCard
