import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Protected from "./components/Protected";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/protected",
      element: <Protected />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
