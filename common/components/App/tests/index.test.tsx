import React from 'react'
import TestRenderer from 'react-test-renderer'

import App from 'components/App'
import LazyLoadable from 'components/Lazy/loadable'

describe('<App />', () => {
  it('hides the button and loads the Lazy component', () => {
    const app = TestRenderer.create(<App />)
    app.root.findByType('button').props.onClick()
    expect(app.root.findAllByType('button').length).toBe(0)
    expect(app.root.findAllByType(LazyLoadable).length).toBe(1)
  })

  it('handles errors when the Lazy component fails to load', () => {
    // @ts-ignore TODO Figure out why error 'Argument of type '"render"' is not assignable to parameter of type '"preload"''
    const renderMock = jest.spyOn(LazyLoadable, 'render').mockImplementation(() => { throw new Error() })
    const app = TestRenderer.create(<App />)
    app.root.findByType('button').props.onClick()
    expect(app.root.findAllByType(LazyLoadable).length).toBe(0)
    renderMock.mockRestore()
  })
})
