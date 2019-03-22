import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Anchor, Block, Button, Content, Page } from 'gerami'

import useLocale from '../../hooks/use-locale/use-locale'

function NotFound({ location, history }: RouteComponentProps<{}>) {
  const { loading, t } = useLocale(['not-found'])

  return (
    loading || (
      <Page top>
        <Content transparent size="XXL">
          <Block className="light fg-primary padding-top-none">
            <div className="font-X7L padding-bottom-small">404! 😕</div>
            <div className="font-X5L">{t`not-found:not-found`}</div>
          </Block>

          <Block>
            {t`not-found:the-requested-page`},{' '}
            <Anchor to={location.pathname}>
              <code style={{ color: 'inherit' }}>{location.pathname}</code>
            </Anchor>
            , {t`not-found:was-not-found`}
          </Block>

          <Block>
            <hr />
          </Block>

          <Block last className="right">
            <Anchor to="/">{t`not-found:go-home`}</Anchor>
            <span className="padding-horizontal-big fg-blackish" />
            <Button onClick={history.goBack} primary>
              {t`not-found:go-back`}
            </Button>
          </Block>
        </Content>
      </Page>
    )
  )
}

export default NotFound
