import '@babel/polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter } from 'react-router-dom'

import App from 'components/App'

const httpLink = createHttpLink({
  uri: 'https://metaphysics-production.artsy.net'
})

const client = new ApolloClient({
  assumeImmutableResults: true,
  link: httpLink,
  cache: new InMemoryCache({ freezeResults: true }).restore(window.__DATA__)
})

const renderApp = (): void => {
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('react-view'),
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('components/App', () => {
    renderApp()
  })
}
