import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Alumni {
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
}

interface NewAlumni {
  name: string;
  father_name: string;
  batch_year: number | "";
  designation: string;
  organization: string;
  email: string;
  address: string;
  mobile_number: string;
  password?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [newAlumni, setNewAlumni] = useState<NewAlumni>({
    name: "",
    father_name: "",
    batch_year: "",
    designation: "",
    organization: "",
    email: "",
    address: "",
    mobile_number: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAlumni(prev => ({
      ...prev,
      [name]: name === "batch_year" ? (value ? Number(value) : "") : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!newAlumni.name || !newAlumni.batch_year) {
      setSubmitStatus({ type: 'error', message: "Name and Batch Year are required!" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/alumni/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlumni),
      });

      if (res.ok) {
        if (res.ok) {
          const data = await res.json();

          // save token
          localStorage.setItem("alumniToken", data.token);

          // navigate AFTER token saved
          navigate("/alumni-dashboard", { replace: true });
        }
        setNewAlumni({
          name: "",
          father_name: "",
          batch_year: "",
          designation: "",
          organization: "",
          email: "",
          address: "",
          mobile_number: "",
          password: "",
        });
        setSubmitStatus({ type: 'success', message: 'Alumni added successfully!' });

        // Clear success message after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to add alumni. Please try again.' });
      }
    } catch (error) {
      console.error("Error adding alumni:", error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: '#00565c' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Alumni</h1>
          <p className="text-lg text-gray-600">Help us expand our alumni network by adding new members</p>
        </div>

        {/* Status Message */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
            ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
            : 'bg-red-50 border-l-4 border-red-500 text-red-700'
            }`}>
            <div className="flex items-center">
              {submitStatus.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{submitStatus.message}</span>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Card Header with Accent Color */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #00565c 0%, #003d42 100%)' }}>
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Alumni Registration Form
            </h2>
            <p className="text-blue-100 text-sm mt-1">Please fill in the details below to add a new alumni</p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={newAlumni.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        focusRing: '2px solid #ba9629',
                        borderColor: newAlumni.name ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.name ? '#00565c' : '#e5e7eb'}
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Father's Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="father_name"
                      value={newAlumni.father_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.father_name ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.father_name ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Batch Year Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="batch_year"
                      value={newAlumni.batch_year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.batch_year ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.batch_year ? '#00565c' : '#e5e7eb'}
                      required
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Mobile Number Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobile_number"
                      value={newAlumni.mobile_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.mobile_number ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.mobile_number ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={newAlumni.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.email ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.email ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* password */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={newAlumni.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.password ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.password ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Designation Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="designation"
                      value={newAlumni.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.designation ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.designation ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Organization Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="organization"
                      value={newAlumni.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                      style={{
                        borderColor: newAlumni.organization ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.organization ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Address Field */}
                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={newAlumni.address}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11 resize-none"
                      style={{
                        borderColor: newAlumni.address ? '#00565c' : undefined
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                      onBlur={(e) => e.target.style.borderColor = newAlumni.address ? '#00565c' : '#e5e7eb'}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#ba9629]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#00565c',
                    boxShadow: '0 4px 6px rgba(0,86,92,0.25)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00474d'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00565c'}
                >
                  <span className="flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Alumni...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Alumni
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium" style={{ color: '#5c002c' }}>Note:</span> Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register