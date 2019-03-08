import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Anchor, Block, Button, Content, Page } from 'gerami'

export default class NotFound extends Component<RouteComponentProps<{}>, {}> {
  render() {
    const { location, history } = this.props

    return (
      <Page>
        <Content transparent size="XXL">
          <Block first className="light fg-primary">
            <div className="font-X7L padding-bottom-small">😕</div>
            <div className="font-X7L padding-bottom-small">404!</div>
            <div className="font-XXL">Not found.</div>
          </Block>

          <Block>
            Seems like the requested page,{' '}
            <Anchor to={location.pathname}>
              <code style={{ color: 'inherit' }}>{location.pathname}</code>
            </Anchor>
            , was not found.
          </Block>

          <Block>
            <hr />
          </Block>

          <Block last className="right">
            <Anchor to="/">Go home</Anchor>
            <span className="padding-horizontal-normal fg-blackish">or</span>
            <Button onClick={history.goBack} primary>
              Try going back
            </Button>
          </Block>
        </Content>
      </Page>
    )
  }
}
