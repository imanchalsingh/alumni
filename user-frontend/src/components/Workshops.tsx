import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Calendar, MapPin, Video, Users, Clock, User, Building, ExternalLink, Filter, Search, X, Tag, ChevronRight, Download } from 'lucide-react';

interface Workshop {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  mode: 'online' | 'offline' | 'hybrid';
  organization: string;
  speaker: string;
  date: string;
  startTime: string;
  endTime: string;
  venue?: string;
  meetingLink?: string;
  coverImage: string;
  registrationRequired: boolean;
  maxParticipants?: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  prerequisites?: string;
  targetAudience?: string;
  tags?: string;
  createdAt: string;
}

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMode, setSelectedMode] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Get unique categories
  const categories = ["all", ...new Set(workshops.map(w => w.category))];
  const modes = ["all", "online", "offline", "hybrid"];

  useEffect(() => {
    fetchWorkshops();
  }, []);

  useEffect(() => {
    filterWorkshops();
  }, [searchTerm, selectedCategory, selectedMode, workshops]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/workshops");
      setWorkshops(res.data.data);
      setFilteredWorkshops(res.data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load workshops. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterWorkshops = () => {
    let filtered = workshops;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(w => 
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    // Apply mode filter
    if (selectedMode !== "all") {
      filtered = filtered.filter(w => w.mode === selectedMode);
    }

    setFilteredWorkshops(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedMode("all");
  };

  const handleViewDetails = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedWorkshop(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getModeColor = (mode: string) => {
    switch(mode) {
      case 'online': return 'bg-blue-100 text-blue-700';
      case 'offline': return 'bg-green-100 text-green-700';
      case 'hybrid': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getModeIcon = (mode: string) => {
    switch(mode) {
      case 'online': return <Video className="w-4 h-4" />;
      case 'offline': return <MapPin className="w-4 h-4" />;
      case 'hybrid': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00565c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workshops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-800 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchWorkshops}
            className="px-6 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workshops & Events</h1>
          <p className="text-gray-600 mt-2">Discover and join upcoming workshops, seminars, and webinars</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, speaker, organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] bg-white"
              >
                {modes.map(mode => (
                  <option key={mode} value={mode}>
                    {mode === 'all' ? 'All Modes' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== "all" || selectedMode !== "all") && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-[#00565c] hover:bg-[#00565c]/10 rounded-xl transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 space-y-3 pt-4 border-t border-gray-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] bg-white"
              >
                {modes.map(mode => (
                  <option key={mode} value={mode}>
                    {mode === 'all' ? 'All Modes' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== "all" || selectedMode !== "all") && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 text-[#00565c] border border-[#00565c] rounded-xl hover:bg-[#00565c]/10 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Stats */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#00565c]">{filteredWorkshops.length}</span> workshops
          </p>
          <button className="px-4 py-2 text-[#00565c] hover:bg-[#00565c]/10 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export List
          </button>
        </div>

        {/* Workshops Grid */}
        {filteredWorkshops.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No workshops found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={workshop.coverImage || 'https://via.placeholder.com/800x400?text=Workshop'}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Workshop';
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {workshop.category}
                    </span>
                  </div>

                  {/* Mode Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getModeColor(workshop.mode)}`}>
                      {getModeIcon(workshop.mode)}
                      {workshop.mode.charAt(0).toUpperCase() + workshop.mode.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                    {workshop.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {workshop.shortDescription}
                  </p>

                  {/* Speaker & Organization */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{workshop.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{workshop.organization}</span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(workshop.date)}</span>
                    <Clock className="w-4 h-4 text-gray-400 ml-2" />
                    <span>{workshop.startTime}</span>
                  </div>

                  {/* Tags */}
                  {workshop.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workshop.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleViewDetails(workshop)}
                      className="flex-1 px-4 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {workshop.mode !== 'offline' && workshop.meetingLink && (
                      <a
                        href={workshop.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Join
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workshop Details Modal */}
        {showModal && selectedWorkshop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative h-64">
                <img
                  src={selectedWorkshop.coverImage || 'https://via.placeholder.com/1200x400?text=Workshop'}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Badges */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-[#00565c] text-white text-sm font-medium rounded-full">
                    {selectedWorkshop.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getModeColor(selectedWorkshop.mode)}`}>
                    {getModeIcon(selectedWorkshop.mode)}
                    {selectedWorkshop.mode.charAt(0).toUpperCase() + selectedWorkshop.mode.slice(1)}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedWorkshop.title}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Speaker:</span> {selectedWorkshop.speaker}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">Organization:</span> {selectedWorkshop.organization}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Date:</span> {formatDate(selectedWorkshop.date)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Time:</span> {selectedWorkshop.startTime} - {selectedWorkshop.endTime}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About this Workshop</h3>
                    <p className="text-gray-600">{selectedWorkshop.description}</p>
                  </div>

                  {selectedWorkshop.prerequisites && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Prerequisites</h3>
                      <p className="text-gray-600">{selectedWorkshop.prerequisites}</p>
                    </div>
                  )}

                  {selectedWorkshop.targetAudience && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Target Audience</h3>
                      <p className="text-gray-600">{selectedWorkshop.targetAudience}</p>
                    </div>
                  )}

                  {selectedWorkshop.mode !== 'online' && selectedWorkshop.venue && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Venue</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedWorkshop.venue}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {selectedWorkshop.contactName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {selectedWorkshop.contactEmail}
                      </p>
                      {selectedWorkshop.contactPhone && (
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {selectedWorkshop.contactPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedWorkshop.registrationRequired && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 font-medium">Registration Required</p>
                      {selectedWorkshop.maxParticipants && (
                        <p className="text-yellow-600 text-sm mt-1">
                          Maximum participants: {selectedWorkshop.maxParticipants}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedWorkshop.mode !== 'offline' && selectedWorkshop.meetingLink && (
                    <a
                      href={selectedWorkshop.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Join Workshop
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}