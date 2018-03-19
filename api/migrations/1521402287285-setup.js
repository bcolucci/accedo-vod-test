/**
 * Initial migration script.
 * Please check the readme file.
 */

import '../src/connectDb'

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { batchPromises } from '../src/utils/promise'
import Session from '../src/model/session'
import Movie from '../src/model/movie'
import moviedb from '../src/moviedb'

const fixturesFile = './migrations/movies.json'

// returns the movies fixtures
// create te fixtures file if not exists
const loadMovies = async () => {

  // file already here
  if (existsSync(fixturesFile)) {
    return Promise.resolve(JSON.parse(readFileSync(fixturesFile)))
  }

  // movie genres
  const genres = await Movie.getGenres()

  // to populate the true images links on movies
  const imagesConf = (await moviedb.configuration()).images
  const imagesResolver = Movie.getImagesResolver({
    baseUrl: imagesConf.base_url,
    width: 'original'
  })

  // all the movies ids we want to retrieve
  const ids = [].concat.apply([], await batchPromises(
    genres.map(genre => () => moviedb.discoverMovie({
      with_genres: genre.id,
      include_adult: true,
    })),
    ({ results }) => results.map(m => m.id)
  )).filter((e, i, arr) => arr.indexOf(e) === i)

  // all the videos of the movies we want to retrieve
  const allVideos = await batchPromises(
    ids.map(id => () => moviedb.movieVideos(id)),
    ({ results }) => results
  )

  // to populate videos & trailer on movies
  const videosResolver = (movie, idx) => {
    const videos = allVideos[idx] || []
    const trailer = videos
      .filter(({ site, type }) => site === 'YouTube' && type === 'Trailer')
      .shift()
    return { ...movie, videos, trailer }
  }

  // final movies array, with images and videos
  const movies = [].concat.apply([], await batchPromises(
    ids.map(id => () => moviedb.movieInfo(id))
  )).map(videosResolver)
    .map(imagesResolver)

  // save this in order to save moviedb API calls
  writeFileSync(fixturesFile, JSON.stringify(movies))

  return movies
}

// migration UP function
// inserts all movies fixtures
export async function up() {
  const movies = await loadMovies()
  // cannot use optimized insertMany here
  // because we want the timestamps plugin to work :)
  return Promise.all(movies.map(m => (new Movie(m).save())))
}

// migration DOWN function
// empty sessions & movies collections
export function down() {
  return Promise.all(
    [
      Session,
      Movie
    ].map(m => m.remove({}).exec())
  )
}
