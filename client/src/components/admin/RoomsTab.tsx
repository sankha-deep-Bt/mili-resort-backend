import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";

export default function RoomsTab({ rooms, onToggleStatus }: any) {
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return rooms.slice(start, start + ITEMS_PER_PAGE);
  }, [rooms, currentPage]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {rooms && rooms.length > 0 ? (
          paginatedRooms.map((room: any) => (
            <Card key={room._id} className="overflow-hidden">
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    room.image?.startsWith("http")
                      ? room.image
                      : "/fallback.jpg"
                  })`,
                }}
              />
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>
                  {room.Roomtype} • ₹{room.price?.toLocaleString("en-IN")}/night{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{room.description}</p>
                <p>{room.priceDetails}</p>
                <p className="text-sm text-stone-500 mb-3">
                  Capacity: {room.capacity} {room.occupancyDetails}
                </p>

                <Button
                  className="w-full"
                  variant={room.isAvailable ? "default" : "destructive"}
                  onClick={() => onToggleStatus(room._id, !room.isAvailable)}
                >
                  {room.isAvailable
                    ? "Mark as Unavailable"
                    : "Mark as Available"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-stone-500">No rooms available.</div>
        )}
      </div>
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
          disabled={currentPage * ITEMS_PER_PAGE >= rooms.length}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </>
  );
}
