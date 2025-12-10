import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import api from "../../utils/axios";

export default function RoomsTab({ rooms, refreshRooms }: any) {
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // modal state
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // FORM DATA
  const [formData, setFormData] = useState<any>({});
  const [newImages, setNewImages] = useState<File[]>([]);

  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return rooms.slice(start, start + ITEMS_PER_PAGE);
  }, [rooms, currentPage]);

  const handleEditRoom = (roomId: string) => {
    const room = rooms.find((r: any) => r._id === roomId);
    if (!room) return;

    setSelectedRoom(room);
    setFormData(room);
    setNewImages([]); // reset file input
    setOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files);
    setNewImages((prev: File[]) => [...prev, ...files] as File[]);
  };

  const removeExistingImage = (index: number) => {
    const updatedImages = formData.image.filter(
      (_: any, i: number) => i !== index
    );

    setFormData({
      ...formData,
      image: updatedImages,
    });
  };

  const removeNewImage = (index: number) => {
    const updated = newImages.filter((_, i) => i !== index);
    setNewImages(updated);
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      // Append text data
      fd.append("data", JSON.stringify(formData));

      // Append new image files
      newImages.forEach((file) => fd.append("images", file));

      await api.put(`/admin/rooms/${selectedRoom._id}/edit`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      toast.success("Room updated successfully");
      refreshRooms();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update room");
    }
  };

  return (
    <>
      {/* Rooms List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {rooms && rooms.length > 0 ? (
          paginatedRooms.map((room: any) => (
            <Card key={room._id} className="overflow-hidden">
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    room.image?.[0] ? room.image[0] : "/fallback.jpg"
                  })`,
                }}
              />
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>
                  {room.Roomtype} • ₹{room.price?.toLocaleString("en-IN")}/night
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
                  onClick={() => handleEditRoom(room._id)}
                >
                  Edit Room
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-stone-500">No rooms available.</div>
        )}
      </div>

      {/* Pagination */}
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

      {/* Edit Room Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-4">
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Room Name"
              />

              <Input
                name="Roomtype"
                value={formData.Roomtype || ""}
                onChange={handleChange}
                placeholder="Room Type"
              />

              <Textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Description"
              />

              <Input
                name="capacity"
                type="number"
                value={formData.capacity || ""}
                onChange={handleChange}
                placeholder="Capacity"
              />

              <Textarea
                name="occupancyDetails"
                value={formData.occupancyDetails || ""}
                onChange={handleChange}
                placeholder="Occupancy Details"
              />

              <Input
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
                placeholder="Price"
              />

              <Textarea
                name="priceDetails"
                value={formData.priceDetails || ""}
                onChange={handleChange}
                placeholder="Price Details"
              />

              {/* EXISTING IMAGES */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Existing Images</label>

                {formData.image?.map((img: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      src={img}
                      className="h-16 w-16 rounded object-cover border"
                    />

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeExistingImage(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>

              {/* NEW IMAGES */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload New Images</label>

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                />

                {newImages.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-stone-700"
                  >
                    {file.name}

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeNewImage(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
