import { useState, useEffect } from "react";
import axios from "axios";

export const useAdmin = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms",
        {
          withCredentials: true,
        }
      );

      // IMPORTANT FIX
      setRooms(Array.isArray(res.data.rooms) ? res.data.rooms : []);
    } catch (err) {
      console.error("Room fetch error:", err);
      setRooms([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/reservations",
        { withCredentials: true }
      );

      // Convert numeric-key object → array
      const raw = res.data;
      const formatted = Array.isArray(raw)
        ? raw
        : typeof raw === "object"
        ? Object.values(raw)
        : [];

      setBookings(formatted);
    } catch (err) {
      console.error("Booking fetch error:", err);
      setBookings([]);
    }
  };

  const updateBookingStatus = (id: string, status: string) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
    );
  };
  const updateRoomStatus = (id: string, status: boolean) => {
    setRooms((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isAvailable: status } : b))
    );
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchRooms(), fetchBookings()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    rooms,
    bookings,
    loading,
    fetchRooms,
    fetchBookings,
    updateBookingStatus,
    updateRoomStatus,
  };
};
