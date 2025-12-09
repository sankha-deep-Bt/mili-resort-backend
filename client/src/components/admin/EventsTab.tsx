// import { useState, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "../ui/card";
// import { Button } from "../ui/button";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function EventsTab({ events, onUpdateStatus }: any) {
//   const [subTab, setSubTab] = useState<"add" | "enquiries">("enquiries");
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     image: "",
//   });

//   // Pagination State for Enquiries
//   const ITEMS_PER_PAGE = 4;
//   const [currentPage, setCurrentPage] = useState(1);
//   const paginatedEvents = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return events.slice(start, start + ITEMS_PER_PAGE);
//   }, [events, currentPage]);

//   const handleCreateEvent = async (e: any) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:3000/api/v1/admin/event/add",
//         newEvent
//       );
//       toast.success("Event created successfully!");
//       setNewEvent({ title: "", subtitle: "", description: "", image: "" });
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Card className="border-none shadow-none">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Events</CardTitle>
//         <CardDescription>Manage events & event enquiries</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="flex gap-3 border-b pb-2">
//           <button
//             onClick={() => setSubTab("add")}
//             className={`px-4 py-2 rounded-md text-sm font-semibold ${
//               subTab === "add"
//                 ? "bg-primary text-white"
//                 : "bg-stone-200 text-stone-700"
//             }`}
//           >
//             Add Event
//           </button>
//           <button
//             onClick={() => setSubTab("enquiries")}
//             className={`px-4 py-2 rounded-md text-sm font-semibold ${
//               subTab === "enquiries"
//                 ? "bg-primary text-white"
//                 : "bg-stone-200 text-stone-700"
//             }`}
//           >
//             Event Enquiries
//           </button>
//         </div>

//         {subTab === "add" && (
//           <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm">
//             <h2 className="text-xl font-semibold">Add New Event</h2>
//             <form className="space-y-4" onSubmit={handleCreateEvent}>
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Subtitle</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.subtitle}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, subtitle: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Description</label>
//                 <textarea
//                   className="border rounded-md px-3 py-2 text-sm h-28 resize-none"
//                   value={newEvent.description}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Image URL</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.image}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, image: e.target.value })
//                   }
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="bg-primary text-white hover:bg-primary/90 px-6 py-2"
//               >
//                 Create Event
//               </Button>
//             </form>
//           </div>
//         )}

//         {subTab === "enquiries" && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Event Enquiries</h2>
//             {events.length === 0 ? (
//               <p className="text-center text-stone-500 py-10">
//                 No event enquiries found.
//               </p>
//             ) : (
//               paginatedEvents.map((event: any) => (
//                 <div
//                   key={event._id}
//                   className="border p-4 rounded-xl shadow-sm bg-white flex flex-col gap-4 mb-4"
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <h2 className="font-semibold text-lg">{event.name}</h2>
//                       <p className="text-sm text-stone-600">
//                         {event.email} - {event.phoneNumber}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         event.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : event.status === "rejected"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {event.status?.toUpperCase() || "PENDING"}
//                     </span>
//                   </div>
//                   <div className="text-sm text-stone-700 space-y-1">
//                     <p>
//                       <span className="font-medium">Date:</span>{" "}
//                       {new Date(event.eventDate).toLocaleDateString()}
//                     </p>
//                     {event.venue && (
//                       <p>
//                         <span className="font-medium">Venue:</span>{" "}
//                         {event.venue}
//                       </p>
//                     )}
//                     {event.guests && (
//                       <p>
//                         <span className="font-medium">Guests:</span>{" "}
//                         {event.guests}
//                       </p>
//                     )}
//                     {event.message && (
//                       <p className="mt-2">
//                         <span className="font-medium">Message:</span>{" "}
//                         {event.message}
//                       </p>
//                     )}
//                   </div>
//                   {event.status === "pending" && (
//                     <div className="flex gap-3">
//                       <Button
//                         className="bg-green-600 hover:bg-green-700 text-white"
//                         onClick={() => onUpdateStatus(event._id, "approved")}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                         onClick={() => onUpdateStatus(event._id, "rejected")}
//                       >
//                         Reject
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//             <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
//               <Button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 size="sm"
//                 variant="outline"
//               >
//                 Prev
//               </Button>
//               <Button
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 disabled={currentPage * ITEMS_PER_PAGE >= events.length}
//                 size="sm"
//                 variant="outline"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// import { useState, useMemo, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "../ui/card";
// import { Button } from "../ui/button";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function EventsTab({ events: enquiries, onUpdateStatus }: any) {
//   const [subTab, setSubTab] = useState<"existing" | "add" | "enquiries">(
//     "existing"
//   );

//   const [highlightEvents, setHighlightEvents] = useState<any[]>([]);

//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     image: "",
//   });

//   // Fetch existing event highlights
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/api/v1/event/highlight"
//         );
//         setHighlightEvents(res.data.highlights || []);
//       } catch (err) {
//         console.error("Failed to load events:", err);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Pagination for enquiries
//   const ITEMS_PER_PAGE = 4;
//   const [currentPage, setCurrentPage] = useState(1);

//   const paginatedEnquiries = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return enquiries.slice(start, start + ITEMS_PER_PAGE);
//   }, [enquiries, currentPage]);

//   const handleCreateEvent = async (e: any) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:3000/api/v1/admin/event/add",
//         newEvent
//       );
//       toast.success("Event created successfully!");

//       setNewEvent({
//         title: "",
//         subtitle: "",
//         description: "",
//         image: "",
//       });
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Card className="border-none shadow-none">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Events</CardTitle>
//         <CardDescription>Manage events & event enquiries</CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* SUB TABS */}
//         <div className="flex gap-3 border-b pb-2">
//           <button
//             onClick={() => setSubTab("existing")}
//             className={`px-4 py-2 rounded-md text-sm font-semibold ${
//               subTab === "existing"
//                 ? "bg-primary text-white"
//                 : "bg-stone-200 text-stone-700"
//             }`}
//           >
//             Existing Events
//           </button>

//           <button
//             onClick={() => setSubTab("add")}
//             className={`px-4 py-2 rounded-md text-sm font-semibold ${
//               subTab === "add"
//                 ? "bg-primary text-white"
//                 : "bg-stone-200 text-stone-700"
//             }`}
//           >
//             Add Event
//           </button>

//           <button
//             onClick={() => setSubTab("enquiries")}
//             className={`px-4 py-2 rounded-md text-sm font-semibold ${
//               subTab === "enquiries"
//                 ? "bg-primary text-white"
//                 : "bg-stone-200 text-stone-700"
//             }`}
//           >
//             Event Enquiries
//           </button>
//         </div>

//         {/* ======================== EXISTING EVENTS TAB ======================= */}
//         {subTab === "existing" && (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Existing Events</h2>

//             {highlightEvents.length === 0 ? (
//               <p className="text-stone-500 text-center py-10">
//                 No events found.
//               </p>
//             ) : (
//               highlightEvents.map((ev) => (
//                 <div
//                   key={ev._id}
//                   className="border rounded-xl p-4 bg-white shadow-sm flex gap-4"
//                 >
//                   <img
//                     src={ev.image}
//                     alt={ev.title}
//                     className="w-32 h-24 object-cover rounded-md"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold">{ev.title}</h3>
//                     {ev.subtitle && (
//                       <p className="text-stone-600 text-sm">{ev.subtitle}</p>
//                     )}
//                     <p className="text-stone-700 text-sm mt-1">
//                       {ev.description}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* ======================== ADD EVENT TAB ======================= */}
//         {subTab === "add" && (
//           <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm">
//             <h2 className="text-xl font-semibold">Add New Event</h2>

//             <form className="space-y-4" onSubmit={handleCreateEvent}>
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.title}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Subtitle</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.subtitle}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, subtitle: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Description</label>
//                 <textarea
//                   className="border rounded-md px-3 py-2 text-sm h-28 resize-none"
//                   value={newEvent.description}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Image URL</label>
//                 <input
//                   type="text"
//                   className="border rounded-md px-3 py-2 text-sm"
//                   value={newEvent.image}
//                   onChange={(e) =>
//                     setNewEvent({ ...newEvent, image: e.target.value })
//                   }
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="bg-primary text-white hover:bg-primary/90 px-6 py-2"
//               >
//                 Create Event
//               </Button>
//             </form>
//           </div>
//         )}

//         {/* ======================== ENQUIRIES TAB ======================= */}
//         {subTab === "enquiries" && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Event Enquiries</h2>

//             {enquiries.length === 0 ? (
//               <p className="text-center text-stone-500 py-10">
//                 No event enquiries found.
//               </p>
//             ) : (
//               paginatedEnquiries.map((event: any) => (
//                 <div
//                   key={event._id}
//                   className="border p-4 rounded-xl shadow-sm bg-white flex flex-col gap-4 mb-4"
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <h2 className="font-semibold text-lg">{event.name}</h2>
//                       <p className="text-sm text-stone-600">
//                         {event.email} - {event.phoneNumber}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         event.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : event.status === "rejected"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {event.status?.toUpperCase() || "PENDING"}
//                     </span>
//                   </div>

//                   <div className="text-sm text-stone-700 space-y-1">
//                     <p>
//                       <span className="font-medium">Date:</span>{" "}
//                       {new Date(event.eventDate).toLocaleDateString()}
//                     </p>

//                     {event.venue && (
//                       <p>
//                         <span className="font-medium">Venue:</span>{" "}
//                         {event.venue}
//                       </p>
//                     )}

//                     {event.guests && (
//                       <p>
//                         <span className="font-medium">Guests:</span>{" "}
//                         {event.guests}
//                       </p>
//                     )}

//                     {event.message && (
//                       <p className="mt-2">
//                         <span className="font-medium">Message:</span>{" "}
//                         {event.message}
//                       </p>
//                     )}
//                   </div>

//                   {event.status === "pending" && (
//                     <div className="flex gap-3">
//                       <Button
//                         className="bg-green-600 hover:bg-green-700 text-white"
//                         onClick={() => onUpdateStatus(event._id, "approved")}
//                       >
//                         Approve
//                       </Button>

//                       <Button
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                         onClick={() => onUpdateStatus(event._id, "rejected")}
//                       >
//                         Reject
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}

//             {/* Pagination */}
//             <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
//               <Button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 size="sm"
//                 variant="outline"
//               >
//                 Prev
//               </Button>

//               <Button
//                 onClick={() =>
//                   setCurrentPage((p) =>
//                     p * ITEMS_PER_PAGE >= enquiries.length ? p : p + 1
//                   )
//                 }
//                 disabled={currentPage * ITEMS_PER_PAGE >= enquiries.length}
//                 size="sm"
//                 variant="outline"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

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

export default function EventsTab({ events: enquiries, onUpdateStatus }: any) {
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

  // Fetch existing event highlights
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/event/highlight"
        );
        setHighlightEvents(res.data.highlights || []);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Pagination for enquiries
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedEnquiries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return enquiries.slice(start, start + ITEMS_PER_PAGE);
  }, [enquiries, currentPage]);

  // Create new event (with file upload)
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
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event created successfully!");

      setNewEvent({
        title: "",
        subtitle: "",
        description: "",
        image: null,
      });
    } catch (err) {
      toast.error("Something went wrong");
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

        {/* ======================== EXISTING EVENTS TAB ======================= */}
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
                  className="border rounded-xl p-4 bg-white shadow-sm flex gap-4"
                >
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
              ))
            )}
          </div>
        )}

        {/* ======================== ADD EVENT TAB ======================= */}
        {subTab === "add" && (
          <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm">
            <h2 className="text-xl font-semibold">Add New Event</h2>

            <form className="space-y-4" onSubmit={handleCreateEvent}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Subtitle</label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm"
                  value={newEvent.subtitle}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, subtitle: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="border rounded-md px-3 py-2 text-sm h-28 resize-none"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* FILE UPLOAD */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded-md px-3 py-2 text-sm"
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90 px-6 py-2"
              >
                Create Event
              </Button>
            </form>
          </div>
        )}

        {/* ======================== ENQUIRIES TAB ======================= */}
        {subTab === "enquiries" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Event Enquiries</h2>

            {paginatedEnquiries.map((event: any) => (
              <div
                key={event._id}
                className="border p-4 rounded-xl shadow-sm bg-white flex flex-col gap-4 mb-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">{event.name}</h2>
                    <p className="text-sm text-stone-600">
                      {event.email} - {event.phoneNumber}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : event.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>

                <div className="text-sm text-stone-700 space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>

                  {event.venue && (
                    <p>
                      <span className="font-medium">Venue:</span> {event.venue}
                    </p>
                  )}

                  {event.guests && (
                    <p>
                      <span className="font-medium">Guests:</span>{" "}
                      {event.guests}
                    </p>
                  )}

                  {event.message && (
                    <p className="mt-2">
                      <span className="font-medium">Message:</span>{" "}
                      {event.message}
                    </p>
                  )}
                </div>

                {event.status === "pending" && (
                  <div className="flex gap-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => onUpdateStatus(event._id, "approved")}
                    >
                      Approve
                    </Button>

                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => onUpdateStatus(event._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                size="sm"
                variant="outline"
              >
                Prev
              </Button>

              <Button
                onClick={() =>
                  setCurrentPage((p) =>
                    p * ITEMS_PER_PAGE >= enquiries.length ? p : p + 1
                  )
                }
                disabled={currentPage * ITEMS_PER_PAGE >= enquiries.length}
                size="sm"
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
