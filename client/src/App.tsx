import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import TermsConditions from "./pages/TermsConditions";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import RefundPolicy from "./pages/RefuncPolicy";
import Gallery from "./pages/Gallery";
import Dining from "./pages/Dining";
import Rooms from "./pages/Rooms";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/dining" element={<Dining />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/delivery-policy" element={<DeliveryPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
