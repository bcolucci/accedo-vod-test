/**
 * This file exports the Session model.
 * Because the API and the client are truly separated,
 * we have to deal with CORS. So, because I miss some time,
 * I decided to implement a very basic session object.
 */

import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

export const CarouselStateSchema = mongoose.Schema({
  id: String,
  slideIndex: Number
})

export const SessionSchema = mongoose.Schema({
  views: {
    type: [String],
    default: []
  },
  carousels: {
    type: [CarouselStateSchema],
    default: []
  }
})

// createdAt & updatedAt fields
SessionSchema.plugin(timestamps)

const Session = mongoose.model('Session', SessionSchema)

export default Session
