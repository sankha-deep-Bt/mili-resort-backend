import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  LogOut,
  CalendarDays,
  BedDouble,
  Users,
  Search,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useAdmin } from "../hooks/useAdmin";
import axios from "axios";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const {
    rooms,
    bookings,
    loading,
    fetchBookings,
    fetchRooms,
    updateBookingStatus,
  } = useAdmin();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "bookings" | "rooms" | "guests" | "events"
  >("bookings");
  const [query, setQuery] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [eventRequests, setEventRequests] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  // GLOBAL SEARCH (Option D)
  useEffect(() => {
    const q = query.toLowerCase().trim();

    // ----- Bookings -----
    const fb = (bookings || []).filter((b: any) => {
      const user = b.user || {};
      const room = b.room || {};
      return (
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        room.name?.toLowerCase().includes(q) ||
        b.status?.toLowerCase().includes(q)
      );
    });
    setFilteredBookings(fb);

    // ----- Rooms -----
    const fr = (rooms || []).filter((r: any) => {
      return (
        r.name?.toLowerCase().includes(q) ||
        r.type?.toLowerCase().includes(q) ||
        String(r.price)?.toLowerCase().includes(q)
      );
    });
    setFilteredRooms(fr);

    // ----- Guests -----
    const uniqueGuests = Array.from(
      new Map(
        (bookings || []).map((b: any) => [b.user?.email, b.user])
      ).values()
    );

    const fg = uniqueGuests.filter((g: any) => {
      return (
        g?.name?.toLowerCase().includes(q) ||
        g?.email?.toLowerCase().includes(q) ||
        g?.phone?.toLowerCase().includes(q)
      );
    });
    setFilteredGuests(fg);

    // ----- Events -----
    const fe = (eventRequests || []).filter((e: any) => {
      return (
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q) ||
        e.status?.toLowerCase().includes(q)
      );
    });
    setFilteredEvents(fe);
  }, [query, bookings, rooms, eventRequests]);

  useEffect(() => {
    fetchBookings?.();
    fetchRooms?.();
    fetchEventRequests();
  }, []);

  const fetchEventRequests = async () => {
    try {
      setLoadingEvents(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reservation/event-enquiry"
      );
      setEventRequests(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error("Event request fetch error:", err);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    if (!bookings) return setFilteredBookings([]);
    const q = query.trim().toLowerCase();
    if (!q) return setFilteredBookings(bookings);

    const filtered = bookings.filter((b: any) => {
      const user = b.user || {};
      const room = b.room || {};
      return (
        (user.name || "").toLowerCase().includes(q) ||
        (user.email || "").toLowerCase().includes(q) ||
        (room.name || "").toLowerCase().includes(q) ||
        (b.status || "").toLowerCase().includes(q)
      );
    });
    setFilteredBookings(filtered);
  }, [bookings, query]);

  const stats = useMemo(() => {
    const total = bookings?.length || 0;
    const active = (bookings || []).filter(
      (b: any) => b.status === "approved"
    ).length;
    const cancelled = (bookings || []).filter(
      (b: any) => b.status === "cancelled"
    ).length;
    const revenue = (bookings || []).reduce((acc: number, b: any) => {
      const nights = calcNights(b.startDate, b.endDate);
      const price = b.room?.price || 0;
      if (b.status === "approved" || b.status === "confirmed")
        return acc + nights * price;
      return acc;
    }, 0);
    return { total, active, cancelled, revenue };
  }, [bookings]);

  function calcNights(start?: string, end?: string) {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  const handleAcceptBooking = async (id: string, roomId: string) => {
    setIsProcessing((p) => ({ ...p, [id]: true }));
    try {
      await axios.put(
        "http://localhost:3000/api/v1/admin/reservation/change-status",
        {
          reservationId: id,
          roomId,
          status: "approved",
        }
      );
      updateBookingStatus?.(id, "approved");
      await fetchBookings?.();
    } catch (err: any) {
      console.error("Accept failed:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Accept failed");
    } finally {
      setIsProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleRejectBooking = async (
    roomId: string,
    userId: string,
    id: string,
    targetStatus: "cancelled" | "rejected" = "cancelled"
  ) => {
    setIsProcessing((p) => ({ ...p, [id]: true }));
    try {
      await axios.put(
        "http://localhost:3000/api/v1/admin/reservation/change-status",
        {
          reservationId: id,
          roomId,
          userId,
          status: targetStatus,
        }
      );
      updateBookingStatus?.(id, targetStatus);
      await fetchBookings?.();
    } catch (err: any) {
      console.error("Reject failed:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Reject failed");
    } finally {
      setIsProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleUpdateEventStatus = async (eventId: string, status: string) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/reservation/event-enquiry/${eventId}`,
        {
          status,
        }
      );

      alert(`Event marked as ${status}`);

      // refresh list
      fetchEventRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to update event status");
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const StatCard = ({ title, value, tone }: any) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-stone-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${tone ? tone : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white text-stone-800">
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center p-4 bg-white border-b">
        <Button variant="outline" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
        <span className="ml-2 font-semibold text-lg">Admin Dashboard</span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r p-4
            transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:h-screen
          `}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center md:block">
                <div>
                  <h2 className="text-xl font-semibold">Mili Resort</h2>
                  <p className="text-sm text-stone-500">Admin Portal</p>
                </div>
                {/* Close button on mobile */}
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <nav className="mt-8 space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("bookings");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "bookings"
                      ? "bg-primary/10 text-primary border border-primary/10"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" />
                  Bookings
                </button>
                <button
                  onClick={() => {
                    setActiveTab("rooms");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "rooms"
                      ? "bg-primary/10 text-primary border border-primary/10"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <BedDouble className="h-4 w-4" />
                  Rooms
                </button>
                <button
                  onClick={() => {
                    setActiveTab("guests");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "guests"
                      ? "bg-primary/10 text-primary border border-primary/10"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Guests
                </button>
                <button
                  onClick={() => {
                    setActiveTab("events");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "events"
                      ? "bg-primary/10 text-primary border border-primary/10"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Events
                </button>
              </nav>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mt-4"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {activeTab === "bookings"
                  ? "Booking Management"
                  : activeTab === "rooms"
                  ? "Room Availability"
                  : "Guest Directory"}
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                Manage bookings, availability and guests.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-400">
                  <Search className="h-4 w-4" />
                </span>
                <Input
                  placeholder="Search bookings, guests, rooms..."
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
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

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Requests" value={stats.total} />
            <StatCard title="Active Bookings" value={stats.active} />
            <StatCard
              title="Cancelled"
              value={stats.cancelled}
              tone="text-red-600"
            />
            <StatCard
              title="Estimated Revenue"
              value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
            />
          </div>

          {/* Tabs */}
          {activeTab === "bookings" && (
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>
                  Review incoming requests and manage status.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                {loading ? (
                  <div className="py-12 text-center text-stone-400">
                    Loading…
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="py-12 text-center text-stone-400">
                    No bookings found
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-stone-100">
                    <thead className="bg-stone-50">
                      <tr>
                        <th>Guest</th>
                        <th>Room</th>
                        <th>Dates</th>
                        <th>Nights</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                      {filteredBookings.map((booking: any) => {
                        const nights = calcNights(
                          booking.startDate,
                          booking.endDate
                        );
                        const total = (booking.room?.price || 0) * nights;
                        return (
                          <tr key={booking._id} className="hover:bg-stone-50">
                            <td className="px-4 py-4 align-top">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
                                  {booking.user?.name?.[0] || "U"}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {booking.user?.name}
                                  </div>
                                  <div className="text-sm text-stone-500">
                                    {booking.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <div className="font-medium">
                                {booking.room?.name || "—"}
                              </div>
                              <div className="text-sm text-stone-500">
                                {booking.room?.type || ""}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <div className="text-sm">
                                <div>
                                  <span className="font-medium">In:</span>{" "}
                                  {booking.startDate
                                    ? new Date(
                                        booking.startDate
                                      ).toLocaleDateString()
                                    : "—"}
                                </div>
                                <div>
                                  <span className="font-medium">Out:</span>{" "}
                                  {booking.endDate
                                    ? new Date(
                                        booking.endDate
                                      ).toLocaleDateString()
                                    : "—"}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <div className="text-sm font-medium">
                                {nights}
                              </div>
                              <div className="text-xs text-stone-500">
                                {booking.adult} adults, {booking.children}{" "}
                                children
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top text-right">
                              <div className="font-semibold">
                                ₹{total.toLocaleString("en-IN")}
                              </div>
                              <div className="text-xs text-stone-500">
                                ₹{booking.room?.price}/night
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top text-right">
                              <div className="flex items-center justify-end">
                                <Badge
                                  variant={
                                    booking.status === "cancelled"
                                      ? "destructive"
                                      : booking.status === "approved"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="px-3 py-1 rounded-full text-sm"
                                >
                                  {booking.status}
                                </Badge>
                              </div>
                            </td>
                            <td className="px-4 py-4 align-top text-right">
                              <div className="flex items-center justify-end gap-2">
                                {booking.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleAcceptBooking(
                                          booking._id,
                                          booking.room?._id
                                        )
                                      }
                                      disabled={!!isProcessing[booking._id]}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      {isProcessing[booking._id]
                                        ? "..."
                                        : "Accept"}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleRejectBooking(
                                          booking.room?._id,
                                          booking.user?._id,
                                          booking._id,
                                          "cancelled"
                                        )
                                      }
                                      disabled={!!isProcessing[booking._id]}
                                    >
                                      {isProcessing[booking._id]
                                        ? "..."
                                        : "Reject"}
                                    </Button>
                                  </>
                                )}
                                {booking.status === "approved" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-600 text-red-600 hover:bg-red-50"
                                    onClick={() =>
                                      handleRejectBooking(
                                        booking.room?._id,
                                        booking.user?._id,
                                        booking._id,
                                        "cancelled"
                                      )
                                    }
                                    disabled={!!isProcessing[booking._id]}
                                  >
                                    {isProcessing[booking._id]
                                      ? "..."
                                      : "Cancel"}
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "rooms" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms && rooms.length > 0 ? (
                (filteredRooms.length ? filteredRooms : rooms).map(
                  (room: any) => (
                    <Card key={room._id} className="overflow-hidden">
                      <div
                        className="h-44 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            room.image?.startsWith("http")
                              ? room.image
                              : "/fallback.jpg"
                          })`,
                        }}
                      />
                      <CardHeader>
                        <CardTitle>{room.name}</CardTitle>
                        <CardDescription>
                          {room.type} • ₹{room.price?.toLocaleString("en-IN")}
                          /night
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-stone-500 mb-3">
                          Capacity: {room.capacity} • Floor: {room.floor}
                        </p>
                        <Button
                          onClick={() => navigate(`/admin/rooms/${room._id}`)}
                        >
                          Manage
                        </Button>
                      </CardContent>
                    </Card>
                  )
                )
              ) : (
                <div className="text-stone-500">No rooms available.</div>
              )}
            </div>
          )}

          {activeTab === "guests" && (
            <Card>
              <CardHeader>
                <CardTitle>Guest Directory</CardTitle>
                <CardDescription>Unique guests from bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* {Array.from(
                  new Set((bookings || []).map((b: any) => b.user?.email))
                ).map((email: any) => {
                  const guest = (bookings || []).find(
                    (b: any) => b.user?.email === email
                  );
                  return (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
                          {guest?.user?.name?.[0] || "U"}
                        </div>
                        <div>
                          <div className="font-medium">{guest?.user?.name}</div>
                          <div className="text-sm text-stone-500">
                            {guest?.user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-stone-500">
                        {guest?.user?.phone || "—"}
                      </div>
                    </div>
                  );
                })} */}
                {filteredGuests.length === 0 ? (
                  <p className="text-stone-500">No guests found.</p>
                ) : (
                  filteredGuests.map((guest: any) => (
                    <div
                      key={guest.email}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
                          {guest?.name?.[0] || "U"}
                        </div>
                        <div>
                          <div className="font-medium">{guest?.name}</div>
                          <div className="text-sm text-stone-500">
                            {guest?.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-stone-500">
                        {guest?.phone || "—"}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
          {activeTab === "events" && (
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Event Enquiries
                </CardTitle>
                <CardDescription>
                  Manage all event enquiries submitted by users
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {eventRequests.length === 0 ? (
                  <p className="text-center text-stone-500 py-10">
                    No event enquiries found.
                  </p>
                ) : (
                  (filteredEvents.length ? filteredEvents : eventRequests).map(
                    (event: any) => (
                      <div
                        key={event._id}
                        className="border p-4 rounded-xl shadow-sm bg-white flex flex-col gap-4"
                      >
                        {/* Top section */}
                        <div className="flex justify-between">
                          <div>
                            <h2 className="font-semibold text-lg">
                              {event.name}
                            </h2>
                            <p className="text-sm text-stone-600">
                              {event.email}
                            </p>
                            <p className="text-sm text-stone-600">
                              {event.phone}
                            </p>
                          </div>

                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : event.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {event.status?.toUpperCase() || "PENDING"}
                            </span>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="text-sm text-stone-700 space-y-1">
                          <p>
                            <span className="font-medium">Event Date:</span>{" "}
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>

                          {event.venue && (
                            <p>
                              <span className="font-medium">Venue:</span>{" "}
                              {event.venue}
                            </p>
                          )}

                          {event.guests && (
                            <p>
                              <span className="font-medium">
                                Expected Guests:
                              </span>{" "}
                              {event.guests}
                            </p>
                          )}

                          {event.message && (
                            <p className="mt-2">
                              <span className="font-medium">Message:</span>{" "}
                              {event.message}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        {event.status === "pending" && (
                          <div className="flex gap-3">
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() =>
                                handleUpdateEventStatus(event._id, "approved")
                              }
                            >
                              Approve
                            </Button>

                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() =>
                                handleUpdateEventStatus(event._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  )
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
