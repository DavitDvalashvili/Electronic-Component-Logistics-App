import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Components from "./pages/Components";
import Component from "./pages/Component";
import Device from "./pages/Device";
import Devices from "./pages/Devices";
import Header from "./components/Layout/Header";

function App() {
  return (
    <div className="app font-bpg relative">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Components />} />
          <Route path="/component/:id" element={<Component />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device/:id" element={<Device />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
