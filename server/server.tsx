import express from 'express'
import httpProxy from 'http-proxy'
import path from 'path'

import render from './render'

const staticPath = path.join(__dirname, '..', 'static')
const targetUrl = `http://localhost:3002`
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: false,
  changeOrigin: true,
})

const server = express()
  .disable('x-powered-by')
  .use('/favicon.ico', (req, res) => res.sendFile(path.join(staticPath, 'favicon.ico')))
  .use('/static', express.static(staticPath))
  .use('/graphql', (req, res) => proxy.web(req, res, { target: targetUrl, xfwd: true }))
  .get('*', async (req, res) => {
    try {
      await render(req, res)
    } catch (error) {
      res.sendStatus(500)
      console.log('[frontend] error in server/render', error)
    }
  })

export default server
