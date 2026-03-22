import { useEffect, useState } from "react";
import api from "../api/axios.ts";
import {
  Save,
  Globe,
  Target,
  Eye,
  Users,
  Calendar,
  Briefcase,
  Mail,
  Award,
  CheckCircle,
  XCircle,
  Loader
} from 'lucide-react';

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

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.log(err);
      setErrorMessage('Error saving about information');

      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Globe },
    { id: 'mission', label: 'Mission & Vision', icon: Target },
    { id: 'stats', label: 'Statistics', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const inputClassName = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ba9629]/20 focus:border-[#ba9629] transition-all duration-200 bg-white";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const sectionTitleClassName = "text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-[#ba9629] mx-auto mb-4" />
          <p className="text-gray-600">Loading about information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Page Settings</h1>
              <p className="text-gray-600 mt-2">
                Manage your institution's about page content and information
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          {exists && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              About information exists - you're in update mode
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{errorMessage}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <div className="flex overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all
                      ${activeTab === tab.id
                        ? 'border-[#ba9629] text-[#ba9629]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className={sectionTitleClassName}>
                  <Globe className="w-5 h-5 text-[#ba9629]" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="space-y-6">
                <h2 className={sectionTitleClassName}>
                  <Target className="w-5 h-5 text-[#ba9629]" />
                  Mission & Vision
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="space-y-6">
                <h2 className={sectionTitleClassName}>
                  <Award className="w-5 h-5 text-[#ba9629]" />
                  Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClassName}>Total Alumni</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="totalAlumni"
                        placeholder="e.g., 1000+"
                        value={form.totalAlumni}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClassName}>Workshops Conducted</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="workshopsConducted"
                        placeholder="e.g., 50+"
                        value={form.workshopsConducted}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClassName}>Services Offered</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="servicesOffered"
                        placeholder="e.g., 15+"
                        value={form.servicesOffered}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className={sectionTitleClassName}>
                  <Mail className="w-5 h-5 text-[#ba9629]" />
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClassName}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="contact@institution.edu"
                        value={form.email}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClassName}>Phone</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 1234567890"
                        value={form.phone}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
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
                </div>
              </div>
            )}
            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  // Reset form to last saved state
                  fetchAbout();
                }}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-2.5 bg-[#ba9629] text-white rounded-lg hover:bg-[#a88624] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {exists ? 'Update About' : 'Create About'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {previewMode && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#ba9629]" />
              Preview
            </h2>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-linear-to-r from-[#ba9629] to-[#a88624] p-6 text-white">
                <h1 className="text-3xl font-bold">{form.siteName || 'Your Site Name'}</h1>
                <p className="text-white/90 mt-2">{form.tagline || 'Your tagline here'}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">About Us</h3>
                  <p className="text-gray-600">{form.description || 'Description will appear here'}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#ba9629]">{form.totalAlumni || '0'}</div>
                    <div className="text-sm text-gray-600">Total Alumni</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#ba9629]">{form.workshopsConducted || '0'}</div>
                    <div className="text-sm text-gray-600">Workshops</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#ba9629]">{form.servicesOffered || '0'}</div>
                    <div className="text-sm text-gray-600">Services</div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Our Mission</h3>
                    <p className="text-gray-600">{form.mission || 'Mission statement will appear here'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Our Vision</h3>
                    <p className="text-gray-600">{form.vision || 'Vision statement will appear here'}</p>
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