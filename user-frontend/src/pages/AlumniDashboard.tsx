import React, { useState } from 'react'
import {
    GraduationCap,
    Menu,
    X,
    LogOut,
    BookOpen,
} from 'lucide-react'
import AlumniProfile from '../components/AlumniProfile'
import Workshops from '../components/Workshops';

const AlumniDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('alumni');

    const navItems = [
        { id: 'alumni', label: 'Alumni Profile', icon: GraduationCap },
        { id: 'workshops', label: 'Workshops', icon: BookOpen },
    ];
    const renderContent = () => {
        switch (activeTab) {
            case 'alumni':
                return <AlumniProfile />;
            case 'workshops':
                return <Workshops />;
            default:
                return <AlumniProfile />;
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
                    <h1 className="text-xl font-semibold text-[#00565c]">User Portal</h1>
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
                            <h2 className="text-xl font-bold text-[#00565c]">User Portal</h2>
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
                    {/* Dynamic Content */}
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

export default AlumniDashboard