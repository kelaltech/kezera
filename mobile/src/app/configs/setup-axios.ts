import Axios from 'axios'

Axios.defaults.baseURL = process.env.BASE_URL || 'http://10.0.2.2:8900' // default android emulator IP for PC localhost
