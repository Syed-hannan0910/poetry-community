import { useState } from 'react';
import { BookOpen, MessageCircle, GraduationCap, Users, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminPoems from './admin/AdminPoems';
import AdminForum from './admin/AdminForum';
import AdminCourses from './admin/AdminCourses';
import AdminUsers from './admin/AdminUsers';

type Tab = 'poems' | 'forum' | 'courses' | 'users';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('poems');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'poems' as Tab, label: 'Poems', icon: BookOpen },
    { id: 'forum' as Tab, label: 'Forum Posts', icon: MessageCircle },
    { id: 'courses' as Tab, label: 'Courses', icon: GraduationCap },
    { id: 'users' as Tab, label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 py-6">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'poems' && <AdminPoems />}
            {activeTab === 'forum' && <AdminForum />}
            {activeTab === 'courses' && <AdminCourses />}
            {activeTab === 'users' && <AdminUsers />}
          </div>
        </div>
      </div>
    </div>
  );
}
