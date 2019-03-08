import React, { Component, ReactNode } from 'react'
import { Page, Warning } from 'gerami'
import { MinHeightProperty } from 'csstype'

import Header, { IHeaderProps } from './header/header'
import Footer from './footer/footer'

interface ILayoutProps {
  error?: any
  nonContentHeight?: MinHeightProperty<string | number>
  noShell?: boolean
  headerOptions?: IHeaderProps
  overrideHeader?: ReactNode
  overrideFooter?: ReactNode
  preHeader?: ReactNode
}

interface ILayoutState {
  noShell: boolean
}

export default class Layout extends Component<ILayoutProps, ILayoutState> {
  state: ILayoutState = {
    noShell: true
  }

  componentDidMount() {
    let { noShell } = this.props

    if (noShell === undefined) {
      const fromStorage = window.sessionStorage.getItem('noShell')
      noShell = fromStorage === null ? false : fromStorage === 'true'
      this.setState({ noShell })
    } else {
      window.sessionStorage.setItem('noShell', String(noShell))
      this.setState({ noShell })
    }
  }

  render() {
    const {
      children,
      nonContentHeight: nch,
      error,
      headerOptions,
      overrideHeader,
      overrideFooter,
      preHeader
    } = this.props
    const { noShell } = this.state

    const contentMinHeight = nch
      ? `calc(100vh - ${nch}${typeof nch === 'number' ? 'px' : ''})`
      : `100vh`

    return error ? (
      <Page>
        <Warning problem={error} size={'XXL'} />
      </Page>
    ) : (
      <>
        {!noShell && (
          <>
            {preHeader}
            {overrideHeader || <Header {...headerOptions} />}
          </>
        )}
        <div style={{ minHeight: contentMinHeight }}>{children}</div>
        {!noShell && (overrideFooter || <Footer />)}
      </>
    )
  }
}
