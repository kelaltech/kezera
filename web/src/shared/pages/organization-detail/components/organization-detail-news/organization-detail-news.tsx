import React, { useEffect, useState } from 'react'
import { Block, Button, Loading, Warning, Yoga } from 'gerami'
import Axios, { CancelTokenSource } from 'axios'
import * as qs from 'qs'

import useLocale from '../../../../hooks/use-locale/use-locale'
import { IOrganizationResponse } from '../../../../../apiv/organization.apiv'
import { INewsResponse } from '../../../../../apiv/news.apiv'
import NewsCard from '../../../../components/news-card/news-card'
import SearchBar from '../../../../components/search-bar/search-bar'
import { richTextToDisplayText } from '../../../../../lib/richTextConverter'

interface Props {
  organization: IOrganizationResponse
}

const count = 10
let searchCancellation: CancelTokenSource | null = null

function OrganizationDetailNews({ organization }: Props) {
  const { loading, t } = useLocale(['organization'])

  const [term, setTerm] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string>()

  const [news, setNews] = useState<INewsResponse[]>([])

  const load = async (since?: number): Promise<void> => {
    try {
      if (!news.length) setReady(false)

      if (searchCancellation) searchCancellation.cancel()
      searchCancellation = Axios.CancelToken.source()
      const response = await Axios.get<INewsResponse[]>(
        `/api/organization/search-news/${organization._id}?${qs.stringify({
          term,
          count,
          since
        })}`,
        { withCredentials: true, cancelToken: searchCancellation.token }
      )

      if (!Array.isArray(response.data)) {
        setError('Response is malformed.')
      } else {
        setError(undefined)
        setNews((since ? news : []).concat(richTextToDisplayText(response.data)))
        setReady(true)
      }
    } catch (e) {
      if (!Axios.isCancel(error)) setError(e)
    }
  }

  useEffect(() => {
    load().catch(setError)
  }, [term])

  return (
    <div style={{ minHeight: '75vh' }}>
      <SearchBar
        className={'margin-top-big'}
        onTerm={setTerm}
        onSearch={e => {
          e.preventDefault()
          setReady(false)
          load().catch(setError)
        }}
      />

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
                      key={i}
                      title={n.title}
                      shareCount={n.share.length}
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
    </div>
  )
}

export default OrganizationDetailNews
