import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice.js";
import api from "../../utils/api.js";

function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const { data: user } = await api.post("/auth/login", {
                username: username,
                password: password,
            });

            if (!user || !user.data) {
                throw new Error("Failed to login");
            }

            dispatch(login(user.data));

            navigate("/");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message);
                setError(err.response.data.message);
            } else {
                console.log(err.message);
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form method="POST" onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="username" type="text" placeholder="Username" required min={3} max={30} />
                    <input name="password" type="password" placeholder="Password" required />
                    <button disabled={isLoading}>Login</button>
                    {error.length > 0 && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            {/* <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div> */}
        </div>
    );
}

export default Login;
