import React, { PropsWithChildren, ReactNode, Suspense, useEffect, useState } from 'react'
import { MinHeightProperty } from 'csstype'
import { Loading, Page, Warning } from 'gerami'

import Header, { IHeaderProps } from './header/header'
import Footer from './footer/footer'

type ILayoutProps = PropsWithChildren<{
  error?: any
  nonContentHeight?: MinHeightProperty<string | number>
  noShell?: boolean
  headerOptions?: IHeaderProps
  overrideHeader?: ReactNode
  overrideFooter?: ReactNode
  preHeader?: ReactNode
}>

function Layout({
  children,
  nonContentHeight: nch,
  noShell: noShellProp,
  error,
  headerOptions,
  overrideHeader,
  overrideFooter,
  preHeader
}: ILayoutProps) {
  const [noShellState, setNoShellState] = useState(true)

  useEffect(() => {
    if (noShellProp === undefined) {
      const fromStorage = window.sessionStorage.getItem('noShell')
      setNoShellState(fromStorage === null ? false : fromStorage === 'true')
    } else {
      window.sessionStorage.setItem('noShell', String(noShellProp))
      setNoShellState(noShellProp)
    }
  }, [])

  const contentMinHeight = nch
    ? `calc(100vh - ${nch}${typeof nch === 'number' ? 'px' : ''})`
    : `100vh`

  return error ? (
    <Page>
      <Warning problem={error} size={'XXL'} />
    </Page>
  ) : (
    <>
      {!noShellState && (
        <>
          {preHeader}
          {overrideHeader || <Header {...headerOptions} />}
        </>
      )}

      <div style={{ minHeight: contentMinHeight }}>
        <Suspense fallback={<Loading delay />}>{children}</Suspense>
      </div>

      {!noShellState && (overrideFooter || <Footer />)}
    </>
  )
}

export default Layout
