import React, { PropsWithChildren } from 'react'
import { Block, Content, geramiSizeTypes, Page, Warning } from 'gerami'

import { Namespace } from '../../../lib/language'
import useLocale from '../../hooks/use-locale/use-locale'

type Props = PropsWithChildren<{
  languageNamespaces?: Namespace[]

  size?: geramiSizeTypes
  indentHorizontal?: boolean // suited for gerami.Yoga

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

  languageNamespaces = [],

  size = 'XXL',
  indentHorizontal = false,

  title,
  description,

  error,
  onErrorClose
}: Props) {
  const { loading } = useLocale(languageNamespaces)

  return (
    loading || (
      <Page>
        <Content size={size} transparent>
          {title === undefined ? null : (
            <>
              <Block
                first
                className={`padding-horizontal-${indentHorizontal ? 'normal' : 'none'}`}
              >
                {typeof title === 'string' ? <h1>{title}</h1> : title}
              </Block>

              <div
                className={`padding-horizontal-${indentHorizontal ? 'normal' : 'none'}`}
              >
                <hr />
              </div>
            </>
          )}

          {description === undefined ? null : (
            <Block
              last
              className={`padding-horizontal-${
                indentHorizontal ? 'normal' : 'none'
              } font-S fg-blackish`}
            >
              {description}
            </Block>
          )}

          {!error ? null : (
            <Block
              last
              className={`padding-horizontal-${
                indentHorizontal ? 'normal' : 'none'
              } font-S`}
            >
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
  )
}

export default RichPage
