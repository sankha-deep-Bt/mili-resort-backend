import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  Utensils,
  Receipt,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Rooms from "../components/dashboard/Rooms";
import Menu from "../components/dashboard/Menu";
import Bills from "../components/dashboard/Bills";
import Overview from "../components/dashboard/Overview";

export default function CustomerDashboard() {
  const { logout } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");

  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [refresh, setRefresh] = useState(false);

  const handleBookingCompleted = () => {
    setRefresh((prev) => !prev); // triggers rerender or refetch
    fetchData();
  };

  const userName = (profile as any)?.name || "Guest";
  const userEmail = (profile as any)?.email || "guest@example.com";

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  // Fetch bookings and rooms
  const fetchData = async () => {
    try {
      const reservationsRes = await axios.get(
        "http://localhost:3000/api/v1/reservation"
      );

      setBookings(
        Array.isArray(reservationsRes.data) ? reservationsRes.data : []
      );
      console.log("Reservations", reservationsRes.data);
      console.log("Bookings", bookings);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };
  const fetchRooms = async () => {
    try {
      const roomsRes = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms"
      );
      setRooms(Array.isArray(roomsRes.data.rooms) ? roomsRes.data.rooms : []);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col fixed top-0 left-0 h-full">
        <div className="p-6 border-b border-stone-100">
          <div className="text-xl font-bold tracking-widest uppercase text-primary">
            Mili Resort
          </div>
          <div className="text-[0.6rem] uppercase tracking-widest text-stone-400 mt-1">
            Customer Portal
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "rooms" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("rooms")}
          >
            <BedDouble className="mr-2 h-4 w-4" />
            Choose Rooms
          </Button>
          <Button
            variant={activeTab === "dining" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("dining")}
          >
            <Utensils className="mr-2 h-4 w-4" />
            Food & Beverages
          </Button>
          <Button
            variant={activeTab === "billing" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("billing")}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Billing & Invoices
          </Button>
        </nav>

        <div className="p-4 border-t border-stone-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
              {userName[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-stone-500 truncate">{userEmail}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-64">
        <main className="p-6 md:p-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <Overview
                setActiveTab={setActiveTab}
                profile={profile}
                bookings={bookings}
                fetchReservations={fetchData}
                Rooms={rooms}
              />
            )}

            {/* Rooms Tab */}
            {activeTab === "rooms" && (
              <Rooms
                onBookingCompleted={handleBookingCompleted}
                Rooms={rooms}
              />
            )}

            {/* Food & Beverages Tab */}
            {activeTab === "dining" && <Menu setActiveTab={setActiveTab} />}

            {/* Billing & Invoices Tab */}
            {activeTab === "billing" && <Bills bookings={bookings} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
