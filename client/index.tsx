import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, HttpLink, type NormalizedCacheObject } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import App from '@/components/App'
import createApolloCache from '@/createApolloCache'

declare global {
  interface Window { __DATA__: NormalizedCacheObject; }
}

const client = new ApolloClient({
  assumeImmutableResults: true,
  link: new HttpLink({ uri: 'https://metaphysics-production.artsy.net' }),
  cache: createApolloCache().restore(window.__DATA__),
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
