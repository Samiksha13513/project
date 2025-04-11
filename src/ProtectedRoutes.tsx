// src/ProtectedRoutes.tsx
import { Navigate } from 'react-router-dom';
import { useUser } from './ContextApi/UserContext';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Protects routes for authenticated users only
export const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useUser();
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Redirects logged-in users away from login/signup
export const PublicRoute = ({ children }: Props) => {
  const { currentUser } = useUser();
  return !currentUser ? children : <Navigate to="/mainpage" replace />;
};
