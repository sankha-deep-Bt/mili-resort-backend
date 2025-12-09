import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, X } from "lucide-react";

export default function EventsTab({ enquiries, onUpdateStatus }: any) {
  const [subTab, setSubTab] = useState<"existing" | "add" | "enquiries">(
    "existing"
  );

  const [highlightEvents, setHighlightEvents] = useState<any[]>([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null as File | null,
  });

  // Edit Modal State
  const [editEvent, setEditEvent] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch existing event highlights
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/event/get-all");
      setHighlightEvents(res.data.events || []);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Pagination for enquiries
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedEnquiries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return enquiries.slice(start, start + ITEMS_PER_PAGE);
  }, [enquiries, currentPage]);

  // Create new event
  const handleCreateEvent = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("subtitle", newEvent.subtitle);
      formData.append("description", newEvent.description);
      if (newEvent.image) formData.append("image", newEvent.image);

      await axios.post(
        "http://localhost:3000/api/v1/admin/event/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Event created successfully!");

      setNewEvent({
        title: "",
        subtitle: "",
        description: "",
        image: null,
      });

      fetchEvents();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Open edit modal
  const handleOpenEdit = (ev: any) => {
    setEditEvent({
      ...ev,
      image: null,
      existingImage: ev.image,
    });
    setShowEditModal(true);
  };

  // Update event
  const handleUpdateEvent = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", editEvent.title);
      formData.append("subtitle", editEvent.subtitle);
      formData.append("description", editEvent.description);

      if (editEvent.image instanceof File) {
        formData.append("image", editEvent.image);
      }

      await axios.put(
        `http://localhost:3000/api/v1/admin/event/${editEvent._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Event updated!");
      setShowEditModal(false);
      setEditEvent(null);

      fetchEvents();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/event/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Events</CardTitle>
        <CardDescription>Manage events & event enquiries</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* SUB TABS */}
        <div className="flex gap-3 border-b pb-2">
          <button
            onClick={() => setSubTab("existing")}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              subTab === "existing"
                ? "bg-primary text-white"
                : "bg-stone-200 text-stone-700"
            }`}
          >
            Existing Events
          </button>

          <button
            onClick={() => setSubTab("add")}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              subTab === "add"
                ? "bg-primary text-white"
                : "bg-stone-200 text-stone-700"
            }`}
          >
            Add Event
          </button>

          <button
            onClick={() => setSubTab("enquiries")}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              subTab === "enquiries"
                ? "bg-primary text-white"
                : "bg-stone-200 text-stone-700"
            }`}
          >
            Event Enquiries
          </button>
        </div>

        {/* EXISTING EVENTS */}
        {subTab === "existing" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Existing Events</h2>

            {highlightEvents.length === 0 ? (
              <p className="text-stone-500 text-center py-10">
                No events found.
              </p>
            ) : (
              highlightEvents.map((ev) => (
                <div
                  key={ev._id}
                  className="border rounded-xl p-4 bg-white shadow-sm flex gap-4 justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-32 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{ev.title}</h3>
                      {ev.subtitle && (
                        <p className="text-stone-600 text-sm">{ev.subtitle}</p>
                      )}
                      <p className="text-stone-700 text-sm mt-1">
                        {ev.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(ev)}
                  >
                    Edit
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ADD NEW EVENT */}
        {subTab === "add" && (
          <div className="p-6 border rounded-2xl bg-white shadow-md space-y-6">
            <h2 className="text-xl font-semibold">Add New Event</h2>

            <form className="space-y-5" onSubmit={handleCreateEvent}>
              {/* TITLE */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* SUBTITLE */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Subtitle</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="Enter event subtitle (optional)"
                  value={newEvent.subtitle}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, subtitle: e.target.value })
                  }
                />
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="border rounded-md px-3 py-2 text-sm h-32 resize-none focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="Provide a short description about the event"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Event Image</label>

                {/* Upload Box */}
                <label className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-stone-100 transition flex flex-col items-center gap-2">
                  <span className="text-sm text-stone-600">
                    {newEvent.image ? "Change Image" : "Click to upload image"}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        image: e.target.files?.[0] || null,
                      })
                    }
                  />
                </label>

                {/* Preview */}
                {newEvent.image && (
                  <div className="mt-2">
                    <p className="text-xs text-stone-500 mb-1">Preview</p>
                    <img
                      src={URL.createObjectURL(newEvent.image)}
                      className="w-40 h-28 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md"
              >
                Create Event
              </Button>
            </form>
          </div>
        )}

        {/* ENQUIRIES LOGIC SAME AS BEFORE */}
        {subTab === "enquiries" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Event Enquiries</h2>

            {paginatedEnquiries.length === 0 && (
              <p className="text-stone-500 text-center py-10">
                No event enquiries yet.
              </p>
            )}

            {paginatedEnquiries.map((q: any) => (
              <div
                key={q._id}
                className="border p-5 rounded-2xl shadow-sm bg-white flex flex-col gap-4 mb-4"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-primary">
                    {q.name}
                  </h3>
                  <p className="text-sm text-stone-500">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-stone-500">Email</p>
                    <p className="font-medium">{q.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">Phone Number</p>
                    <p className="font-medium">{q.phoneNumber}</p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">Event Type</p>
                    <p className="font-medium capitalize">{q.eventType}</p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">Event Date</p>
                    <p className="font-medium">
                      {new Date(q.eventDate).toDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">Guest Count</p>
                    <p className="font-medium">{q.guestCount}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-2">
                  <p className="text-xs text-stone-500 mb-1">Message</p>
                  <p className="bg-stone-100 rounded-md p-3 text-sm text-stone-700">
                    {q.message || "No message provided."}
                  </p>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev * ITEMS_PER_PAGE >= enquiries.length ? prev : prev + 1
                  )
                }
                disabled={currentPage * ITEMS_PER_PAGE >= enquiries.length}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* EDIT EVENT MODAL */}
      {showEditModal && editEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[500px] animate-scaleIn relative">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-stone-600 hover:text-black"
              onClick={() => setShowEditModal(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Event</h2>

            <form className="space-y-4" onSubmit={handleUpdateEvent}>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Title</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2"
                  value={editEvent.title}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Subtitle</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2"
                  value={editEvent.subtitle}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, subtitle: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Description</label>
                <textarea
                  className="border rounded-md px-3 py-2 h-28 resize-none"
                  value={editEvent.description}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Replace Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded-md px-3 py-2"
                  onChange={(e) =>
                    setEditEvent({
                      ...editEvent,
                      image: e.target.files?.[0] || null,
                    })
                  }
                />

                <div>
                  <p className="text-xs text-stone-500 mb-1">Current Image</p>
                  <img
                    src={editEvent.existingImage}
                    className="w-32 h-24 rounded-md object-cover border"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                {/* DELETE BUTTON */}
                <button
                  type="button"
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                  onClick={() => handleDeleteEvent(editEvent._id)}
                >
                  <Trash2 size={18} /> Delete Event
                </button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary text-white">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}
