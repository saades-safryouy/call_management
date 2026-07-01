import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout/ManagerLayout';
import EvaluatorLayout from './layouts/EvaluatorLayout/EvaluatorLayout';
import CandidateLayout from './layouts/CandidateLayout/CandidateLayout';
import AuthLayout from './layouts/AuthLayout';

// Shared Pages
import Login from './pages/Login/Login';
import ComingSoon from './pages/ComingSoon';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCalls from './pages/admin/AdminCalls';
import Users from './pages/Users/Users';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';

// Evaluator Pages
import EvaluatorDashboard from './pages/evaluator/EvaluatorDashboard';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateCalls from './pages/candidate/CandidateCalls';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* ADMIN Platform */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="calls" element={<AdminCalls />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* MANAGER Platform */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={['MANAGER']}>
                <ManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="calls" element={<AdminCalls />} /> {/* Reusing component for now */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* HR Platform (portal implemented in a later task) */}
          <Route
            path="/hr/*"
            element={
              <ProtectedRoute allowedRoles={['HR']}>
                <ComingSoon title="HR Portal — coming soon" />
              </ProtectedRoute>
            }
          />

          {/* EVALUATOR Platform */}
          <Route
            path="/evaluator"
            element={
              <ProtectedRoute allowedRoles={['EVALUATOR']}>
                <EvaluatorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EvaluatorDashboard />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* CANDIDATE Platform */}
          <Route
            path="/candidate"
            element={
              <ProtectedRoute allowedRoles={['CANDIDATE']}>
                <CandidateLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="calls" element={<CandidateCalls />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Global Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
