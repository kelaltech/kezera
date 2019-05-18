import React from 'react'
import { useEffect, useState } from 'react'
import { Block, Yoga } from 'gerami'
import axios from 'axios'
import NewsCard from '../../../../../shared/components/news-card/news-card'
import { richTextToDisplayText } from '../../../../../lib/richTextConverter'
interface INewsResult {
  term?: string
}
function NewsSearchResult(props: INewsResult) {
  const { term } = props
  const [news, setNews] = useState([])

  useEffect(() => {
    axios
      .get(`/api/news/search?term=${term}`)
      .then((news: any) => {
        setNews(richTextToDisplayText(news.data))
      })
      .catch((e: any) => console.log(e))
  }, [term])
  return news.length === 0 ? (
    <div className={'fg-blackish'}>can't find news with the term {term}</div>
  ) : (
    <div>
      <Yoga maxCol={2}>
        {news.map((n: any) => (
          <NewsCard
            title={n.title}
            shareCount={n.share.length}
            likeCount={n.likeCount}
            commentCount={n.commentCount}
            description={n.description}
            imgSrc={n.imgSrc}
            _id={n.id}
          />
        ))}
      </Yoga>
    </div>
  )
}
export default NewsSearchResult
