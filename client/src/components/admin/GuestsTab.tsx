import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";

export default function GuestsTab({ guests }: any) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedGuests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return guests.slice(start, start + ITEMS_PER_PAGE);
  }, [guests, currentPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Directory</CardTitle>
        <CardDescription>Unique guests from bookings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {guests.length === 0 ? (
          <p className="text-stone-500">No guests found.</p>
        ) : (
          paginatedGuests.map((guest: any) => (
            <div
              key={guest.email}
              className="flex items-center justify-between p-3 bg-white border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-sm font-semibold">
                  {guest?.name?.[0] || "U"}
                </div>
                <div>
                  <div className="font-medium">{guest?.name}</div>
                  <div className="text-sm text-stone-500">
                    {guest?.email} - {guest?.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {/* Pagination Buttons */}
        {guests.length > ITEMS_PER_PAGE && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              size="sm"
              variant="outline"
            >
              Prev
            </Button>
            <Button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage * ITEMS_PER_PAGE >= guests.length}
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
