import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Bills = ({ bookings }: any) => {
  // Console log removed, but the component remains clean.

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light uppercase tracking-widest">
        Billing & Invoices
      </h2>
      <h1>
        After Approval of the Booking an Email would be send to your registered
        Email Address with the Invoice and Payment Link
      </h1>
      <p>
        Please note that cancelled bookings will not be included in this list.
      </p>
      {bookings && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings
            // ✅ NEW: Filter out bookings where status is 'cancelled'
            .filter((b: any) => b.status !== "cancelled")
            .map((b: any) => {
              // Extract the room object from the 'rooms' array
              // Assumes there is always at least one room if the booking is not cancelled
              const roomDetails = b.rooms[0];

              // Calculate days for the *current* booking (b) inside the loop
              const startDate = new Date(b.startDate);
              const endDate = new Date(b.endDate);

              // Calculate difference in time (milliseconds)
              const timeDifference = endDate.getTime() - startDate.getTime();

              // Convert milliseconds to days (1000ms * 60s * 60m * 24h)
              const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

              return (
                <Card key={b._id}>
                  <CardHeader>
                    {/* 👇 CHANGE: Use roomDetails.name */}
                    <CardTitle>Room {roomDetails.name}</CardTitle>
                    <CardDescription>
                      Check-in: {b.startDate.split("T")[0]} | Check-out:{" "}
                      {b.endDate.split("T")[0]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* 👇 CHANGE: Use roomDetails.price */}
                    <p>Amount: ₹{roomDetails.price}/night</p>
                    <p>Days: {days}</p>
                    {/* 👇 CHANGE: Use roomDetails.price */}
                    <p>Total: ₹{roomDetails.price * days}</p>
                    {/* Display status, preferring 'status' field if available, otherwise use 'paid' */}
                    <p>Status: {b.status}</p>
                    <p>Paid: {b.paid ? "Yes" : "No"}</p>
                  </CardContent>
                </Card>
              );
            })}

          {/* Handle case where all bookings were filtered out */}
          {bookings.filter((b: any) => b.status !== "cancelled").length ===
            0 && (
            <Card>
              <CardContent className="p-6 text-center text-stone-500">
                No active or pending invoices found.
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-stone-500">
            No invoices found.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Bills;
