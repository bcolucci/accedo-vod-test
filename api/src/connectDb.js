/**
 * This file is required in the first place when we need the database.
 * Connection to mongodb is made here.
 */

import mongoose from 'mongoose'
import plugCache from 'mongoose-redis-cache'
import redisOpts from './utils/redisOpts'

// using the native Promise lib
mongoose.Promise = global.Promise

const {
  NODE_ENV,
  HOST,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DATABASE } = process.env

// connection URL
export const dbUrl = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}`
  + `@mongodb/${MONGODB_DATABASE}`

// set debug mode if necessary
NODE_ENV === 'development' && mongoose.set('debug', true)

// connection...
mongoose.connect(dbUrl, {
  server: {
    auto_reconnect: true
  }
})

// seems to not work... not enough time to check :(
plugCache(mongoose, redisOpts())

// some listener to check the connection status
const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'DB connection error:'))
connection.once('open', () => console.log('DB connection established!'))

// we do not forget to nicely close the connection if needed
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DB connection disconnected')
    process.exit(0)
  })
})

export default { dbUrl, connection }
