import http from 'http'
import express from 'express'
import { gql } from '@apollo/client'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'

const app = express()
const httpServer = http.createServer(app)

const schema = gql`
  type RootQuery {
    test: Boolean
  }
  schema {
    query: RootQuery
  }
`
const resolver = {
  RootQuery: {
    test: () => {
      throw new Error()
    },
  },
}

;(async function startServer() { // eslint-disable-line no-unused-expressions
  const server = new ApolloServer({
    cache: 'bounded',
    typeDefs: schema,
    resolvers: resolver,    
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    status400ForVariableCoercionErrors: true,
  })
  await server.start()
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '2mb' }),
    expressMiddleware(server),
  )
  httpServer.listen(3002, () => (
    console.log(`[backend] server listening on: 3002`)
  ))
}())
