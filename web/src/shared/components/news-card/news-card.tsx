import React, { Component, useEffect, useState } from 'react'

import './news-card.scss'
import { Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { withRouter } from 'react-router'

export interface INewsCardProps {
  title: string
  likeCount: number
  commentCount: number
  description: string
  imgSrc: string
}

function NewsCard(props: INewsCardProps) {
  const [likeClicked, setLikeCliked] = useState('')
  const { description, commentCount, likeCount, title, imgSrc } = props

  const handleClick = () => {
    /*  axios
      .put(`/api/news/${h}/like`)
      .then(data => {
        this.setState({
          likeCount: data.data.likes
        })
      })
      .catch(e => {
        console.log(e)
      })*/
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
          <div className={'news-card-content-title'}>{title}</div>
          <div className={'news-card-content-desc'}>{description}</div>
          <div className={'news-card-content-stat'}>
            <span onClick={handleClick}>
              <FontAwesomeIcon icon={['fas', 'heart']} />
              &nbsp; {likeCount == 0 ? '' : likeCount}
            </span>
            <span>{commentCount == 0 ? '' : commentCount} comments</span>
          </div>
          <div className={'news-card-content-actions'}>
            {/*action*/}
            <span>
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

  /* handleLike = () => {
    const { match } = this.props
    //send request to the back
    axios
      .put(`/api/news/${match.params._id}/like`)
      .then(data => {
        this.setState({
          likeCount: data.data.likes
        })
      })
      .catch(e => {
        console.log(e)
      })
  }*/
}

export default NewsCard
