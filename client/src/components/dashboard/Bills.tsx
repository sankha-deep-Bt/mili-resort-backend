import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Bills = ({ bookings }: any) => {
  const days =
    new Date(bookings[0].endDate).getDate() -
    new Date(bookings[0].startDate).getDate();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light uppercase tracking-widest">
        Billing & Invoices
      </h2>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b: any) => (
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
                <p>Total: ₹{b.room.price * days}</p>
              </CardContent>
            </Card>
          ))}
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
