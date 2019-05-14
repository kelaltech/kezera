import React, { useEffect, useState } from 'react'
import './news.scss'
import NewsCard from '../../../../shared/components/news-card/news-card'
import axios from 'axios'
import { convertFromRaw } from 'draft-js'
import { Block, Yoga } from 'gerami'
import RichPage from '../../../../shared/components/rich-page/rich-page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAccountState } from '../../../../app/stores/account/account-provider'
export default function News() {
  const [news, setNews] = useState([])
  const [error, setError] = useState()

  const { account } = useAccountState()
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
        setError(e)
      })
  }, [])
  // todo change the route to organization specific
  return (
    <RichPage
      error={error}
      title={'Stories'}
      actions={
        (account!.role == 'ORGANIZATION' && [
          {
            to: '/news/create',
            primary: true,
            children: (
              <>
                <FontAwesomeIcon
                  icon={'pencil-alt'}
                  className={'margin-right-normal font-S'}
                />
                Create a story
              </>
            )
          }
        ]) ||
        []
      }
    >
      <Yoga maxCol={1} className={'news-list-container'}>
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
      </Yoga>
    </RichPage>
  )
}
