import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse
} from 'react-native-image-picker'
import Axios from 'axios'

import useLocale from '../../../../hooks/use-locale/use-locale'
import styles from './accountsettings-photo-styles'
import classes from '../../../../../assets/styles/classes'
import { baseUrl } from '../../../../../app/configs/setup-axios'
import {
  useAccountDispatch,
  useAccountState
} from '../../../../../app/stores/account/account-provider'
import { IAccountResponse } from '../../../../../apiv/account.apiv'
import { reloadAccount } from '../../../../../app/stores/account/account-actions'

const imagePickerOptions: ImagePickerOptions = {
  cameraType: 'front',
  maxHeight: 1080,
  maxWidth: 1080,
  mediaType: 'photo',
  storageOptions: {
    path: 'SPVA',
    skipBackup: true,
    waitUntilSaved: true
  }
}

function AccountSettingsPhoto() {
  const { loading, t } = useLocale(['account'])

  const { account } = useAccountState()
  const accountDispatch = useAccountDispatch()

  const handleRemovePhoto = (): void => {
    Axios.put<IAccountResponse>('/api/account/remove-photo', { withCredentials: true })
      .then(r => r.data)
      .then(accountResponse => reloadAccount(accountDispatch, undefined, accountResponse))
      .catch(e =>
        Alert.alert(
          t`error`,
          e.response && e.response.data
            ? e.response.data.prettyMessage || e.response.data.message
            : e.message
        )
      )
  }

  const handleImage = async (response: ImagePickerResponse): Promise<void> => {
    try {
      if (!response.data) return

      const data = new FormData()
      data.append('photo', {
        uri: response.uri,
        type: response.type,
        name: response.fileName
      })

      const accountResponse = (await Axios.post<IAccountResponse>(
        '/api/account/add-photo',
        data,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )).data
      // reset photo cache
      if (accountResponse.photoUri)
        accountResponse.photoUri = accountResponse.photoUri + `?ms=${Date.now()}`

      await reloadAccount(accountDispatch, undefined, accountResponse)
    } catch (e) {
      Alert.alert(
        t`error`,
        e.response && e.response.data
          ? e.response.data.prettyMessage || e.response.data.message
          : e.message
      )
    }
  }

  const launchImageLibrary = (): void => {
    ImagePicker.launchImageLibrary(imagePickerOptions, handleImage)
  }

  const launchCamera = (): void => {
    ImagePicker.launchCamera(imagePickerOptions, handleImage)
  }

  return (
    loading ||
    (!account ? (
      <View style={{ ...classes.grow, justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>{t`account:you-are-logged-out`}</Text>
      </View>
    ) : (
      <View
        style={{ ...classes.marginVerticalBig, ...classes.row, alignItems: 'center' }}
      >
        <View style={{ ...classes.grow }}>
          {account.photoUri ? (
            <Image
              style={styles.accountCircleImage}
              source={{ uri: `${baseUrl}${account.photoUri}` }}
              resizeMode={'cover'}
            />
          ) : (
            <Text style={styles.accountCircleText}>
              {account.displayName.substr(0, 1).toUpperCase()}
            </Text>
          )}
        </View>

        {account.photoUri && (
          <View>
            <TouchableOpacity onPress={handleRemovePhoto}>
              <Icon name={'delete'} raised />
            </TouchableOpacity>
          </View>
        )}

        <View>
          <TouchableOpacity onPress={launchImageLibrary}>
            <Icon name={'photo'} raised />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={launchCamera}>
            <Icon name={'camera'} raised />
          </TouchableOpacity>
        </View>
      </View>
    ))
  )
}

export default AccountSettingsPhoto
