import 'babel-polyfill'
import './connectDb'

import createApp from './createApp'

// here we start to listen requests
createApp()
  .listen(process.env.API_PORT)

