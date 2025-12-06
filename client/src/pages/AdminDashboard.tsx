// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Search, Menu } from "lucide-react";
// import { useState, useEffect, useMemo } from "react";
// import { useAdmin } from "../hooks/useAdmin";
// import axios from "axios";

// // Import admin components
// import AdminSidebar from "../components/admin/AdminSidebar";
// import AdminStats from "../components/admin/AdminStats";
// import BookingsTab from "../components/admin/BookingsTab";
// import RoomsTab from "../components/admin/RoomsTab";
// import GuestsTab from "../components/admin/GuestsTab";
// import EventsTab from "../components/admin/EventsTab";
// import OfferTab from "../components/admin/OfferTab"; // NEW

// import toast from "react-hot-toast";

// export default function AdminDashboard() {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const {
//     rooms,
//     bookings,
//     loading,
//     fetchBookings,
//     fetchRooms,
//     updateBookingStatus,
//     updateRoomStatus,
//   } = useAdmin();

//   // Navigation State
//   const [activeTab, setActiveTab] = useState<
//     "bookings" | "rooms" | "guests" | "events" | "latest-offers"
//   >("bookings");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Search & Data State
//   const [query, setQuery] = useState("");
//   const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
//   const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
//   const [filteredGuests, setFilteredGuests] = useState<any[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

//   // Processing State
//   const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
//   const [eventRequests, setEventRequests] = useState<any[]>([]);

//   // --- Data Fetching ---
//   useEffect(() => {
//     fetchBookings?.();
//     fetchRooms?.();
//     fetchEventRequests();
//   }, []);

//   const fetchEventRequests = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/reservation/event-enquiry"
//       );
//       setEventRequests(response.data.data);
//     } catch (err) {
//       console.error("Event request fetch error:", err);
//     }
//   };

//   // --- Filtering Logic (Search) ---
//   useEffect(() => {
//     const q = query.toLowerCase().trim();

//     // Bookings Filter
//     if (!bookings) setFilteredBookings([]);
//     else if (!q) setFilteredBookings(bookings);
//     else {
//       setFilteredBookings(
//         bookings.filter(
//           (b: any) =>
//             b.user?.name?.toLowerCase().includes(q) ||
//             b.room?.name?.toLowerCase().includes(q) ||
//             b.status?.toLowerCase().includes(q)
//         )
//       );
//     }

//     // Rooms Filter
//     if (rooms) {
//       setFilteredRooms(
//         rooms.filter(
//           (r: any) =>
//             r.name?.toLowerCase().includes(q) ||
//             r.type?.toLowerCase().includes(q)
//         )
//       );
//     }

//     // Guests Filter
//     const uniqueGuests = Array.from(
//       new Map(
//         (bookings || []).map((b: any) => [b.user?.email, b.user])
//       ).values()
//     );
//     setFilteredGuests(
//       uniqueGuests.filter(
//         (g: any) =>
//           g?.name?.toLowerCase().includes(q) ||
//           g?.email?.toLowerCase().includes(q)
//       )
//     );

//     // Events Filter
//     setFilteredEvents(
//       eventRequests.filter(
//         (e: any) =>
//           e.name?.toLowerCase().includes(q) ||
//           e.email?.toLowerCase().includes(q)
//       )
//     );
//   }, [query, bookings, rooms, eventRequests]);

//   // --- Stats Calculation ---
//   const stats = useMemo(() => {
//     const total = bookings?.length || 0;
//     const active = (bookings || []).filter(
//       (b: any) => b.status === "approved"
//     ).length;
//     const cancelled = (bookings || []).filter(
//       (b: any) => b.status === "cancelled"
//     ).length;

//     const revenue = (bookings || []).reduce((acc: number, b: any) => {
//       if (b.status === "approved" || b.status === "confirmed") {
//         return acc + b.amount;
//       }
//       return acc;
//     }, 0);
//     return { total, active, cancelled, revenue };
//   }, [bookings]);

//   // --- Action Handlers ---

//   const handleSignOut = async () => {
//     await logout();
//     navigate("/");
//   };

//   const handleAcceptBooking = async (id: string) => {
//     setIsProcessing((p) => ({ ...p, [id]: true }));
//     try {
//       await axios.put(
//         "http://localhost:3000/api/v1/admin/reservation/change-status",
//         { reservationId: id, status: "approved" }
//       );
//       updateBookingStatus?.(id, "approved");
//       await fetchBookings?.();
//       toast.success("Booking approved.");
//     } catch (err: any) {
//       toast.error("Accept failed");
//     } finally {
//       setIsProcessing((p) => ({ ...p, [id]: false }));
//     }
//   };

//   const handleRejectBooking = async (
//     id: string,
//     targetStatus: "cancelled" | "rejected" = "rejected"
//   ) => {
//     setIsProcessing((p) => ({ ...p, [id]: true }));
//     try {
//       await axios.put(
//         "http://localhost:3000/api/v1/admin/reservation/change-status",
//         { reservationId: id, status: targetStatus }
//       );
//       updateBookingStatus?.(id, targetStatus);
//       await fetchBookings?.();
//       toast.success("Booking rejected successfully.");
//     } catch (err: any) {
//       console.error(err);
//       toast.error("Reject failed");
//     } finally {
//       setIsProcessing((p) => ({ ...p, [id]: false }));
//     }
//   };

//   const handleDeleteBooking = async (ids: string[]) => {
//     try {
//       if (ids.length === 1) {
//         await axios.delete(
//           `http://localhost:3000/api/v1/reservation/delete-cancel/${ids[0]}`
//         );
//       } else {
//         await axios.delete(
//           "http://localhost:3000/api/v1/reservation/delete-cancel"
//         );
//       }

//       await fetchBookings?.();
//       toast.success("Successfully deleted bookings");
//     } catch (error) {
//       toast.error("Failed to delete bookings");
//     }
//   };

//   const handleCheckIn = async (id: string, targetStatus: "checked-in") => {
//     setIsProcessing((p) => ({ ...p, [id]: true }));
//     try {
//       await axios.put(
//         "http://localhost:3000/api/v1/admin/reservation/change-status",
//         { reservationId: id, status: targetStatus }
//       );
//       updateBookingStatus?.(id, targetStatus);
//       await fetchBookings?.();
//       toast.success("Check-in successfully.");
//     } catch (err: any) {
//       console.error(err);
//       toast.error("Check-in failed");
//     } finally {
//       setIsProcessing((p) => ({ ...p, [id]: false }));
//     }
//   };

//   const handleUpdateEventStatus = async (eventId: string, status: string) => {
//     try {
//       await axios.patch(
//         `http://localhost:3000/api/v1/reservation/event-enquiry/${eventId}`,
//         { status }
//       );
//       toast.success(`Event marked as ${status}`);
//       fetchEventRequests();
//     } catch (error) {
//       toast.error("Failed to update event status");
//     }
//   };

//   const handleEditRoom = (roomId: string, data: any) => {
//     try {
//       axios.put(`http://localhost:3000/api/v1/admin/rooms/${roomId}/edit`, {
//         data,
//       });
//       updateRoomStatus?.(roomId, data);
//     } catch (error) {
//       toast.error("Failed to toggle room availability");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-stone-50 to-white text-stone-800 flex">
//       <AdminSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         onSignOut={handleSignOut}
//       />

//       <main className="flex-1 p-4 md:p-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="md:hidden flex items-center mb-4">
//             <Button variant="outline" onClick={() => setSidebarOpen(true)}>
//               <Menu className="w-5 h-5" />
//             </Button>
//             <span className="ml-2 font-semibold text-lg">Dashboard</span>
//           </div>

//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">
//               {activeTab === "bookings"
//                 ? "Booking Management"
//                 : activeTab === "rooms"
//                 ? "Room Availability"
//                 : activeTab === "guests"
//                 ? "Guest Directory"
//                 : activeTab === "events"
//                 ? "Events"
//                 : "Latest Offers"}
//             </h1>
//             <p className="text-sm text-stone-500 mt-1">
//               Manage bookings, availability and guests.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-stone-400">
//                 <Search className="h-4 w-4" />
//               </span>
//               <Input
//                 placeholder="Search..."
//                 value={query}
//                 onChange={(e: any) => setQuery(e.target.value)}
//                 className="pl-10 pr-3 w-72"
//               />
//             </div>
//             <Button
//               onClick={() => {
//                 fetchBookings?.();
//                 fetchRooms?.();
//                 fetchEventRequests?.();
//                 // Optionally, you could instruct OfferTab to refetch via a shared state or event bus.
//               }}
//             >
//               Refresh
//             </Button>
//           </div>
//         </div>

//         <AdminStats stats={stats} />

//         {/* Tabs */}
//         {activeTab === "bookings" && (
//           <BookingsTab
//             bookings={filteredBookings}
//             loading={loading}
//             isProcessing={isProcessing}
//             onAccept={handleAcceptBooking}
//             onReject={handleRejectBooking}
//             onDelete={handleDeleteBooking}
//             onCheckin={handleCheckIn}
//           />
//         )}

//         {activeTab === "rooms" && (
//           <RoomsTab
//             rooms={filteredRooms.length ? filteredRooms : rooms || []}
//             onToggleStatus={handleEditRoom}
//           />
//         )}

//         {activeTab === "guests" && <GuestsTab guests={filteredGuests} />}

//         {activeTab === "events" && (
//           <EventsTab
//             events={filteredEvents.length ? filteredEvents : eventRequests}
//             onUpdateStatus={handleUpdateEventStatus}
//           />
//         )}

//         {activeTab === "latest-offers" && <OfferTab />}
//       </main>
//     </div>
//   );
// }

// src/pages/AdminDashboard.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Menu } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useAdmin } from "../hooks/useAdmin";
import axios from "axios";

// Import admin components
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminStats from "../components/admin/AdminStats";
import BookingsTab from "../components/admin/BookingsTab";
import RoomsTab from "../components/admin/RoomsTab";
import GuestsTab from "../components/admin/GuestsTab";
import EventsTab from "../components/admin/EventsTab";
import OfferTab from "../components/admin/OfferTab";

import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    rooms,
    bookings,
    loading,
    fetchBookings,
    fetchRooms,
    updateBookingStatus,
    updateRoomStatus,
  } = useAdmin();

  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "bookings" | "rooms" | "guests" | "events" | "latest-offers"
  >("bookings");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Data State
  const [query, setQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  // Processing State
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [eventRequests, setEventRequests] = useState<any[]>([]);

  // Fetch initial data
  useEffect(() => {
    fetchBookings?.();
    fetchRooms?.();
    fetchEventRequests();
  }, []);

  const fetchEventRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/reservation/event-enquiry"
      );
      setEventRequests(response.data.data);
    } catch (err) {
      console.error("Event fetch error:", err);
    }
  };

  // --- Filtering Logic ---
  useEffect(() => {
    const q = query.toLowerCase().trim();

    // Bookings
    if (!q) setFilteredBookings(bookings || []);
    else
      setFilteredBookings(
        (bookings || []).filter(
          (b: any) =>
            b.user?.name?.toLowerCase().includes(q) ||
            b.room?.name?.toLowerCase().includes(q) ||
            b.status?.toLowerCase().includes(q)
        )
      );

    // Rooms
    setFilteredRooms(
      (rooms || []).filter(
        (r: any) =>
          r.name?.toLowerCase().includes(q) || r.type?.toLowerCase().includes(q)
      )
    );

    // Guests
    const uniqueGuests = Array.from(
      new Map(
        (bookings || []).map((b: any) => [b.user?.email, b.user])
      ).values()
    );

    setFilteredGuests(
      uniqueGuests.filter(
        (g: any) =>
          g?.name?.toLowerCase().includes(q) ||
          g?.email?.toLowerCase().includes(q)
      )
    );

    // Events
    setFilteredEvents(
      eventRequests.filter(
        (e: any) =>
          e.name?.toLowerCase().includes(q) ||
          e.email?.toLowerCase().includes(q)
      )
    );
  }, [query, bookings, rooms, eventRequests]);

  // --- Admin Stats ---
  const stats = useMemo(() => {
    const total = bookings?.length || 0;
    const active =
      bookings?.filter((b: any) => b.status === "approved").length || 0;
    const cancelled =
      bookings?.filter((b: any) => b.status === "cancelled").length || 0;

    const revenue = (bookings || []).reduce((acc: number, b: any) => {
      if (b.status === "approved" || b.status === "confirmed") {
        return acc + b.amount;
      }
      return acc;
    }, 0);

    return { total, active, cancelled, revenue };
  }, [bookings]);

  // --- Action Handlers ---
  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const handleAcceptBooking = async (id: string) => {
    setIsProcessing((p) => ({ ...p, [id]: true }));
    try {
      await axios.put(
        "http://localhost:3000/api/v1/admin/reservation/change-status",
        { reservationId: id, status: "approved" }
      );
      updateBookingStatus?.(id, "approved");
      fetchBookings?.();
      toast.success("Booking approved");
    } catch {
      toast.error("Failed to approve booking");
    } finally {
      setIsProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleRejectBooking = async (id: string, targetStatus = "rejected") => {
    setIsProcessing((p) => ({ ...p, [id]: true }));
    try {
      await axios.put(
        "http://localhost:3000/api/v1/admin/reservation/change-status",
        { reservationId: id, status: targetStatus }
      );
      updateBookingStatus?.(id, targetStatus);
      fetchBookings?.();
      toast.success("Booking rejected");
    } catch {
      toast.error("Failed to reject booking");
    } finally {
      setIsProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleDeleteBooking = async (ids: string[]) => {
    try {
      if (ids.length === 1) {
        await axios.delete(
          `http://localhost:3000/api/v1/reservation/delete-cancel/${ids[0]}`
        );
      } else {
        await axios.delete(
          "http://localhost:3000/api/v1/reservation/delete-cancel"
        );
      }

      fetchBookings?.();
      toast.success("Bookings deleted");
    } catch {
      toast.error("Failed to delete bookings");
    }
  };

  const handleCheckIn = async (id: string) => {
    setIsProcessing((p) => ({ ...p, [id]: true }));
    try {
      await axios.put(
        "http://localhost:3000/api/v1/admin/reservation/change-status",
        { reservationId: id, status: "checked-in" }
      );
      updateBookingStatus?.(id, "checked-in");
      fetchBookings?.();
      toast.success("Checked in");
    } catch {
      toast.error("Check-in failed");
    } finally {
      setIsProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleUpdateEventStatus = async (eventId: string, status: string) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/reservation/event-enquiry/${eventId}`,
        { status }
      );
      toast.success(`Event marked as ${status}`);
      fetchEventRequests();
    } catch {
      toast.error("Failed to update event");
    }
  };

  const handleEditRoom = async (roomId: string, data: any) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/admin/rooms/${roomId}/edit`,
        { data }
      );
      updateRoomStatus?.(roomId, data);
    } catch {
      toast.error("Room update failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 to-white text-stone-800 flex">
      {/* Fixed Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSignOut={handleSignOut}
      />

      {/* Main Content Scrollable */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="md:hidden flex items-center mb-4">
            <Button variant="outline" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <span className="ml-2 font-semibold text-lg">Dashboard</span>
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {activeTab === "bookings"
                ? "Booking Management"
                : activeTab === "rooms"
                ? "Room Availability"
                : activeTab === "guests"
                ? "Guest Directory"
                : activeTab === "events"
                ? "Events"
                : "Latest Offers"}
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Manage bookings, availability and guests.
            </p>
          </div>

          {/* Search + Refresh */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <Input
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-3 w-72"
              />
            </div>

            <Button
              onClick={() => {
                fetchBookings?.();
                fetchRooms?.();
                fetchEventRequests?.();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>

        <AdminStats stats={stats} />

        {/* Tabs */}
        {activeTab === "bookings" && (
          <BookingsTab
            bookings={filteredBookings}
            loading={loading}
            isProcessing={isProcessing}
            onAccept={handleAcceptBooking}
            onReject={handleRejectBooking}
            onDelete={handleDeleteBooking}
            onCheckin={handleCheckIn}
          />
        )}

        {activeTab === "rooms" && (
          <RoomsTab
            rooms={filteredRooms.length ? filteredRooms : rooms || []}
            onToggleStatus={handleEditRoom}
          />
        )}

        {activeTab === "guests" && <GuestsTab guests={filteredGuests} />}

        {activeTab === "events" && (
          <EventsTab
            events={filteredEvents.length ? filteredEvents : eventRequests}
            onUpdateStatus={handleUpdateEventStatus}
          />
        )}

        {activeTab === "latest-offers" && <OfferTab />}
      </main>
    </div>
  );
}
