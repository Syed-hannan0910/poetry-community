import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import PoemsPage from './components/PoemsPage';
import ForumPage from './components/ForumPage';
import LearningPage from './components/LearningPage';
import AdminDashboard from './components/AdminDashboard';

type Page = 'home' | 'poems' | 'forum' | 'learning' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'poems':
        return <PoemsPage />;
      case 'forum':
        return <ForumPage />;
      case 'learning':
        return <LearningPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        {renderPage()}
      </div>
    </AuthProvider>
  );
}

export default App;
