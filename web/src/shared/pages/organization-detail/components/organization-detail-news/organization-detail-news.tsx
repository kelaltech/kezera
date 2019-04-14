import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { INewsResponse } from '../../../../../apiv/news.apiv'
import NewsCard from '../../../../components/news-card/news-card'

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
        setNews(news.concat(response.data))
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
              <Block first last className={'fg-blackish'}>
                This organization has not posted news yet.
              </Block>
            ) : (
              <>
                <Yoga maxCol={4} className={'padding-normal'}>
                  {news.map((n, i) => (
                    <NewsCard key={i} {...n as any} />
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
