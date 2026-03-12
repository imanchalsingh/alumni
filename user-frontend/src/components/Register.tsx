import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Calendar, Building, MapPin, Lock, Briefcase, UserCircle, ArrowLeft, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (length < 6) {
      setPasswordStrength('weak');
    } else if (strength >= 3 && length >= 8) {
      setPasswordStrength('strong');
    } else if (strength >= 2) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAlumni(prev => {
      const updated = {
        ...prev,
        [name]: name === "batch_year" ? (value ? Number(value) : "") : value
      };

      if (name === 'password') {
        checkPasswordStrength(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation
    if (!newAlumni.name || !newAlumni.batch_year) {
      setSubmitStatus({ type: 'error', message: "Name and Batch Year are required!" });
      setIsSubmitting(false);
      return;
    }

    if (newAlumni.password && newAlumni.password.length < 6) {
      setSubmitStatus({ type: 'error', message: "Password must be at least 6 characters long!" });
      setIsSubmitting(false);
      return;
    }

    if (newAlumni.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAlumni.email)) {
      setSubmitStatus({ type: 'error', message: "Please enter a valid email address!" });
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
        const data = await res.json();

        // save token
        localStorage.setItem("alumniToken", data.token);

        setSubmitStatus({ type: 'success', message: 'Registration successful! Redirecting...' });

        // navigate AFTER token saved
        setTimeout(() => {
          navigate("/alumni-dashboard", { replace: true });
        }, 1500);
      } else {
        const errorData = await res.json();
        setSubmitStatus({ type: 'error', message: errorData.message || 'Failed to register. Please try again.' });
      }
    } catch (error) {
      console.error("Error adding alumni:", error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full h-[95vh] flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br from-[#00565c] to-[#003d42] relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-8 border-white rounded-full">
              <img src="https://rmlauadm.samarth.edu.in/assets/8b138cd6838ba6b5ed5f22c648a45c25/site_files/rmlau_logo.png" alt="" /></div>
          </div>

          <div className="relative z-10 p-12 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-8">
              <UserCircle className="w-10 h-10 text-white" />
              <span className="text-2xl font-bold text-white">Alumni Network</span>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-4">Welcome!</h2>
              <p className="text-blue-100 text-lg mb-8">
                Join our growing community of successful alumni and stay connected with your alma mater.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Build Your Network</h3>
                    <p className="text-blue-200 text-sm">Connect with 1000+ alumni</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Career Opportunities</h3>
                    <p className="text-blue-200 text-sm">Access exclusive job postings</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Events & Workshops</h3>
                    <p className="text-blue-200 text-sm">Participate in exclusive events</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <p className="text-white text-sm">
                  "Being part of this alumni network has opened countless doors for my career."
                </p>
                <p className="text-blue-200 text-xs mt-2">— Sarah Johnson, Batch of 2020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-3/5 bg-white flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#00565c] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>

          {/* Form Container - Scrollable area */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span className={`text-sm ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                      {submitStatus.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={newAlumni.name}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Father's Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father's Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="father_name"
                        value={newAlumni.father_name}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="Enter father's name"
                      />
                    </div>
                  </div>

                  {/* Mobile Number Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="mobile_number"
                        value={newAlumni.mobile_number}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  {/* Batch Year Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Year <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        name="batch_year"
                        value={newAlumni.batch_year}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="e.g., 2020"
                        min="1950"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Designation Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="designation"
                        value={newAlumni.designation}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                  </div>

                  {/* Organization Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="organization"
                        value={newAlumni.organization}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="e.g., Google, Microsoft"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={newAlumni.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={newAlumni.password}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newAlumni.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1">
                          <div className={`flex-1 rounded-full transition-all ${passwordStrength === 'weak' ? getPasswordStrengthColor() : 'bg-gray-200'}`}></div>
                          <div className={`flex-1 rounded-full transition-all ${passwordStrength === 'medium' || passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-gray-200'}`}></div>
                          <div className={`flex-1 rounded-full transition-all ${passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-gray-200'}`}></div>
                        </div>
                        <p className={`text-xs mt-1 ${passwordStrength === 'strong' ? 'text-green-600' :
                          passwordStrength === 'medium' ? 'text-yellow-600' :
                            passwordStrength === 'weak' ? 'text-red-600' : ''
                          }`}>
                          {passwordStrength === 'strong' ? 'Strong password' :
                            passwordStrength === 'medium' ? 'Medium password' :
                              passwordStrength === 'weak' ? 'Weak password' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    name="address"
                    value={newAlumni.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all text-sm resize-none"
                    placeholder="Enter your full address"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-[#00565c] border-gray-300 rounded focus:ring-[#00565c]"
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-[#00565c] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#00565c] hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-linear-to-r from-[#00565c] to-[#003d42] text-white rounded-lg hover:from-[#00474d] hover:to-[#003238] transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-xs text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#00565c] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;