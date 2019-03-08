import React, { Component } from 'react'
import { Anchor, Block, Flex, FlexSpacer } from 'gerami'

import _, { setLanguage } from '../../../../app/lib/language'
import './footer.scss'

export default class Footer extends Component<{}, {}> {
  render() {
    return (
      <Block first last className="footer font-S fg-blackish">
        <Flex>
          <div className="footer-left">
            <Anchor onClick={() => setLanguage('am')}>አማርኛ</Anchor>
            <br />
            <Anchor onClick={() => setLanguage('en')}>English</Anchor>
          </div>

          <FlexSpacer />

          <div className="footer-center" title={_`All rights reserved`}>
            &copy; 2019, {_`app-name`}.
            <br />
            <a
              className="kelal-wordmark font-M"
              href="https://www.kelaltech.com/"
              rel="noopener"
              target="_blank"
            >
              {_`tech`}
            </a>
          </div>

          <FlexSpacer />

          <div className="footer-right">
            {/* todo: licenses */}
            <Anchor onClick={() => alert('TODO')}>{_`Licenses`}</Anchor>
            <br />
            {/* todo: terms */}
            <Anchor onClick={() => alert('TODO')}>{_`Terms`}</Anchor>
          </div>
        </Flex>
      </Block>
    )
  }
}
