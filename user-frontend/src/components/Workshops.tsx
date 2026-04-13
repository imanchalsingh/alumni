import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Calendar, MapPin, Video, Users, Clock, User, Building, Filter, Search, X, Tag } from 'lucide-react';

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

    if (searchTerm) {
      filtered = filtered.filter(w =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return 'bg-blue-100 text-blue-700';
      case 'offline': return 'bg-green-100 text-green-700';
      case 'hybrid': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Video className="w-3.5 h-3.5" />;
      case 'offline': return <MapPin className="w-3.5 h-3.5" />;
      case 'hybrid': return <Users className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#00565c]/20 border-t-[#00565c] rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600 text-sm">Loading workshops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-md p-6 max-w-md">
          <div className="text-red-500 text-3xl mb-3">⚠️</div>
          <p className="text-gray-800 mb-4 text-sm">{error}</p>
          <button
            onClick={fetchWorkshops}
            className="px-4 py-2 bg-[#00565c] text-white rounded hover:bg-[#004348] text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Workshops & Events</h1>
          <p className="text-gray-600 text-sm mt-1">Discover and join upcoming workshops, seminars, and webinars</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, speaker, organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-3 py-2 border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] bg-white text-sm"
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
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] bg-white text-sm"
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
                  className="px-3 py-2 text-[#00565c] hover:bg-[#00565c]/10 rounded text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-3 space-y-2 pt-3 border-t border-gray-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] bg-white text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00565c] bg-white text-sm"
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
                  className="w-full px-3 py-2 text-[#00565c] border border-[#00565c] rounded hover:bg-[#00565c]/10 text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Stats */}
        <div className="mb-4 flex justify-between items-center text-sm">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#00565c]">{filteredWorkshops.length}</span> workshops
          </p>
        </div>

        {/* Workshops Grid */}
        {filteredWorkshops.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No workshops found</h3>
            <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-[#00565c] text-white rounded hover:bg-[#004348] text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWorkshops.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img
                    src={workshop.coverImage || 'https://via.placeholder.com/800x400?text=Workshop'}
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Workshop';
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                      {workshop.category}
                    </span>
                  </div>

                  {/* Mode Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${getModeColor(workshop.mode)}`}>
                      {getModeIcon(workshop.mode)}
                      {workshop.mode.charAt(0).toUpperCase() + workshop.mode.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 text-base">
                    {workshop.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {workshop.shortDescription}
                  </p>

                  {/* Speaker & Organization */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs">{workshop.speaker}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Building className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs">{workshop.organization}</span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formatDate(workshop.date)}</span>
                    <Clock className="w-3.5 h-3.5 text-gray-400 ml-1" />
                    <span>{workshop.startTime}</span>
                  </div>

                  {/* Tags */}
                  {workshop.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {workshop.tags.split(',').slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-0.5"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag.trim()}
                        </span>
                      ))}
                      {workshop.tags.split(',').length > 2 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          +{workshop.tags.split(',').length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleViewDetails(workshop)}
                      className="flex-1 px-3 py-1.5 bg-[#00565c] text-white rounded hover:bg-[#004348] text-xs font-medium"
                    >
                      View Details
                    </button>

                    {workshop.mode !== 'offline' && workshop.meetingLink && (
                      <a
                        href={workshop.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs"
                      >
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
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative h-48">
                <img
                  src={selectedWorkshop.coverImage || 'https://via.placeholder.com/1200x400?text=Workshop'}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 p-1.5 bg-black/50 text-white rounded hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 bg-[#00565c] text-white text-xs rounded">
                    {selectedWorkshop.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${getModeColor(selectedWorkshop.mode)}`}>
                    {getModeIcon(selectedWorkshop.mode)}
                    {selectedWorkshop.mode.charAt(0).toUpperCase() + selectedWorkshop.mode.slice(1)}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedWorkshop.title}</h2>

                <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <User className="w-3.5 h-3.5" />
                    <span className="font-medium">Speaker:</span> {selectedWorkshop.speaker}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Building className="w-3.5 h-3.5" />
                    <span className="font-medium">Organization:</span> {selectedWorkshop.organization}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-medium">Date:</span> {formatDate(selectedWorkshop.date)}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">Time:</span> {selectedWorkshop.startTime} - {selectedWorkshop.endTime}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">About this Workshop</h3>
                    <p className="text-gray-600">{selectedWorkshop.description}</p>
                  </div>

                  {selectedWorkshop.prerequisites && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Prerequisites</h3>
                      <p className="text-gray-600">{selectedWorkshop.prerequisites}</p>
                    </div>
                  )}

                  {selectedWorkshop.targetAudience && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Target Audience</h3>
                      <p className="text-gray-600">{selectedWorkshop.targetAudience}</p>
                    </div>
                  )}

                  {selectedWorkshop.mode !== 'online' && selectedWorkshop.venue && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Venue</h3>
                      <p className="text-gray-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {selectedWorkshop.venue}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
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
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-yellow-800 text-sm font-medium">Registration Required</p>
                      {selectedWorkshop.maxParticipants && (
                        <p className="text-yellow-600 text-xs mt-0.5">
                          Maximum participants: {selectedWorkshop.maxParticipants}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-5 pt-3 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    Close
                  </button>
                  {selectedWorkshop.mode !== 'offline' && selectedWorkshop.meetingLink && (
                    <a
                      href={selectedWorkshop.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#00565c] text-white rounded hover:bg-[#004348] text-sm flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" />
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