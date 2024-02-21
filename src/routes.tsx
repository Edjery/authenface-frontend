import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/gallery",
    element: <Layout />,
    children: [{ index: true, element: <Gallery /> }],
  },
]);

export default router;
