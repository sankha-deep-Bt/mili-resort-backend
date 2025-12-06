import axios from "axios";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { ArrowRight, BedDouble, CalendarDays, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface BookedRoom {
  roomId: string;
  quantity: number;
  name: string;
  price: number;
  capacity: number;
}

interface OverviewProps {
  profile: any;
  bookings: any;
  fetchReservations: () => Promise<void>;
  Rooms: any;
  setActiveTab: (tab: string) => void;
}

const Overview = ({
  profile,
  bookings,
  fetchReservations,
  Rooms,
  setActiveTab,
}: OverviewProps) => {
  const userName = profile?.name || "Guest";

  const calculateDays = (start: string, end: string): number => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000));
  };

  const cancelBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
        reservationId: bookingId,
      });

      toast.success("Successfully cancelled booking");

      await fetchReservations();
    } catch (err: any) {
      console.log(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 p-4 sm:p-6 md:p-10 bg-linear-to-br from-stone-50 via-white to-stone-100 rounded-xl"
    >
      {/* Greeting Section */}
      <div className="text-center mb-6 px-2">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 bg-clip-text text-transparent
          bg-linear-to-r from-stone-800 to-stone-600"
        >
          Welcome back, <span className="font-normal">{userName}</span>
        </motion.h1>

        <p className="text-stone-600 text-base sm:text-lg">
          Here’s a refined snapshot of your stays.
        </p>
      </div>

      {/* BOOKINGS */}
      {bookings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 max-w-3xl mx-auto w-full"
        >
          {bookings.map((b: any) => {
            const bookedRooms: BookedRoom[] = b.rooms
              .map((r: any) => {
                const details = Rooms.find((rm: any) => rm._id === r.roomId);
                return details
                  ? { ...details, roomId: r.roomId, quantity: r.quantity }
                  : null;
              })
              .filter(Boolean);

            const days = calculateDays(b.startDate, b.endDate);
            const totalLocal = bookedRooms.reduce(
              (sum, r) => sum + r.price * r.quantity,
              0
            );

            const roomList = bookedRooms
              .map((r) => `${r.quantity}× ${r.name}`)
              .join(" • ");

            return (
              <motion.div
                key={b._id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Card
                  className="relative rounded-3xl border-none shadow-lg bg-white/70 backdrop-blur-xl
                    p-[1.5px] bg-linear-to-br from-stone-200/50 to-stone-50 hover:shadow-2xl"
                >
                  {/* ROOM TITLE + BADGE FIX (NO OVERLAP) */}
                  <CardHeader className="pb-2 px-5 sm:px-6 md:px-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      {/* ROOM LIST TITLE */}
                      <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                        {roomList}
                      </CardTitle>

                      {/* STATUS BADGE — NOW INLINE (NO ABSOLUTE) */}
                      <Badge
                        className="px-4 py-1.5 rounded-full text-sm uppercase tracking-wider shadow-sm backdrop-blur-md self-start sm:self-auto"
                        variant={
                          b.status === "cancelled" || b.status === "rejected"
                            ? "destructive"
                            : b.status === "approved" ||
                              b.status === "checked-in"
                            ? "default"
                            : "outline"
                        }
                      >
                        {b.status}
                      </Badge>
                    </div>

                    {/* DETAILS */}
                    <CardDescription className="text-sm sm:text-base space-y-2 text-stone-700 mt-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          Check-in:{" "}
                          <span className="font-semibold">
                            {new Date(b.startDate).toLocaleDateString()}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          Check-out:{" "}
                          <span className="font-semibold">
                            {new Date(b.endDate).toLocaleDateString()}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />
                        <span>
                          Guests:{" "}
                          <span className="font-semibold">
                            {b.adult} adult(s), {b.children} children
                          </span>
                        </span>
                      </div>

                      <p className="font-medium">
                        Duration:{" "}
                        <span className="font-semibold">{days} night(s)</span>
                      </p>
                    </CardDescription>
                  </CardHeader>

                  {/* FOOTER */}
                  <CardContent className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center border-t mt-2 pt-4 pb-4 px-5 sm:px-6 md:px-7">
                    <p className="text-xl font-bold text-green-700">
                      ₹{(b.amount || totalLocal).toLocaleString("en-IN")}
                    </p>

                    {b.status !== "cancelled" &&
                      b.status !== "rejected" &&
                      b.status !== "checked-in" && (
                        <Button
                          variant="destructive"
                          className="rounded-xl w-full sm:w-auto py-2 text-md shadow-sm hover:shadow-lg"
                          onClick={() => cancelBooking(b._id)}
                        >
                          Cancel
                        </Button>
                      )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        // EMPTY STATE
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto w-full"
        >
          <Card
            className="p-8 sm:p-10 text-center bg-white/70 backdrop-blur-xl shadow-xl border 
              border-stone-200 rounded-3xl"
          >
            <div className="flex justify-center mb-4">
              <BedDouble className="h-12 w-12 sm:h-14 sm:w-14 text-primary drop-shadow-sm" />
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-semibold mb-2 text-stone-800">
              Start Your Perfect Getaway
            </CardTitle>

            <CardDescription className="text-stone-500 text-base sm:text-lg max-w-md mx-auto mb-8">
              You don’t have any bookings yet. Explore our rooms and find your
              ideal stay with ease.
            </CardDescription>

            <Button
              className="px-6 sm:px-8 py-3 text-lg font-semibold rounded-2xl shadow-md hover:scale-[1.02]"
              onClick={() => setActiveTab("rooms")}
            >
              Book a Room <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Overview;
