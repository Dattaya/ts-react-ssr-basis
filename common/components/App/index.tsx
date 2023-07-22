import React, { type FC } from 'react'
import { Route, Link } from 'react-router-dom'

import PopularArtists from './PopularArtists'
import Test from './Test'

const App: FC = () => (
  <React.StrictMode>
    <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
      <Link to="/artists">Artists</Link>
      <Link to="/test">Test</Link>
    </div>
    <Route path="/artists" component={PopularArtists} />
    <Route path="/test" component={Test} />
  </React.StrictMode>
)

export default App
