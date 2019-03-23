import React from 'react'
import { Yoga } from 'gerami'

import NewsCard from '../../../shared/components/news-card/news-card'
import NewsTemp from '../../../assets/images/news-temp.jpg'

export default function News() {
  // todo
  return (
    <div>
      <Yoga maxCol={2}>
        {data.map(news => (
          <NewsCard
            commentCount={news.commentCount}
            imgSrc={news.imgSrc}
            title={news.title}
            likeCount={news.likeCount}
            description={news.description}
          />
        ))}
      </Yoga>
    </div>
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
