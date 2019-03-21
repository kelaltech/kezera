import React from 'react'
import { Anchor, Block, Flex, FlexSpacer } from 'gerami'

import useLocale from '../../../hooks/use-locale/use-locale'
import { setLanguage } from '../../../../lib/language'
import './footer.scss'

export default function Footer() {
  const { loading, t } = useLocale([], { loading: null })

  return (
    loading || (
      <Block first last className="footer font-S fg-blackish">
        <Flex>
          <div className="footer-left">
            <Anchor onClick={() => setLanguage('am')}>አማርኛ</Anchor>
            <br />
            <Anchor onClick={() => setLanguage('en')}>English</Anchor>
          </div>

          <FlexSpacer />

          <div className="footer-center" title={t`All rights reserved`}>
            &copy; 2019, {t`app-name`}.
            <br />
            <a
              className="kelal-wordmark font-M"
              href="https://www.kelaltech.com/"
              rel="noopener"
              target="_blank"
            >
              {t`tech`}
            </a>
          </div>

          <FlexSpacer />

          <div className="footer-right">
            {/* todo: licenses */}
            <Anchor onClick={() => alert('TODO')}>{t`Licenses`}</Anchor>
            <br />
            {/* todo: terms */}
            <Anchor onClick={() => alert('TODO')}>{t`Terms`}</Anchor>
          </div>
        </Flex>
      </Block>
    )
  )
}
