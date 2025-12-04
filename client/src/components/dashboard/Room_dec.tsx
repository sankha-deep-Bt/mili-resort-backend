import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";

// Helper function to calculate the number of days between two dates
const calculateDays = (start: Date, end: Date): number => {
  const timeDifference = end.getTime() - start.getTime();
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
};

interface RoomsProps {
  onBookingCompleted: () => void;
}

const Rooms = ({ onBookingCompleted }: RoomsProps) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [openBookingRoom, setOpenBookingRoom] = useState<any | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const [bookingDetails, setBookingDetails] = useState<{
    days: number;
    total: number;
    price: number;
  } | null>(null);

  // Capacity check flag
  const isOverCapacity =
    openBookingRoom && adults + children > openBookingRoom.capacity;

  const fallbackRoomImage =
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";

  const fetchRooms = async () => {
    try {
      const roomsRes = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms"
      );
      setRooms(Array.isArray(roomsRes.data.rooms) ? roomsRes.data.rooms : []);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Effect to recalculate total when dates or room changes
  useEffect(() => {
    if (checkIn && checkOut && openBookingRoom) {
      const price = openBookingRoom.price || 0;
      let days = 0;
      let total = 0;

      if (checkOut.getTime() >= checkIn.getTime()) {
        days = calculateDays(checkIn, checkOut);
        total = price * days;
      }

      setBookingDetails({ days, total, price });
    } else {
      setBookingDetails(null);
    }
  }, [checkIn, checkOut, openBookingRoom]);

  const handleOpenBooking = (room: any) => {
    setOpenBookingRoom(room);
    setCheckIn(null);
    setCheckOut(null);
    setNotes("");
    setAdults(1); // Reset guests to default when opening
    setChildren(0);
    setBookingDetails(null);
  };

  const handleBookingSubmit = async () => {
    // 1. Date Validation
    if (!checkIn || !checkOut || !bookingDetails || bookingDetails.days <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    // 2. Capacity Validation (New Check)
    if (isOverCapacity) {
      alert(
        `The room capacity is ${openBookingRoom.capacity}. Please reduce the number of guests.`
      );
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
      await fetchRooms();
      onBookingCompleted();
      alert("Booking successful!");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Booking failed. Please try again.";
      console.error("Booking failed:", message);
      alert(message);
    }
  };

  return (
    <div>
      {/* ... (Rooms List JSX) ... */}
      <div className="space-y-6">
        <h2 className="text-2xl font-light uppercase tracking-widest">
          Choose Your Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
              >
                <Card key={room._id} className="overflow-hidden flex flex-col">
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
                      {room.floor} {room.description}
                    </p>
                    <p>
                      Capacity: {room.capacity} - {room.occupancyDetails}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleOpenBooking(room)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-stone-400 mt-4">No rooms available.</p>
          )}
        </div>
      </div>
      {/* ... (Dialog JSX) ... */}
      <Dialog
        open={!!openBookingRoom}
        onOpenChange={() => setOpenBookingRoom(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {openBookingRoom?.name}</DialogTitle>
            <DialogDescription>
              Capacity: **{openBookingRoom?.capacity}** guests (Adults +
              Children)
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Date Pickers */}
            <DatePicker
              selected={checkIn}
              onChange={(date: Date | null) => setCheckIn(date)}
              placeholderText="Check-in Date"
              className="border p-2 rounded w-full"
              minDate={new Date()}
            />
            <DatePicker
              selected={checkOut}
              onChange={(date: Date | null) => setCheckOut(date)}
              placeholderText="Check-out Date"
              minDate={checkIn || new Date()}
              className="border p-2 rounded w-full"
            />

            {/* Guest Inputs */}
            <div>
              <label className="text-sm font-medium">Adults</label>
              <input
                type="number"
                min={1}
                // Max adults is limited by capacity, but we allow input and show warning
                max={openBookingRoom?.capacity || 99}
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

            {/* 🛑 Capacity Warning */}
            {isOverCapacity && (
              <p className="text-sm font-medium text-red-600 p-2 bg-red-50 border border-red-200 rounded">
                ⚠️ The total number of guests (**{adults + children}**) exceeds
                the room's maximum capacity of **{openBookingRoom.capacity}**.
              </p>
            )}

            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded w-full"
            />

            {/* Total Cost Display */}
            {bookingDetails && bookingDetails.days > 0 && (
              <div className="mt-2 p-3 border-t bg-stone-50 rounded-md">
                <p className="text-sm text-stone-600">
                  Room Price: ₹{bookingDetails.price.toLocaleString("en-IN")}
                  /night
                </p>
                <p className="text-sm text-stone-600">
                  Duration: **{bookingDetails.days} night(s)**
                </p>
                <p className="text-lg font-bold text-green-700 mt-1">
                  Total Cost: ₹{bookingDetails.total.toLocaleString("en-IN")}
                </p>
              </div>
            )}
            {/* ---------------------------------------------------- */}

            <Button
              onClick={handleBookingSubmit}
              className="w-full"
              // Disable if dates are invalid OR if capacity is exceeded
              disabled={
                !bookingDetails || bookingDetails.days <= 0 || isOverCapacity
              }
            >
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
  );
};

export default Rooms;
