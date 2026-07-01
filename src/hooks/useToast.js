import { useContext } from 'react';
import { ToastContext } from '../components/feedback/ToastProvider';

/**
 * useToast — access the global toast API.
 * Usage: const toast = useToast(); toast.success('Saved!'); toast.error(msg);
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;
