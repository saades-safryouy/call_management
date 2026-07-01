import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

/**
 * ErrorBoundary — catches uncaught render errors so the whole app never
 * white-screens. Shows a branded fallback with a reload action.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught UI error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary">
            <AlertOctagon className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            An unexpected error occurred while rendering this page. You can try reloading.
          </p>
          <button
            onClick={this.handleReload}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-600 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
