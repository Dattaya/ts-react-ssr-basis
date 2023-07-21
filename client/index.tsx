import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import App from '@/components/App'

const httpLink = createHttpLink({
  uri: 'https://metaphysics-production.artsy.net'
})

const client = new ApolloClient({
  assumeImmutableResults: true,
  link: httpLink,
  cache: new InMemoryCache({ freezeResults: true }).restore(window.__DATA__)
})

const getTree = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)

const container = document.getElementById('react-view')
if (container) {
  const rerender = () => {
    const root = createRoot(container)
    root.render(getTree())
  }

  loadableReady(() => {
    hydrateRoot(container, getTree())
  })

  if (module.hot) {
    module.hot.accept('@/components/App', () => {
      rerender()
    })
  }
}
