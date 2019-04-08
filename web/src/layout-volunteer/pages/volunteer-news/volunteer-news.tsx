import React, { useEffect, useState } from 'react'
import './volunteer-news.scss'
import NewsCard from '../../../shared/components/news-card/news-card'
import { Block } from 'gerami'
import axios from 'axios'
function VolunteerNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    axios
      .get('/api/news/allnews')
      .then(data => {
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
  return (
    <div>
      <div className={'volunteer-news-container'}>
        <span>
          <Block />
          <h4>News feed</h4>
        </span>
        <div>
          {news.map((n: any) => (
            <div>
              <NewsCard
                _id={n._id}
                commentCount={n.comments.length}
                imgSrc={`/api/news/${n._id}/picture`}
                title={n.title}
                likeCount={n.likes.length}
                description={n.description}
              />
              <Block />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VolunteerNews
