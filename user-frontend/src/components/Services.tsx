import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
  Calendar,
  MessageCircle,
  Award,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Search,
  CheckCircle,
  XCircle,
  HelpCircle,
  Star,
  Heart,
  Share2,
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'career' | 'education' | 'networking' | 'resources' | 'events' | 'support';
  features: string[];
  eligibility: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
  };
  link: string;
  isActive: boolean;
  popular?: boolean;
  new?: boolean;
}

interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'tool';
  category: string;
  description: string;
  size?: string;
  downloadUrl: string;
  uploadDate: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  registrationLink: string;
}

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Dark yellow accent color
  const accentColor = '#ba9629';
  const accentLight = 'rgba(186, 150, 41, 0.1)';

  // Services data
  const services: Service[] = [
    {
      id: '1',
      title: 'Career Counseling',
      description: 'Professional career guidance and mentorship from experienced alumni and industry experts.',
      icon: Briefcase,
      category: 'career',
      features: [
        'One-on-one career counseling sessions',
        'Resume review and optimization',
        'Interview preparation',
        'Career path planning',
        'Industry insights and trends'
      ],
      eligibility: 'All registered alumni',
      contactInfo: {
        email: 'career@alumni.edu',
        phone: '+1 234 567 890',
        location: 'Career Center, Room 101'
      },
      link: '/services/career-counseling',
      isActive: true,
      popular: true
    },
    {
      id: '2',
      title: 'Job Portal',
      description: 'Access exclusive job opportunities from partner companies and alumni network.',
      icon: Users,
      category: 'career',
      features: [
        'Exclusive job postings',
        'Company referrals',
        'Job alerts',
        'Application tracking',
        'Salary insights'
      ],
      eligibility: 'All registered alumni',
      contactInfo: {
        email: 'jobs@alumni.edu',
        location: 'Online Portal'
      },
      link: '/services/job-portal',
      isActive: true,
      popular: true,
      new: true
    },
    {
      id: '3',
      title: 'Alumni Mentorship',
      description: 'Connect with experienced alumni mentors for guidance and professional development.',
      icon: GraduationCap,
      category: 'networking',
      features: [
        'Find mentors in your field',
        'Regular mentorship sessions',
        'Career guidance',
        'Network building',
        'Industry connections'
      ],
      eligibility: 'Alumni with 2+ years experience',
      contactInfo: {
        email: 'mentorship@alumni.edu',
        location: 'Mentorship Program Office'
      },
      link: '/services/mentorship',
      isActive: true
    },
    {
      id: '4',
      title: 'Workshops & Webinars',
      description: 'Regular workshops and webinars on trending topics and skill development.',
      icon: BookOpen,
      category: 'education',
      features: [
        'Industry expert sessions',
        'Skill development workshops',
        'Certification programs',
        'Recorded sessions',
        'Interactive Q&A'
      ],
      eligibility: 'All registered alumni',
      contactInfo: {
        email: 'workshops@alumni.edu'
      },
      link: '/services/workshops',
      isActive: true
    },
    {
      id: '5',
      title: 'Library Access',
      description: 'Digital library access with thousands of resources, journals, and research papers.',
      icon: FileText,
      category: 'resources',
      features: [
        'Online journal access',
        'E-books and publications',
        'Research databases',
        'Archived materials',
        'Remote access'
      ],
      eligibility: 'Lifetime members',
      contactInfo: {
        email: 'library@alumni.edu',
        location: 'Digital Library Portal'
      },
      link: '/services/library',
      isActive: true
    },
    {
      id: '6',
      title: 'Networking Events',
      description: 'Regular networking events, mixers, and industry meetups.',
      icon: Calendar,
      category: 'events',
      features: [
        'Industry meetups',
        'Alumni mixers',
        'Networking sessions',
        'Guest lectures',
        'Annual gatherings'
      ],
      eligibility: 'All registered alumni',
      contactInfo: {
        email: 'events@alumni.edu',
        location: 'Various Venues'
      },
      link: '/services/events',
      isActive: true
    },
    {
      id: '7',
      title: 'Discussion Forums',
      description: 'Online forums for alumni to connect, discuss, and share knowledge.',
      icon: MessageCircle,
      category: 'networking',
      features: [
        'Industry-specific groups',
        'Discussion boards',
        'Knowledge sharing',
        'Peer support',
        'Expert AMAs'
      ],
      eligibility: 'All registered alumni',
      link: '/services/forums',
      isActive: true
    },
    {
      id: '8',
      title: 'Alumni Directory',
      description: 'Search and connect with fellow alumni worldwide.',
      icon: Users,
      category: 'networking',
      features: [
        'Advanced search filters',
        'Industry/company filters',
        'Location-based search',
        'Direct messaging',
        'Profile visibility control'
      ],
      eligibility: 'All registered alumni',
      link: '/services/directory',
      isActive: true
    },
    {
      id: '9',
      title: 'Scholarships & Grants',
      description: 'Information about scholarships and grants for continuing education.',
      icon: Award,
      category: 'education',
      features: [
        'Scholarship listings',
        'Research grants',
        'Travel grants',
        'Application assistance',
        'Deadline reminders'
      ],
      eligibility: 'Based on criteria',
      contactInfo: {
        email: 'scholarships@alumni.edu'
      },
      link: '/services/scholarships',
      isActive: true,
      new: true
    }
  ];

  // Resources data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Resume Template Pack',
      type: 'document',
      category: 'Career',
      description: 'Professional resume templates for various industries',
      size: '2.5 MB',
      downloadUrl: '/downloads/resume-templates.pdf',
      uploadDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Interview Preparation Guide',
      type: 'document',
      category: 'Career',
      description: 'Comprehensive guide for technical and HR interviews',
      size: '1.8 MB',
      downloadUrl: '/downloads/interview-guide.pdf',
      uploadDate: '2024-02-10'
    },
    {
      id: '3',
      title: 'Networking Best Practices',
      type: 'video',
      category: 'Networking',
      description: 'Video tutorial on effective networking strategies',
      size: '45 MB',
      downloadUrl: '/videos/networking-tips.mp4',
      uploadDate: '2024-02-05'
    }
  ];

  // Upcoming events
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Career Fair 2024',
      date: '2024-04-15',
      time: '10:00 AM - 4:00 PM',
      type: 'Career',
      description: 'Connect with top employers and explore job opportunities',
      registrationLink: '/events/career-fair-2024'
    },
    {
      id: '2',
      title: 'Alumni Networking Mixer',
      date: '2024-04-20',
      time: '6:00 PM - 9:00 PM',
      type: 'Networking',
      description: 'Evening of networking with fellow alumni',
      registrationLink: '/events/networking-mixer'
    },
    {
      id: '3',
      title: 'Tech Talk: AI in 2024',
      date: '2024-04-25',
      time: '2:00 PM - 3:30 PM',
      type: 'Workshop',
      description: 'Latest trends in artificial intelligence',
      registrationLink: '/events/tech-talk-ai'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', icon: Users },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'networking', label: 'Networking', icon: Users },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && service.isActive;
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 border-8 border-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border-8 border-white rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Alumni Services</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Discover exclusive benefits, resources, and opportunities designed to support your professional journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services, resources, or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-yellow-100 focus:outline-none focus:border-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${selectedCategory === category.id
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
                style={selectedCategory === category.id ? { backgroundColor: accentColor } : {}}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                <Briefcase className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-500">Active Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                <Users className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-sm text-gray-500">Mentors Available</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Upcoming Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                <FileText className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">230+</p>
                <p className="text-sm text-gray-500">Resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                      <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <div className="flex gap-2">
                      {service.popular && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                      {service.new && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-xs text-gray-500">+{service.features.length - 3} more features</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Eligibility: {service.eligibility}</span>
                    <button
                      className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                      style={{ color: accentColor }}
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: accentLight }}>
                    <FileText className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <span className="text-xs text-gray-500">{resource.size}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Updated: {resource.uploadDate}</span>
                  <button className="flex items-center gap-1 text-sm font-medium" style={{ color: accentColor }}>
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <button className="flex items-center gap-1 text-sm font-medium" style={{ color: accentColor }}>
              View All Events
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4" style={{ background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}05 100%)` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                    <span className="text-sm font-medium text-gray-900">{event.date}</span>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: accentLight, color: accentColor }}>
                    {event.type}
                  </span>
                  <button className="flex items-center gap-1 text-sm font-medium" style={{ color: accentColor }}>
                    Register
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Personalized Assistance?</h2>
              <p className="text-gray-600 mb-4">
                Our alumni support team is here to help you make the most of your membership benefits.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" style={{ color: accentColor }} />
                  <span>support@alumni.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" style={{ color: accentColor }} />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageCircle className="w-4 h-4" style={{ color: accentColor }} />
                  <span>Live Chat</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-lg text-white font-medium transition-colors" style={{ backgroundColor: accentColor }}>
                Contact Support
              </button>
              <button className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                View FAQs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: accentLight }}>
                  <selectedService.icon className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selectedService.title}</h2>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{selectedService.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                <p className="text-gray-600">{selectedService.eligibility}</p>
              </div>

              {selectedService.contactInfo && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    {selectedService.contactInfo.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" style={{ color: accentColor }} />
                        <a href={`mailto:${selectedService.contactInfo.email}`} className="text-gray-600 hover:underline">
                          {selectedService.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {selectedService.contactInfo.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" style={{ color: accentColor }} />
                        <a href={`tel:${selectedService.contactInfo.phone}`} className="text-gray-600 hover:underline">
                          {selectedService.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {selectedService.contactInfo.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" style={{ color: accentColor }} />
                        <span className="text-gray-600">{selectedService.contactInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  className="flex-1 py-3 rounded-lg text-white font-medium transition-colors"
                  style={{ backgroundColor: accentColor }}
                >
                  Access Service
                </button>
                <button className="px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;