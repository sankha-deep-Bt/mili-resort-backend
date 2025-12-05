// import { useAuth } from "../hooks/useAuth";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   LayoutDashboard,
//   BedDouble,
//   Utensils,
//   Receipt,
//   LogOut,
// } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { useNavigate } from "react-router";
// import useUser from "../hooks/useUser";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import Rooms from "../components/dashboard/Rooms";
// import Menu from "../components/dashboard/Menu";
// import Bills from "../components/dashboard/Bills";
// import Overview from "../components/dashboard/Overview";

// export default function CustomerDashboard() {
//   const { logout } = useAuth();
//   const { profile } = useUser();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("overview");

//   const [bookings, setBookings] = useState<any[]>([]);
//   const [rooms, setRooms] = useState<any[]>([]);

//   const [refresh, setRefresh] = useState(false);

//   const handleBookingCompleted = () => {
//     setRefresh((prev) => !prev); // triggers rerender or refetch
//     fetchData();
//   };

//   const userName = (profile as any)?.name || "Guest";
//   const userEmail = (profile as any)?.email || "guest@example.com";

//   const handleSignOut = async () => {
//     await logout();
//     navigate("/");
//   };

//   // Fetch bookings and rooms
//   const fetchData = async () => {
//     try {
//       const reservationsRes = await axios.get(
//         "http://localhost:3000/api/v1/reservation"
//       );

//       setBookings(
//         Array.isArray(reservationsRes.data) ? reservationsRes.data : []
//       );
//       console.log("Reservations", reservationsRes.data);
//       console.log("Bookings", bookings);
//     } catch (err) {
//       console.error("Error fetching reservations:", err);
//     }
//   };
//   const fetchRooms = async () => {
//     try {
//       const roomsRes = await axios.get(
//         "http://localhost:3000/api/v1/reservation/rooms"
//       );
//       setRooms(Array.isArray(roomsRes.data.rooms) ? roomsRes.data.rooms : []);
//     } catch (err) {
//       console.error("Error fetching rooms:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-stone-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col fixed top-0 left-0 h-full">
//         <div className="p-6 border-b border-stone-100">
//           <div className="text-xl font-bold tracking-widest uppercase text-primary">
//             Mili Resort
//           </div>
//           <div className="text-[0.6rem] uppercase tracking-widest text-stone-400 mt-1">
//             Customer Portal
//           </div>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           <Button
//             variant={activeTab === "overview" ? "secondary" : "ghost"}
//             className="w-full justify-start"
//             onClick={() => setActiveTab("overview")}
//           >
//             <LayoutDashboard className="mr-2 h-4 w-4" />
//             Overview
//           </Button>
//           <Button
//             variant={activeTab === "rooms" ? "secondary" : "ghost"}
//             className="w-full justify-start"
//             onClick={() => setActiveTab("rooms")}
//           >
//             <BedDouble className="mr-2 h-4 w-4" />
//             Choose Rooms
//           </Button>
//           <Button
//             variant={activeTab === "dining" ? "secondary" : "ghost"}
//             className="w-full justify-start"
//             onClick={() => setActiveTab("dining")}
//           >
//             <Utensils className="mr-2 h-4 w-4" />
//             Food & Beverages
//           </Button>
//           <Button
//             variant={activeTab === "billing" ? "secondary" : "ghost"}
//             className="w-full justify-start"
//             onClick={() => setActiveTab("billing")}
//           >
//             <Receipt className="mr-2 h-4 w-4" />
//             Billing & Invoices
//           </Button>
//         </nav>

//         <div className="p-4 border-t border-stone-100">
//           <div className="flex items-center gap-3 mb-4 px-2">
//             <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
//               {userName[0]}
//             </div>
//             <div className="overflow-hidden">
//               <p className="text-sm font-medium truncate">{userName}</p>
//               <p className="text-xs text-stone-500 truncate">{userEmail}</p>
//             </div>
//           </div>
//           <Button variant="outline" className="w-full" onClick={handleSignOut}>
//             <LogOut className="mr-2 h-4 w-4" />
//             Sign Out
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto md:ml-64">
//         <main className="p-6 md:p-12 max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Overview Tab */}
//             {activeTab === "overview" && (
//               <Overview
//                 setActiveTab={setActiveTab}
//                 profile={profile}
//                 bookings={bookings}
//                 fetchReservations={fetchData}
//                 Rooms={rooms}
//               />
//             )}

//             {/* Rooms Tab */}
//             {activeTab === "rooms" && (
//               <Rooms
//                 onBookingCompleted={handleBookingCompleted}
//                 Rooms={rooms}
//               />
//             )}

//             {/* Food & Beverages Tab */}
//             {activeTab === "dining" && <Menu setActiveTab={setActiveTab} />}

//             {/* Billing & Invoices Tab */}
//             {activeTab === "billing" && <Bills bookings={bookings} />}
//           </motion.div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  Utensils,
  Receipt,
  LogOut,
  Menu as MenuIcon,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const handleBookingCompleted = () => {
    setRefresh((prev) => !prev);
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
      {/* ---------------------- MOBILE TOP BAR ---------------------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-stone-200 px-4 py-3">
        {/* ROW 1 — Branding */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-wide">Mili Resort</h1>
        </div>

        {/* ROW 2 — Hamburger Icon */}
        <div className="mt-2">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md border border-stone-300 bg-stone-100"
          >
            <MenuIcon className="h-6 w-6 text-stone-700" />
          </button>
        </div>
      </div>

      {/* ---------------------- DESKTOP SIDEBAR (md and up) ---------------------- */}
      <aside
        className="hidden md:flex w-64 bg-white border-r border-stone-200 flex-col fixed top-0 left-0 h-full z-10"
        aria-hidden={false}
      >
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

        {/* USER INFO + SIGN OUT (desktop) */}
        <div className="p-4 border-t border-stone-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
              {userName.charAt(0)}
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
      </aside>

      {/* ---------------------- MOBILE SLIDE-IN SIDEBAR ---------------------- */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 md:hidden flex flex-col"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {/* Header with close */}
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <div>
                  <div className="text-lg font-bold tracking-widest uppercase text-primary">
                    Mili Resort
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-widest text-stone-400">
                    Customer Portal
                  </div>
                </div>

                <button
                  aria-label="Close menu"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md"
                >
                  <X className="h-6 w-6 text-stone-700" />
                </button>
              </div>

              <nav className="p-4 space-y-2 overflow-y-auto flex-1">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("overview");
                    setSidebarOpen(false);
                  }}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Overview
                </Button>

                <Button
                  variant={activeTab === "rooms" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("rooms");
                    setSidebarOpen(false);
                  }}
                >
                  <BedDouble className="mr-2 h-4 w-4" />
                  Choose Rooms
                </Button>

                <Button
                  variant={activeTab === "dining" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("dining");
                    setSidebarOpen(false);
                  }}
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  Food & Beverages
                </Button>

                <Button
                  variant={activeTab === "billing" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("billing");
                    setSidebarOpen(false);
                  }}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Billing & Invoices
                </Button>
              </nav>

              {/* USER INFO + SIGN OUT (mobile) */}
              <div className="p-4 border-t border-stone-100">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
                    {userName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-stone-500 truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSidebarOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div className="flex-1 overflow-auto md:ml-64">
        <main className="p-6 md:p-12 max-w-6xl mx-auto mt-24 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {activeTab === "overview" && (
              <Overview
                setActiveTab={setActiveTab}
                profile={profile}
                bookings={bookings}
                fetchReservations={fetchData}
                Rooms={rooms}
              />
            )}

            {activeTab === "rooms" && (
              <Rooms
                onBookingCompleted={handleBookingCompleted}
                Rooms={rooms}
              />
            )}

            {activeTab === "dining" && <Menu setActiveTab={setActiveTab} />}

            {activeTab === "billing" && <Bills bookings={bookings} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
