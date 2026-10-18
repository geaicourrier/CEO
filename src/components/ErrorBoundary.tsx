import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[C.E.O.] Runtime error caught by boundary:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-corporate-abyss px-6 text-center text-slate-200">
          <p className="font-press text-lg font-bold">Le conseil a perdu le fil.</p>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Une erreur inattendue est survenue. Votre partie sauvegardée est intacte.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded border border-corporate-line bg-corporate-panel px-4 py-2 font-ui text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400"
          >
            Revenir au menu
          </button>
          {this.state.message && (
            <p className="max-w-sm font-mono text-[10px] text-slate-600">{this.state.message}</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
