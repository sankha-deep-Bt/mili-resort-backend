// import { useState, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Calendar, User, BedDouble, CreditCard } from "lucide-react"; // Added icons for mobile view visuals

// export default function BookingsTab({
//   bookings,
//   loading,
//   isProcessing,
//   onAccept,
//   onReject,
//   onDelete,
// }: any) {
//   const ITEMS_PER_PAGE = 5;
//   const [currentPage, setCurrentPage] = useState(1);

//   const paginatedBookings = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return bookings.slice(start, start + ITEMS_PER_PAGE);
//   }, [bookings, currentPage]);

//   const calcNights = (start?: string, end?: string) => {
//     if (!start || !end) return 0;
//     const s = new Date(start);
//     const e = new Date(end);
//     const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
//     return diff > 0 ? diff : 0;
//   };

//   const handleNext = () => {
//     if (currentPage * ITEMS_PER_PAGE < bookings.length)
//       setCurrentPage((p) => p + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((p) => p - 1);
//   };

//   // Helper to render Status Badge (Shared between views)
//   const StatusBadge = ({ status }: { status: string }) => (
//     <Badge
//       variant={
//         status === "cancelled"
//           ? "destructive"
//           : status === "approved"
//           ? "default"
//           : "outline"
//       }
//       className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
//     >
//       {status}
//     </Badge>
//   );

//   // Helper to render Actions (Shared between views)
//   const ActionButtons = ({ booking }: { booking: any }) => (
//     <div className="flex items-center gap-2 w-full justify-end">
//       {booking.status === "pending" && (
//         <>
//           <Button
//             size="sm"
//             onClick={() => onAccept(booking._id, booking.room?._id)}
//             disabled={!!isProcessing[booking._id]}
//             className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
//           >
//             {isProcessing[booking._id] ? "..." : "Accept"}
//           </Button>
//           <Button
//             size="sm"
//             variant="destructive"
//             onClick={() =>
//               onReject(
//                 booking.room?._id,
//                 booking.user?._id,
//                 booking._id,
//                 "cancelled"
//               )
//             }
//             disabled={!!isProcessing[booking._id]}
//             className="flex-1 md:flex-none"
//           >
//             {isProcessing[booking._id] ? "..." : "Reject"}
//           </Button>
//         </>
//       )}
//       {booking.status === "approved" && (
//         <Button
//           size="sm"
//           variant="outline"
//           className="border-red-600 text-red-600 hover:bg-red-50 flex-1 md:flex-none"
//           onClick={() =>
//             onReject(
//               booking.room?._id,
//               booking.user?._id,
//               booking._id,
//               "cancelled"
//             )
//           }
//           disabled={!!isProcessing[booking._id]}
//         >
//           {isProcessing[booking._id] ? "..." : "Cancel Booking"}
//         </Button>
//       )}
//     </div>
//   );

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Bookings</CardTitle>
//         <CardDescription>
//           Review incoming requests and manage status.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="py-12 text-center text-stone-400">Loading…</div>
//         ) : bookings.length === 0 ? (
//           <div className="py-12 text-center text-stone-400">
//             No bookings found
//           </div>
//         ) : (
//           <>
//             {/* ---------------- MOBILE VIEW (CARDS) ---------------- */}
//             <div className="space-y-4 md:hidden">
//               {paginatedBookings.map((booking: any) => {
//                 const nights = calcNights(booking.startDate, booking.endDate);
//                 const total = (booking.room?.price || 0) * nights;

//                 return (
//                   <div
//                     key={booking._id}
//                     className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm"
//                   >
//                     {/* Card Top: User & Status */}
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 font-bold text-stone-600">
//                           {booking.user?.name?.[0] || "U"}
//                         </div>
//                         <div>
//                           <div className="font-semibold text-stone-900">
//                             {booking.user?.name}
//                           </div>
//                           <div className="text-xs text-stone-500">
//                             {booking.user?.email}
//                           </div>
//                         </div>
//                       </div>
//                       <StatusBadge status={booking.status} />
//                     </div>

//                     <hr className="border-stone-100" />

//                     {/* Card Middle: Details Grid */}
//                     <div className="grid grid-cols-2 gap-y-3 text-sm text-stone-600">
//                       <div className="flex flex-col gap-1">
//                         <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
//                           <BedDouble className="h-3 w-3" /> Room
//                         </span>
//                         <span>{booking.room?.name || "—"}</span>
//                       </div>
//                       <div className="flex flex-col gap-1 text-right">
//                         <span className="flex items-center justify-end gap-1 text-xs font-medium text-stone-400">
//                           <CreditCard className="h-3 w-3" /> Total
//                         </span>
//                         <span className="font-semibold text-stone-900">
//                           ₹{total.toLocaleString("en-IN")}
//                         </span>
//                       </div>
//                       <div className="col-span-2 flex flex-col gap-1">
//                         <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
//                           <Calendar className="h-3 w-3" /> Stay Duration
//                         </span>
//                         <div className="flex justify-between">
//                           <span>
//                             {booking.startDate
//                               ? new Date(booking.startDate).toLocaleDateString()
//                               : "—"}{" "}
//                             -{" "}
//                             {booking.endDate
//                               ? new Date(booking.endDate).toLocaleDateString()
//                               : "—"}
//                           </span>
//                           <span className="font-medium text-stone-900">
//                             ({nights} nights)
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Card Bottom: Actions */}
//                     <div className="mt-2">
//                       <ActionButtons booking={booking} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ---------------- DESKTOP VIEW (TABLE) ---------------- */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="min-w-full divide-y divide-stone-100">
//                 <thead className="bg-stone-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
//                       Guest
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
//                       Room
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
//                       Dates
//                     </th>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
//                       Nights
//                     </th>
//                     <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
//                       Total
//                     </th>
//                     <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
//                       Status
//                     </th>
//                     <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-stone-100 bg-white">
//                   {paginatedBookings.map((booking: any) => {
//                     const nights = calcNights(
//                       booking.startDate,
//                       booking.endDate
//                     );
//                     const total = (booking.room?.price || 0) * nights;
//                     return (
//                       <tr key={booking._id} className="hover:bg-stone-50">
//                         <td className="px-4 py-4 align-top">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
//                               {booking.user?.name?.[0] || "U"}
//                             </div>
//                             <div>
//                               <div className="font-medium">
//                                 {booking.user?.name}
//                               </div>
//                               <div className="text-sm text-stone-500">
//                                 {booking.user?.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 align-top">
//                           <div className="font-medium">
//                             {booking.room?.name || "—"}
//                           </div>
//                           <div className="text-sm text-stone-500">
//                             {booking.room?.type || ""}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 align-top">
//                           <div className="text-sm">
//                             <div>
//                               <span className="font-medium text-stone-500">
//                                 In:
//                               </span>{" "}
//                               {booking.startDate
//                                 ? new Date(
//                                     booking.startDate
//                                   ).toLocaleDateString()
//                                 : "—"}
//                             </div>
//                             <div>
//                               <span className="font-medium text-stone-500">
//                                 Out:
//                               </span>{" "}
//                               {booking.endDate
//                                 ? new Date(booking.endDate).toLocaleDateString()
//                                 : "—"}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 align-top">
//                           <div className="text-sm font-medium">{nights}</div>
//                           <div className="text-xs text-stone-500">
//                             {booking.adult} adults, {booking.children} children
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 align-top text-right">
//                           <div className="font-semibold">
//                             ₹{total.toLocaleString("en-IN")}
//                           </div>
//                           <div className="text-xs text-stone-500">
//                             ₹{booking.room?.price}/night
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 align-top text-right">
//                           <StatusBadge status={booking.status} />
//                         </td>
//                         <td className="px-4 py-4 align-top text-right">
//                           <ActionButtons booking={booking} />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* ---------------- PAGINATION (SHARED) ---------------- */}
//             <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
//               <Button
//                 onClick={() => handlePrev()}
//                 disabled={currentPage === 1}
//                 variant="outline"
//                 size="sm"
//               >
//                 Prev
//               </Button>
//               <Button
//                 onClick={() => handleNext()}
//                 disabled={currentPage * ITEMS_PER_PAGE >= bookings.length}
//                 variant="outline"
//                 size="sm"
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Calendar,
  User,
  BedDouble,
  CreditCard,
  Trash2, // <--- Imported Trash2 icon
} from "lucide-react";

export default function BookingsTab({
  bookings,
  loading,
  isProcessing,
  onAccept,
  onReject,
  onDelete, // <--- New prop is available
}: any) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the list of IDs for cancelled bookings, to enable/disable the trash button
  const cancelledBookingIds = useMemo(() => {
    return bookings
      .filter((booking: any) => booking.status === "cancelled")
      .map((booking: any) => booking._id);
  }, [bookings]);

  // Handler for bulk deleting cancelled bookings
  const handleDeleteCancelled = () => {
    if (onDelete && cancelledBookingIds.length > 0) {
      // Call the onDelete function with the array of cancelled IDs
      onDelete(cancelledBookingIds);
    }
  };

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return bookings.slice(start, start + ITEMS_PER_PAGE);
  }, [bookings, currentPage]);

  const calcNights = (start?: string, end?: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const handleNext = () => {
    if (currentPage * ITEMS_PER_PAGE < bookings.length)
      setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Helper to render Status Badge (Shared between views)
  const StatusBadge = ({ status }: { status: string }) => (
    <Badge
      variant={
        status === "cancelled"
          ? "destructive"
          : status === "approved"
          ? "default"
          : "outline"
      }
      className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
    >
      {status}
    </Badge>
  );

  // Helper to render Actions (Shared between views)
  const ActionButtons = ({ booking }: { booking: any }) => (
    <div className="flex items-center gap-2 w-full justify-end">
      {booking.status === "pending" && (
        <>
          <Button
            size="sm"
            onClick={() => onAccept(booking._id, booking.room?._id)}
            disabled={!!isProcessing[booking._id]}
            className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
          >
            {isProcessing[booking._id] ? "..." : "Accept"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              onReject(
                booking.room?._id,
                booking.user?._id,
                booking._id,
                "cancelled"
              )
            }
            disabled={!!isProcessing[booking._id]}
            className="flex-1 md:flex-none"
          >
            {isProcessing[booking._id] ? "..." : "Reject"}
          </Button>
        </>
      )}
      {booking.status === "approved" && (
        <Button
          size="sm"
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-50 flex-1 md:flex-none"
          onClick={() =>
            onReject(
              booking.room?._id,
              booking.user?._id,
              booking._id,
              "cancelled"
            )
          }
          disabled={!!isProcessing[booking._id]}
        >
          {isProcessing[booking._id] ? "..." : "Cancel Booking"}
        </Button>
      )}
    </div>
  );

  return (
    <Card>
      {/* Refactored CardHeader for top-right button placement */}
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Review incoming requests and manage status.
          </CardDescription>
        </div>
        {/* Trash Icon Button for Deleting Cancelled Bookings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteCancelled}
          disabled={cancelledBookingIds.length === 0 || loading}
          className="text-red-600 hover:text-red-900 cursor-pointer"
          title={
            cancelledBookingIds.length > 0
              ? `Delete ${cancelledBookingIds.length} cancelled bookings`
              : "No cancelled bookings to delete"
          }
        >
          <Trash2 className="size-6 " />
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="py-12 text-center text-stone-400">Loading…</div>
        ) : bookings.length === 0 ? (
          <div className="py-12 text-center text-stone-400">
            No bookings found
          </div>
        ) : (
          <>
            {/* ---------------- MOBILE VIEW (CARDS) ---------------- */}
            <div className="space-y-4 md:hidden">
              {paginatedBookings.map((booking: any) => {
                const nights = calcNights(booking.startDate, booking.endDate);
                const total = (booking.room?.price || 0) * nights;

                return (
                  <div
                    key={booking._id}
                    className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm"
                  >
                    {/* Card Top: User & Status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 font-bold text-stone-600">
                          {booking.user?.name?.[0] || "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900">
                            {booking.user?.name}
                          </div>
                          <div className="text-xs text-stone-500">
                            {booking.user?.email}
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <hr className="border-stone-100" />

                    {/* Card Middle: Details Grid */}
                    <div className="grid grid-cols-2 gap-y-3 text-sm text-stone-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
                          <BedDouble className="h-3 w-3" /> Room
                        </span>
                        <span>{booking.room?.name || "—"}</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="flex items-center justify-end gap-1 text-xs font-medium text-stone-400">
                          <CreditCard className="h-3 w-3" /> Total
                        </span>
                        <span className="font-semibold text-stone-900">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="col-span-2 flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
                          <Calendar className="h-3 w-3" /> Stay Duration
                        </span>
                        <div className="flex justify-between">
                          <span>
                            {booking.startDate
                              ? new Date(booking.startDate).toLocaleDateString()
                              : "—"}{" "}
                            -{" "}
                            {booking.endDate
                              ? new Date(booking.endDate).toLocaleDateString()
                              : "—"}
                          </span>
                          <span className="font-medium text-stone-900">
                            ({nights} nights)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom: Actions */}
                    <div className="mt-2">
                      <ActionButtons booking={booking} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------------- DESKTOP VIEW (TABLE) ---------------- */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-100">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
                      Guest
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
                      Dates
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">
                      Nights
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
                      Total
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-stone-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {paginatedBookings.map((booking: any) => {
                    const nights = calcNights(
                      booking.startDate,
                      booking.endDate
                    );
                    const total = (booking.room?.price || 0) * nights;
                    return (
                      <tr key={booking._id} className="hover:bg-stone-50">
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
                              {booking.user?.name?.[0] || "U"}
                            </div>
                            <div>
                              <div className="font-medium">
                                {booking.user?.name}
                              </div>
                              <div className="text-sm text-stone-500">
                                {booking.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <div className="font-medium">
                            {booking.room?.name || "—"}
                          </div>
                          <div className="text-sm text-stone-500">
                            {booking.room?.type || ""}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <div className="text-sm">
                            <div>
                              <span className="font-medium text-stone-500">
                                In:
                              </span>{" "}
                              {booking.startDate
                                ? new Date(
                                    booking.startDate
                                  ).toLocaleDateString()
                                : "—"}
                            </div>
                            <div>
                              <span className="font-medium text-stone-500">
                                Out:
                              </span>{" "}
                              {booking.endDate
                                ? new Date(booking.endDate).toLocaleDateString()
                                : "—"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <div className="text-sm font-medium">{nights}</div>
                          <div className="text-xs text-stone-500">
                            {booking.adult} adults, {booking.children} children
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-right">
                          <div className="font-semibold">
                            ₹{total.toLocaleString("en-IN")}
                          </div>
                          <div className="text-xs text-stone-500">
                            ₹{booking.room?.price}/night
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top text-right">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-4 py-4 align-top text-right">
                          <ActionButtons booking={booking} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ---------------- PAGINATION (SHARED) ---------------- */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button
                onClick={() => handlePrev()}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Prev
              </Button>
              <Button
                onClick={() => handleNext()}
                disabled={currentPage * ITEMS_PER_PAGE >= bookings.length}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
