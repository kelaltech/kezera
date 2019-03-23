import React, { Component } from 'react'

import './news-card.scss'
import { Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface INewsCardProps {
  className?: string
  title: string
  likeCount: number
  commentCount: number
  description: string
  imgSrc: string
}

export default class NewsCard extends Component<INewsCardProps, {}> {
  render() {
    const { description, className, commentCount, likeCount, title, imgSrc } = this.props
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
              <span>
                <FontAwesomeIcon icon={['fas', 'heart']} />
                &nbsp; {likeCount == 0 ? '' : likeCount}
              </span>
              <span>{commentCount == 0 ? '' : commentCount} comments</span>
            </div>
            <div className={'news-card-content-actions'}>
              {/*action*/}
              <span onClick={this.handleLike}>
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

  handleLike = () => {
    //send request to the back and push the userId to the like array
  }
}
