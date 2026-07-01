import React, { createContext, useState, useCallback, useMemo } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContext = createContext(null);

const VARIANTS = {
  success: { icon: CheckCircle2, ring: 'ring-green-200', accent: 'bg-green-500', text: 'text-green-800', iconColor: 'text-green-500' },
  error: { icon: XCircle, ring: 'ring-red-200', accent: 'bg-primary', text: 'text-red-800', iconColor: 'text-primary' },
  warning: { icon: AlertTriangle, ring: 'ring-amber-200', accent: 'bg-amber-500', text: 'text-amber-800', iconColor: 'text-amber-500' },
  info: { icon: Info, ring: 'ring-blue-200', accent: 'bg-blue-500', text: 'text-blue-800', iconColor: 'text-blue-500' },
};

let toastId = 0;

const ToastItem = ({ toast, onDismiss }) => {
  const variant = VARIANTS[toast.type] || VARIANTS.info;
  const Icon = variant.icon;

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg ring-1 ${variant.ring} animate-[slideIn_0.2s_ease-out]`}
    >
      <div className={`w-1.5 flex-shrink-0 ${variant.accent}`} />
      <div className="flex flex-1 items-start gap-3 p-4">
        <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${variant.iconColor}`} />
        <div className="min-w-0 flex-1">
          {toast.title && <p className="text-sm font-bold text-gray-900">{toast.title}</p>}
          <p className={`text-sm ${toast.title ? 'mt-0.5 text-gray-600' : 'font-medium text-gray-800'}`}>
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type, message, options = {}) => {
      const id = ++toastId;
      const duration = options.duration ?? 4500;
      setToasts((prev) => [...prev, { id, type, message, title: options.title }]);
      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      addToast,
      removeToast,
      success: (message, options) => addToast('success', message, options),
      error: (message, options) => addToast('error', message, options),
      warning: (message, options) => addToast('warning', message, options),
      info: (message, options) => addToast('info', message, options),
    }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-3 p-4 sm:p-6">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
