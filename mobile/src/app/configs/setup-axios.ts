import Config from 'react-native-config'
import Axios from 'axios'

export const baseUrl = Config.BASE_URL || 'http://10.0.2.2:8900' // default android emulator IP for PC localhost

Axios.defaults.baseURL = baseUrl
