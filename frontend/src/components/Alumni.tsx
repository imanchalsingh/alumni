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
}

interface NewAlumni {
  name: string;
  father_name: string;
  batch_year: number | "";
  designation: string;
  organization: string;
  email: string;
  address: string;
}

const Alumni: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [years, setYears] = useState<number[]>([]);

  const [newAlumni, setNewAlumni] = useState<NewAlumni>({
    name: "",
    father_name: "",
    batch_year: "",
    designation: "",
    organization: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/alumni");
      const data: Alumni[] = await res.json();
      setAlumni(data);

      // Extract unique years for filter
      const uniqueYears = [...new Set(data.map(a => a.batch_year))].sort((a, b) => b - a);
      setYears(uniqueYears);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAlumni(prev => ({
      ...prev,
      [name]: name === "batch_year" ? (value ? Number(value) : "") : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAlumni.name || !newAlumni.batch_year) {
      alert("Name and Batch Year are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/alumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlumni),
      });

      if (res.ok) {
        const addedAlumni = await res.json();
        setAlumni(prev => [...prev, addedAlumni]);
        setNewAlumni({
          name: "",
          father_name: "",
          batch_year: "",
          designation: "",
          organization: "",
          email: "",
          address: "",
        });
        setShowForm(false);
        fetchAlumni(); // Refresh to get updated years list
      }
    } catch (error) {
      console.error("Error adding alumni:", error);
    }
  };

  const filtered = alumni.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === "all" || a.batch_year === Number(selectedYear);
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">BCA Alumni Directory</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {showForm ? "Cancel" : "+ Add New Alumni"}
          </button>
        </div>

        {/* Add Alumni Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Alumni</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAlumni.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={newAlumni.father_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Year *
                  </label>
                  <input
                    type="number"
                    name="batch_year"
                    value={newAlumni.batch_year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={newAlumni.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={newAlumni.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newAlumni.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={newAlumni.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out"
                >
                  Add Alumni
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name
              </label>
              <input
                type="text"
                id="search"
                placeholder="Enter name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Found {filtered.length} alumni
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-linear-to-r from-blue-600 to-blue-800 px-4 py-3">
                <h3 className="text-xl font-semibold text-white truncate">{a.name}</h3>
                <p className="text-blue-100 text-sm">Batch of {a.batch_year}</p>
              </div>

              <div className="p-4 space-y-2">
                {a.father_name && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Father:</span> {a.father_name}
                  </p>
                )}

                {a.designation && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Designation:</span> {a.designation}
                  </p>
                )}

                {a.organization && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Organization:</span> {a.organization}
                  </p>
                )}

                {a.email && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    <a href={`mailto:${a.email}`} className="text-blue-600 hover:underline">
                      {a.email}
                    </a>
                  </p>
                )}

                {a.address && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {a.address}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;