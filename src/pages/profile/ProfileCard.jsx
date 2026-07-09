import { User, Mail, Shield } from 'lucide-react';

const getInitials = (user) => {
  const first = user?.firstName?.[0] || '';
  const last = user?.lastName?.[0] || '';
  return (first + last).toUpperCase() || '?';
};

export default function ProfileCard({ user }) {
  if (!user) return null;

  const rows = [
    { label: 'Full Name', value: `${user.firstName || ''} ${user.lastName || ''}`.trim() || '—', icon: User },
    { label: 'Email', value: user.email || '—', icon: Mail },
    { label: 'Role', value: user.roleName || '—', icon: Shield },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">
          {getInitials(user)}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Profile</h2>
          <p className="text-sm text-gray-500">Your account details</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {rows.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 py-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <Icon className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}