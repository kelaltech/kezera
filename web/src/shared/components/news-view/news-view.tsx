import React from 'react'
import './news-view.scss'
import newsTemp from '../../../assets/images/news-temp.jpg'
import NewsTabs from './components/news-view-tab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class NewsView extends React.Component<{}, {}> {
  render() {
    return (
      <div className={'news-view-container'}>
        <div className={'news-view'}>
          <div
            className={'news-view-img'}
            style={{
              backgroundImage: `url(${newsTemp})`
            }}
          />
          <div className={'news-view-detail-container'}>
            <div className={'news-view-title'}>
              {
                'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA women’s tournament'
              }
            </div>
            <div className={'news-view-description'}>
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
            </div>
            <hr />
            <div className={'new-view-action-container'}>
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
            <div className={'news-view-article'}>
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
              {
                'The president has promised 3 percent growth for the next decade, but a new report indicates that won’t happen without a big infrastructure bill, more  tax cuts and additional deregulation, the House.'
              }
            </div>
          </div>
        </div>
        <div className={'news-view-stat'}>
          <NewsTabs />
        </div>
      </div>
    )
  }
}
