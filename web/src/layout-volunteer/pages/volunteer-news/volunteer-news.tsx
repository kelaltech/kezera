import React, { useEffect, useState } from 'react'
import './volunteer-news.scss'
import NewsCard from '../../../shared/components/news-card/news-card'
import { Block } from 'gerami'
import axios from 'axios'
// import NewsTemp from '../../../assets/images/news-temp.jpg'
function VolunteerNews() {
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
  let i = 0
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
                  imgSrc={Data[i++].imgSrc}
                  title={n.title}
                  likeCount={n.likes.length}
                  description={n.description}
                />
              <Block/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VolunteerNews

//static data just for test case
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
    description: 'Get a random image by appending ?random to the end of the url.',
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
