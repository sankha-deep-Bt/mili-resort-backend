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
// import { ArrowRight, BedDouble } from "lucide-react";
// import { motion } from "framer-motion";

// // Interface for the structured room data from the booking object
// interface BookedRoom {
//   roomId: string;
//   quantity: number;
//   // We add the fetched room details here
//   name: string;
//   price: number;
//   capacity: number;
// }

// interface OverviewProps {
//   profile: any;
//   bookings: any;
//   fetchReservations: () => Promise<void>;
//   Rooms: any; // Array of all available room definitions
//   setActiveTab: (tab: string) => void;
// }

// const Overview = ({
//   profile,
//   bookings,
//   fetchReservations,
//   Rooms,
//   setActiveTab,
// }: OverviewProps) => {
//   const userName = (profile as any)?.name || "Guest";

//   const calculateDays = (start: string, end: string): number => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const timeDifference = endDate.getTime() - startDate.getTime();
//     // Use Math.max(1, ...) to ensure a minimum of 1 night
//     const days = Math.max(1, Math.ceil(timeDifference / (1000 * 60 * 60 * 24)));
//     return days;
//   };

//   const cancelBooking = async (bookingId: string) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) {
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
//         reservationId: bookingId,
//       });
//       await fetchReservations();
//       console.log("Booking cancelled successfully.");
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message || "Booking failed. Please try again.";
//       console.error("Booking failed:", message);
//       console.log(message);
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
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center space-y-3"
//         >
//           <div className="space-y-6">
//             {bookings.map((b: any) => {
//               // 🟢 FIX 1: Correctly map b.rooms (which is [{roomId, quantity}])
//               // and merge it with the room details from the Rooms array.
//               const bookedRooms: BookedRoom[] = b.rooms
//                 .map((roomInBooking: { roomId: string; quantity: number }) => {
//                   const roomDetails = Rooms.find(
//                     (r: any) => r._id === roomInBooking.roomId
//                   );
//                   if (roomDetails) {
//                     return {
//                       ...roomDetails,
//                       roomId: roomInBooking.roomId,
//                       quantity: roomInBooking.quantity,
//                     };
//                   }
//                   return null;
//                 })
//                 .filter(Boolean); // Remove any rooms that weren't found in the master list

//               const days = calculateDays(b.startDate, b.endDate);

//               // 🟢 FIX 2: Calculate total cost using quantity and price
//               const totalCost = bookedRooms.reduce(
//                 (sum: number, room: BookedRoom) =>
//                   sum + room.price * room.quantity,
//                 0
//               );

//               // 🟢 Display Helper: Format the room list for the title
//               const roomList = bookedRooms
//                 .map((r: BookedRoom) => `${r.quantity}x ${r.name}`)
//                 .join(" | ");

//               return (
//                 <Card
//                   key={b._id}
//                   className="relative rounded-2xl hover:shadow-xl shadow-md transition-all duration-300 border-stone-200"
//                 >
//                   <Badge
//                     className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md"
//                     variant={
//                       b.status === "cancelled" || b.status === "rejected"
//                         ? "destructive"
//                         : b.status === "approved" || b.status === "checked-in"
//                         ? "default"
//                         : "outline"
//                     }
//                   >
//                     {b.status}
//                   </Badge>

//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-md font-semibold text-left">
//                       {/* Show quantity and room name */}
//                       {roomList}
//                     </CardTitle>
//                     <CardDescription className="space-y-1.5 text-base text-left">
//                       <div className="flex gap-1">
//                         <span className="font-medium text-stone-700">
//                           Check-in:
//                         </span>{" "}
//                         {new Date(b.startDate).toLocaleDateString()}
//                       </div>
//                       <div className="flex gap-1">
//                         <span className="font-medium text-stone-700">
//                           Check-out:
//                         </span>{" "}
//                         {new Date(b.endDate).toLocaleDateString()}
//                       </div>
//                       <p className="font-medium mt-2 text-stone-700">
//                         Guests:{" "}
//                         <span className="font-semibold">
//                           {b.adult} adult(s), {b.children} children
//                         </span>
//                       </p>
//                       <p className="font-medium text-stone-700">
//                         Duration:{" "}
//                         <span className="font-semibold">{days} night(s)</span>
//                       </p>
//                     </CardDescription>
//                   </CardHeader>

//                   <CardContent className="flex justify-between items-center pt-2">
//                     {/* Use b.amount if the backend calculates and saves the final amount */}
//                     {/* Otherwise, use the locally calculated amount: totalCost * days */}
//                     <p className="text-lg font-bold text-green-700">
//                       Total: ₹{(b.amount || totalCost).toLocaleString("en-IN")}
//                     </p>

//                     {/* Only allow cancellation if status is not final */}
//                     {b.status !== "cancelled" &&
//                       b.status !== "rejected" &&
//                       b.status !== "checked-in" && (
//                         <Button
//                           className="px-6 py-2 font-semibold rounded-xl text-md transition duration-200 hover:scale-105"
//                           variant="destructive"
//                           onClick={() => cancelBooking(b._id)}
//                         >
//                           Cancel
//                         </Button>
//                       )}
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </motion.div>
//       ) : (
//         <Card className="p-8 text-center border-2 border-dashed border-stone-300 bg-stone-100/50 rounded-2xl transition duration-300 hover:border-stone-400">
//           <div className="flex justify-center mb-4">
//             <BedDouble className="h-10 w-10 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-semibold mb-2 text-stone-800">
//             Plan Your Getaway
//           </CardTitle>
//           <CardDescription className="mb-6 text-stone-500 max-w-md mx-auto">
//             It looks like you don't have any upcoming reservations. Start by
//             finding the perfect room for your stay.
//           </CardDescription>
//           <Button
//             className="px-8 py-3 text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-[1.02]"
//             onClick={() => setActiveTab("rooms")}
//           >
//             Book Your Room Now <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Overview;

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
// import { ArrowRight, BedDouble, CalendarDays, UserRound } from "lucide-react";
// import { motion } from "framer-motion";

// interface BookedRoom {
//   roomId: string;
//   quantity: number;
//   name: string;
//   price: number;
//   capacity: number;
// }

// interface OverviewProps {
//   profile: any;
//   bookings: any;
//   fetchReservations: () => Promise<void>;
//   Rooms: any;
//   setActiveTab: (tab: string) => void;
// }

// const Overview = ({
//   profile,
//   bookings,
//   fetchReservations,
//   Rooms,
//   setActiveTab,
// }: OverviewProps) => {
//   const userName = profile?.name || "Guest";

//   const calculateDays = (start: string, end: string): number => {
//     const s = new Date(start);
//     const e = new Date(end);
//     return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000));
//   };

//   const cancelBooking = async (bookingId: string) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?"))
//       return;

//     try {
//       await axios.post("http://localhost:3000/api/v1/reservation/cancel", {
//         reservationId: bookingId,
//       });

//       await fetchReservations();
//     } catch (err: any) {
//       console.log(err.response?.data?.message || "Booking failed.");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="space-y-10 p-4 sm:p-6 md:p-10 bg-gradient-to-br from-stone-50 via-white to-stone-100 rounded-xl"
//     >
//       {/* Greeting Section */}
//       <div className="text-center mb-6 px-2">
//         <motion.h1
//           initial={{ y: 10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 bg-clip-text text-transparent
//           bg-gradient-to-r from-stone-800 to-stone-600"
//         >
//           Welcome back, <span className="font-normal">{userName}</span>
//         </motion.h1>

//         <p className="text-stone-600 text-base sm:text-lg">
//           Here’s a refined snapshot of your stays.
//         </p>
//       </div>

//       {/* BOOKINGS */}
//       {bookings.length > 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-6 max-w-3xl mx-auto w-full"
//         >
//           {bookings.map((b: any) => {
//             const bookedRooms: BookedRoom[] = b.rooms
//               .map((r: any) => {
//                 const details = Rooms.find((rm: any) => rm._id === r.roomId);
//                 return details
//                   ? { ...details, roomId: r.roomId, quantity: r.quantity }
//                   : null;
//               })
//               .filter(Boolean);

//             const days = calculateDays(b.startDate, b.endDate);
//             const totalLocal = bookedRooms.reduce(
//               (sum, r) => sum + r.price * r.quantity,
//               0
//             );

//             const roomList = bookedRooms
//               .map((r) => `${r.quantity}× ${r.name}`)
//               .join(" • ");

//             return (
//               <motion.div
//                 key={b._id}
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 whileHover={{ scale: 1.01 }}
//                 transition={{ type: "spring", stiffness: 120 }}
//               >
//                 <Card
//                   className="relative rounded-3xl border-none shadow-lg bg-white/70 backdrop-blur-xl
//                   p-[1.5px] bg-gradient-to-br from-stone-200/50 to-stone-50 hover:shadow-2xl"
//                 >
//                   {/* STATUS BADGE */}
//                   <Badge
//                     className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm uppercase tracking-wider
//                     shadow-sm backdrop-blur-md"
//                     variant={
//                       b.status === "cancelled" || b.status === "rejected"
//                         ? "destructive"
//                         : b.status === "approved" || b.status === "checked-in"
//                         ? "default"
//                         : "outline"
//                     }
//                   >
//                     {b.status}
//                   </Badge>

//                   <CardHeader className="pb-2 px-5 sm:px-6 md:px-7">
//                     <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
//                       {roomList}
//                     </CardTitle>

//                     <CardDescription className="text-sm sm:text-base space-y-2 text-stone-700 mt-2">
//                       <div className="flex items-center gap-2">
//                         <CalendarDays className="h-4 w-4" />
//                         <span>
//                           Check-in:{" "}
//                           <span className="font-semibold">
//                             {new Date(b.startDate).toLocaleDateString()}
//                           </span>
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <CalendarDays className="h-4 w-4" />
//                         <span>
//                           Check-out:{" "}
//                           <span className="font-semibold">
//                             {new Date(b.endDate).toLocaleDateString()}
//                           </span>
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <UserRound className="h-4 w-4" />
//                         <span>
//                           Guests:{" "}
//                           <span className="font-semibold">
//                             {b.adult} adult(s), {b.children} children
//                           </span>
//                         </span>
//                       </div>

//                       <p className="font-medium">
//                         Duration:{" "}
//                         <span className="font-semibold">{days} night(s)</span>
//                       </p>
//                     </CardDescription>
//                   </CardHeader>

//                   <CardContent className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center border-t mt-2 pt-4 pb-4 px-5 sm:px-6 md:px-7">
//                     <p className="text-xl font-bold text-green-700">
//                       ₹{(b.amount || totalLocal).toLocaleString("en-IN")}
//                     </p>

//                     {b.status !== "cancelled" &&
//                       b.status !== "rejected" &&
//                       b.status !== "checked-in" && (
//                         <Button
//                           variant="destructive"
//                           className="rounded-xl w-full sm:w-auto py-2 text-md shadow-sm hover:shadow-lg"
//                           onClick={() => cancelBooking(b._id)}
//                         >
//                           Cancel
//                         </Button>
//                       )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       ) : (
//         // EMPTY STATE
//         <motion.div
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-xl mx-auto w-full"
//         >
//           <Card
//             className="p-8 sm:p-10 text-center bg-white/70 backdrop-blur-xl shadow-xl border
//           border-stone-200 rounded-3xl"
//           >
//             <div className="flex justify-center mb-4">
//               <BedDouble className="h-12 w-12 sm:h-14 sm:w-14 text-primary drop-shadow-sm" />
//             </div>

//             <CardTitle className="text-2xl sm:text-3xl font-semibold mb-2 text-stone-800">
//               Start Your Perfect Getaway
//             </CardTitle>

//             <CardDescription className="text-stone-500 text-base sm:text-lg max-w-md mx-auto mb-8">
//               You don’t have any bookings yet. Explore our rooms and find your
//               ideal stay with ease.
//             </CardDescription>

//             <Button
//               className="px-6 sm:px-8 py-3 text-lg font-semibold rounded-2xl shadow-md hover:scale-[1.02]"
//               onClick={() => setActiveTab("rooms")}
//             >
//               Book a Room <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </Card>
//         </motion.div>
//       )}
//     </motion.div>
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
import { ArrowRight, BedDouble, CalendarDays, UserRound } from "lucide-react";
import { motion } from "framer-motion";

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

      await fetchReservations();
    } catch (err: any) {
      console.log(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 p-4 sm:p-6 md:p-10 bg-gradient-to-br from-stone-50 via-white to-stone-100 rounded-xl"
    >
      {/* Greeting Section */}
      <div className="text-center mb-6 px-2">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 bg-clip-text text-transparent
          bg-gradient-to-r from-stone-800 to-stone-600"
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
                    p-[1.5px] bg-gradient-to-br from-stone-200/50 to-stone-50 hover:shadow-2xl"
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
