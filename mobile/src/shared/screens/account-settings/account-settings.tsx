import React, { useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  NavigationActions,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation'
import { Divider, Input } from 'react-native-elements'

import useLocale from '../../hooks/use-locale/use-locale'
import Header from '../../components/header/header'
import {
  useAccountDispatch,
  useAccountState
} from '../../../app/stores/account/account-provider'
import {
  logout,
  reloadAccount,
  updateAccount
} from '../../../app/stores/account/account-actions'
import classes from '../../../assets/styles/classes'
import EditableItem from '../../components/editable-item/editable-item'
import LabeledView from '../../components/labeled-view/labeled-view'
import { IAccountResponse } from '../../../apiv/account.apiv'
import values from '../../../assets/styles/values'
import AccountSettingsPhoto from './components/account-settings-photo/account-settings-photo'

function AccountSettings({ navigation }: NavigationInjectedProps<{}>) {
  const { loading, t } = useLocale(['account'])

  const [sending, setSending] = useState(false)

  const { account } = useAccountState()
  const accountDispatch = useAccountDispatch()

  const [data, setData] = useState<
    IAccountResponse & {
      currentPassword: string
      newPassword: string
      repeatNewPassword: string
    }
  >({
    ...(account ||
      ({
        photoUri: undefined,
        displayName: '',
        email: '',
        passwordSetOn: undefined,
        phoneNumber: ''
      } as any)),
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  })

  const doUpdate = (isPassword = false): void => {
    if (isPassword) {
      if (data.newPassword !== data.repeatNewPassword) {
        Alert.alert(t`error`, t`account:passwords-do-not-match`)
        return
      }
    }

    updateAccount(
      accountDispatch,
      data,
      0,
      isPassword ? data.currentPassword : undefined,
      isPassword ? data.newPassword : undefined,
      () => {
        reloadAccount(accountDispatch)
      },
      e =>
        Alert.alert(
          t`error`,
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
    )
  }

  const handleLogout = (): void => {
    setSending(true)
    Alert.alert(
      t`are-you-sure-you-want-to-logout`,
      undefined,
      [
        {
          style: 'cancel',
          text: t`no`,
          onPress: () => {
            setSending(false)
          }
        },
        {
          style: 'default',
          text: t`yes`,
          onPress: () => {
            logout(
              accountDispatch,
              () => {
                setSending(false)
                navigation.dispatch(NavigationActions.navigate({ routeName: 'Init' }))
              },
              e => {
                Alert.alert(
                  t`error`,
                  e.response && e.response.data
                    ? e.response.data.prettyMessage || e.response.data.message
                    : e.message
                )
                setSending(false)
              }
            )
          }
        }
      ],
      { cancelable: true }
    )
  }

  return (
    loading ||
    (!account ? (
      <View style={{ ...classes.grow, justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>{t`account:you-are-logged-out`}</Text>
      </View>
    ) : (
      <>
        <Header title={t`account:account-settings`} showAccount={false} showBack />

        <ScrollView style={classes.padding}>
          <AccountSettingsPhoto />

          <Divider />

          <EditableItem
            viewNode={
              <LabeledView
                label={t`account:display-name`}
                value={account.displayName || t`n-a`}
              />
            }
            editNode={
              <Input
                placeholder={t`account:display-name`}
                value={data.displayName || ''}
                onChangeText={displayName => setData({ ...data, displayName })}
                autoFocus
              />
            }
            onEditSubmit={doUpdate}
          />

          <Divider />

          <EditableItem
            viewNode={
              <LabeledView label={t`account:email`} value={account.email || t`n-a`} />
            }
            editNode={
              <Input
                keyboardType={'email-address'}
                placeholder={t`account:email`}
                value={data.email || ''}
                onChangeText={email => setData({ ...data, email })}
                autoFocus
              />
            }
            onEditSubmit={doUpdate}
          />

          <Divider />

          <EditableItem
            viewNode={
              <LabeledView
                label={t`account:password`}
                value={
                  t`account:last-set-on` +
                  ' ' +
                  (account.passwordSetOn
                    ? new Date(account.passwordSetOn).toLocaleString()
                    : t`n/a`)
                }
              />
            }
            editNode={
              <>
                <View>
                  <Input
                    secureTextEntry={true}
                    placeholder={t`account:current-password`}
                    value={data.currentPassword || ''}
                    onChangeText={currentPassword =>
                      setData({ ...data, currentPassword })
                    }
                    autoFocus
                  />
                </View>
                <View style={classes.marginTopSmall}>
                  <Input
                    secureTextEntry={true}
                    placeholder={t`account:new-password`}
                    value={data.newPassword || ''}
                    onChangeText={newPassword => setData({ ...data, newPassword })}
                  />
                </View>
                <View style={classes.marginVerticalSmall}>
                  <Input
                    secureTextEntry={true}
                    placeholder={t`account:repeat-new-password`}
                    value={data.repeatNewPassword || ''}
                    onChangeText={repeatNewPassword =>
                      setData({ ...data, repeatNewPassword })
                    }
                  />
                </View>
              </>
            }
            onEditSubmit={() => doUpdate(true)}
          />

          <Divider />

          <EditableItem
            viewNode={
              <LabeledView
                label={t`account:phone-number`}
                value={account.phoneNumber || t`n-a`}
              />
            }
            editNode={
              <Input
                keyboardType={'phone-pad'}
                placeholder={t`account:phone-number` + ' (' + t`optional` + ')'}
                value={data.phoneNumber || ''}
                onChangeText={phoneNumber => setData({ ...data, phoneNumber })}
                autoFocus
              />
            }
            onEditSubmit={doUpdate}
          />

          <Divider />

          <View style={classes.marginVerticalBig}>
            <TouchableOpacity
              onPress={handleLogout}
              style={{ alignSelf: 'center', marginVertical: values.space.big }}
              disabled={sending}
            >
              <Text
                style={{ color: values.color.secondary, fontSize: values.fontSize.big }}
              >
                {t`account:logout`}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: values.space.big }} />
        </ScrollView>
      </>
    ))
  )
}

export default withNavigation(AccountSettings)
