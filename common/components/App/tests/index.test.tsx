import React from 'react'
import tr from 'react-test-renderer'
import { HelmetProvider } from 'react-helmet-async'

import App from 'components/App'
import LazyLoadable from 'components/Lazy/loadable'

const AppH = () => (<HelmetProvider><App /></HelmetProvider>)
jest.mock('components/Lazy/loadable', () => jest.fn(() => null))

describe('<App />', () => {
  it('hides the button and loads the Lazy component', () => {
    const app = tr.create(<AppH />)
    tr.act(() => app.root.findByType('button').props.onClick())
    expect(app.root.findAllByType('button').length).toBe(0)
    expect(app.root.findAllByType(LazyLoadable).length).toBe(1)
  })

  it('handles errors when the Lazy component fails to load', () => {
    (LazyLoadable as unknown as jest.Mock).mockImplementationOnce(() => { throw new Error() })
    const app = tr.create(<AppH />)
    tr.act(() => app.root.findByType('button').props.onClick())
    expect(app.root.findAllByType(LazyLoadable).length).toBe(0)
  })
})
