import React, { useState } from 'react'
import {
    Users,
    Calendar,
    Briefcase,
    GraduationCap,
    Menu,
    X,
    Plus,
    Edit,
    Trash2,
    ChevronRight,
    Bell,
    Search,
    Filter,
    Settings,
    LogOut,
    Home,
    UserPlus,
    BookOpen,
    Award
} from 'lucide-react'
import AlumniProfile from '../components/AlumniProfile'
import Workshops from '../components/Workshops';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinDate: string;
}

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    status: 'upcoming' | 'ongoing' | 'completed';
}

interface Workshop {
    id: number;
    title: string;
    instructor: string;
    date: string;
    duration: string;
    capacity: number;
    enrolled: number;
}

interface Placement {
    id: number;
    company: string;
    position: string;
    package: string;
    date: string;
    students: string[];
    description: string;
}

const AlumniDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType, setModalType] = useState('');

    // Sample data
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'active', joinDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Alumni', status: 'active', joinDate: '2023-11-20' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Faculty', status: 'inactive', joinDate: '2024-02-01' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student', status: 'active', joinDate: '2024-01-10' },
    ]);

    const [events, setEvents] = useState<Event[]>([
        { id: 1, title: 'Alumni Meet 2024', date: '2024-04-15', time: '10:00 AM', location: 'Main Hall', attendees: 150, status: 'upcoming' },
        { id: 2, title: 'Tech Talk Series', date: '2024-04-20', time: '2:00 PM', location: 'Auditorium', attendees: 75, status: 'upcoming' },
        { id: 3, title: 'Networking Mixer', date: '2024-03-30', time: '6:00 PM', location: 'Rooftop', attendees: 200, status: 'ongoing' },
    ]);

    const [workshops, setWorkshops] = useState<Workshop[]>([
        { id: 1, title: 'AI & Machine Learning', instructor: 'Dr. Smith', date: '2024-04-10', duration: '2 days', capacity: 50, enrolled: 35 },
        { id: 2, title: 'Career Development', instructor: 'Prof. Johnson', date: '2024-04-18', duration: '1 day', capacity: 100, enrolled: 67 },
        { id: 3, title: 'Public Speaking', instructor: 'Ms. Davis', date: '2024-04-25', duration: '3 days', capacity: 30, enrolled: 28 },
    ]);

    const [placements, setPlacements] = useState<Placement[]>([
        { id: 1, company: 'Google', position: 'Software Engineer', package: '45 LPA', date: '2024-03-15', students: ['John Doe', 'Alice Brown'], description: 'Hiring for multiple roles in Bangalore' },
        { id: 2, company: 'Microsoft', position: 'Product Manager', package: '40 LPA', date: '2024-03-20', students: ['Bob Wilson'], description: 'Looking for experienced candidates' },
        { id: 3, company: 'Amazon', position: 'Data Scientist', package: '38 LPA', date: '2024-03-25', students: ['Emma Davis', 'Charlie Lee'], description: 'Immediate joining available' },
    ]);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Manage Users', icon: Users },
        { id: 'alumni', label: 'Alumni Profile', icon: GraduationCap },
        { id: 'workshops', label: 'Workshops', icon: BookOpen },
        { id: 'placements', label: 'Placement Updates', icon: Briefcase },
        { id: 'statistics', label: 'Statistics', icon: Award },
    ];

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        upcomingEvents: events.filter(e => e.status === 'upcoming').length,
        totalWorkshops: workshops.length,
        totalPlacements: placements.length,
        placedStudents: placements.reduce((acc, p) => acc + p.students.length, 0),
    };

    const renderDashboard = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#00565c]/10 rounded-lg">
                        <Users className="w-6 h-6 text-[#00565c]" />
                    </div>
                    <span className="text-sm text-gray-500">Total</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                <p className="text-gray-600">Registered Users</p>
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 font-medium">{stats.activeUsers} active</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">{stats.totalUsers - stats.activeUsers} inactive</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#00565c]/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-[#00565c]" />
                    </div>
                    <span className="text-sm text-gray-500">This month</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stats.upcomingEvents}</h3>
                <p className="text-gray-600">Upcoming Events</p>
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-[#00565c] font-medium">{events.length} total</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">3 ongoing</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#00565c]/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-[#00565c]" />
                    </div>
                    <span className="text-sm text-gray-500">This year</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stats.placedStudents}</h3>
                <p className="text-gray-600">Students Placed</p>
                <div className="mt-4 flex items-center text-sm">
                    <span className="text-[#00565c] font-medium">{stats.totalPlacements} companies</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">avg 40 LPA</span>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                    <button className="text-sm text-[#00565c] hover:text-[#004348] font-medium">View All</button>
                </div>
                <div className="space-y-4">
                    {events.slice(0, 3).map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#00565c]/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-[#00565c]" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{event.title}</p>
                                    <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                event.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                {event.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <button onClick={() => { setModalType('user'); setShowAddModal(true); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <UserPlus className="w-5 h-5 text-[#00565c]" />
                            <span className="text-gray-700">Add New User</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => { setModalType('event'); setShowAddModal(true); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <Plus className="w-5 h-5 text-[#00565c]" />
                            <span className="text-gray-700">Create Event</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => { setModalType('workshop'); setShowAddModal(true); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <BookOpen className="w-5 h-5 text-[#00565c]" />
                            <span className="text-gray-700">Schedule Workshop</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => { setModalType('placement'); setShowAddModal(true); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <Briefcase className="w-5 h-5 text-[#00565c]" />
                            <span className="text-gray-700">Post Placement</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">Manage Users</h2>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]"
                            />
                        </div>
                        <button className="px-4 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors flex items-center space-x-2">
                            <UserPlus className="w-4 h-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-[#00565c]/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-[#00565c]">{user.name.charAt(0)}</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#00565c]/10 text-[#00565c]">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-3">
                                        <button className="text-[#00565c] hover:text-[#004348]">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-500 hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderEvents = () => (
        <div className="space-y-6">
            <AlumniProfile />
        </div>
    );

    const renderPlacements = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">Placement Updates</h2>
                    <button className="px-4 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Post Update</span>
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {placements.map((placement) => (
                        <div key={placement.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-[#00565c]/10 rounded-lg">
                                        <Briefcase className="w-6 h-6 text-[#00565c]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-lg font-semibold text-gray-800">{placement.company}</h3>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                New
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mt-1">{placement.position}</p>
                                        <div className="flex items-center space-x-4 mt-2 text-sm">
                                            <span className="flex items-center text-gray-500">
                                                <Award className="w-4 h-4 mr-1" />
                                                {placement.package}
                                            </span>
                                            <span className="flex items-center text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {placement.date}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{placement.description}</p>
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-gray-700">Placed Students:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {placement.students.map((student, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                        {student}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                    <button className="px-3 py-1 text-sm text-[#00565c] hover:bg-[#00565c]/10 rounded-lg transition-colors">
                                        View Details
                                    </button>
                                    <button className="p-2 text-[#00565c] hover:bg-[#00565c]/10 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStatistics = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600">Total Users</h3>
                        <Users className="w-5 h-5 text-[#00565c]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                    <p className="text-sm text-green-500 mt-2">↑ 12% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600">Active Events</h3>
                        <Calendar className="w-5 h-5 text-[#00565c]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stats.upcomingEvents}</p>
                    <p className="text-sm text-green-500 mt-2">↑ 5% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600">Workshops</h3>
                        <BookOpen className="w-5 h-5 text-[#00565c]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalWorkshops}</p>
                    <p className="text-sm text-yellow-500 mt-2">↗ 8% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-600">Placements</h3>
                        <Briefcase className="w-5 h-5 text-[#00565c]" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{stats.placedStudents}</p>
                    <p className="text-sm text-green-500 mt-2">↑ 15% from last month</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Students</span>
                                <span className="font-medium text-gray-800">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-[#00565c] h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Alumni</span>
                                <span className="font-medium text-gray-800">25%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-[#00565c] h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Faculty</span>
                                <span className="font-medium text-gray-800">10%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-[#00565c] h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Placements by Company</h3>
                    <div className="space-y-3">
                        {placements.map((placement, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-[#00565c]/10 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-[#00565c]">{placement.company.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{placement.company}</p>
                                        <p className="text-sm text-gray-500">{placement.position}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-green-600">{placement.package}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'users':
                return renderUsers();
            case 'alumni':
                return renderEvents();
            case 'workshops':
                return <Workshops />;
            case 'placements':
                return renderPlacements();
            case 'statistics':
                return renderStatistics();
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-semibold text-[#00565c]">Admin Panel</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 bg-[#00565c] rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">A</span>
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#00565c]">Admin Portal</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <div className="mt-4 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#00565c] rounded-full flex items-center justify-center">
                                <span className="text-lg font-medium text-white">A</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Admin User</p>
                                <p className="text-sm text-gray-500">admin@college.edu</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${activeTab === item.id
                                                    ? 'bg-[#00565c] text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }
                      `}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c] w-64"
                                />
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Filter className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    {renderContent()}
                </div>
            </main>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Add New {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                                </h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-4">
                                    {modalType === 'user' && (
                                        <>
                                            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]">
                                                <option>Select Role</option>
                                                <option>Student</option>
                                                <option>Alumni</option>
                                                <option>Faculty</option>
                                            </select>
                                        </>
                                    )}
                                    {modalType === 'event' && (
                                        <>
                                            <input type="text" placeholder="Event Title" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="date" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="text" placeholder="Location" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                        </>
                                    )}
                                    {modalType === 'workshop' && (
                                        <>
                                            <input type="text" placeholder="Workshop Title" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="text" placeholder="Instructor" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="number" placeholder="Capacity" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                        </>
                                    )}
                                    {modalType === 'placement' && (
                                        <>
                                            <input type="text" placeholder="Company Name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="text" placeholder="Position" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <input type="text" placeholder="Package" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]" />
                                            <textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00565c]/20 focus:border-[#00565c]"></textarea>
                                        </>
                                    )}
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 bg-[#00565c] text-white rounded-lg hover:bg-[#004348] transition-colors">
                                        Add {modalType}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AlumniDashboard