import React from 'react'
import { Helmet } from "react-helmet"

import LazyLoadable from 'components/Lazy/loadable'
import ErrorBoundary from './ErrorBoundary'
import './global.css?global'
import classes from './styles.css'

// you can create your own wrapper with try and catch and use it whenewer you need to lazy load a component
class App extends React.Component {
  public state = {
    isLoadableComponentShown: false,
  }

  private showLoadableComponent = () => this.setState({ isLoadableComponentShown: true })

  public render() {
    const { isLoadableComponentShown } = this.state

    return (
      <div className="test">
        <Helmet
          titleTemplate="%s - ts-react-ssr-basis"
        >
          <title>Home</title>
        </Helmet>
        {/*
        // @ts-ignore */}
        <marquee><h1 className={classes.title}>Welcome to Bob's Home Page</h1></marquee> {// eslint-disable-line
        }
        <ErrorBoundary>
          {isLoadableComponentShown ? <LazyLoadable /> : <button className={classes.button} onClick={this.showLoadableComponent}>Load lazy component</button>}
        </ErrorBoundary>
      </div>
    )
  }
}

export default App
