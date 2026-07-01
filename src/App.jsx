import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import ToastProvider from './components/feedback/ToastProvider';
import ConfirmProvider from './components/feedback/ConfirmProvider';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import EmployeeLayout from './layouts/EmployeeLayout/EmployeeLayout';
import CandidateLayout from './layouts/CandidateLayout/CandidateLayout';

// Shared placeholder (for nav targets whose business module is not built yet)
import PlaceholderPage from './components/ui/PlaceholderPage';

// Auth & error pages
import Login from './pages/Login/Login';
import Forbidden from './pages/errors/Forbidden';
import NotFound from './pages/errors/NotFound';

// Role pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users/Users';
import HRDashboard from './pages/hr/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import EvaluatorDashboard from './pages/evaluator/Dashboard';
import CandidateHome from './pages/candidate/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ConfirmProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public */}
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Navigate to="/login" replace />} />
                  <Route path="login" element={<Login />} />
                </Route>

                {/* Error routes */}
                <Route path="/403" element={<Forbidden />} />

                {/* ADMINISTRATOR */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <EmployeeLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="calls" element={<PlaceholderPage title="Calls" subtitle="Manage calls for applications" />} />
                  <Route path="reports" element={<PlaceholderPage title="Reports" subtitle="System reports and exports" />} />
                  <Route path="settings" element={<PlaceholderPage title="Settings" subtitle="Platform configuration" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* HR */}
                <Route
                  path="/hr"
                  element={
                    <ProtectedRoute allowedRoles={['HR']}>
                      <EmployeeLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<HRDashboard />} />
                  <Route path="calls" element={<PlaceholderPage title="Calls" subtitle="Create and manage calls for applications" />} />
                  <Route path="applications" element={<PlaceholderPage title="Applications" subtitle="Review submitted applications" />} />
                  <Route path="assign-evaluators" element={<PlaceholderPage title="Assign Evaluators" subtitle="Assign evaluators to applications" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* MANAGER */}
                <Route
                  path="/manager"
                  element={
                    <ProtectedRoute allowedRoles={['MANAGER']}>
                      <EmployeeLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<ManagerDashboard />} />
                  <Route path="reviews" element={<PlaceholderPage title="Reviews" subtitle="Review applications and evaluations" />} />
                  <Route path="decisions" element={<PlaceholderPage title="Decisions" subtitle="Final decisions on applications" />} />
                  <Route path="statistics" element={<PlaceholderPage title="Statistics" subtitle="Performance and process statistics" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* EVALUATOR */}
                <Route
                  path="/evaluator"
                  element={
                    <ProtectedRoute allowedRoles={['EVALUATOR']}>
                      <EmployeeLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<EvaluatorDashboard />} />
                  <Route path="assigned-applications" element={<PlaceholderPage title="Assigned Applications" subtitle="Applications assigned to you" />} />
                  <Route path="evaluations" element={<PlaceholderPage title="Evaluations" subtitle="Your submitted evaluations" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* CANDIDATE (careers portal — top nav, no sidebar) */}
                <Route
                  path="/candidate"
                  element={
                    <ProtectedRoute allowedRoles={['CANDIDATE']}>
                      <CandidateLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<CandidateHome />} />
                  <Route path="calls" element={<PlaceholderPage contained title="Available Calls" subtitle="Browse and apply to open positions" />} />
                  <Route path="applications" element={<PlaceholderPage contained title="My Applications" subtitle="Track your submitted applications" />} />
                  <Route path="documents" element={<PlaceholderPage contained title="Documents" subtitle="Manage your CV and documents" />} />
                  <Route path="profile" element={<PlaceholderPage contained title="Profile" subtitle="Your personal information" />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Global 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ConfirmProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
