import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { createBrowserRouter } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Gallery from "./pages/Gallery";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import AuthLayout from "./pages/auth/AuthLayout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthOutlet fallbackPath="/login" />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "gallery", element: <Gallery /> },
          { path: "profile", element: <Profile /> },
          { path: "profile/edit", element: <EditProfile /> },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
