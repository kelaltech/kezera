import Axios from 'axios'

Axios.defaults.baseURL = process.env.BASE_URL || 'http://192.168.232.2:8900' // the default android emulator IP
