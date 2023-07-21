import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { loadableReady } from '@loadable/component'

import App from '@/components/App'

const getTree = () => (
  <HelmetProvider>
    <App />
  </HelmetProvider>
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
