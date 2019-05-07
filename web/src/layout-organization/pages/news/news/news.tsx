import React, { useEffect, useState } from 'react'
import './news.scss'
import NewsCard from '../../../../shared/components/news-card/news-card'
import NewsTemp from '../../../../assets/images/news-temp.jpg'
import axios from 'axios'
import { convertFromRaw } from 'draft-js'
import { Block } from 'gerami'
export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    axios
      .get('/api/news/allnews')
      .then(data => {
        // console.log(data.data)

        let article = ''
        let description = ''
        let title = ''
        //for mapping the stored Editor state in to plain text/string
        for (let d of data.data) {
          JSON.parse(d.article).blocks.map((block: any) => (article += block.text))
          JSON.parse(d.title).blocks.map((block: any) => (title += block.text))
          JSON.parse(d.description).blocks.map(
            (block: any) => (description += block.text)
          )
          d.article = article
          d.title = title
          d.description = description

          article = ''
          description = ''
          title = ''
        }

        setNews(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])
  // todo
  return (
    <div className={'news-list-container'}>
      {news.map((n: any) => (
        <div>
          <NewsCard
            _id={n._id}
            commentCount={n.comments.length}
            imgSrc={`/api/news/${n._id}/pic`}
            title={n.title}
            likeCount={n.likes.length}
            description={n.description}
          />
          <Block />
        </div>
      ))}
    </div>
  )
}

const StaticData = [
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
