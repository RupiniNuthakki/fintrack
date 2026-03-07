import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Emis from './pages/Emis';
import Subscriptions from './pages/Subscriptions';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/" />}
        />
        <Route
          path="/emis"
          element={isAuthenticated ? <Emis /> : <Navigate to="/" />}
        />
        <Route
          path="/subscriptions"
          element={isAuthenticated ? <Subscriptions /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;