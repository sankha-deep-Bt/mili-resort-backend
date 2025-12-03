// import axios from "axios";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
//   CardDescription,
// } from "../ui/card";
// import { useEffect } from "react";

// interface OverviewProps {
//   profile: any;
//   bookings: any;
//   fetchReservations: () => Promise<void>;
// }

// const Overview = ({ profile, bookings, fetchReservations }: OverviewProps) => {
//   const userName = (profile as any)?.name || "Guest";
//   const userEmail = (profile as any)?.email || "guest@example.com";

//   const cancelBooking = async (bookingId: string) => {
//     try {
//       await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
//         reservationId: bookingId,
//       });
//       await fetchReservations();
//       alert("Booking cancelled");
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message || "Booking failed. Please try again.";
//       console.error("Booking failed:", message);
//       alert(message);
//     }
//   };
//   return (
//     <div className="space-y-10">
//       <div>
//         <h1 className="text-4xl font-light tracking-tight mb-2">
//           Welcome back, <span className="font-normal">{userName}</span>
//         </h1>
//         <p className="text-stone-500 text-lg">
//           Here’s a summary of your upcoming and past bookings.
//         </p>
//       </div>

//       {bookings.length > 0 ? (
//         <div className="space-y-6">
//           {bookings.map((b: any) => (
//             <Card
//               key={b._id}
//               className="relative rounded-2xl hover:shadow-xl shadow-md transition-all duration-300 border-stone-200"
//             >
//               <Badge
//                 className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md"
//                 variant={
//                   b.status === "cancelled"
//                     ? "destructive"
//                     : b.status === "confirmed"
//                     ? "default"
//                     : "outline"
//                 }
//               >
//                 {b.status}
//               </Badge>

//               <CardHeader className="pb-3">
//                 <CardTitle className="text-xl font-semibold tracking-wide">
//                   Room: {b.room.name}
//                 </CardTitle>
//                 <CardDescription className="space-y-1.5 text-base">
//                   <div className="flex gap-1">
//                     <span className="font-medium text-stone-700">
//                       Check-in:
//                     </span>{" "}
//                     {b.startDate.split("T")[0]}
//                   </div>
//                   <div className="flex gap-1">
//                     <span className="font-medium text-stone-700">
//                       Check-out:
//                     </span>{" "}
//                     {b.endDate.split("T")[0]}
//                   </div>
//                   <p className="font-medium mt-2 text-stone-700">
//                     Guests:{" "}
//                     <span className="font-semibold">
//                       {b.adult} adult(s), {b.children} children
//                     </span>
//                   </p>
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="flex justify-between items-center pt-2">
//                 <p className="text-lg font-medium text-stone-700">
//                   ₹{b.room.price}/night
//                 </p>
//                 {b.status !== "cancelled" && (
//                   <Button
//                     className="px-6 py-2 font-semibold rounded-xl text-md transition duration-200 hover:scale-105"
//                     variant="destructive"
//                     onClick={() => cancelBooking(b._id)}
//                   >
//                     Cancel
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p className="text-stone-400 mt-4">No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default Overview;

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
import { ArrowRight, BedDouble } from "lucide-react";
import { motion } from "framer-motion";

interface OverviewProps {
  profile: any;
  bookings: any;
  fetchReservations: () => Promise<void>;
  setActiveTab: (tab: string) => void;
}

const Overview = ({
  profile,
  bookings,
  fetchReservations,
  setActiveTab,
}: OverviewProps) => {
  const userName = (profile as any)?.name || "Guest";
  // const userEmail = (profile as any)?.email || "guest@example.com";

  // Helper function to calculate the number of days between two dates
  const calculateDays = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  };

  const cancelBooking = async (bookingId: string) => {
    // 🛑 IMPORTANT: Use a custom modal or dialog instead of alert/confirm
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
        reservationId: bookingId,
      });
      await fetchReservations();
      // 🛑 IMPORTANT: Replace alert with a custom toast/modal
      console.log("Booking cancelled successfully.");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Booking failed. Please try again.";
      console.error("Booking failed:", message);
      // 🛑 IMPORTANT: Replace alert with a custom toast/modal
      console.log(message);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="space-y-6">
            {bookings.map((b: any) => {
              const days = calculateDays(b.startDate, b.endDate);
              const totalCost = b.room.price * days;

              return (
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
                      <p className="font-medium text-stone-700">
                        Duration:{" "}
                        <span className="font-semibold">{days} night(s)</span>
                      </p>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex justify-between items-center pt-2">
                    <p className="text-lg font-bold text-green-700">
                      Total: ₹{totalCost.toLocaleString("en-IN")}
                    </p>
                    {b.status !== "cancelled" && (
                      <Button
                        className="px-6 py-2 font-semibold rounded-xl text-md transition duration-200 hover:scale-105"
                        variant="destructive"
                        // Reverting to direct cancel call since we can't fully implement a custom modal here
                        onClick={() => cancelBooking(b._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      ) : (
        // ✅ NEW: Call to Action when no bookings exist
        <Card className="p-8 text-center border-2 border-dashed border-stone-300 bg-stone-100/50 rounded-2xl transition duration-300 hover:border-stone-400">
          <div className="flex justify-center mb-4">
            <BedDouble className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold mb-2 text-stone-800">
            Plan Your Getaway
          </CardTitle>
          <CardDescription className="mb-6 text-stone-500 max-w-md mx-auto">
            It looks like you don't have any upcoming reservations. Start by
            finding the perfect room for your stay.
          </CardDescription>
          <Button
            className="px-8 py-3 text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => setActiveTab("rooms")}
          >
            Book Your Room Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Overview;
