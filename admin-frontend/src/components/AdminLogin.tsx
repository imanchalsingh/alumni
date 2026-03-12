import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginForm {
    email: string;
    password: string;
}

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AdminLoginForm>({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Email and password are required!");
            setIsSubmitting(false);
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address!");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Login successful! Redirecting to dashboard...");

                // Store token
                if (rememberMe) {
                    localStorage.setItem('adminToken', data.token);
                    localStorage.setItem('adminEmail', formData.email);
                } else {
                    sessionStorage.setItem('adminToken', data.token);
                    sessionStorage.setItem('adminEmail', formData.email);
                }

                // Redirect to admin dashboard after delay
                setTimeout(() => {
                    navigate('/admin-alumni-profile');
                }, 1500);
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check if already logged in
    React.useEffect(() => {
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        if (token) {
            navigate('/admin-alumni-profile');
        }
    }, [navigate]);

    // Dark yellow accent color
    const accentColor = '#ba9629';

    return (
        <div className="h-screen w-screen overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full h-[95vh] flex rounded-2xl shadow-2xl overflow-hidden bg-white">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)` }}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-8 border-white rounded-full">
                            <img src="https://rmlauadm.samarth.edu.in/assets/8b138cd6838ba6b5ed5f22c648a45c25/site_files/rmlau_logo.png" alt="" /></div>
                    </div>

                    <div className="relative z-10 p-12 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-8">
                            <Shield className="w-10 h-10 text-white" />
                            <span className="text-2xl font-bold text-white">Admin Portal</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Administrator Access</h2>
                            <p className="text-yellow-100 text-lg mb-8">
                                Secure login for administrators to manage the alumni network, events, and system settings.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">User Management</h3>
                                        <p className="text-yellow-100 text-sm">Manage alumni and student accounts</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Analytics & Reports</h3>
                                        <p className="text-yellow-100 text-sm">View system statistics and generate reports</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">System Configuration</h3>
                                        <p className="text-yellow-100 text-sm">Manage settings and permissions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                                <p className="text-white text-sm italic">
                                    "Secure access for authorized personnel only. All activities are logged for security purposes."
                                </p>
                                <p className="text-yellow-100 text-xs mt-2">— System Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-3/5 bg-white flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#ba9629] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back to Home</span>
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                        <div className="w-20"></div> {/* Spacer for alignment */}
                    </div>

                    {/* Form Container */}
                    <div className="flex-1 overflow-y-auto px-8 py-6">
                        {/* Success Message */}
                        {success && (
                            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                                    <span className="text-sm text-green-700">{success}</span>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                                    <span className="text-sm text-red-700">{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                                        style={{
                                            borderColor: formData.email ? accentColor : '#e5e7eb',
                                            '--tw-ring-color': 'rgba(186, 150, 41, 0.2)'
                                        } as React.CSSProperties}
                                        onFocus={(e) => e.target.style.borderColor = accentColor}
                                        onBlur={(e) => e.target.style.borderColor = formData.email ? accentColor : '#e5e7eb'}
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Use your official email address</p>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                                        style={{
                                            borderColor: formData.password ? accentColor : '#e5e7eb',
                                            '--tw-ring-color': 'rgba(186, 150, 41, 0.2)'
                                        } as React.CSSProperties}
                                        onFocus={(e) => e.target.style.borderColor = accentColor}
                                        onBlur={(e) => e.target.style.borderColor = formData.password ? accentColor : '#e5e7eb'}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                                        style={{ accentColor: accentColor }}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/forgot-password')}
                                    className="text-sm font-medium hover:underline"
                                    style={{ color: accentColor }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Security Notice */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                                    <p className="text-xs text-yellow-700">
                                        This is a secure area. Unauthorized access attempts will be logged and monitored.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                style={{
                                    background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)`,
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying credentials...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        Login to Admin Panel
                                    </>
                                )}
                            </button>

                            {/* Additional Links */}
                            <div className="text-center space-y-2">
                                <p className="text-xs text-gray-500">
                                    Don't have an admin account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/contact-admin')}
                                        className="font-medium hover:underline"
                                        style={{ color: accentColor }}
                                    >
                                        Contact super administrator
                                    </button>
                                </p>
                                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Secure admin access only
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-3 border-t border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500 text-center">
                            © 2024 Alumni Management System. Authorized personnel only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;