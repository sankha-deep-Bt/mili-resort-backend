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
      <div className="space-y-6">
        <h2 className="text-2xl font-light uppercase tracking-widest">
          Choose Your Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
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
      <Dialog
        open={!!openBookingRoom}
        onOpenChange={() => setOpenBookingRoom(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {openBookingRoom?.name}</DialogTitle>
            <DialogDescription>Enter booking details below.</DialogDescription>
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
  );
};

export default Rooms;
