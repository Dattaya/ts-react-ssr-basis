import React, { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'

import LazyLoadable from 'components/Lazy/loadable'
import ErrorBoundary from './ErrorBoundary'
import './global.css?global'
import classes from './styles.css'

const App: React.FunctionComponent = () => {
  const [isLoadableComponentShown, setIsLoadableComponentShown] = useState(false)
  const showLoadableComponent = useCallback(() => setIsLoadableComponentShown(true), [])

  return (
    <div className="test">
      <Helmet
        titleTemplate="%s - ts-react-ssr-basis"
      >
        <title>Home</title>
      </Helmet>
      <h1 className={classes.title}>Welcome to Bob's Home Page</h1>
      <ErrorBoundary>
        {isLoadableComponentShown ? <LazyLoadable /> : <button className={classes.button} onClick={showLoadableComponent}>Load lazy component</button>}
      </ErrorBoundary>
    </div>
  )
}

export default App
