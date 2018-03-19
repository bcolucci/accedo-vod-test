/**
 * This file exports the Movie model.
 */

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import moviedb from '../moviedb'
import { resolve } from 'url'

export const CollectionSchema = mongoose.Schema({
  id: Number,
  name: String,
  poster_path: String,
  backdrop_path: String,
})

export const GenreSchema = mongoose.Schema({
  id: Number,
  name: String,
})

export const SpokenLanguage = mongoose.Schema({
  iso_639_1: String,
  name: String,
})

export const ProductionCompany = mongoose.Schema({
  id: Number,
  name: String,
  logo_path: String,
  origin_country: String,
})

export const ProductionCountry = mongoose.Schema({
  iso_3166_1: String,
  name: String,
})

export const VideoSchema = mongoose.Schema({
  id: String,
  iso_639_1: String,
  iso_3166_1: String,
  key: String,
  name: String,
  site: String,
  size: Number,
  type: String,
})

export const MovieSchema = mongoose.Schema({
  id: Number,
  imdb_id: String,
  title: String,
  status: String,
  release_date: Date,
  tagline: String,
  overview: String,
  homepage: String,
  poster_path: String,
  backdrop_path: String,
  original_language: String,
  original_title: String,
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  adult: Boolean,
  budget: Number,
  revenue: Number,
  trailer: VideoSchema,
  videos: [VideoSchema],
  genres: [GenreSchema],
  spoken_languages: [SpokenLanguage],
  belongs_to_collection: [CollectionSchema],
  production_companies: [ProductionCompany],
  production_countries: [ProductionCountry],
})

// returns all known genres from the moviedb API
MovieSchema.statics.getGenres = async () => (await moviedb.genreMovieList()).genres

// resolve absolute images paths on movies
MovieSchema.statics.getImagesResolver = ({ baseUrl, width }) => {
  const resolveImage = img => img ? [baseUrl, width, img].join('') : null
  return movie => ({
    ...movie,
    poster_path: resolveImage(movie.poster_path),
    backdrop_path: resolveImage(movie.backdrop_path),
    belongs_to_collection: [].concat(movie.belongs_to_collection || []).map(collection => ({
      ...collection,
      poster_path: resolveImage(collection.poster_path),
      backdrop_path: resolveImage(collection.backdrop_path),
    })),
    production_companies: [].concat(movie.production_companies || []).map(company => ({
      ...company,
      logo_path: resolveImage(company.logo_path),
    }))
  })
}

// we would like to use some cache
MovieSchema.set('redisCache', true)

// create createdAt & updatedAt fields and manage them
MovieSchema.plugin(timestamps)

const Movie = mongoose.model('Movie', MovieSchema)

export default Movie
