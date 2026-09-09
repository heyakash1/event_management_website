import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <div className="navbar">
            <Link to="/">EventHub</Link>
            <div className="nav-links">
                {user ? (
                    <>
                    <Link to="/admin">Admin Panel</Link>
                        <a href="#" onClick={logout} style={{ marginLeft: '20px' }}>Logout</a>
                    </>
                ) : (
                    <Link to="/login">Admin Login</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;