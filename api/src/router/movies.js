import Router from 'koa-router'
import { ObjectID } from 'mongodb'
import Movie from '../model/movie'

const router = new Router

// returns all the available genres
router.get('/movie_genres', async ctx => {
  ctx.body = (await Movie.getGenres())
    .map(genre => genre.name)
    .sort()
})

// returns a movie
router.get('/movies/:id', async ctx => {
  if (!ctx.params.id) {
    tctx.res.status = 404
    ctx.body = { error: 'Movie ID required.' }
    return
  }
  ctx.body = await Movie
    .findOne({ _id: new ObjectID(ctx.params.id) })
    .exec()
})

// returns movies (or count them)
// can be filtered by genre (e.g. &genre=Drama)
// can be sliced (e.g. &slice=4:10)
// fields can be filtered (e.g. &filter=title)
router.get('/movies', async ctx => {

  // filter
  const query = {}
  if (ctx.query.genre) {
    query.genres = {
      $elemMatch: {
        name: ctx.query.genre
      }
    }
  }

  // if we juste want to count
  if (ctx.query.count) {
    const count = await Movie
      .find(query)
      .count()
      .exec()
    ctx.body = { count }
    return
  }

  const skip = Number(ctx.query.skip) || 0
  const limit = Number(ctx.query.limit) || 10

  ctx.body = await Movie
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ title: 'asc' })
    .lean()
    .exec()
})

export default router
