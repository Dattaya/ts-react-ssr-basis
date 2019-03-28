import '@babel/polyfill'
import React from 'react'
import { hydrate } from 'react-dom'

import App from 'components/App'

const renderApp = (): void => {
  hydrate(
    <App />,
    document.getElementById('react-view'),
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('components/App', () => {
    renderApp()
  })
}
