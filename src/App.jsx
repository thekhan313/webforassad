import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import PreRoll from './pages/PreRoll';
import VideoWatch from './pages/VideoWatch';
import SearchResults from './pages/SearchResults';
import SubmitInfo from './pages/SubmitInfo';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpload from './pages/admin/AdminUpload';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminReports from './pages/admin/AdminReports';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/preroll/:id" element={<PreRoll />} />
          <Route path="/video/:id" element={<VideoWatch />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/submit" element={<SubmitInfo />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/upload" element={<ProtectedRoute><AdminUpload /></ProtectedRoute>} />
          <Route path="/admin/submissions" element={<ProtectedRoute><AdminSubmissions /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
