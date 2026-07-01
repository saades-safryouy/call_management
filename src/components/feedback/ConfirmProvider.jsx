import React, { createContext, useState, useCallback, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Spinner from '../ui/Spinner';

export const ConfirmContext = createContext(null);

const VARIANT_STYLES = {
  danger: { icon: 'bg-red-50 text-primary', button: 'bg-primary hover:bg-primary-600 focus:ring-primary' },
  primary: { icon: 'bg-primary-50 text-primary', button: 'bg-primary hover:bg-primary-600 focus:ring-primary' },
  warning: { icon: 'bg-amber-50 text-amber-600', button: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500' },
};

/**
 * ConfirmProvider — exposes an imperative, promise-based confirm() dialog.
 * Usage:
 *   const confirm = useConfirm();
 *   if (await confirm({ title, message, confirmText, variant: 'danger' })) { ... }
 */
export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);
  const resolverRef = useRef(null);

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setState({
        title: options.title || 'Are you sure?',
        message: options.message || 'This action cannot be undone.',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        variant: options.variant || 'danger',
      });
    });
  }, []);

  const close = useCallback((result) => {
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
    setBusy(false);
    setState(null);
  }, []);

  const styles = state ? VARIANT_STYLES[state.variant] || VARIANT_STYLES.danger : null;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => !busy && close(false)}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-[popIn_0.15s_ease-out]">
            <button
              onClick={() => !busy && close(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-gray-900">{state.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{state.message}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => close(false)}
                  disabled={busy}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50"
                >
                  {state.cancelText}
                </button>
                <button
                  onClick={() => {
                    setBusy(true);
                    close(true);
                  }}
                  disabled={busy}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${styles.button}`}
                >
                  {busy && <Spinner size="xs" className="border-white border-t-transparent" />}
                  {state.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
