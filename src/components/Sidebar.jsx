import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { getUser } from "../auth";

const Sidebar = () => {
  const [user, setUser] = useState(() => getUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getUser());
    };

    window.addEventListener('storage', handleAuthChange);
    handleAuthChange();

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const showDashboard = user && user.username === "admin@inventory.com";

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="logo-section">
          <div className="logo-icon">📦</div>
          <div className="logo-text">
            <div className="logo-title">Inventory</div>
            <div className="logo-subtitle">Management System</div>
          </div>
        </div>

        <nav className="nav-links">
          {showDashboard && (
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </NavLink>
          )}

          <NavLink 
            to="/product" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🎨</span>
            <span className="nav-label">Paint / Products</span>
          </NavLink>

          <NavLink 
            to="/product2" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🛠️</span>
            <span className="nav-label">Tools / Hardware</span>
          </NavLink>

          <NavLink 
            to="/pos" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">💳</span>
            <span className="nav-label">POS Terminal</span>
          </NavLink>

          <NavLink 
            to="/expense" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">💸</span>
            <span className="nav-label">Expense Log</span>
          </NavLink>

          <NavLink 
            to="/receipt" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-label">Receipts</span>
          </NavLink>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
