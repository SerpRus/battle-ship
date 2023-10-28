import { Component, ErrorInfo } from 'react';
import { Props, TState } from './typings';

class ErrorBoundary extends Component<Props, TState> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(error: Error): TState {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo); // eslint-disable-line no-console

    this.setState({
      error,
    });
  }

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        // error page
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
          </details>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
