import path from 'path'
import React from 'react'
import fs from 'fs'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { Request, Response } from 'express'
import { ApolloProvider, ApolloClient, HttpLink } from '@apollo/client'
import { renderToStringWithData } from '@apollo/client/react/ssr'
import fetch from 'cross-fetch'

import { StaticRouter } from 'react-router-dom'

import App from '@/components/App'
import createApolloCache from '@/createApolloCache'
import commConfig from '@/config'
import config from './config'

const stringify = (val: { [key: string]: any }): string => (
  val === undefined
    ? '""'
    : `JSON.parse(${JSON.stringify(JSON.stringify(val).replace(/</g, '\\u003c'))})`
)
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

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: commConfig.gqlServerUrl,
      fetch,
    }),
    cache: createApolloCache(),
  })

  const content = await renderToStringWithData(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ChunkExtractorManager is missing children prop
    <ChunkExtractorManager extractor={extractor}>
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </ChunkExtractorManager>
  )

  res.status(200).send(generateHtml({
    content,
    scriptTags: extractor.getScriptTags(),
    data: stringify(apolloClient.extract()),
  }))

  apolloClient.stop()
}

const generateHtml = ({ content = '', scriptTags = '', data = '' }): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div id="react-view">${content}</div>
  <script>window.__DATA__ = ${data}</script>
  ${scriptTags}
</body>
</html>
`
