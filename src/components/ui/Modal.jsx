import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * Modal — reusable dialog shell (overlay + panel + header + scrollable body + footer).
 * Props: open, onClose, title, size, footer, children.
 * Closes on backdrop click and Escape.
 */
const Modal = ({ open, onClose, title, size = 'md', footer, children }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative flex max-h-[90vh] w-full ${SIZES[size] || SIZES.md} flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-[popIn_0.15s_ease-out]`}
      >
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <footer className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
