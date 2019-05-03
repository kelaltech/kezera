import React from 'react'
import { Anchor, Content, Flex, FlexSpacer } from 'gerami'

import { ISpamReportResponse } from '../../../../../api/modules/spam/spam.apiv'
import useLocale from '../../hooks/use-locale/use-locale'

type Props = {
  spamReport: ISpamReportResponse
  className?: string
}

function SpamReportCard({ spamReport, className }: Props) {
  const { t, loading } = useLocale([])

  return (
    loading || (
      <Content className={className}>
        <Flex className={'padding-big'}>
          <div className={'margin-vertical-auto padding-right-normal'}>
            <div className={'font-S bold'}>
              <small>
                <Anchor
                  to={`${spamReport.type.toLowerCase()}/${spamReport.ids[0]}`}
                  target={'_blank'}
                  rel={'noopener'}
                  className={'fg-accent'}
                >
                  {spamReport.type}
                </Anchor>
              </small>
            </div>

            <div className={'font-S fg-blackish'}>
              <small>
                Reported by{' '}
                <span title={spamReport.reporter.email}>
                  {spamReport.reporter.displayName}
                </span>{' '}
                on {new Date(spamReport._at).toLocaleString()}.
              </small>
            </div>

            {spamReport.description && (
              <div className={'margin-top-normal'}>
                <pre
                  style={{
                    /* todo: move this to gerami v0.1.3 */
                    margin: 0,
                    padding: 0,
                    font: 'inherit',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}
                >
                  {spamReport.description}
                </pre>
              </div>
            )}
          </div>

          <FlexSpacer />

          <Anchor
            to={`/spam-report/${spamReport._id}`}
            className={'margin-vertical-auto'}
          >
            Investigate
          </Anchor>
        </Flex>
      </Content>
    )
  )
}

export default SpamReportCard
