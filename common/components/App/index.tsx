import React from 'react'
import { Route, Link } from 'react-router-dom'

import PopularArtists from './PopularArtists'

const App = () => (
  <React.StrictMode>
    <Link to="/test">Test</Link>
    <Route path="/test" component={PopularArtists} />
  </React.StrictMode>
)

export default App
