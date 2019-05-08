import React from 'react'
import { useEffect, useState } from 'react'
import { Block } from 'gerami'
import axios from 'axios'
import NewsCard from '../../../../../shared/components/news-card/news-card'
interface INewsResult {
  term?: string
}
function NewsSearchResult(props: INewsResult) {
  const { term } = props
  const [news, setNews] = useState([])

  useEffect(() => {
    console.log(`/api/news/search?term=${term}`)
    axios
      .get(`/api/news/search?term=${term}`)
      .then((news: any) => {
        setNews(news.data)
        console.log(news.data)
      })
      .catch((e: any) => console.log(e))
  }, [])
  return (
    <div>
      <h2>News Search result</h2>

      <div>
        {news.map((n: any) => (
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
