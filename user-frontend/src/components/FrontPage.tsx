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
                {/* Left Side - College Info (50% background) */}
                <div className="lg:w-1/2 h-1/2 lg:h-full bg-linear-to-br from-[#00565c] to-[#003d42] relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-8 border-white rounded-full">
                            <img src="https://rmlauadm.samarth.edu.in/assets/8b138cd6838ba6b5ed5f22c648a45c25/site_files/rmlau_logo.png" alt="" /></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-12">
                        <div className="max-w-lg text-white">
                            {/* Logo/Icon */}
                            <div className="flex items-center gap-3 mb-8">
                                <GraduationCap className="w-12 h-12" />
                                <h1 className="text-3xl font-bold">BCA Department</h1>
                            </div>

                            {/* College Name */}
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                                Dr. Ram Manohar Lohia
                                <br />
                                <span className="text-[#ba9629]">Avadh University</span>
                            </h2>

                            {/* Description */}
                            <div className="space-y-4 mb-8">
                                <p className="text-lg text-blue-100 leading-relaxed">
                                    Empowering students with quality education in Computer Applications
                                    since 1995. We nurture future tech leaders through innovative
                                    learning and industry exposure.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">500+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Active Students</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">98%</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Placement Rate</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">15+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Expert Faculty</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <GraduationCap className="w-5 h-5 text-[#ba9629]" />
                                        <span className="text-2xl font-bold">1000+</span>
                                    </div>
                                    <p className="text-sm text-blue-200">Alumni Network</p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                                    BCA Program
                                </span>
                                <span className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                                    Modern Labs
                                </span>
                                <span className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                                    Industry Connect
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration CTA (50% background) */}
                <div className="lg:w-1/2 h-1/2 lg:h-full bg-linear-to-br from-gray-50 to-white flex items-center justify-center p-8 lg:p-12">
                    <div className="max-w-md text-center">
                        {/* Welcome Message */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Join Our Community
                        </h2>

                        <p className="text-lg text-gray-600 mb-8">
                            Be part of excellence in education. Register now to start your journey with us.
                        </p>

                        {/* Benefits */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-left">
                            <h3 className="font-semibold text-gray-900 mb-4">Why Join Us?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <span className="text-green-600 text-xs">✓</span>
                                    </div>
                                    <span className="text-gray-600">Access to all learning resources</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <span className="text-green-600 text-xs">✓</span>
                                    </div>
                                    <span className="text-gray-600">Participate in workshops and events</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <span className="text-green-600 text-xs">✓</span>
                                    </div>
                                    <span className="text-gray-600">Connect with alumni network</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                        <span className="text-green-600 text-xs">✓</span>
                                    </div>
                                    <span className="text-gray-600">Get placement assistance</span>
                                </li>
                            </ul>
                        </div>

                        {/* Button */}
                        <div className='flex gap-3 flex-col w-auto'>
                            <button
                                onClick={handleRegisterClick}
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-[#00565c] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#004348] w-full sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Register Now
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/public-alumni-portal')
                                }}
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-[#00565c] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#004348] w-full sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Visit without Registration
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>


                        {/* Additional Links */}
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

            {/* Mobile View Message (for small screens) */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-[#00565c] text-white text-sm p-3 rounded-lg text-center">
                <span>For best experience, please rotate your device or use a larger screen.</span>
            </div>
        </div>
    );
};

export default FrontPage;