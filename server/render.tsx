import '@babel/polyfill'
import path from 'path'
import React from 'react'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { Request, Response } from 'express'
import { HelmetProvider, FilledContext } from 'react-helmet-async'

import App from 'components/App'
import config from './config'

// Why `JSON.parse()`: https://www.youtube.com/watch?v=ff4fgQxPaO0
const stringify = (val: any): string => val === undefined ? '""' : `JSON.parse(${JSON.stringify(JSON.stringify(val).replace(/</g, '\\u003c'))})`

// it will be generated in server-dev-dist or server-prod-dist folders, that's why the path is in current directory
const statsFile = path.resolve(__dirname, './loadable-stats.json')
if (config.isDev) {
  fs.closeSync(fs.openSync(statsFile, 'a')) // create if not exists, unix 'touch' alternative
}

let extractor: ChunkExtractor
// No need to analyze `statsFile` on each request in production
if (!config.isDev) {
  extractor = new ChunkExtractor({ statsFile })
}

export default async (req: Request, res: Response): Promise<void> => {
  if (config.isDev) {
    extractor = new ChunkExtractor({ statsFile })
  }
  const helmetContext: FilledContext = { helmet: null }

  const content = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </ChunkExtractorManager>
  )
  const { helmet } = helmetContext

  res.status(200).send(generateHtml({
    content,
    styleTags: extractor.getStyleTags(),
    scriptTags: extractor.getScriptTags(),
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    bodyAttributes: helmet.bodyAttributes.toString(),
    data: stringify({})
  }))
}

const generateHtml = ({ content = '', title = '', meta = '', link = '', bodyAttributes = '', styleTags = '', scriptTags = '', data = '' }): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${title}${meta}${link}${styleTags}
</head>
<body ${bodyAttributes}>
  <div id="react-view">${content}</div>
  <script>window.DATA = ${data}</script>
  ${scriptTags}
</body>
</html>
`
