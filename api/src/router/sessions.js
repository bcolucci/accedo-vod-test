import Router from 'koa-router'
import { ObjectID } from 'mongodb'
import Session from '../model/session'

const router = new Router

// handler that loads the current sesion
const loadSession = async (ctx, next) => {
  const _id = new ObjectID(ctx.params.id)
  ctx.session = await Session
    .findOne({ _id })
    .exec()
  if (!ctx.session) {
    ctx.res.status = 404
    ctx.body = { error: 'Unknown session.' }
    return
  }
  next()
}

// returns a session
router.get('/sessions/:id', loadSession, ctx => {
  ctx.body = ctx.session || { _id: null }
})

// pushes a view into a session
router.post('/sessions/:id/views/:view', loadSession, ctx => {
  const { session, params } = ctx
  if (session.views[0] !== params.view) {
    session.views = [params.view, ...session.views]
    session.save()
  }
  ctx.body = session.views
})

// returns a carousel state
router.get('/sessions/:id/carousels/:cid', loadSession, ctx => {
  ctx.body = ctx.session.carousels
  const idx = ctx.session.carousels.findIndex(c => c.id === ctx.params.cid)
  ctx.body = idx > -1 ? ctx.session.carousels[idx] : { index: 0 }
})

// updates a carousel state
router.post('/sessions/:id/carousels/:cid/:slideIndex', loadSession, ctx => {
  const { cid, slideIndex } = ctx.params
  const idx = ctx.session.carousels.findIndex(c => c.id === cid)
  if (idx < 0) {
    ctx.session.carousels.push({ id: cid, slideIndex: Number(slideIndex) })
  } else {
    ctx.session.carousels[idx].slideIndex = Number(slideIndex)
  }
  ctx.session.save()
  ctx.body = ctx.session.carousels
})

// returns session views
router.get('/sessions/:id/views', loadSession, ctx => {
  ctx.body = ctx.session.views || []
})

// deletes a session
router.delete('/sessions/:id', loadSession, ctx => {
  ctx.session.remove()
  ctx.body = { removed: true }
})

// creates a new session
router.post('/sessions', async ctx => {
  ctx.body = await (new Session).save()
})

export default router
