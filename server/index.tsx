import http from 'http' // change to https if you need to add tls cetificates and add `httpsOptions` as the first argument of `createServer`, and uncomment 'https' in `client-dev`

import config from './config'
let app = require('./server').default
// import app from './server'

const server = http.createServer((req, res) => app.handle(req, res))

if (module.hot) {
  module.hot.accept('./server', () => {
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
}

const port = process.env.PORT || 3000

server.listen(config.port, config.host, () => console.log(`[frontend] server listening on: ${port}`))
