import React, { Component } from 'react'

import './news-card.scss'
import { Content } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewsTemp from '../../../assets/images/news-temp.jpg'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export default class NewsCard extends Component<{}, {}> {
  render() {
    return (
      <div className={'news-card-container'}>
        <Content className={'news-card-box'}>
          <div
            className={'news-card-image'}
            style={{
              backgroundImage: `url(${NewsTemp})`
            }}
          >
            {/*image goes here*/}
          </div>
          <div className={'news-card-content'}>
            {/*Content*/}
            <div className={'news-card-content-title'}>
              Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA
              women’s tournament
            </div>
            <div className={'news-card-content-desc'}>
              The president has promised 3 percent growth for the next decade, but a new
              report indicates that won’t happen without a big infrastructure bill, more
              tax cuts and additional deregulation, the House.
            </div>
            <div className={'news-card-content-stat'}>
              <span>
                <FontAwesomeIcon icon={['fas', 'heart']} />
                &nbsp; 12
              </span>
              <span>30 comments</span>
            </div>
            <div className={'news-card-content-actions'}>
              {/*action*/}
              <span>
                <FontAwesomeIcon icon={['far', 'heart']} />
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
}
