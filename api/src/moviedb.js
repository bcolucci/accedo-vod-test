import MovieDb from 'moviedb-promise'

// juste the moviedb client (https://www.themoviedb.org)
export default new MovieDb(process.env.MOVIEDB_API_KEY)
