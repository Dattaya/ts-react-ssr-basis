import express from 'express'
import path from 'path'

import render from './render'

const staticPath = path.join(__dirname, '..', 'static')

const server = express()
  .disable('x-powered-by')
  .use('/favicon.ico', (req, res) => res.sendFile(path.join(staticPath, 'favicon.ico')))
  .use('/static', express.static(staticPath))
  .get('*', async (req, res) => {
    try {
      await render(req, res)
    } catch (error) {
      res.sendStatus(500)
      console.log('[frontend] error in server/render', error)
    }
  })

export default server
