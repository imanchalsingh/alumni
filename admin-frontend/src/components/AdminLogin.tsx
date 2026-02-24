import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Email and password are required!");
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
                // Store token
                if (rememberMe) {
                    localStorage.setItem('adminToken', data.token);
                } else {
                    sessionStorage.setItem('adminToken', data.token);
                }

                // Store admin info (optional)
                localStorage.setItem('adminEmail', formData.email);

                // Redirect to admin dashboard
                navigate('/admin-alumni-profile');
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

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: '#00565c' }}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Admin Login
                    </h2>
                    <p className="text-sm text-gray-600">
                        Welcome back! Please login to your admin account.
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Card Header */}
                    <div className="px-8 py-4" style={{ background: 'linear-gradient(135deg, #00565c 0%, #003d42 100%)' }}>
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Admin Access Only
                        </h3>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-700">{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11"
                                        placeholder="admin@example.com"
                                        style={{
                                            borderColor: formData.email ? '#00565c' : undefined
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                                        onBlur={(e) => e.target.style.borderColor = formData.email ? '#00565c' : '#e5e7eb'}
                                        required
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200 pl-11 pr-11"
                                        placeholder="••••••••"
                                        style={{
                                            borderColor: formData.password ? '#00565c' : undefined
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                                        onBlur={(e) => e.target.style.borderColor = formData.password ? '#00565c' : '#e5e7eb'}
                                        required
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
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
                                        style={{ accentColor: '#00565c' }}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="/admin/forgot-password"
                                    className="text-sm font-medium hover:underline"
                                    style={{ color: '#00565c' }}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: '#00565c',
                                    boxShadow: '0 4px 6px rgba(0,86,92,0.25)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00474d'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00565c'}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    "Login to Admin Panel"
                                )}
                            </button>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-500">
                                Don't have an admin account?{" "}
                                <a
                                    href="/admin/register"
                                    className="font-medium hover:underline"
                                    style={{ color: '#00565c' }}
                                >
                                    Contact super admin
                                </a>
                            </p>
                            <p className="text-xs text-gray-400">
                                Secure admin access only
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2024 Alumni Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;