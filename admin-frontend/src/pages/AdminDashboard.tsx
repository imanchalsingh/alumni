import React, { useState } from 'react'
import {
    GraduationCap,
    Menu,
    X,
    Bell,
    Search,
    Filter,
    Settings,
    LogOut,
    BookOpen,
} from 'lucide-react'
import Alumni from '../components/Alumni'
import Workshop from '../components/Workshops';

interface Workshop {
    id: number;
    title: string;
    instructor: string;
    date: string;
    duration: string;
    capacity: number;
    enrolled: number;
}


const AdminDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('alumni');
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType] = useState('');

    const navItems = [
        { id: 'alumni', label: 'Alumni Meets', icon: GraduationCap },
        { id: 'workshops', label: 'Workshops', icon: BookOpen },
    ];

    const renderAlumni = () => (
        <div className="space-y-6">
            <Alumni />
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'alumni':
                return renderAlumni();
            case 'workshops':
                return <Workshop />;
            default:
                return renderAlumni();
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

export default AdminDashboard