import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import userService from '../../../services/userService';
import useToast from '../../../hooks/useToast';
import { USER_ROLES } from '../../../utils/constants';

const ROLE_OPTIONS = Object.values(USER_ROLES);

const inputClass =
  'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500';
const labelClass = 'mb-1 block text-sm font-medium text-gray-700';
const errClass = 'mt-1 text-xs font-medium text-primary';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Create/Edit user modal.
 * - Create -> POST /auth/register (email, password, firstName, lastName, roleName)
 * - Edit   -> PUT /users/{id} (backend only persists firstName/lastName; email,
 *             role and status are shown read-only because the backend ignores them)
 */
const UserFormModal = ({ open, mode, user, onClose, onSaved }) => {
  const isEdit = mode === 'edit';
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleName: USER_ROLES.CANDIDATE,
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (!open) return;
    if (isEdit && user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        roleName: user.roleName || USER_ROLES.CANDIDATE,
      });
    } else {
      setForm({ firstName: '', lastName: '', email: '', password: '', roleName: USER_ROLES.CANDIDATE });
    }
    setErrors({});
  }, [open, isEdit, user]);

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = 'First name is required.';
    if (!form.lastName.trim()) next.lastName = 'Last name is required.';
    if (!isEdit) {
      if (!form.email.trim()) next.email = 'Email is required.';
      else if (!emailRegex.test(form.email.trim())) next.email = 'Enter a valid email address.';
      if (!form.password) next.password = 'Password is required.';
      else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
      if (!form.roleName) next.roleName = 'Role is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await userService.update(user.userId, {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
        });
        toast.success('User updated successfully.');
      } else {
        await userService.create({
          email: form.email.trim(),
          password: form.password,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          roleName: form.roleName,
        });
        toast.success('User created successfully.');
      }
      onSaved?.();
      onClose?.();
    } catch (err) {
      toast.error(err.userMessage || `Failed to ${isEdit ? 'update' : 'create'} user.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={submitting ? undefined : onClose}
      title={isEdit ? 'Edit user' : 'Add new user'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button form="user-form" type="submit" loading={submitting}>
            {isEdit ? 'Save changes' : 'Create user'}
          </Button>
        </>
      }
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="firstName">First name</label>
            <input id="firstName" className={inputClass} value={form.firstName} onChange={setField('firstName')} />
            {errors.firstName && <p className={errClass}>{errors.firstName}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">Last name</label>
            <input id="lastName" className={inputClass} value={form.lastName} onChange={setField('lastName')} />
            {errors.lastName && <p className={errClass}>{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={setField('email')}
            disabled={isEdit}
          />
          {errors.email && <p className={errClass}>{errors.email}</p>}
        </div>

        {!isEdit && (
          <div>
            <label className={labelClass} htmlFor="password">Temporary password</label>
            <input
              id="password"
              type="password"
              className={inputClass}
              value={form.password}
              onChange={setField('password')}
              placeholder="At least 6 characters"
            />
            {errors.password && <p className={errClass}>{errors.password}</p>}
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="roleName">Role</label>
          <select
            id="roleName"
            className={inputClass}
            value={form.roleName}
            onChange={setField('roleName')}
            disabled={isEdit}
          >
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.roleName && <p className={errClass}>{errors.roleName}</p>}
        </div>

        {isEdit && (
          <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              The backend currently only updates the first and last name. Email, role and
              account status are read-only until the corresponding backend endpoints are added.
            </p>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default UserFormModal;
