import { createBrowserRouter } from "react-router-dom";
import Gallery from "./pages/Gallery";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/auth/login";
import AuthLayout from "./pages/auth/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "gallery", element: <Gallery /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
]);

export default router;
