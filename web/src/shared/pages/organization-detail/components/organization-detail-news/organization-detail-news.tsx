import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { INewsResponse } from '../../../../../apiv/news.apiv'
import NewsCard from '../../../../components/news-card/news-card'
import { richTextToDisplayText } from '../../../../../lib/richTextConverter'

interface Props {
  organization: IOrganizationResponse
}

const count = 10

function OrganizationDetailNews({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [news, setNews] = useState<INewsResponse[]>([])

  const load = (since?: number): void => {
    Axios.get<INewsResponse[]>(
      `/api/organization/news/${organization._id}?${qs.stringify({ since, count })}`
    )
      .then(response => {
        setNews(news.concat(richTextToDisplayText(response.data)))
        setReady(true)
      })
      .catch(setError)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {(error && (
        <Block first last>
          <Warning problem={error} />
        </Block>
      )) ||
        loading ||
        (!ready ? (
          <Loading delay />
        ) : (
          <>
            {!news.length ? (
              <div className={'padding-vertical-very-big center big fg-blackish'}>
                This organization has not posted news yet.
              </div>
            ) : (
              <>
                <Yoga maxCol={2} className={'yoga-in-rich-page padding-normal'}>
                  {news.map((n, i) => (
                    <NewsCard
                      title={n.title}
                      likeCount={n.likes.length}
                      commentCount={n.comments.length}
                      description={n.description}
                      imgSrc={`/api/news/${n._id}/pic`}
                      _id={n._id}
                    />
                  ))}
                </Yoga>
                {news.length && news.length % count === 0 && (
                  <Block last className={'center'}>
                    <Button
                      onClick={() =>
                        load(new Date((news[news.length - 1] as any)._at).getTime())
                      }
                    >
                      Load More...
                    </Button>
                  </Block>
                )}
              </>
            )}
          </>
        ))}
    </>
  )
}

export default OrganizationDetailNews
