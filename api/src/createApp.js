import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import filter from 'koa-json-filter'
import cors from 'koa2-cors'
import corsOpts from './utils/corsOpts'
import sessions from './router/sessions'
import movies from './router/movies'

// returns an Koa application instance
export default () => {

  const app = new Koa

  app.use(logger())
  app.use(cors(corsOpts()))
  app.use(json())
  app.use(filter())
  app.use(bodyParser())

  app.use(sessions.routes())
  app.use(movies.routes())

  return app

}

