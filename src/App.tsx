// App.tsx
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Mainpage from './Pages/Mainpage';
import { UserProvider } from './ContextApi/UserContext';
import Dashboard from './Pages/Dashboard';
import Table from './Components/Table';
import Profile from './Components/Profile';
import { PrivateRoute, PublicRoute } from './ProtectedRoutes';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes (only when not logged in) */}
          <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          {/* Private Routes (only for logged in users) */}
          <Route path="/mainpage" element={<PrivateRoute><Mainpage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/table" element={<PrivateRoute><Table /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
