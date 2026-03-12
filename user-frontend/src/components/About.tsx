import React from 'react';
import { GraduationCap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate()
  // Accent color #80558c (purple)
  const accentColor = '#80558c';

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-0 opacity-5 z-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-8 border-white rounded-full">
          <img src="https://rmlauadm.samarth.edu.in/assets/8b138cd6838ba6b5ed5f22c648a45c25/site_files/rmlau_logo.png" alt="" /></div>
      </div>
      {/* Hero Section - Simple with image background */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #af7ab3 100%)` }}>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About College and faculties
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Comprehensive support and resources for our valued alumni community.
              Stay connected and continue your journey with us.
            </p>
          </div>
        </div>
      </div>

      {/* About Section - Simple text */}
      <div id='about' className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Department</h2>
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            The Department of Computer Applications at Government College of Excellence has been
            at the forefront of IT education for over two decades. We take pride in producing
            skilled professionals who are making their mark in the tech industry worldwide.
          </p>
          <p>
            Our alumni network spans across continents, with graduates working at leading tech
            companies like Google, Microsoft, Amazon, and many more. We believe in maintaining
            strong connections with our alumni, providing them with continuous learning
            opportunities and a platform to give back to their alma mater.
          </p>
        </div>
      </div>

      {/* Facilities Section - Simple list */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Facilities for Alumni</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Text */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Academic Support</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Access to digital library with thousands of research papers and journals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Attend guest lectures and workshops by industry experts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Collaborate with faculty on research projects
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Career Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Exclusive job postings from our placement partners
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Career counseling sessions with experienced faculty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg mr-2">•</span>
                    Networking opportunities with industry leaders
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative h-full min-h-75 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Students in library"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Section - Simple */}
      <div id='faculty' className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Faculty</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dr. Rajesh Kumar</h3>
            <p className="text-gray-600 mb-2">Professor & Head of Department</p>
            <p className="text-sm text-gray-500">PhD in Computer Science, 20+ years experience</p>
            <p className="text-gray-600 mt-2">
              Specializes in Artificial Intelligence and Machine Learning. Has published over 30 research papers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dr. Priya Sharma</h3>
            <p className="text-gray-600 mb-2">Professor</p>
            <p className="text-sm text-gray-500">PhD in Database Systems, 15+ years experience</p>
            <p className="text-gray-600 mt-2">
              Expert in Big Data and Database Management. Mentored numerous successful research projects.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Prof. Amit Verma</h3>
            <p className="text-gray-600 mb-2">Associate Professor</p>
            <p className="text-sm text-gray-500">M.Tech, pursuing PhD, 12+ years experience</p>
            <p className="text-gray-600 mt-2">
              Specializes in Web Technologies and Cloud Computing. Industry consultant for tech startups.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dr. Neha Gupta</h3>
            <p className="text-gray-600 mb-2">Associate Professor</p>
            <p className="text-sm text-gray-500">PhD in Cybersecurity, 10+ years experience</p>
            <p className="text-gray-600 mt-2">
              Expert in Network Security and Cryptography. Coordinates the cybersecurity certification program.
            </p>
          </div>
        </div>
      </div>

      {/* Alumni Success - Simple text with small images */}
      <div id="alumni" className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Alumni</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                alt="Alumni"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Vikram Singh</h3>
                <p className="text-sm" style={{ color: accentColor }}>Senior Software Engineer at Google</p>
                <p className="text-gray-600 mt-2">
                  Batch of 2015. "The foundation I got from this department helped me excel in my career.
                  The faculty's guidance was instrumental in shaping my professional journey."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80"
                alt="Alumni"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Anjali Desai</h3>
                <p className="text-sm" style={{ color: accentColor }}>Product Manager at Microsoft</p>
                <p className="text-gray-600 mt-2">
                  Batch of 2016. "The workshops and industry interactions prepared me for the corporate world.
                  I'm grateful for the continuous support even after graduation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">1000+</div>
            <div className="text-sm text-gray-500 mt-1">Alumni</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-500 mt-1">Faculty</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">90%</div>
            <div className="text-sm text-gray-500 mt-1">Placement</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-500 mt-1">Years</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation with Register Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Quick links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#faculty" className="text-gray-600 hover:text-gray-900">Faculty</a>
              <a href="#alumni" className="text-gray-600 hover:text-gray-900">Alumni</a>
            </div>

            {/* Right side - Register Button */}
            <button
              className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: accentColor }}
              onClick={() => {
                navigate('/register')
              }}
            >
              <GraduationCap className="w-4 h-4" />
              Register as Alumni
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed bottom nav */}
      <div className="h-16"></div>
    </div>
  );
};

export default About;