import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ProfileCard from './ProfileCard';
import ChangePasswordCard from './ChangePasswordCard';
import profileService from '../../services/profileService';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await profileService.getProfile();
      setUser(data);
    } catch (e) {
      console.error(e);
      setError('Could not load your profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 p-16 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={loadProfile}
          className="mt-3 text-sm font-medium text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <ProfileCard user={user} />
      <ChangePasswordCard />
    </div>
  );
}