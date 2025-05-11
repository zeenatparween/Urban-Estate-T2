import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const data = await fetch(import.meta.env.VITE_SERVER_URL + "/auth/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
                credentials: "include",
            });

            const user = await data.json();

            if (!data.ok) {
                throw new Error(user.message);
            }

            navigate("/login");
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>Register</button>
                    {error.length > 0 && <span>{error}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            {/* <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div> */}
        </div>
    );
}

export default Register;
