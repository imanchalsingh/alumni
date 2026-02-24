import { useEffect, useState } from "react";

interface Alumni {
  _id: string;
  name: string;
  father_name?: string;
  course?: string;
  batch_year: number;
  designation?: string;
  organization?: string;
  email?: string;
  address?: string;
  mobile_number?: string;
}

interface EditModalProps {
  alumni: Alumni | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updatedData: Partial<Alumni>) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ alumni, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Alumni>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alumni) {
      setFormData(alumni);
    }
  }, [alumni]);

  if (!isOpen || !alumni) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(alumni._id, formData);
      onClose();
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex justify-between items-center" style={{ backgroundColor: '#00565c' }}>
          <h3 className="text-xl font-semibold text-white">Edit Alumni Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year *</label>
              <input
                type="number"
                name="batch_year"
                value={formData.batch_year || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#ba9629' } as React.CSSProperties}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#00565c' }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Alumni: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedView, setSelectedView] = useState<string>("all");
  const [years, setYears] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Edit modal states
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete confirmation states
  const [deletingAlumni, setDeletingAlumni] = useState<Alumni | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/alumni/all");
      const data: Alumni[] = await res.json();
      setAlumni(data);

      const uniqueYears = [...new Set(data.map(a => a.batch_year))].sort((a, b) => b - a);
      setYears(uniqueYears);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  // update alumni by id
  const updateAlumni = async (id: string, updatedData: Partial<Alumni>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/alumni/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        await fetchAlumni();
      }
    } catch (error) {
      console.error("Error updating alumni:", error);
      throw error;
    }
  };

  // delete alumni by id
  const deleteAlumni = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/alumni/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAlumni();
        setShowDeleteConfirm(false);
        setDeletingAlumni(null);
      }
    } catch (error) {
      console.error("Error deleting alumni:", error);
    }
  };

  const handleEdit = (alumni: Alumni) => {
    setEditingAlumni(alumni);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (alumni: Alumni) => {
    setDeletingAlumni(alumni);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deletingAlumni) {
      deleteAlumni(deletingAlumni._id);
    }
  };

  // Filter alumni based on search and selected year
  const filtered = alumni.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === "all" || a.batch_year === Number(selectedYear);
    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setSelectedView(year);
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const handleAllAlumni = () => {
    setSelectedYear("all");
    setSelectedView("all");
    setCurrentPage(1);
    setSidebarOpen(false);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-white"
        style={{ backgroundColor: '#00565c' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Left Navigation */}
      <div className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition duration-200 ease-in-out
        z-40 w-64 bg-white shadow-lg overflow-y-auto
      `}>
        <div className="p-6">
          {/* Logo/Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold" style={{ color: '#00565c' }}>BCA Alumni</h1>
            <p className="text-sm text-gray-500 mt-1">Directory</p>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {/* All Alumni Button */}
            <button
              onClick={handleAllAlumni}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${selectedView === 'all'
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              style={selectedView === 'all' ? { backgroundColor: '#00565c' } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">All Alumni</span>
              <span className="ml-auto text-sm" style={selectedView === 'all' ? { color: '#ba9629' } : {}}>
                ({alumni.length})
              </span>
            </button>

            {/* Batch Years Section */}
            <div className="pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                Batch Years
              </h3>
              <div className="space-y-1">
                {years.map((year) => {
                  const yearCount = alumni.filter(a => a.batch_year === year).length;
                  return (
                    <button
                      key={year}
                      onClick={() => handleYearSelect(year.toString())}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${selectedYear === year.toString()
                        ? 'text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      style={selectedYear === year.toString() ? { backgroundColor: '#5c002c' } : {}}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{year}</span>
                      <span className="ml-auto text-xs" style={selectedYear === year.toString() ? { color: '#ba9629' } : { color: '#9ca3af' }}>
                        {yearCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 transition-all duration-200">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedYear === "all" ? "All Alumni" : `Batch of ${selectedYear}`}
            </h2>
            <p className="text-gray-500 mt-1">
              Showing {currentItems.length} of {filtered.length} alumni
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                onFocus={(e) => e.target.style.borderColor = '#ba9629'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Alumni Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="px-4 py-3 flex justify-between items-start" style={{ background: 'linear-gradient(135deg, #00565c 0%, #003d42 100%)' }}>
                  <div>
                    <h3 className="text-xl font-semibold text-white truncate">{a.name}</h3>
                    <p className="text-blue-100 text-sm">Batch of {a.batch_year}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="p-1.5 rounded-lg bg-black bg-opacity-20 hover:bg-opacity-30 transition-all"
                      title="Edit"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(a)}
                      className="p-1.5 rounded-lg bg-red-700 bg-opacity-20 hover:bg-opacity-30 transition-all"
                      title="Delete"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {a.father_name && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Father:</span>
                      <span>{a.father_name}</span>
                    </p>
                  )}

                  {a.mobile_number && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Mobile:</span>
                      <a href={`tel:${a.mobile_number}`} className="hover:underline" style={{ color: '#00565c' }}>
                        {a.mobile_number}
                      </a>
                    </p>
                  )}

                  {a.designation && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Designation:</span>
                      <span>{a.designation}</span>
                    </p>
                  )}

                  {a.organization && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Organization:</span>
                      <span>{a.organization}</span>
                    </p>
                  )}

                  {a.email && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Email:</span>
                      <a href={`mailto:${a.email}`} className="hover:underline truncate" style={{ color: '#00565c' }}>
                        {a.email}
                      </a>
                    </p>
                  )}

                  {a.address && (
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="font-medium" style={{ color: '#5c002c' }}>Address:</span>
                      <span className="flex-1">{a.address}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
                style={{ borderColor: '#00565c', color: '#00565c' }}
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`w-10 h-10 rounded-lg transition-all duration-200 ${currentPage === pageNumber
                          ? 'text-white'
                          : 'hover:bg-gray-100'
                          }`}
                        style={currentPage === pageNumber ? { backgroundColor: '#00565c' } : {}}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 3 ||
                    pageNumber === currentPage + 3
                  ) {
                    return <span key={pageNumber} className="w-10 h-10 flex items-center justify-center">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
                style={{ borderColor: '#00565c', color: '#00565c' }}
              >
                Next
              </button>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        alumni={editingAlumni}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAlumni(null);
        }}
        onSave={updateAlumni}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deletingAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-4 border-b" style={{ backgroundColor: '#dc2626' }}>
              <h3 className="text-xl font-semibold text-white">Confirm Delete</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold">{deletingAlumni.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingAlumni(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumni;