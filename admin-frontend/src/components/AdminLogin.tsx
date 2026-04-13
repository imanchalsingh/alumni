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
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        if (!formData.email || !formData.password) {
            setError("Email and password are required!");
            setIsSubmitting(false);
            return;
        }

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

                if (rememberMe) {
                    localStorage.setItem('adminToken', data.token);
                    localStorage.setItem('adminEmail', formData.email);
                } else {
                    sessionStorage.setItem('adminToken', data.token);
                    sessionStorage.setItem('adminEmail', formData.email);
                }

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

    React.useEffect(() => {
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        if (token) {
            navigate('/admin-alumni-profile');
        }
    }, [navigate]);

    return (
        <div className="h-screen w-screen overflow-hidden bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full h-[90vh] flex rounded-lg shadow-lg overflow-hidden bg-white">
                {/* Left Side */}
                <div className="hidden lg:flex lg:w-2/5 bg-[#ba9629] flex-col p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <Shield className="w-8 h-8 text-white" />
                        <span className="text-xl font-bold text-white">Admin Portal</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <img 
                            src="../public/vite.png" 
                            alt="Logo" 
                            className="w-32 h-32 object-contain mx-auto mb-6"
                        />
                        <h2 className="text-2xl font-bold text-white text-center mb-3">Administrator Access</h2>
                        <p className="text-yellow-50 text-center text-sm mb-6">
                            Login to manage alumni network, events, and system settings
                        </p>

                        <div className="space-y-4 mt-6">
                            <div className="flex items-center gap-3 border-t border-yellow-700/30 pt-4">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">User Management</p>
                                    <p className="text-yellow-50 text-xs">Manage alumni and student accounts</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">Analytics & Reports</p>
                                    <p className="text-yellow-50 text-xs">View statistics and generate reports</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">System Configuration</p>
                                    <p className="text-yellow-50 text-xs">Manage settings and permissions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-yellow-700/30">
                        <p className="text-yellow-50 text-xs text-center">
                            Authorized personnel only. All activities are logged.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-3/5 bg-white flex flex-col h-full">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-1 text-gray-500 hover:text-[#ba9629] text-sm transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Admin Login</h1>
                        <div className="w-16"></div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-8">
                        {success && (
                            <div className="mb-4 p-3 rounded bg-green-50 border border-green-200">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                                    <span className="text-sm text-green-700">{success}</span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                                    <span className="text-sm text-red-700">{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
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

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/forgot-password')}
                                    className="text-sm text-[#ba9629] hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 bg-[#ba9629] text-white font-medium rounded transition-colors hover:bg-[#a88523] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Please wait...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        Login
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-2">
                                <p className="text-xs text-gray-400">
                                    Need admin access? Contact super administrator
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                        <p className="text-xs text-gray-500 text-center">
                            © 2024 Alumni Management System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;