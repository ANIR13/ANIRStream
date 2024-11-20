import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}