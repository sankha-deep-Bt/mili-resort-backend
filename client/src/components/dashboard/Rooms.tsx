import { useState, useMemo, useRef, useEffect } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/axios";

// Helper function to calculate days
const calculateDays = (start: Date, end: Date): number => {
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

interface SelectedRoom {
  _id: string;
  name: string;
  price: number;
  capacity: number;
  quantity: number;
  adults: number;
  children: number;
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
  const [notes, setNotes] = useState("");

  const fallbackRoomImage = "room-fallback";

  const firstAdultInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isBookingDialogOpen && firstAdultInputRef.current) {
      firstAdultInputRef.current.focus();
    }
  }, [isBookingDialogOpen]);

  // Total adults and children
  const totalAdults = selectedRooms.reduce(
    (sum, r) => sum + r.adults * r.quantity,
    0
  );
  const totalChildren = selectedRooms.reduce(
    (sum, r) => sum + r.children * r.quantity,
    0
  );

  // Total capacity
  const totalCapacity = selectedRooms.reduce(
    (sum, room) => sum + room.capacity * room.quantity,
    0
  );

  const isOverCapacity = totalAdults + totalChildren > totalCapacity;

  // Booking details
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

  const handleAddRoom = (room: any) => {
    setSelectedRooms((prev) => {
      const existing = prev.find((r) => r._id === room._id);
      if (existing) {
        // Only increment quantity by 1, no doubling
        return prev.map((r) =>
          r._id === room._id ? { ...r, quantity: r.quantity + 1 } : r
        );
      } else {
        return [
          ...prev,
          {
            _id: room._id,
            name: room.name,
            price: room.price,
            capacity: room.capacity,
            quantity: 1,
            adults: 1,
            children: 0,
          },
        ];
      }
    });

    if (!isBookingDialogOpen) setIsBookingDialogOpen(true);
  };

  // Remove room
  const handleRemoveRoom = (roomId: string) => {
    setSelectedRooms((prev) => {
      const updated = prev.map((r) => ({ ...r }));
      const index = updated.findIndex((r) => r._id === roomId);
      if (index > -1) {
        if (updated[index].quantity > 1) {
          updated[index].quantity -= 1;
          return updated;
        } else {
          return updated.filter((r) => r._id !== roomId);
        }
      }
      return updated;
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
      toast.error(`Total guests exceed combined capacity (${totalCapacity})`);
      return;
    }

    const roomsPayload = selectedRooms.map((room) => ({
      roomId: room._id,
      quantity: room.quantity,
      price: room.price,
      adults: room.adults,
      children: room.children,
    }));

    try {
      await api.post(
        "/reservation/add",
        {
          rooms: roomsPayload,
          startDate: checkIn.toISOString(),
          endDate: checkOut.toISOString(),
          adult: totalAdults,
          children: totalChildren,
          notes,
          amount: bookingDetails.total,
        },
        { withCredentials: true }
      );

      setSelectedRooms([]);
      setIsBookingDialogOpen(false);
      setCheckIn(null);
      setCheckOut(null);
      setNotes("");
      toast.success("Booking successful!");
      onBookingCompleted();
    } catch (err: any) {
      console.error(err);
      toast.error("Booking failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-light uppercase tracking-widest">
        Choose Your Room(s)
      </h2>

      {/* Rooms Grid */}
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
                <CardContent className="flex flex-col flex-1">
                  <p>Rs.{room.price?.toLocaleString("en-IN")}/night</p>
                  <div className="flex-1" />
                  <div className="flex items-center gap-2 mt-auto">
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

      {/* Booking Dialog */}
      <Dialog
        open={isBookingDialogOpen}
        onOpenChange={(open) => setIsBookingDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Finalize Your Reservation</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Global Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Check-in Date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={setCheckIn}
                  minDate={new Date()}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Check-out Date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={setCheckOut}
                  minDate={checkIn || new Date()}
                  className="border p-2 rounded w-full mt-1"
                />
              </div>
            </div>

            {/* Selected Rooms */}
            <div className="border rounded-md p-3 bg-blue-50">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">
                Selected Rooms
              </h3>
              {selectedRooms.length === 0 ? (
                <p className="text-sm text-stone-600">No rooms selected yet.</p>
              ) : (
                selectedRooms.map((room, index) => (
                  <div
                    key={room._id}
                    className="flex flex-col py-2 border-b last:border-b-0 text-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span>
                        {room.quantity}x {room.name}
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveRoom(room._id)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min={0}
                        value={room.adults}
                        onChange={(e) => {
                          const updated = [...selectedRooms];
                          updated.find((r) => r._id === room._id)!.adults =
                            Number(e.target.value);
                          setSelectedRooms(updated);
                        }}
                        ref={index === 0 ? firstAdultInputRef : null}
                        className="border p-1 rounded"
                        placeholder="Adults"
                      />
                      <input
                        type="number"
                        min={0}
                        value={room.children}
                        onChange={(e) => {
                          const updated = [...selectedRooms];
                          updated.find((r) => r._id === room._id)!.children =
                            Number(e.target.value);
                          setSelectedRooms(updated);
                        }}
                        className="border p-1 rounded"
                        placeholder="Children"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Notes */}
            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded w-full"
            />

            {/* Totals */}
            {selectedRooms.length > 0 && (
              <p className="text-sm text-stone-600 p-2 bg-stone-100 rounded-md">
                Total guests: {totalAdults + totalChildren} (Adults:{" "}
                {totalAdults}, Children: {totalChildren}) / Capacity:{" "}
                {totalCapacity}
              </p>
            )}
            {isOverCapacity && (
              <p className="text-sm font-medium text-red-600 p-2 bg-red-50 border border-red-200 rounded">
                ⚠️ Total guests exceed combined capacity
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
            >
              ➕ Select Another Room
            </Button>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Rooms;
