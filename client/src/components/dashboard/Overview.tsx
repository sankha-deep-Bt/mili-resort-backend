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
import { useEffect } from "react";

interface OverviewProps {
  profile: any;
  bookings: any;
  fetchReservations: () => Promise<void>;
}

const Overview = ({ profile, bookings, fetchReservations }: OverviewProps) => {
  const userName = (profile as any)?.name || "Guest";
  const userEmail = (profile as any)?.email || "guest@example.com";

  const cancelBooking = async (bookingId: string) => {
    try {
      await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
        reservationId: bookingId,
      });
      await fetchReservations();
      alert("Booking cancelled");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Booking failed. Please try again.";
      console.error("Booking failed:", message);
      alert(message);
    }
  };
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-light tracking-tight mb-2">
          Welcome back, <span className="font-normal">{userName}</span>
        </h1>
        <p className="text-stone-500 text-lg">
          Here’s a summary of your upcoming and past bookings.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((b: any) => (
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
  );
};

export default Overview;
