import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Block, Content, geramiSizeTypes, Loading, Page, Warning } from 'gerami'

import './rich-page.scss'
import { Namespace } from '../../../lib/language'
import useLocale from '../../hooks/use-locale/use-locale'
import useTitle, { IUseTitleOptions } from '../../hooks/use-title/use-title'

type Props = PropsWithChildren<{
  ready?: boolean

  languageNamespaces?: Namespace[]

  size?: geramiSizeTypes

  documentTitle?: string // default to Props.title, if it is string
  documentTitleOptions?: IUseTitleOptions

  covers?: string[]
  coverDuration?: number
  photo?: string

  title?: string | JSX.Element
  description?: string | JSX.Element

  error?: string | { prettyMessage?: string; message?: string }
  onErrorClose?: (error: undefined) => void
}>

/*
TODO:
- support action buttons (with config) (also overridable with JSX.Element[] type)
- support header images (with different sizes) (overridable by JSX.Element type)
- support to use a custom (JSX.Element) error component
*/

function RichPage({
  children,

  ready,

  languageNamespaces = [],

  size = 'XXL',

  documentTitle,
  documentTitleOptions,

  covers = [],
  coverDuration = 14000,
  photo,

  title,
  description,

  error,
  onErrorClose
}: Props) {
  const { loaded, t } = useLocale(languageNamespaces)

  useTitle(
    documentTitle || (title && typeof title === 'string' ? title : undefined),
    documentTitleOptions
  )

  const [coverIndex, setCoverIndex] = useState(-1)

  useEffect(() => {
    let interval: any
    if (covers.length) {
      if (coverIndex === -1) setCoverIndex(0)
      interval = setInterval(() => {
        setCoverIndex(coverIndex + 1 < covers.length ? coverIndex + 1 : 0)
      }, coverDuration)
    }
    return () => (interval ? clearInterval(interval) : undefined)
  }, [covers, covers.length, coverIndex])

  useEffect(() => {
    // prefetch all cover images into the browser's cache
    for (const cover of covers) {
      const img = document.createElement('img')
      img.src = cover
    }
  }, [])

  return !(ready !== false && loaded) ? (
    <Loading />
  ) : (
    <>
      {(coverIndex !== -1 || photo !== undefined) && (
        <div style={{ overflow: 'hidden' }}>
          <div
            className={`${
              photo !== undefined ? 'rich-page-cover-with-photo' : ''
            } rich-page-cover bg-whitish`}
            style={{
              animationDuration: `${coverDuration}ms`,
              ...(coverIndex === -1
                ? {}
                : { backgroundImage: `url(${covers[coverIndex]})` })
            }}
          />
        </div>
      )}
      {photo && (
        <Content
          className={'rich-page-photo'}
          style={{ backgroundImage: `url(${photo})` }}
        />
      )}

      <Page>
        <Content size={size} transparent style={{ overflow: 'visible' }}>
          {title === undefined ? null : (
            <>
              <Block first className={`padding-horizontal-none`}>
                {typeof title === 'string' ? <h1>{title}</h1> : title}
              </Block>

              <div className={`padding-horizontal-none`}>
                <hr />
              </div>
            </>
          )}

          {description === undefined ? null : (
            <Block last className={`padding-horizontal-none font-S fg-blackish`}>
              {description}
            </Block>
          )}

          {!error ? null : (
            <Warning
              className={`margin-bottom-very-big padding-horizontal-none font-S`}
              problem={
                typeof error === 'string' ? error : error.prettyMessage || error.message
              }
              shy={() => onErrorClose && onErrorClose(undefined)}
            />
          )}

          <div className={'rich-page-content'}>{children}</div>
        </Content>
      </Page>
    </>
  )
}

export default RichPage
