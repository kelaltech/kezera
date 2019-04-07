import React, { useState } from 'react'
import { Anchor, Block, Button, Content, Flex, FlexSpacer, Input, Warning } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FormControl,
  Input as MatInput,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'

import './account-general.scss'
import useLocale from '../../../../hooks/use-locale/use-locale'
import {
  useAccountDispatch,
  useAccountState
} from '../../../../../app/stores/account/account-provider'
import { logout, updateAccount } from '../../../../../app/stores/account/account-actions'
import { IAccountStatus } from '../../../../../../../api/models/account/account.model'

interface Props {
  /**
   * @default false
   */
  readonly?: boolean
}

function AccountGeneral({ readonly }: Props) {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  if (!account) return <>{t`account:you-are-logged-out`}</>
  const accountDispatch = useAccountDispatch()

  const emitChange = (accountChanges: any): void => {
    if (readonly) return
    const data = { ...account, ...accountChanges }
    updateAccount(accountDispatch, data, 0, data.currentPassword, data.newPassword)
  }
  const handleLogout = (): void => {
    logout(accountDispatch)
  }

  const [error, setError] = useState<string | null>(null)

  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)

  const [email, setEmail] = useState(account.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewtPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber)
  const [status, setStatus] = useState(account.status)

  const handleEmailChange = (e: any): void => {
    e.preventDefault()
    if (!email) return
    emitChange({ email })
    setEditingEmail(false)
  }
  const handlePasswordChange = (e: any): void => {
    e.preventDefault()
    if (!currentPassword && !newPassword && !repeatNewPassword) return
    else if (!currentPassword || !newPassword || !repeatNewPassword) {
      setError('All fields were required.')
      return
    }
    if (newPassword !== repeatNewPassword) {
      setError('Passwords do not match.')
      return
    }
    emitChange({ currentPassword, newPassword })
    setEditingPassword(false)
  }
  const handlePhoneNumberChange = (e: any): void => {
    e.preventDefault()
    emitChange({ phoneNumber })
    setEditingPhoneNumber(false)
  }
  const handleStatusChange = (e: any): void => {
    e.preventDefault()
    if (!status) return
    emitChange({ status })
    setEditingStatus(false)
  }

  return (
    loading || (
      <>
        {error && (
          <Content className={'margin-bottom-big'}>
            <Warning shy={() => setError(null)} problem={error} />
          </Content>
        )}

        <Content style={{ overflow: 'visible' }}>
          <Block first>
            <Flex>
              <h3>{t`account:account-settings`}</h3>

              <FlexSpacer />

              {(account.role === 'ORGANIZATION' || account.role === 'VOLUNTEER') && (
                <>
                  <Anchor to={`/${account.role.toLowerCase()}/me`}>
                    {t`account:go-to-my-profile`}
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
                onDoubleClick={() => setEditingEmail(true)}
              >
                <FontAwesomeIcon className={'margin-right-big'} icon={'envelope'} />
                {editingEmail ? (
                  <Input
                    className={'full-width'}
                    type={'email'}
                    label={t`account:email`}
                    name={'email'}
                    value={email}
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
                onDoubleClick={() => setEditingPassword(true)}
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
                      minLength={8}
                      maxLength={72}
                      required
                    />
                    <Input
                      className={'full-width margin-bottom-normal'}
                      type={'password'}
                      label={t`account:new-password`}
                      value={newPassword}
                      onChange={e => setNewtPassword(e.target.value)}
                      minLength={8}
                      maxLength={72}
                      required
                    />
                    <Input
                      className={'full-width margin-bottom-normal'}
                      type={'password'}
                      label={t`account:repeat-new-password`}
                      value={repeatNewPassword}
                      onChange={e => setRepeatNewPassword(e.target.value)}
                      minLength={8}
                      maxLength={72}
                      required
                    />
                  </div>
                ) : (
                  <div className={'full-width'}>
                    <span className={'fg-blackish'}>{t`account:password`}: </span>
                    <span>
                      Last set on {new Date(account.passwordSetOn).toLocaleString()}
                    </span>
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
              <hr style={{ opacity: 0.5 }} />
            </div>

            <form method={'POST'} onSubmit={handlePhoneNumberChange}>
              <Block
                className={`${
                  editingPhoneNumber ? 'account-general-field-editing' : ''
                } account-general-field`}
                onDoubleClick={() => setEditingPhoneNumber(true)}
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
                    <span>{account.phoneNumber || t`account:n-a`}</span>
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

            <div className={'padding-horizontal-very-big padding-vertical-normal'}>
              <hr style={{ opacity: 0.5 }} />
            </div>

            <form method={'POST'} onSubmit={handleStatusChange}>
              <Block
                className={`${
                  editingStatus ? 'account-general-field-editing' : ''
                } account-general-field`}
                onDoubleClick={() => setEditingStatus(true)}
              >
                <FontAwesomeIcon
                  className={'margin-right-big'}
                  icon={'question-circle'}
                />
                {editingStatus && account.status !== 'BLOCKED' ? (
                  <FormControl className={'full-width'}>
                    <InputLabel htmlFor={'account-status-label-placeholder'} shrink>
                      Status
                    </InputLabel>
                    <Select
                      value={status}
                      onChange={e => setStatus(e.target.value as IAccountStatus)}
                      input={
                        <MatInput
                          name="account-status"
                          id="account-status-label-placeholder"
                        />
                      }
                    >
                      <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                      <MenuItem value={'DISABLED'}>DISABLED</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div className={'full-width'}>
                    <span className={'fg-blackish'}>Account Status: </span>
                    <span>
                      {account.status}
                      {account.status === 'BLOCKED' &&
                        ' (Contact the system administrator for more information).'}
                    </span>
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

            <div className={'padding-horizontal-very-big padding-vertical-normal'} />
          </div>
        </Content>
      </>
    )
  )
}

export default AccountGeneral
