import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import profileService from '../../services/profileService';

const fields = [
  { key: 'oldPassword', label: 'Current Password' },
  { key: 'newPassword', label: 'New Password' },
  { key: 'confirmPassword', label: 'Confirm New Password' },
];

export default function ChangePasswordCard() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setSaving(true);

    try {
      await profileService.changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setSuccess('Password changed successfully.');
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e) {
      setError(e.userMessage || 'Unable to change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
          <Lock className="h-4 w-4 text-gray-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-100 bg-green-50 px-4 py-2.5 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">{label}</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={form[key]}
                onChange={handleChange(key)}
                className="w-full rounded-lg border border-gray-200 p-3 pr-10 text-sm outline-none transition-colors focus:border-gray-400"
              />
              {key === 'newPassword' && (
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#E30613] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}