import "../styles/header.css";
import { getUser, logout, isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const user = isAuthenticated() ? getUser() : null;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            <div className="header-title-section">
              <h1 className="header-title">Inventory Management with Point of Sale</h1>
              <p className="header-subtitle">Demo</p>
            </div>
          </div>
        </div>

        <div className="header-right">
          {user ? (
            <div className="user-section">
              <div className="user-info">
                <div className="user-avatar">
                  <span className="user-initial">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="user-details">
                  <span className="user-welcome">Welcome back</span>
                  <span className="user-name">{user.name}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <span className="logout-icon">🚪</span>
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
