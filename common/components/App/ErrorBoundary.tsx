import React from 'react'

export default class ErrorBoundary extends React.Component {
  public state = {
    hasError: false,
  }

  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public render() {
    const { hasError } = this.state
    return hasError ? null : this.props.children
  }
}
