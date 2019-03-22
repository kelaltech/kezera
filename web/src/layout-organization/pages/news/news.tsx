import React from 'react'
import { Block, Content, Page, Yoga } from 'gerami'

import NewsCard from '../../../shared/components/news-card/news-card'
import NewsTemp from '../../../assets/images/news-temp.jpg'
import NewsAdd from '../../components/news-add/news-add'

export default function News() {
  // todo
  return (
    <Page>
      {/* <Content>
        <NewsAdd />
      </Content>*/}

      <NewsAdd />
      {/*<Yoga maxCol={2}>
        {data.map(news => (
          <NewsCard
            commentCount={news.commentCount}
            imgSrc={news.imgSrc}
            title={news.title}
            likeCount={news.likeCount}
            description={news.description}
          />
        ))}
      </Yoga>*/}
    </Page>
  )
}

const data = [
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  },
  {
    title:
      'Notre Dame, Mississippi State, Louisville and Baylor earn top seeds in NCAA\n' +
      '              women’s tournament',
    description:
      'The president has promised 3 percent growth for the next decade, but a new\n' +
      '              report indicates that won’t happen without a big infrastructure bill, more\n' +
      '              tax cuts and additional deregulation, the House.',
    imgSrc: `${NewsTemp}`,
    likeCount: 192,
    commentCount: 30
  }
]
