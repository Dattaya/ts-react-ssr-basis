import '@babel/polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from 'components/App'

const renderApp = (): void => {
  hydrate(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
    document.getElementById('react-view'),
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('components/App', () => {
    renderApp()
  })
}
