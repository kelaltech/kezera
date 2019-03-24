import React, { useState } from 'react'
import { Anchor, Block, Button, Content, Flex, FlexSpacer, Input } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './account-general.scss'
import useLocale from '../../hooks/use-locale/use-locale'
import { IAccountResponse } from '../../../../../api/modules/account/account.apiv'
import { useAccountDispatch } from '../../../app/stores/account/account-provider'
import { logout } from '../../../app/stores/account/account-actions'

interface Props {
  account: IAccountResponse
  onChange: (account: IAccountResponse, timeout: number) => any
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountGeneral({ account, onChange, readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const accountDispatch = useAccountDispatch()
  const handleLogout = async () => accountDispatch(await logout())

  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false)

  const [email, setEmail] = useState(account.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewtPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const [status, setStatus] = useState(account.status)
  const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber)

  const emitChange = (accountChanges: any, timeout = 0): void => {
    if (!readonly && onChange) onChange(Object.assign(account, accountChanges), timeout)
  }

  const handleEmailChange = (e: any) => {
    e.preventDefault()
    emitChange({ email })
  }
  const handlePasswordChange = (e: any) => {
    e.preventDefault()

    // todo
  }
  const handleStatusChange = (e: any) => {
    e.preventDefault()

    // todo
  }
  const handlePhoneNumberChange = (e: any) => {
    e.preventDefault()
    emitChange({ phoneNumber: phoneNumber || null })
  }

  return (
    loading || (
      <Content style={{ overflow: 'visible' }}>
        <Block first>
          <Flex>
            <h3>{t`account:account-settings`}</h3>

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
          <div className={'padding-horizontal-very-big padding-vertical-normal'} />

          <form method={'POST'} onSubmit={handleEmailChange}>
            <Block
              className={`${
                editingEmail ? 'account-general-field-editing' : ''
              } account-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
              {editingEmail ? (
                <Input
                  className={'full-width'}
                  type={'email'}
                  label={t`account:email`}
                  name={'email'}
                  value={account.email}
                  onChange={e => setEmail(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`account:email`}: </span>
                  <span>{account.email}</span>
                </div>
              )}
              <Button
                type={!editingEmail ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditingEmail(!editingEmail)}
              >
                <FontAwesomeIcon icon={editingEmail ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>

          <div className={'padding-horizontal-very-big padding-vertical-normal'} />

          <form method={'POST'} onSubmit={handlePasswordChange}>
            <Block
              className={`${
                editingPassword ? 'account-general-field-editing' : ''
              } account-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'user-secret'} />
              {editingPassword ? (
                <div className={'full-width'}>
                  <Input
                    className={'full-width margin-bottom-normal'}
                    type={'password'}
                    label={t`account:current-password`}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                  <Input
                    className={'full-width margin-bottom-normal'}
                    type={'password'}
                    label={t`account:new-password`}
                    value={newPassword}
                    onChange={e => setNewtPassword(e.target.value)}
                  />
                  <Input
                    className={'full-width margin-bottom-normal'}
                    type={'password'}
                    label={t`account:repeat-new-password`}
                    value={repeatNewPassword}
                    onChange={e => setRepeatNewPassword(e.target.value)}
                  />
                </div>
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`account:password`}: </span>
                  <span>Last set on Dec 14, 2017</span>
                </div>
              )}
              <Button
                type={!editingPassword ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditingPassword(!editingPassword)}
              >
                <FontAwesomeIcon icon={editingPassword ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>

          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.25 }} />
          </div>

          <form method={'POST'} onSubmit={handleStatusChange}>
            <Block
              className={`${
                editingStatus ? 'account-general-field-editing' : ''
              } account-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'question-circle'} />
              {editingStatus ? null /* todo */ : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>Account Status: </span>
                  <span>{account.status}</span>
                </div>
              )}
              <Button
                type={!editingStatus ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditingStatus(!editingStatus)}
              >
                <FontAwesomeIcon icon={editingStatus ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>

          <div className={'padding-horizontal-very-big padding-vertical-normal'}>
            <hr style={{ opacity: 0.25 }} />
          </div>

          <form method={'POST'} onSubmit={handlePhoneNumberChange}>
            <Block
              className={`${
                editingPhoneNumber ? 'account-general-field-editing' : ''
              } account-general-field`}
            >
              <FontAwesomeIcon className={'margin-right-big'} icon={'phone'} />
              {editingPhoneNumber ? (
                <Input
                  className={'full-width'}
                  type={'phone'}
                  label={t`account:phone-number` + ' (' + t`account:optional` + ')'}
                  maxLength={50}
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              ) : (
                <div className={'full-width'}>
                  <span className={'fg-blackish'}>{t`account:phone-number`}: </span>
                  <span>{account.phoneNumber}</span>
                </div>
              )}
              <Button
                type={!editingPhoneNumber ? 'submit' : 'button'}
                className={'small-circle-button margin-left-big'}
                onClick={() => setEditingPhoneNumber(!editingPhoneNumber)}
              >
                <FontAwesomeIcon icon={editingPhoneNumber ? 'check' : 'pencil-alt'} />
              </Button>
            </Block>
          </form>

          <div className={'padding-horizontal-very-big padding-vertical-normal'} />
        </div>
      </Content>
    )
  )
}

export default AccountGeneral
