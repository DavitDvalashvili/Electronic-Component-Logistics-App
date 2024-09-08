import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Components from "./pages/Components";
import Component from "./pages/Component";
import Device from "./pages/Device";
import Devices from "./pages/Devices";
import Header from "./components/Layout/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index path="/components" element={<Components />} />
      <Route path="/component/:id" element={<Component />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/device/:id" element={<Device />} />
      <Route path="*" element={<Navigate to="/components" replace />} />
    </Route>
  )
);

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className="app font-bpg relative">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
