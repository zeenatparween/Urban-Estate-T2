import axios from "axios";
import { store } from "../store/store.js";
import { logout } from "../store/auth/authSlice.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            alert("Your session has expired. Please log in again.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
