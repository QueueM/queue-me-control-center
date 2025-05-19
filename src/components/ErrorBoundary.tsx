
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Pick<ErrorBoundaryState, 'hasError'> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
    
    // You could send this to your error reporting service
    // Example: sendToErrorReportingService(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            There was a problem with this component. We've been notified and will fix it as soon as possible.
          </p>
          <div className="space-x-4">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
            <Button onClick={this.resetErrorBoundary}>
              Try Again
            </Button>
          </div>
          
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="mt-8 p-4 bg-muted text-left rounded-md overflow-auto max-w-full">
              <details>
                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                <p className="text-destructive">{this.state.error?.toString()}</p>
                <pre className="text-sm mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
