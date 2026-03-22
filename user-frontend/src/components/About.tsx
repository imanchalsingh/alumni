import { useEffect, useState } from "react";
import api from "../api/axios.ts";
import {
  Building2,
  Target,
  Eye,
  Users,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Heart,
  BookOpen,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface AboutData {
  siteName: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  establishedYear?: string;
  affiliatedTo?: string;
  accreditation?: string;
  address?: string;
  stats?: {
    totalAlumni: string;
    workshopsConducted: string;
    servicesOffered: string;
  };
  contact?: {
    email: string;
    phone?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await api.get("/about");
      setAbout(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#80558c]/20 border-t-[#80558c] rounded-full animate-spin mx-auto"></div>
            <Heart className="w-8 h-8 text-[#80558c] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <Building2 className="w-16 h-16 text-[#80558c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Content Not Found</h2>
          <p className="text-gray-600 mb-6">The about page content is currently being set up.</p>
          <button
            onClick={fetchAbout}
            className="px-6 py-3 bg-[#80558c] text-white rounded-lg hover:bg-[#6a4875] transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'mission', label: 'Mission & Vision', icon: Target },
    { id: 'stats', label: 'Achievements', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Gradient */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #80558c 0%, #6a4875 50%, #543b5e 100%)'
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">{about.siteName}</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {about.tagline}
            </p>

            {/* Quick Stats in Hero */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {about.establishedYear && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>Est. {about.establishedYear}</span>
                </div>
              )}
              {about.affiliatedTo && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <BookOpen className="w-4 h-4" />
                  <span>{about.affiliatedTo}</span>
                </div>
              )}
              {about.accreditation && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-4 h-4" />
                  <span>{about.accreditation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white" fillOpacity="0.1" />
            <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 82.5C840 90 960 105 1080 112.5C1200 120 1320 120 1380 120L1440 120V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white" fillOpacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl shadow-lg p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-[#80558c] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#80558c]/10 rounded-xl">
                    <Building2 className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {about.description}
                </p>
              </div>
            </div>

            {/* Additional Info Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {about.establishedYear && (
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-[#80558c]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h3 className="text-sm text-gray-500 mb-1">Established</h3>
                  <p className="text-xl font-bold text-gray-800">{about.establishedYear}</p>
                </div>
              )}
              {about.affiliatedTo && (
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-[#80558c]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h3 className="text-sm text-gray-500 mb-1">Affiliated To</h3>
                  <p className="text-xl font-bold text-gray-800">{about.affiliatedTo}</p>
                </div>
              )}
              {about.accreditation && (
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-[#80558c]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h3 className="text-sm text-gray-500 mb-1">Accreditation</h3>
                  <p className="text-xl font-bold text-gray-800">{about.accreditation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mission & Vision Tab */}
        {activeTab === 'mission' && (
          <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="h-2 bg-[#80558c]"></div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#80558c]/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {about.mission}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#80558c]">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Committed to excellence</span>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="h-2 bg-[#80558c]"></div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#80558c]/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {about.vision}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#80558c]">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Shaping future leaders</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && about.stats && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Alumni Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="h-2 bg-[#80558c]"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#80558c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-[#80558c]" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">
                    {about.stats.totalAlumni}
                  </h3>
                  <p className="text-gray-600 font-medium">Total Alumni</p>
                  <div className="mt-4 text-sm text-[#80558c] flex items-center justify-center gap-1">
                    <span>Growing strong</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Workshops Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="h-2 bg-[#80558c]"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#80558c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8 text-[#80558c]" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">
                    {about.stats.workshopsConducted}
                  </h3>
                  <p className="text-gray-600 font-medium">Workshops Conducted</p>
                  <div className="mt-4 text-sm text-[#80558c] flex items-center justify-center gap-1">
                    <span>Knowledge shared</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Services Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="h-2 bg-[#80558c]"></div>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#80558c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-[#80558c]" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">
                    {about.stats.servicesOffered}
                  </h3>
                  <p className="text-gray-600 font-medium">Services Offered</p>
                  <div className="mt-4 text-sm text-[#80558c] flex items-center justify-center gap-1">
                    <span>Always helping</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Banner */}
            <div className="bg-linear-to-r from-[#80558c] to-[#6a4875] rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Our Growing Impact</h3>
                  <p className="text-white/90">Together we're building a stronger community</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{about.stats.totalAlumni}+</div>
                    <div className="text-sm text-white/80">Alumni</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{about.stats.workshopsConducted}+</div>
                    <div className="text-sm text-white/80">Workshops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && about.contact && (
          <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#80558c]/10 rounded-xl">
                  <Mail className="w-6 h-6 text-[#80558c]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors">
                  <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#80558c]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${about.contact.email}`} className="text-gray-800 font-medium hover:text-[#80558c]">
                      {about.contact.email}
                    </a>
                  </div>
                </div>

                {about.contact.phone && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors">
                    <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#80558c]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href={`tel:${about.contact.phone}`} className="text-gray-800 font-medium hover:text-[#80558c]">
                        {about.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {about.address && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors">
                    <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#80558c]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800 font-medium">{about.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {about.social && Object.values(about.social).some(Boolean) && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#80558c]/10 rounded-xl">
                    <Globe className="w-6 h-6 text-[#80558c]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Connect With Us</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {about.social.facebook && (
                    <a
                      href={about.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-[#80558c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Facebook</span>
                    </a>
                  )}

                  {about.social.twitter && (
                    <a
                      href={about.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-[#80558c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.78-3.636 13.92 13.92 0 001.531-6.235c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Twitter</span>
                    </a>
                  )}

                  {about.social.linkedin && (
                    <a
                      href={about.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-[#80558c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.73C24 .774 23.204 0 22.225 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">LinkedIn</span>
                    </a>
                  )}

                  {about.social.instagram && (
                    <a
                      href={about.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#80558c]/5 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#80558c]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-[#80558c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Wave */}
      <div className="mt-12">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#80558c" fillOpacity="0.1" />
        </svg>
      </div>
    </div>
  );
}