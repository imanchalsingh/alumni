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
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-3 border-b bg-[#ba9629] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Edit Alumni Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
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
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#ba9629] text-white rounded hover:bg-[#a88523] disabled:opacity-50 cursor-pointer text-sm"
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
  const [years, setYears] = useState<number[]>([]);

  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deletingAlumni, setDeletingAlumni] = useState<Alumni | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const filtered = alumni.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === "all" || a.batch_year === Number(selectedYear);
    return matchesSearch && matchesYear;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const downloadCSV = () => {
    const headers = [
      'Name',
      "Father's Name",
      'Course',
      'Batch Year',
      'Designation',
      'Organization',
      'Email',
      'Mobile Number',
      'Address'
    ];

    const csvRows = [];
    csvRows.push(headers.join(','));

    filtered.forEach(alum => {
      const row = [
        `"${alum.name || ''}"`,
        `"${alum.father_name || ''}"`,
        `"${alum.course || ''}"`,
        alum.batch_year || '',
        `"${alum.designation || ''}"`,
        `"${alum.organization || ''}"`,
        `"${alum.email || ''}"`,
        `"${alum.mobile_number || ''}"`,
        `"${alum.address || ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumni_${selectedYear === 'all' ? 'all' : `batch_${selectedYear}`}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    let tableHTML = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Alumni Report</title>
        </head>
        <body>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Father's Name</th>
                <th>Course</th>
                <th>Batch Year</th>
                <th>Designation</th>
                <th>Organization</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
    `;

    filtered.forEach(alum => {
      tableHTML += `
        <tr>
          <td>${alum.name || ''}</td>
          <td>${alum.father_name || ''}</td>
          <td>${alum.course || ''}</td>
          <td>${alum.batch_year || ''}</td>
          <td>${alum.designation || ''}</td>
          <td>${alum.organization || ''}</td>
          <td>${alum.email || ''}</td>
          <td>${alum.mobile_number || ''}</td>
          <td>${alum.address || ''}</td>
        </tr>
      `;
    });

    tableHTML += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alumni_${selectedYear === 'all' ? 'all' : `batch_${selectedYear}`}_${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">BCA Alumni Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view alumni information</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm"
              />
            </div>

            <div className="sm:w-56">
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer focus:outline-none focus:border-[#ba9629] text-sm"
              >
                <option value="all">All Batches ({alumni.length})</option>
                {years.map((year) => {
                  const yearCount = alumni.filter(a => a.batch_year === year).length;
                  return (
                    <option key={year} value={year}>
                      Batch of {year} ({yearCount})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadCSV}
                className="px-3 py-2 bg-[#ba9629] text-white rounded hover:bg-[#a88523] text-sm cursor-pointer"
              >
                CSV
              </button>
              <button
                onClick={downloadExcel}
                className="px-3 py-2 bg-[#ba9629] text-white rounded hover:bg-[#a88523] text-sm cursor-pointer"
              >
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 flex justify-between items-center text-sm">
          <p className="text-gray-600">
            Showing {currentItems.length} of {filtered.length} alumni
          </p>
          <p className="text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItems.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-3 bg-[#ba9629] flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{a.name}</h3>
                  <p className="text-yellow-100 text-xs">Batch of {a.batch_year}</p>
                </div>

                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="p-1.5 rounded bg-white/20 hover:bg-white/30 cursor-pointer"
                    title="Edit"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(a)}
                    className="p-1.5 rounded bg-red-600/80 hover:bg-red-700 cursor-pointer"
                    title="Delete"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2 text-sm">
                {a.father_name && (
                  <p className="text-gray-600">
                    <span className="font-medium text-[#ba9629]">Father:</span> {a.father_name}
                  </p>
                )}

                {a.mobile_number && (
                  <p className="text-gray-600">
                    <span className="font-medium text-[#ba9629]">Mobile:</span>{' '}
                    <a href={`tel:${a.mobile_number}`} className="text-[#ba9629] hover:underline">
                      {a.mobile_number}
                    </a>
                  </p>
                )}

                {a.designation && (
                  <p className="text-gray-600">
                    <span className="font-medium text-[#ba9629]">Designation:</span> {a.designation}
                  </p>
                )}

                {a.organization && (
                  <p className="text-gray-600">
                    <span className="font-medium text-[#ba9629]">Organization:</span> {a.organization}
                  </p>
                )}

                {a.email && (
                  <p className="text-gray-600 truncate">
                    <span className="font-medium text-[#ba9629]">Email:</span>{' '}
                    <a href={`mailto:${a.email}`} className="text-[#ba9629] hover:underline">
                      {a.email}
                    </a>
                  </p>
                )}

                {a.address && (
                  <p className="text-gray-600">
                    <span className="font-medium text-[#ba9629]">Address:</span> {a.address}
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
              className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
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
                      className={`w-8 h-8 rounded text-sm cursor-pointer ${currentPage === pageNumber
                        ? 'bg-[#ba9629] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 3 ||
                  pageNumber === currentPage + 3
                ) {
                  return <span key={pageNumber} className="w-8 h-8 flex items-center justify-center text-sm text-gray-500">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm text-center py-12">
            <p className="text-gray-500">No alumni found matching your criteria.</p>
          </div>
        )}
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
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-3 bg-red-600">
              <h3 className="text-lg font-semibold text-white">Confirm Delete</h3>
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
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer text-sm"
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