import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";
import Profile from './pages/Profile';

function App() {
  const { user, loading, logoutUser } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Router>
      <Layout  user={user} onLogout={logoutUser} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
