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
import { Calendar, BedDouble, CreditCard, Trash2 } from "lucide-react";

interface RoomInBooking {
  roomId: string;
  quantity: number;
  price: number;
  name: string; // ⬅️ CRITICAL ASSUMPTION: This field is now populated by the backend
  // If this assumption is false, you must pass the master 'Rooms' array to this component.
}

export default function BookingsTab({
  bookings,
  loading,
  isProcessing,
  onAccept,
  onReject,
  onDelete,
  onCheckin,
}: any) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // const cancelledBookingIds = useMemo(() => {
  //   return bookings
  //     .filter((booking: any) => booking.status === "cancelled")
  //     .map((booking: any) => booking._id);
  // }, [bookings]);

  // const cancelledBookingIds = useMemo(() => {
  //   return bookings
  //     .filter((b: any) => ["cancelled", "rejected"].includes(b.status))
  //     .map((b: any) => b._id);
  // }, [bookings]);

  const handleDeleteCancelled = () => {
    if (onDelete && cancelledBookingIds.length > 0) {
      onDelete(cancelledBookingIds);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b: any) => {
      const statusMatch =
        statusFilter === "all" ? true : b.status === statusFilter;

      const paymentMatch =
        paymentFilter === "all"
          ? true
          : paymentFilter === "paid"
          ? b.paid === true
          : b.paid === false;

      return statusMatch && paymentMatch;
    });
  }, [bookings, statusFilter, paymentFilter]);
  const cancelledBookingIds = useMemo(() => {
    return filteredBookings
      .filter((b: any) => ["cancelled", "rejected"].includes(b.status))
      .map((b: any) => b._id);
  }, [filteredBookings]);

  // const paginatedBookings = useMemo(() => {
  //   const start = (currentPage - 1) * ITEMS_PER_PAGE;
  //   return bookings.slice(start, start + ITEMS_PER_PAGE);
  // }, [bookings, currentPage]);
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

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

  // 🟢 UPDATED HELPER: Uses room.name instead of room.roomId
  const getBookingDetails = (booking: any) => {
    const nights = calcNights(booking.startDate, booking.endDate);

    // Calculate Total Price
    const pricePerNight =
      booking.rooms?.reduce((sum: number, room: RoomInBooking) => {
        return sum + (room.price || 0) * (room.quantity || 1);
      }, 0) || 0;

    const total = booking.amount || pricePerNight * nights;

    // 🟢 Generate Room List String: Use room.name
    const roomList =
      booking.rooms
        ?.map((room: RoomInBooking) => {
          // Fallback to roomId only if name is missing (e.g., deleted room)
          return `${room.quantity}x ${room.name || `ID: ${room.roomId}`}`;
        })
        .join(" | ") || "No rooms specified";

    return { nights, total, pricePerNight, roomList };
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <Badge
      variant={
        status === "cancelled" || status === "rejected"
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

  const ActionButtons = ({ booking }: { booking: any }) => (
    <div className="flex items-center gap-2 w-full justify-end">
      {/* PENDING ACTIONS */}
      {booking.status === "pending" && (
        <>
          <Button
            size="sm"
            onClick={() => onAccept(booking._id)}
            disabled={!!isProcessing[booking._id]}
            className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
          >
            {isProcessing[booking._id] ? "..." : "Accept"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onReject(booking._id, "rejected")}
            disabled={!!isProcessing[booking._id]}
            className="flex-1 md:flex-none"
          >
            {isProcessing[booking._id] ? "..." : "Reject"}
          </Button>
        </>
      )}
      {/* APPROVED/CONFIRMED CANCELLATION */}
      {booking.status === "approved" && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 flex-1 md:flex-none"
            onClick={() => onReject(booking._id, "cancelled")}
            disabled={!!isProcessing[booking._id]}
          >
            {isProcessing[booking._id] ? "..." : "Cancel"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-red-50 flex-1 md:flex-none"
            onClick={() => onCheckin(booking._id, "checked-in")}
            disabled={!!isProcessing[booking._id]}
          >
            {isProcessing[booking._id] ? "..." : "Check-in"}
          </Button>
        </>
      )}
      {booking.status === "checked-in" && (
        <Button
          size="icon"
          variant="ghost"
          className="text-red-600 hover:text-red-800"
          onClick={() => onDelete([booking._id])} // delete only this one
          disabled={!!isProcessing[booking._id]}
          title="Delete reservation"
        >
          <Trash2 className="w-6 h-6" />
        </Button>
      )}
      {booking.status === "rejected" && (
        <Button
          size="icon"
          variant="ghost"
          className="text-red-600 hover:text-red-800"
          onClick={() => onDelete([booking._id])} // delete only this one
          disabled={!!isProcessing[booking._id]}
          title="Delete reservation"
        >
          <Trash2 className="w-6 h-6" />
        </Button>
      )}
      {booking.status === "cancelled" && (
        <Button
          size="icon"
          variant="ghost"
          className="text-red-600 hover:text-red-800"
          onClick={() => onDelete([booking._id])} // delete only this one
          disabled={!!isProcessing[booking._id]}
          title="Delete reservation"
        >
          <Trash2 className="w-6 h-6" />
        </Button>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Review incoming requests and manage status.
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteCancelled}
          disabled={cancelledBookingIds.length === 0 || loading}
          className="text-red-600 hover:text-red-900 cursor-pointer"
          title={
            cancelledBookingIds.length > 0
              ? `Delete ${cancelledBookingIds.length} cancelled/rejected bookings`
              : "No cancelled bookings to delete"
          }
        >
          <Trash2 className="size-6 " />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3 px-6 pb-4">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setStatusFilter(e.target.value);
            }}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="checked-in">Checked-in</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setPaymentFilter(e.target.value);
            }}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

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
                const { nights, total, roomList } = getBookingDetails(booking);

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
                      <div className="col-span-2 flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
                          <BedDouble className="h-3 w-3" /> Rooms
                        </span>
                        {/* 🟢 Displaying multiple rooms names */}
                        <span>{roomList}</span>
                      </div>

                      <div className="col-span-1 flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-400">
                          <CreditCard className="h-3 w-3" /> Total
                        </span>
                        <span className="font-semibold text-stone-900">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="col-span-1 flex flex-col gap-1 text-right">
                        <span className="flex items-center justify-end gap-1 text-xs font-medium text-stone-400">
                          <Calendar className="h-3 w-3" /> Stay Duration
                        </span>
                        <div className="flex flex-col">
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
                      Rooms
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
                    const { nights, total, pricePerNight, roomList } =
                      getBookingDetails(booking);

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
                          {/* 🟢 Displaying multiple rooms names */}
                          <div className="font-medium text-sm">{roomList}</div>
                          <div className="text-sm text-stone-500">
                            {booking.adult} adults, {booking.children} children
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
                          <div className="text-xs text-stone-500">nights</div>
                        </td>
                        <td className="px-4 py-4 align-top text-right">
                          <div className="font-semibold">
                            ₹{total.toLocaleString("en-IN")}
                          </div>
                          {pricePerNight > 0 && (
                            <div className="text-xs text-stone-500">
                              ₹{pricePerNight.toLocaleString("en-IN")}/night
                            </div>
                          )}
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
