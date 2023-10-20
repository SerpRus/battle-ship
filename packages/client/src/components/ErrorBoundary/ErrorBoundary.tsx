import { Component, ErrorInfo } from 'react'
import { Props, TState } from './typings'

class ErrorBoundary extends Component<Props, TState> {
  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.state = { error: null }
  }

  public static getDerivedStateFromError(error: Error): TState {
    return { error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)

    this.setState({
      error,
    })
  }

  public render() {
    const { error } = this.state

    if (error) {
      return (
        // error page
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
