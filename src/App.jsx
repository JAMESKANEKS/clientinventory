import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/Pos";
import Product from "./pages/Product";
import Receipt from "./pages/Receipt";
import Expense from "./pages/Expense";
import Header from "./components/Header";
import Product2 from "./pages/Product2";
import Login from "./pages/Login";
import { isAuthenticated } from "./auth";


function App() {
  // In App.jsx
const [authChecked, setAuthChecked] = useState(false);

// Use it in the component or in effects
useEffect(() => {
  // This effect will run when authChecked changes
}, [authChecked]);

  const RequireAuth = ({ children }) => {
    const location = useLocation();
    if (isAuthenticated()) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  // Add effect to listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthChecked(prev => !prev); // Toggle to force re-render
    };

    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div>
                <Sidebar />
                <div>
                  <Header />
                  <div>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/product" element={<Product />} />
                      <Route path="/product2" element={<Product2 />} />
                      <Route path="/pos" element={<POS />} />
                      <Route path="/receipt" element={<Receipt />} />
                      <Route path="/expense" element={<Expense />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;