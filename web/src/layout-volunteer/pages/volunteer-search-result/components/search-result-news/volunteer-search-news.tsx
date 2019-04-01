import React from 'react'
import { useEffect, useState } from 'react'
import { Block } from 'gerami'
import NewsCard from '../../../../../shared/components/news-card/news-card'

function NewsSearchResult() {
  const [news, setNews] = useState([])

  useEffect(() => {
    //fetch search result from back
  }, [])
  return (
    <div>
      <h1>News Search result</h1>

      <div>
        {Data.map(n => (
          <Block>
            <NewsCard
              title={n.title}
              likeCount={n.likeCount}
              commentCount={n.commentCount}
              description={n.description}
              imgSrc={n.imgSrc}
              _id={n.id}
            />
          </Block>
        ))}
      </div>
    </div>
  )
}
export default NewsSearchResult

const Data = [
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/300/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/200/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/400/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A ipsum impedit odit incidunt. Delectus alias nihil minus  ab eligendi nemo earum tempora! Recusandae neque quia error  commodi tempore earum similique? ',
    imgSrc: 'https://picsum.photos/300/300/?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/500?random',
    id: 'id'
  },
  {
    title: 'Random image',
    likeCount: 12,
    commentCount: 223,
    description: 'Get a random image by appending ?random to the end of the url.',
    imgSrc: 'https://picsum.photos/300/200/?random',
    id: 'id'
  }
]
