import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ChevronRight } from 'lucide-react';

const FrontPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Split Background */}
            <div className="fixed inset-0 flex flex-col lg:flex-row">
                {/* Left Side - College Info */}
                <div className="lg:w-1/2 h-1/2 lg:h-full bg-[#00565c] relative overflow-hidden">

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-12">
                        <div className="max-w-lg text-white">
                            <div className="flex items-center gap-3 mb-8">
                                <img
                                    src="../public/vite.png"
                                    alt="University Logo"
                                    className="w-12 h-12 object-contain bg-white rounded-full p-1"
                                />
                                <h1 className="text-2xl font-bold">BCA Department</h1>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                                Dr. Ram Manohar Lohia
                                <br />
                                <span className="text-[#ba9629]">Avadh University</span>
                            </h2>

                            <div className="space-y-4 mb-8">
                                <p className="text-base text-blue-100 leading-relaxed">
                                    Empowering students with quality education in Computer Applications
                                    since 1995. We nurture future tech leaders through innovative
                                    learning and industry exposure.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">500+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Active Students</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Award className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">98%</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Placement Rate</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <BookOpen className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">15+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Expert Faculty</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <GraduationCap className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">1000+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Alumni Network</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1.5 bg-white/10 rounded text-sm">
                                    BCA Program
                                </span>
                                <span className="px-3 py-1.5 bg-white/10 rounded text-sm">
                                    Modern Labs
                                </span>
                                <span className="px-3 py-1.5 bg-white/10 rounded text-sm">
                                    Industry Connect
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration CTA */}
                <div className="lg:w-1/2 h-1/2 lg:h-full bg-gray-50 flex items-center justify-center p-8 lg:p-12">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Join Our Community
                        </h2>

                        <p className="text-base text-gray-600 mb-8">
                            Be part of excellence in education. Register now to start your journey with us.
                        </p>

                        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
                            <h3 className="font-semibold text-gray-800 mb-4">Why Join Us?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-sm mt-0.5">✓</span>
                                    <span className="text-gray-600 text-sm">Access to all learning resources</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-sm mt-0.5">✓</span>
                                    <span className="text-gray-600 text-sm">Participate in workshops and events</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-sm mt-0.5">✓</span>
                                    <span className="text-gray-600 text-sm">Connect with alumni network</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 text-sm mt-0.5">✓</span>
                                    <span className="text-gray-600 text-sm">Get placement assistance</span>
                                </li>
                            </ul>
                        </div>

                        <div className='flex gap-3 flex-col'>
                            <button
                                onClick={handleRegisterClick}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold text-white bg-[#00565c] rounded hover:bg-[#004348] transition-colors w-full sm:w-auto"
                            >
                                Register Now
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/public-alumni-portal')
                                }}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold text-white bg-[#00565c] rounded hover:bg-[#004348] transition-colors w-full sm:w-auto"
                            >
                                Visit without Registration
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[#00565c] hover:underline font-medium"
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile View Message */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-[#00565c] text-white text-xs p-3 rounded text-center">
                <span>For best experience, please rotate your device or use a larger screen.</span>
            </div>
        </div>
    );
};

export default FrontPage;