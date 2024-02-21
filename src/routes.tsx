import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SnapShots from "./pages/SnapShots";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/snapshots",
    element: <Layout />,
    children: [{ index: true, element: <SnapShots /> }],
  },
]);

export default router;
