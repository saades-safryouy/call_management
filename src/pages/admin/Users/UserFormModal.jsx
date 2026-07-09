import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import userService from '../../../services/userService';
import useToast from '../../../hooks/useToast';
import { USER_ROLES } from '../../../utils/constants';

const ROLE_OPTIONS = Object.values(USER_ROLES);

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  roleName: USER_ROLES.CANDIDATE,
  enabled: true,
};

const inputClass =
  'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500';
const labelClass = 'mb-1 block text-sm font-medium text-gray-700';
const errClass = 'mt-1 text-xs font-medium text-primary';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getUserId = (user) => user?.userId ?? user?.id;

const UserFormModal = ({ open, mode, user, onClose, onSaved }) => {
  const isEdit = mode === 'edit';
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    if (isEdit && user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        roleName: user.roleName || user.role || USER_ROLES.CANDIDATE,
        enabled: user.enabled !== false,
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [open, isEdit, user]);

  const setField = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) next.firstName = 'First name is required.';
    if (!form.lastName.trim()) next.lastName = 'Last name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!emailRegex.test(form.email.trim())) next.email = 'Enter a valid email.';
    if (!form.roleName) next.roleName = 'Role is required.';
    if (!isEdit && !form.password) next.password = 'Password is required.';
    else if (form.password && form.password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => ({
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    roleName: form.roleName,
    enabled: form.enabled,
    ...(form.password ? { password: form.password } : {}),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (isEdit) {
        await userService.update(getUserId(user), buildPayload());
        toast.success('User updated.');
      } else {
        await userService.create(buildPayload());
        toast.success('User created.');
      }

      onSaved?.();
      onClose?.();
    } catch (error) {
      toast.error(error.userMessage || `Failed to ${isEdit ? 'update' : 'create'} user.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={submitting ? undefined : onClose}
      title={isEdit ? 'Edit user' : 'Add user'}
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
            <label className={labelClass} htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className={inputClass}
              value={form.firstName}
              onChange={setField('firstName')}
            />
            {errors.firstName && <p className={errClass}>{errors.firstName}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className={inputClass}
              value={form.lastName}
              onChange={setField('lastName')}
            />
            {errors.lastName && <p className={errClass}>{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={setField('email')}
          />
          {errors.email && <p className={errClass}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="password">
            {isEdit ? 'New password' : 'Password'}
          </label>
          <input
            id="password"
            type="password"
            className={inputClass}
            value={form.password}
            onChange={setField('password')}
            placeholder={isEdit ? 'Leave empty to keep current password' : 'At least 6 characters'}
          />
          {errors.password && <p className={errClass}>{errors.password}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="roleName">
              Role
            </label>
            <select
              id="roleName"
              className={inputClass}
              value={form.roleName}
              onChange={setField('roleName')}
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.roleName && <p className={errClass}>{errors.roleName}</p>}
          </div>

          <div>
            <span className={labelClass}>Status</span>
            <label className="flex h-[38px] items-center gap-3 rounded-lg border border-gray-300 px-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={setField('enabled')}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Active account
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
