import React, { type FC } from 'react'
import { Route, Link } from 'react-router-dom'

import Test from './Test'
import TestVar from './TestVar'
// import TestServer from './TestServer'

const App: FC = () => (
  <React.StrictMode>
    <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
      <Link to="/test">Test</Link>
      <Link to="/test-var">Test var</Link>
      {/* <Link to="/test-server">Test Server</Link> */}
    </div>
    <Route path="/test" component={Test} />
    <Route path="/test-var" component={TestVar} />
    {/* <Route path="/test-server" component={TestServer} /> */}
  </React.StrictMode>
)

export default App
