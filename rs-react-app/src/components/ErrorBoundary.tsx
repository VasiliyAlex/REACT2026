import type { ReactNode, ErrorInfo } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  };
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

 componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <p>Seems like an error occured!</p>
          <p>{error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}