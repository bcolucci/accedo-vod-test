import { parse } from 'url'

// allow only authorized host (see HOST env var)
export default () => ({
  origin: ctx => {
    const referer = ctx.header.referer || 'http://localhost/'
    return parse(referer).hostname === process.env.HOST ? '*' : false
  }
})
