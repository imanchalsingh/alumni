import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AlumniProfileData {
  _id: string;
  name: string;
  father_name?: string;
  course?: string;
  batch_year: number;
  designation?: string;
  organization?: string;
  email?: string;
  address?: string;
  mobile_number?: string;
  profileImage?: string;
  createdAt?: string;
}

const AlumniProfile: React.FC = () => {
  const [profile, setProfile] = useState<AlumniProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<AlumniProfileData>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('alumniToken');
    if (!token) {
      navigate('/');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('alumniToken');
      const res = await fetch('http://localhost:5000/api/alumni/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        localStorage.removeItem('alumniToken');
        navigate('/');
        return;
      }

      const data = await res.json();
      setProfile(data);
      setEditForm(data);
    } catch (error) {
      setError('Error fetching profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('alumniToken');
      const res = await fetch('http://localhost:5000/api/alumni/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('alumniToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00565c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-[#00565c] text-white rounded hover:bg-[#004348] text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#00565c] px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl text-white font-semibold">
                  {profile?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">{profile?.name}</h2>
                <p className="text-white/80 text-sm">Batch of {profile?.batch_year}</p>
                {profile?.createdAt && (
                  <p className="text-white/60 text-xs mt-1">
                    Member since: {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-6">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoField label="Father's Name" value={profile?.father_name} />
                <InfoField label="Course" value={profile?.course || 'BCA'} />
                <InfoField label="Mobile Number" value={profile?.mobile_number} />
                <InfoField label="Email" value={profile?.email} />
                <InfoField label="Designation" value={profile?.designation} />
                <InfoField label="Organization" value={profile?.organization} />
                <div className="md:col-span-2">
                  <InfoField label="Address" value={profile?.address} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <EditField
                    label="Name"
                    name="name"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <EditField
                    label="Father's Name"
                    name="father_name"
                    value={editForm.father_name || ''}
                    onChange={(e) => setEditForm({ ...editForm, father_name: e.target.value })}
                  />
                  <EditField
                    label="Mobile Number"
                    name="mobile_number"
                    value={editForm.mobile_number || ''}
                    onChange={(e) => setEditForm({ ...editForm, mobile_number: e.target.value })}
                  />
                  <EditField
                    label="Designation"
                    name="designation"
                    value={editForm.designation || ''}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                  />
                  <EditField
                    label="Organization"
                    name="organization"
                    value={editForm.organization || ''}
                    onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={editForm.address || ''}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00565c] text-white rounded hover:bg-[#004348] text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="mt-1 text-gray-800 text-sm">{value || '—'}</p>
  </div>
);

const EditField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] text-sm"
    />
  </div>
);

export default AlumniProfile;