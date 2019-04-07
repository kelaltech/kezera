import React, { PropsWithChildren, useEffect } from 'react'
import { Block, Content, geramiSizeTypes, Loading, Page, Warning } from 'gerami'

import './rich-page.scss'
import { Namespace } from '../../../lib/language'
import useLocale from '../../hooks/use-locale/use-locale'

type Props = PropsWithChildren<{
  ready?: boolean

  languageNamespaces?: Namespace[]

  size?: geramiSizeTypes

  documentTitle?: string // default to Props.title, if it is string
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
  title,
  description,

  error,
  onErrorClose
}: Props) {
  const { loaded, t } = useLocale(languageNamespaces)

  useEffect(() => {
    const backup = document.title

    const onBlur = () => {
      document.title = 'Come back! We miss you.  :)' // todo: translate
    }
    const onFocus = () => {
      document.title =
        documentTitle || (title && typeof title === 'string' ? title : backup)
    }

    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)

    onFocus()

    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)

      document.title = backup
    }
  }, [])

  return !(ready && loaded) ? (
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
          <Block last className={`padding-horizontal-none font-S`}>
            <Warning
              problem={
                typeof error === 'string' ? error : error.prettyMessage || error.message
              }
              shy={() => onErrorClose && onErrorClose(undefined)}
            />
          </Block>
        )}

        <div className={'rich-page-content'}>{children}</div>
      </Content>
    </Page>
  )
}

export default RichPage
