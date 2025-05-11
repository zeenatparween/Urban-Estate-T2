import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const [open, setOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    return (
        <nav>
            <div className="left">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="logo" />
                    <span className="site-name">URBAN ESTATE</span>
                </Link>
                <Link to="/">
                    <span>Home</span>
                </Link>
                <Link to="/about">
                    <span>About</span>
                </Link>
                <Link to="/contact">
                    <span>Contact</span>
                </Link>
            </div>
            <div className="right">
                {isLoggedIn ? (
                    <div className="user">
                        <Link to="/profile" className="profile">
                            <img
                                src={
                                    userData.avatar
                                        ? import.meta.env.VITE_AVATAR_URL + userData?.avatar
                                        : "/userIcon.png"
                                }
                                alt=""
                            />
                            <span>{userData.username}</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <a href="/login">Sign In</a>
                        <a className="register" href="/register">
                            Sign Up
                        </a>
                    </>
                )}
                <div className="menuIcon">
                    <img src="/menu.png" alt="menu-icon" onClick={() => setOpen((prev) => !prev)} />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">
                        <span>Home</span>
                    </a>
                    <a href="/about">
                        <span>About</span>
                    </a>
                    <a href="/contact">
                        <span>Contact</span>
                    </a>

                    {!isLoggedIn && (
                        <>
                            <a href="/login">
                                <span>Sign In</span>
                            </a>
                            <a href="/register">
                                <span>Sign Up</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
