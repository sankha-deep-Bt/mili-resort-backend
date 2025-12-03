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

export default function BookingsTab({
  bookings,
  loading,
  isProcessing,
  onAccept,
  onReject,
}: any) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
        <CardDescription>
          Review incoming requests and manage status.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <div className="py-12 text-center text-stone-400">Loading…</div>
        ) : bookings.length === 0 ? (
          <div className="py-12 text-center text-stone-400">
            No bookings found
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-stone-100">
              <thead className="bg-stone-50">
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Nights</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-100">
                {paginatedBookings.map((booking: any) => {
                  const nights = calcNights(booking.startDate, booking.endDate);
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
                            <span className="font-medium">In:</span>{" "}
                            {booking.startDate
                              ? new Date(booking.startDate).toLocaleDateString()
                              : "—"}
                          </div>
                          <div>
                            <span className="font-medium">Out:</span>{" "}
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
                        <div className="flex items-center justify-end">
                          <Badge
                            variant={
                              booking.status === "cancelled"
                                ? "destructive"
                                : booking.status === "approved"
                                ? "default"
                                : "outline"
                            }
                            className="px-3 py-1 rounded-full text-sm"
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() =>
                                  onAccept(booking._id, booking.room?._id)
                                }
                                disabled={!!isProcessing[booking._id]}
                                className="bg-green-600 hover:bg-green-700"
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
                              >
                                {isProcessing[booking._id] ? "..." : "Reject"}
                              </Button>
                            </>
                          )}
                          {booking.status === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-50"
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
                              {isProcessing[booking._id] ? "..." : "Cancel"}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => handlePrev()} disabled={currentPage === 1}>
                Prev
              </Button>
              <Button
                onClick={() => handleNext()}
                disabled={currentPage * ITEMS_PER_PAGE >= bookings.length}
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
