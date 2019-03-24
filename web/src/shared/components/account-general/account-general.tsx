import React from 'react'
import { Anchor, Block, Button, Content, Flex, FlexSpacer, Input, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './account-general.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { useAccountDispatch } from '../../../app/stores/account/account-provider'
import { logout } from '../../../app/stores/account/account-actions'

interface Props {
  account: IAccountResponse
  onChange: (account: IAccountResponse) => any
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountGeneral({ account, onChange, readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const accountDispatch = useAccountDispatch()
  const handleLogout = async () => accountDispatch(await logout())

  return (
    loading || (
      <Content>
        <Block first>
          <Flex>
            <h3>{t`account:account`}</h3>

            <FlexSpacer />

            {(account.role === 'ORGANIZATION' || account.role === 'VOLUNTEER') && (
              <>
                <Anchor to={`/${account.role.toLowerCase()}/portfolio`}>
                  {t`account:go-to-portfolio`}
                </Anchor>
                <span className={'padding-horizontal-normal fg-whitish'}>|</span>
              </>
            )}

            <Anchor onClick={handleLogout}>{t`account:logout`}</Anchor>
          </Flex>
        </Block>

        <hr />

        <div className={'padding-bottom-big'}>
          <Content transparent size={'M'}>
            <Block first className={'flex'}>
              <Button className={'small-circle-button margin-right-big'}>
                <FontAwesomeIcon icon={'check'} />
              </Button>
              <Input
                className={'full-width'}
                type={'email'}
                label={t`account:email`}
                value={account.email}
              />
            </Block>

            <Block first className={'flex'}>
              <Button className={'small-circle-button margin-right-big'}>
                <FontAwesomeIcon icon={'check'} />
              </Button>
              <Input
                className={'full-width'}
                type={'password'}
                label={t`account:password`}
                value={'TODO'}
              />
            </Block>

            <Block first last className={'flex'}>
              <Button className={'small-circle-button margin-right-big'}>
                <FontAwesomeIcon icon={'check'} />
              </Button>
              <Input
                className={'full-width'}
                type={'phone'}
                label={t`account:phone-number` + ' (' + t`account:optional` + ')'}
                value={account.phoneNumber || ''}
              />
            </Block>
          </Content>
        </div>
      </Content>
    )
  )
}

export default AccountGeneral
