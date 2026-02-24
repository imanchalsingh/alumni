// AlumniProfile.tsx - This is for the alumni site (their own profile)
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
    // Check if user is logged in
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#00565c' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#00565c' }}>My Alumni Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#5c002c' }}
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #00565c 0%, #003d42 100%)' }}>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl text-white">
                  {profile?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{profile?.name}</h2>
                <p className="text-blue-100">Batch of {profile?.batch_year}</p>
                <p className="text-blue-100 text-sm mt-1">Member since: {new Date(profile?.createdAt || '').toLocaleDateString()}</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-8">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none"
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white rounded-lg transition-colors"
                    style={{ backgroundColor: '#00565c' }}
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

// Helper Components
const InfoField: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-gray-900">{value || 'Not provided'}</p>
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
      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none"
      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
    />
  </div>
);

export default AlumniProfile;