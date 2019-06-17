import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import {
  Block,
  Button,
  Content,
  Flex,
  FlexSpacer,
  geramiSizeTypes,
  Loading,
  Page,
  Warning
} from 'gerami'
import { IButtonProps } from 'gerami/src/components/Button/Button'

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

  actions?: IButtonProps[]
  actionsOverride?: ReactNode

  error?: string | { prettyMessage?: string; message?: string }
  onErrorClose?: (error: undefined) => void
}>

/*
TODO:
- support to use a custom (JSX.Element) every sub-component (error, photo, cover, actions...)
- support to style and className every sub-component (error, photo, cover, actions...)
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

  actions = [],
  actionsOverride,

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
          {title === undefined && !actions.length ? null : (
            <>
              <Block first className={`padding-horizontal-none`}>
                <Flex>
                  <div className={'margin-vertical-auto'}>
                    {typeof title === 'string' ? <h1>{title}</h1> : title}
                  </div>

                  <FlexSpacer />

                  {actionsOverride ||
                    actions.map((action, i) => (
                      <span
                        key={i}
                        className={'rich-page-action-vaults margin-vertical-auto'}
                      >
                        <Button {...(action as any)}>
                          {action.value || action.children}
                        </Button>
                      </span>
                    ))}
                </Flex>
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
