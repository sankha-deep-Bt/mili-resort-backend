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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import useUser from "../hooks/useUser";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ORDERABLE_MENU_ITEMS } from "../data/orderableMenu";
import { Badge } from "../components/ui/badge";

export default function CustomerDashboard() {
  const { logout } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  const [openBookingRoom, setOpenBookingRoom] = useState<any | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const [notes, setNotes] = useState("");

  const userName = (profile as any)?.name || "Guest";
  const userEmail = (profile as any)?.email || "guest@example.com";

  const fallbackRoomImage =
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";

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
      const roomsRes = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms"
      );

      setBookings(
        Array.isArray(reservationsRes.data) ? reservationsRes.data : []
      );
      setRooms(Array.isArray(roomsRes.data.rooms) ? roomsRes.data.rooms : []);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenBooking = (room: any) => {
    setOpenBookingRoom(room);
    setCheckIn(null);
    setCheckOut(null);
    setNotes("");
  };

  const handleBookingSubmit = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/reservation/add",
        {
          roomId: openBookingRoom._id,
          startDate: checkIn.toISOString(),
          endDate: checkOut.toISOString(),
          adults,
          children,
        },
        { withCredentials: true }
      );

      setOpenBookingRoom(null);
      await fetchData();
      alert("Booking successful!");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Booking failed. Please try again.";
      console.error("Booking failed:", message);
      alert(message);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
        reservationId: bookingId,
      });
      await fetchData();
      alert("Booking cancelled");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Booking failed. Please try again.";
      console.error("Booking failed:", message);
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col fixed top-0 left-0 h-full">
        <div className="p-6 border-b border-stone-100">
          <div className="text-xl font-bold tracking-widest uppercase text-primary">
            Mili's Resort
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
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl font-light tracking-tight mb-2">
                    Welcome back,{" "}
                    <span className="font-normal">{userName}</span>
                  </h1>
                  <p className="text-stone-500 text-lg">
                    Here’s a summary of your upcoming and past bookings.
                  </p>
                </div>

                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((b) => (
                      <Card
                        key={b._id}
                        className="relative rounded-2xl hover:shadow-xl shadow-md transition-all duration-300 border-stone-200"
                      >
                        <Badge
                          className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md"
                          variant={
                            b.status === "cancelled"
                              ? "destructive"
                              : b.status === "confirmed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {b.status}
                        </Badge>

                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-semibold tracking-wide">
                            Room: {b.room.name}
                          </CardTitle>
                          <CardDescription className="space-y-1.5 text-base">
                            <div className="flex gap-1">
                              <span className="font-medium text-stone-700">
                                Check-in:
                              </span>{" "}
                              {b.startDate.split("T")[0]}
                            </div>
                            <div className="flex gap-1">
                              <span className="font-medium text-stone-700">
                                Check-out:
                              </span>{" "}
                              {b.endDate.split("T")[0]}
                            </div>
                            <p className="font-medium mt-2 text-stone-700">
                              Guests:{" "}
                              <span className="font-semibold">
                                {b.adult} adult(s), {b.children} children
                              </span>
                            </p>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex justify-between items-center pt-2">
                          <p className="text-lg font-medium text-stone-700">
                            ₹{b.room.price}/night
                          </p>
                          {b.status !== "cancelled" && (
                            <Button
                              className="px-6 py-2 font-semibold rounded-xl text-md transition duration-200 hover:scale-105"
                              variant="destructive"
                              onClick={() => cancelBooking(b._id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-400 mt-4">No bookings found.</p>
                )}
              </div>
            )}

            {/* Rooms Tab */}
            {activeTab === "rooms" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light uppercase tracking-widest">
                  Choose Your Room
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <Card
                        key={room._id}
                        className="overflow-hidden flex flex-col"
                      >
                        <div
                          className="h-48 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              room.image ? room.image : fallbackRoomImage
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
                        <CardContent className="flex flex-col gap-4 flex-1">
                          <p className="text-sm text-stone-500 flex-1">
                            Floor: {room.floor} {room.description} - Capacity:{" "}
                            {room.capacity}
                          </p>
                          <Button
                            className="w-full"
                            onClick={() => handleOpenBooking(room)}
                          >
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-stone-400 mt-4">No rooms available.</p>
                  )}
                </div>
              </div>
            )}

            {/* Food & Beverages Tab */}
            {activeTab === "dining" && (
              <div className="py-12">
                <h2 className="text-2xl font-light mb-4 text-center">
                  Food & Beverages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                  {ORDERABLE_MENU_ITEMS.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center">
                        <p className="text-stone-600 font-medium">
                          ₹{item.price}
                        </p>
                        <Button>Add</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Billing & Invoices Tab */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light uppercase tracking-widest">
                  Billing & Invoices
                </h2>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <Card key={b._id}>
                        <CardHeader>
                          <CardTitle>Room {b.room.name}</CardTitle>
                          <CardDescription>
                            Check-in: {b.startDate.split("T")[0]} | Check-out:{" "}
                            {b.endDate.split("T")[0]}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Amount: ₹{b.room.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-stone-500">
                      No invoices found.
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </motion.div>
        </main>

        {/* Booking Modal */}
        <Dialog
          open={!!openBookingRoom}
          onOpenChange={() => setOpenBookingRoom(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book {openBookingRoom?.name}</DialogTitle>
              <DialogDescription>
                Enter booking details below.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <DatePicker
                selected={checkIn}
                onChange={(date: Date | null) => setCheckIn(date)}
                placeholderText="Check-in Date"
                className="border p-2 rounded w-full"
              />
              <DatePicker
                selected={checkOut}
                onChange={(date: Date | null) => setCheckOut(date)}
                placeholderText="Check-out Date"
                minDate={checkIn || new Date()}
                className="border p-2 rounded w-full"
              />
              <div>
                <label className="text-sm font-medium">Adults</label>
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Children</label>
                <input
                  type="number"
                  min={0}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
              <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <Button onClick={handleBookingSubmit} className="w-full">
                Confirm Booking
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpenBookingRoom(null)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
