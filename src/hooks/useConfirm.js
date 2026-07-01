import { useContext } from 'react';
import { ConfirmContext } from '../components/feedback/ConfirmProvider';

/**
 * useConfirm — returns an async confirm() that resolves to true/false.
 * Usage: const confirm = useConfirm();
 *        if (await confirm({ title, message, variant: 'danger' })) { ... }
 */
const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return confirm;
};

export default useConfirm;
