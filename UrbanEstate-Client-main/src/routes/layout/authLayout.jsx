import "./layout.scss";
import Navbar from "../../components/navbar/Navbar.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout() {
    const isLoggedIn = useSelector((state) => state.auth.status);

    return isLoggedIn ? (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

export default AuthLayout;
