import React, { useState } from 'react'
import {
    GraduationCap,
    Menu,
    X,
    LogOut,
    BookOpen,
    ChevronRight,
    DockIcon,
} from 'lucide-react'
import Alumni from '../components/Alumni'
import Workshop from '../components/Workshops';
import { useNavigate } from 'react-router-dom';
import About from '../components/About';

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
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('alumni');

    // Dark yellow accent color
    const accentColor = '#ba9629';

    const navItems = [
        { id: 'alumni', label: 'Alumni Meets', icon: GraduationCap },
        { id: 'workshops', label: 'Workshops', icon: BookOpen },
        { id: 'about', label: 'About', icon: DockIcon }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'alumni':
                return <Alumni />;
            case 'workshops':
                return <Workshop />;
              case 'about':
                return <About />;
            default:
                return <Alumni />;
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
                    <h1 className="text-xl font-semibold" style={{ color: accentColor }}>Admin Panel</h1>
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
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold" style={{ color: accentColor }}>Admin Panel</h2>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Main Menu</p>
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
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${activeTab === item.id
                                                    ? 'text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }
                      `}
                                            style={activeTab === item.id ? { backgroundColor: accentColor } : {}}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium flex-1 text-left">{item.label}</span>
                                            {activeTab === item.id && (
                                                <ChevronRight className="w-4 h-4 text-white" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <button
                            onClick={() => {
                                navigate('/');
                                localStorage.removeItem('adminToken');
                                sessionStorage.removeItem('adminToken');
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                            style={{ color: '#dc2626' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Tab Navigation for Mobile */}
                    <div className="lg:hidden mb-6">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === item.id ? 'text-white' : 'text-gray-600 bg-gray-100'
                                            }`}
                                        style={activeTab === item.id ? { backgroundColor: accentColor } : {}}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard