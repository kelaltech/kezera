import React, { PropsWithChildren, useEffect } from 'react'
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

  return !(ready !== false && loaded) ? (
    <Loading />
  ) : (
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
  )
}

export default RichPage
