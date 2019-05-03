import Config from 'react-native-config'
import Axios from 'axios'

Axios.defaults.baseURL = Config.BASE_URL || 'http://10.0.2.2:1400' // default android emulator IP for PC localhost
