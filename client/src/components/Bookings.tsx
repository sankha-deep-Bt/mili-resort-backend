import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

// IMPORTANT: Set your Backend URL
const API_BASE = "http://localhost:3000/api/v1";

export default function Booking() {
  const [rooms, setRooms] = useState<{ _id: string; name: string }[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();

  const [confirmation, setConfirmation] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    startDate: string;
    endDate: string;
    adults: number;
    children: number;
  } | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const roomsRes = await axios.get(
        "http://localhost:3000/api/v1/reservation/rooms"
      );

      setRooms(Array.isArray(roomsRes.data.rooms) ? roomsRes.data.rooms : []);
      setLoadingRooms(false);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuth || !user) {
      return navigate("/login");
    }

    const form = event.currentTarget;
    setSuccessMessage(null);

    const formData = new FormData(form);
    const getValue = (k: string) =>
      typeof formData.get(k) === "string" ? (formData.get(k) as string) : "";

    const name = getValue("name").trim();
    const email = getValue("email").trim().toLowerCase();
    const phoneNumber = getValue("phoneNumber").trim();
    const roomId = getValue("roomId");
    const startDate = getValue("startDate");
    const endDate = getValue("endDate");
    const adults = Number(getValue("adults"));
    const children = Number(getValue("children"));

    // Validation
    if (!name) return toast.error("Please enter your name.");
    if (!email) return toast.error("Please enter your email.");
    if (!phoneNumber) return toast.error("Please enter your phone.");
    if (!startDate) return toast.error("Please choose check-in date.");
    if (!endDate) return toast.error("Please choose check-out date.");

    const bookingSummary = {
      name,
      email,
      phoneNumber,
      startDate,
      endDate,
      adults,
      children,
      roomId,
    };

    try {
      setIsSubmitting(true);

      await axios.post(`${API_BASE}/reservation/add`, bookingSummary);

      alert("Booking request submitted!");
      setConfirmation(bookingSummary);
      setSuccessMessage(`Thank you, ${name}! We will reach out shortly.`);
      form.reset();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Booking failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[150vh] bg-black overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('https://harmless-tapir-303.convex.cloud/api/storage/fd28d2ba-8b4e-446e-a217-869b0c321ecc')] bg-cover bg-center"
        style={{ backgroundPosition: "50% 100%" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Form Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 py-12">
        <div className="container mx-auto px-4 md:px-12 max-w-[68.75rem]">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-white font-light uppercase tracking-widest">
              Your Mukutmanipur Escape Awaits
            </h2>
          </div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-wrap -mx-2"
          >
            {/* Name */}
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
                required
              />
            </div>

            {/* Email */}
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
                required
              />
            </div>

            {/* Phone */}
            <div className="w-full md:w-1/3 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
                required
              />
            </div>

            {/* Date Inputs */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Check In
              </label>
              <input
                type="date"
                name="startDate"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Check Out
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
                required
              />
            </div>

            {/* Adults */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Adults
              </label>
              <input
                type="number"
                name="adults"
                min={1}
                defaultValue={1}
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
              />
            </div>

            {/* Children */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Children
              </label>
              <input
                type="number"
                name="children"
                min={0}
                defaultValue={0}
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
              />
            </div>

            {/* Room Selection */}
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-white/85 text-xs font-bold uppercase mb-2">
                Room Preference
              </label>

              <select
                name="roomId"
                className="w-full h-11 px-4 bg-white text-zinc-500 text-sm"
              >
                {loadingRooms && <option>Loading rooms...</option>}

                {!loadingRooms &&
                  rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Submit */}
            <div className="w-full md:w-1/4 px-2 flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mb-4 h-11 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/80 disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Book Now"}
              </button>
            </div>
          </motion.form>

          {/* Discount Banner */}
          <div className="text-center mt-6 text-white/75 text-[0.65rem] font-bold uppercase tracking-widest">
            Unlock a 10% discount by booking directly through our website
          </div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-6 py-3 text-center text-sm uppercase tracking-widest text-emerald-100"
            >
              {successMessage}
            </motion.div>
          )}
        </div>
      </div>

      {/* Confirmation Popup */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md rounded-[2rem] border border-white/20 bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-800 px-8 py-10 text-white"
          >
            <button
              className="absolute right-4 top-4 text-white/60 hover:text-white"
              onClick={() => setConfirmation(null)}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h3 className="text-2xl font-semibold text-center">
              Booking Request Received
            </h3>

            <p className="mt-3 text-center text-sm text-white/70">
              Thank you, {confirmation.name.split(" ")[0]}! We will contact you
              soon.
            </p>

            <div className="mt-6 space-y-4 rounded-2xl bg-white/5 p-5 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Room</span>{" "}
                <span>
                  {rooms.find((r) => r._id === confirmation.roomId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Check-In</span>{" "}
                <span>{confirmation.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Check-Out</span>{" "}
                <span>{confirmation.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Adults</span>{" "}
                <span>{confirmation.adults}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Children</span>{" "}
                <span>{confirmation.children}</span>
              </div>
            </div>

            <button
              className="mt-8 w-full rounded-full bg-white/10 py-4 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-white/20"
              onClick={() => setConfirmation(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
