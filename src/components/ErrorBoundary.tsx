import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: 'var(--bg-base)'
        }}>
          <Card style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Geist, sans-serif', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Oops.
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Something went wrong.
            </p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
