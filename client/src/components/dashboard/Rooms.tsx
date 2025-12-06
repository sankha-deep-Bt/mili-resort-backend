import axios from "axios";
import { useState, useMemo } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Helper function to calculate days
const calculateDays = (start: Date, end: Date): number => {
  const diff = end.getTime() - start.getTime();
  // Math.max(1, ...) ensures 1 night minimum charge if check-out > check-in
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

interface SelectedRoom {
  _id: string;
  name: string;
  price: number;
  capacity: number;
  quantity: number;
}

interface RoomsProps {
  onBookingCompleted: () => void;
  Rooms: any;
}

const Rooms = ({ onBookingCompleted, Rooms }: RoomsProps) => {
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const fallbackRoomImage =
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";

  // Total booking calculation
  const bookingDetails = useMemo(() => {
    if (!checkIn || !checkOut || selectedRooms.length === 0) return null;

    const pricePerNight = selectedRooms.reduce(
      (sum, room) => sum + room.price * room.quantity,
      0
    );
    const days =
      checkOut.getTime() > checkIn.getTime()
        ? calculateDays(checkIn, checkOut)
        : 0;
    const total = pricePerNight * days;
    return { days, total, pricePerNight };
  }, [checkIn, checkOut, selectedRooms]);

  // Total capacity
  const totalCapacity = selectedRooms.reduce(
    (sum, room) => sum + room.capacity * room.quantity,
    0
  );
  const isOverCapacity = adults + children > totalCapacity;

  // Add room or increment quantity
  const handleAddRoom = (room: any) => {
    setSelectedRooms((prev) => {
      const existingIndex = prev.findIndex((r) => r._id === room._id);

      // Defensive: only increment by 1 per click
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            _id: room._id,
            name: room.name,
            price: room.price,
            capacity: room.capacity,
            quantity: 1,
          },
        ];
      }
    });

    if (!isBookingDialogOpen) setIsBookingDialogOpen(true);
  };

  // Decrement quantity or remove room
  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms((prev) => {
      const existingIndex = prev.findIndex((r) => r._id === roomId);
      if (existingIndex > -1) {
        const updated = [...prev];
        if (updated[existingIndex].quantity > 1) {
          updated[existingIndex].quantity -= 1;
          return updated;
        } else {
          return updated.filter((r) => r._id !== roomId);
        }
      }
      return prev;
    });
  };

  // Submit booking
  const handleBookingSubmit = async () => {
    if (selectedRooms.length === 0) {
      toast.error("Please select at least one room.");
      return;
    }

    if (!checkIn || !checkOut || !bookingDetails || bookingDetails.days <= 0) {
      toast.error("Please complete valid booking dates.");
      return;
    }

    if (isOverCapacity) {
      toast.error(
        `Total guests exceed combined capacity (${totalCapacity}) for one room.`
      );
      return;
    }

    // 🔴 CRITICAL CHANGE: Format the rooms payload to match the backend Schema
    const roomsPayload = selectedRooms.map((room) => ({
      roomId: room._id,
      quantity: room.quantity,
      price: room.price,
    }));

    try {
      await axios.post(
        "http://localhost:3000/api/v1/reservation/add",
        {
          // 🔴 Use the structured roomsPayload instead of roomIds
          rooms: roomsPayload,
          startDate: checkIn.toISOString(),
          endDate: checkOut.toISOString(),
          adult: adults,
          children,
          notes,
          // The backend controller calculates 'amount' based on rooms, dates, and quantity.
          // Sending it here is redundant if the backend is the source of truth, but it's okay
          // to send it for validation/reference if needed. I'll keep it for now.
          amount: bookingDetails.total,
        },
        { withCredentials: true }
      );

      // Reset
      setSelectedRooms([]);
      setIsBookingDialogOpen(false);
      setCheckIn(null);
      setCheckOut(null);
      setAdults(1);
      setChildren(0);
      setNotes("");

      onBookingCompleted();
      toast.success("Booking successful!");
    } catch (err: any) {
      console.error(err);
      toast.error("something went wrong. Booking failed."); // Use 'error' field from backend response
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // className="text-center space-y-3"
      className="space-y-6"
    >
      <h2 className="text-2xl font-light uppercase tracking-widest">
        Choose Your Room(s)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Rooms.length > 0 ? (
          Rooms.map((room: any) => {
            const selectedRoom = selectedRooms.find((r) => r._id === room._id);
            return (
              <Card key={room._id} className="overflow-hidden flex flex-col">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${room.image || fallbackRoomImage})`,
                  }}
                />
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>
                    {room.Roomtype} • {room.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 flex-1">
                  <br />
                  <p className="text-sm text-stone-500 flex-1"></p>
                  <p>Rs.{room.price?.toLocaleString("en-IN")}/night</p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddRoom(room)}
                    >
                      {selectedRoom
                        ? `Add Another (${selectedRoom.quantity})`
                        : "Select Room"}
                    </Button>
                    {selectedRoom && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveRoom(room._id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-stone-400 mt-4">No rooms available.</p>
        )}
      </div>

      <Dialog
        open={isBookingDialogOpen}
        onOpenChange={(open) => setIsBookingDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Finalize Your Reservation</DialogTitle>
            <DialogDescription>
              Adjust dates, guests, and room quantities.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Selected Rooms */}
            <div className="border rounded-md p-3 bg-blue-50">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">
                Selected Rooms
              </h3>
              {selectedRooms.length === 0 ? (
                <p className="text-sm text-stone-600">No rooms selected yet.</p>
              ) : (
                selectedRooms.map((room) => (
                  <div
                    key={room._id}
                    className="flex justify-between items-center py-1 border-b last:border-b-0 text-sm"
                  >
                    <span>
                      {room.quantity}x {room.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-600">
                        (Capacity: {room.capacity})
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveRoom(room._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Dates and Guests */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Check-in Date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date: Date | null) => setCheckIn(date)}
                  minDate={new Date()}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Check-out Date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date: Date | null) => setCheckOut(date)}
                  minDate={checkIn || new Date()}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
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
            </div>

            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded w-full"
            />

            {selectedRooms.length > 0 && (
              <p className="text-sm text-stone-600 p-2 bg-stone-100 rounded-md">
                Total combined capacity: {totalCapacity} guests
              </p>
            )}
            {isOverCapacity && (
              <p className="text-sm font-medium text-red-600 p-2 bg-red-50 border border-red-200 rounded">
                ⚠️ Total guests ({adults + children}) exceeds combined capacity
                ({totalCapacity})
              </p>
            )}

            {/* Total Cost */}
            {bookingDetails && bookingDetails.days > 0 && (
              <div className="mt-2 p-3 border-t bg-green-50 rounded-md">
                <p className="text-sm text-stone-600">
                  Total Rooms Price: ₹
                  {bookingDetails.pricePerNight.toLocaleString("en-IN")}/night
                </p>
                <p className="text-sm text-stone-600">
                  Duration: {bookingDetails.days} night(s)
                </p>
                <p className="text-lg font-bold text-green-700 mt-1">
                  Total Cost: ₹{bookingDetails.total.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
              className="w-full sm:w-auto"
              disabled={selectedRooms.length === 0}
            >
              ➕ Select Another Room
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
              <Button
                onClick={handleBookingSubmit}
                className="w-full sm:w-auto"
                disabled={
                  !bookingDetails ||
                  bookingDetails.days <= 0 ||
                  isOverCapacity ||
                  selectedRooms.length === 0
                }
              >
                Confirm Reservation
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsBookingDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel/Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Rooms;
