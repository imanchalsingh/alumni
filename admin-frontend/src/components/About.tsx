import { useEffect, useState } from "react";
import api from "../api/axios.ts";

interface AboutForm {
  siteName: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  totalAlumni: string;
  workshopsConducted: string;
  servicesOffered: string;
  email: string;
  phone?: string;
  address?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  establishedYear?: string;
  affiliatedTo?: string;
  accreditation?: string;
}

export default function About() {
  const [form, setForm] = useState<AboutForm>({
    siteName: "",
    tagline: "",
    description: "",
    mission: "",
    vision: "",
    totalAlumni: "",
    workshopsConducted: "",
    servicesOffered: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    establishedYear: "",
    affiliatedTo: "",
    accreditation: "",
  });

  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await api.get("/about/admin");

      if (res.data.data) {
        const d = res.data.data;

        setExists(true);

        setForm({
          siteName: d.siteName || "",
          tagline: d.tagline || "",
          description: d.description || "",
          mission: d.mission || "",
          vision: d.vision || "",
          totalAlumni: d.stats?.totalAlumni || "",
          workshopsConducted: d.stats?.workshopsConducted || "",
          servicesOffered: d.stats?.servicesOffered || "",
          email: d.contact?.email || "",
          phone: d.contact?.phone || "",
          address: d.address || "",
          facebook: d.social?.facebook || "",
          twitter: d.social?.twitter || "",
          linkedin: d.social?.linkedin || "",
          instagram: d.social?.instagram || "",
          establishedYear: d.establishedYear || "",
          affiliatedTo: d.affiliatedTo || "",
          accreditation: d.accreditation || "",
        });
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Failed to load about information');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    const payload = {
      siteName: form.siteName,
      tagline: form.tagline,
      description: form.description,
      mission: form.mission,
      vision: form.vision,
      establishedYear: form.establishedYear,
      affiliatedTo: form.affiliatedTo,
      accreditation: form.accreditation,
      address: form.address,
      stats: {
        totalAlumni: form.totalAlumni,
        workshopsConducted: form.workshopsConducted,
        servicesOffered: form.servicesOffered,
      },
      contact: {
        email: form.email,
        phone: form.phone,
      },
      social: {
        facebook: form.facebook,
        twitter: form.twitter,
        linkedin: form.linkedin,
        instagram: form.instagram,
      },
    };

    try {
      if (exists) {
        await api.put("/about", payload);
        setSuccessMessage('About information updated successfully!');
      } else {
        await api.post("/about/create", payload);
        setSuccessMessage('About information created successfully!');
        setExists(true);
      }

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.log(err);
      setErrorMessage('Error saving about information');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'stats', label: 'Statistics' },
    { id: 'contact', label: 'Contact' },
  ];

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm bg-white";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ba9629] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading about information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">About Page Settings</h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage your institution's about page content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer"
              >
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          {exists && (
            <div className="mt-3 text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
              About information exists - you're in update mode
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
            <span className="text-sm text-green-700">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <span className="text-sm text-red-700">{errorMessage}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-5 py-2.5 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? 'border-[#ba9629] text-[#ba9629]'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClassName}>Site Name</label>
                    <input
                      name="siteName"
                      placeholder="Enter your site name"
                      value={form.siteName}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClassName}>Tagline</label>
                    <input
                      name="tagline"
                      placeholder="Enter a catchy tagline"
                      value={form.tagline}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClassName}>Description</label>
                    <textarea
                      name="description"
                      placeholder="Write a detailed description about your institution"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Established Year</label>
                    <input
                      name="establishedYear"
                      placeholder="e.g., 1995"
                      value={form.establishedYear}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Affiliated To</label>
                    <input
                      name="affiliatedTo"
                      placeholder="e.g., University Name"
                      value={form.affiliatedTo}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Accreditation</label>
                    <input
                      name="accreditation"
                      placeholder="e.g., NAAC Grade A"
                      value={form.accreditation}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mission & Vision Tab */}
            {activeTab === 'mission' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassName}>Mission</label>
                    <textarea
                      name="mission"
                      placeholder="Describe your institution's mission"
                      value={form.mission}
                      onChange={handleChange}
                      rows={6}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Vision</label>
                    <textarea
                      name="vision"
                      placeholder="Describe your institution's vision"
                      value={form.vision}
                      onChange={handleChange}
                      rows={6}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClassName}>Total Alumni</label>
                    <input
                      name="totalAlumni"
                      placeholder="e.g., 1000+"
                      value={form.totalAlumni}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Workshops Conducted</label>
                    <input
                      name="workshopsConducted"
                      placeholder="e.g., 50+"
                      value={form.workshopsConducted}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Services Offered</label>
                    <input
                      name="servicesOffered"
                      placeholder="e.g., 15+"
                      value={form.servicesOffered}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassName}>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="contact@institution.edu"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 1234567890"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClassName}>Address</label>
                    <textarea
                      name="address"
                      placeholder="Institution's complete address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Facebook</label>
                    <input
                      name="facebook"
                      placeholder="Facebook URL"
                      value={form.facebook}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Twitter</label>
                    <input
                      name="twitter"
                      placeholder="Twitter URL"
                      value={form.twitter}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>LinkedIn</label>
                    <input
                      name="linkedin"
                      placeholder="LinkedIn URL"
                      value={form.linkedin}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Instagram</label>
                    <input
                      name="instagram"
                      placeholder="Instagram URL"
                      value={form.instagram}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => fetchAbout()}
                className="px-4 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-1.5 bg-[#ba9629] text-white rounded hover:bg-[#a88523] text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? 'Saving...' : (exists ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {previewMode && (
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-800">Preview</h3>
            </div>

            <div className="p-5">
              <div className="border border-gray-200 rounded overflow-hidden">
                {/* Header */}
                <div className="bg-[#ba9629] p-5 text-white">
                  <h1 className="text-2xl font-bold">{form.siteName || 'Your Site Name'}</h1>
                  <p className="text-white/80 text-sm mt-1">{form.tagline || 'Your tagline here'}</p>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Description */}
                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">About Us</h3>
                    <p className="text-gray-600 text-sm">{form.description || 'Description will appear here'}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-xl font-bold text-[#ba9629]">{form.totalAlumni || '0'}</div>
                      <div className="text-xs text-gray-600">Total Alumni</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-xl font-bold text-[#ba9629]">{form.workshopsConducted || '0'}</div>
                      <div className="text-xs text-gray-600">Workshops</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-xl font-bold text-[#ba9629]">{form.servicesOffered || '0'}</div>
                      <div className="text-xs text-gray-600">Services</div>
                    </div>
                  </div>

                  {/* Mission & Vision */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">Our Mission</h3>
                      <p className="text-gray-600 text-sm">{form.mission || 'Mission statement will appear here'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">Our Vision</h3>
                      <p className="text-gray-600 text-sm">{form.vision || 'Vision statement will appear here'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}