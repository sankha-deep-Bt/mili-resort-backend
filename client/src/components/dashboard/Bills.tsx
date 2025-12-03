// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";

// const Bills = ({ bookings }: any) => {
//   // 💡 Remove the incorrect, unconditional calculation from here
//   // const days = ...
//   console.log(bookings);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-light uppercase tracking-widest">
//         Billing & Invoices
//       </h2>
//       {bookings && bookings.length > 0 ? (
//         <div className="space-y-4">
//           {bookings.map((b: any) => {
//             // ✅ Calculate days for the *current* booking (b) inside the loop
//             const startDate = new Date(b.startDate);
//             const endDate = new Date(b.endDate);

//             // Calculate difference in time (milliseconds)
//             const timeDifference = endDate.getTime() - startDate.getTime();

//             // Convert milliseconds to days (1000ms * 60s * 60m * 24h)
//             // Using Math.ceil to ensure a full day difference is counted as 1 day
//             // You might need Math.round or a specific date library logic depending on exact requirements
//             const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

//             // Note: The original code was only calculating the difference in day numbers (getDate()),
//             // which is error-prone for bookings spanning across months or years. The logic above is safer.

//             return (
//               <Card key={b._id}>
//                 <CardHeader>
//                   <CardTitle>Room {b.room.name}</CardTitle>
//                   <CardDescription>
//                     Check-in: {b.startDate.split("T")[0]} | Check-out:{" "}
//                     {b.endDate.split("T")[0]}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Amount: ₹{b.room.price}/night</p>
//                   <p>Days: {days}</p>
//                   <p>Total: ₹{b.room.price * days}</p>
//                   <p>Status: {b.paid ? "Paid" : "Unpaid"}</p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-6 text-center text-stone-500">
//             No invoices found.
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Bills;

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
      {bookings && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings
            // ✅ NEW: Filter out bookings where status is 'cancelled'
            .filter((b: any) => b.status !== "cancelled")
            .map((b: any) => {
              // ✅ Calculate days for the *current* booking (b) inside the loop
              const startDate = new Date(b.startDate);
              const endDate = new Date(b.endDate);

              // Calculate difference in time (milliseconds)
              const timeDifference = endDate.getTime() - startDate.getTime();

              // Convert milliseconds to days (1000ms * 60s * 60m * 24h)
              const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

              return (
                <Card key={b._id}>
                  <CardHeader>
                    <CardTitle>Room {b.room.name}</CardTitle>
                    <CardDescription>
                      Check-in: {b.startDate.split("T")[0]} | Check-out:{" "}
                      {b.endDate.split("T")[0]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Amount: ₹{b.room.price}/night</p>
                    <p>Days: {days}</p>
                    <p>Total: ₹{b.room.price * days}</p>
                    {/* Display status, preferring 'status' field if available, otherwise use 'paid' */}
                    <p>
                      Status:{" "}
                      {b.status
                        ? b.status.charAt(0).toUpperCase() + b.status.slice(1)
                        : b.paid
                        ? "Paid"
                        : "Unpaid"}
                    </p>
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
