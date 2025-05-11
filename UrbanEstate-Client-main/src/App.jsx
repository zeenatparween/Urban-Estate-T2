import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import HomePage from "./routes/homePage/homePage";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import Register from "./routes/register/register.jsx";
import Login from "./routes/login/login.jsx";
import AuthLayout from "./routes/layout/authLayout.jsx";
import ProfileUpdate from "./routes/profilePage/profileUpdate.jsx";
import CreatePostPage from "./routes/postPage/createPostPage.jsx";
import { listPageLoader, singlePostLoader, profileLoader } from "./lib/loader.js";
import AboutPage from "./routes/about/aboutPage.jsx";
import ContactPage from "./routes/contact/contactPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
            {
                path: "/list",
                element: <ListPage />,
                loader: listPageLoader,
            },
            {
                path: "/posts/:id",
                element: <SinglePage />,
                loader: singlePostLoader,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/profile",
                element: <ProfilePage />,
                loader: profileLoader,
            },
            {
                path: "/profile/update",
                element: <ProfileUpdate />,
            },
            {
                path: "/post/add",
                element: <CreatePostPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
