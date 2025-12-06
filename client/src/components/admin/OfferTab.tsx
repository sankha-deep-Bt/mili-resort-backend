import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function OfferTab() {
  const [activeSubTab, setActiveSubTab] = useState<"add" | "list">("add");

  // Data
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState<number | "">("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Fetch offers
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/latest-offers"
      );
      // ensure offers is always an array
      setOffers(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load offers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Create offer
  const handleCreateOffer = async () => {
    if (
      !title ||
      !image ||
      !description ||
      !discount ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/admin/latest-offers/add", {
        title,
        image,
        description,
        discount,
        startDate,
        endDate,
      });

      toast.success("Offer added!");

      // Reset fields
      setTitle("");
      setImage("");
      setDescription("");
      setDiscount("");
      setStartDate(null);
      setEndDate(null);

      fetchOffers();
      setActiveSubTab("list");
    } catch (err) {
      toast.error("Failed to create offer");
    }
  };

  // Delete
  const handleDeleteOffer = async (offerId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/admin/latest-offers/${offerId}`
      );
      toast.success("Offer deleted");
      fetchOffers();
    } catch {
      toast.error("Failed to delete offer");
    }
  };

  return (
    <div className="space-y-6">
      {/* SUB TABS */}
      <div className="flex gap-3 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-md ${
            activeSubTab === "add"
              ? "bg-primary text-white"
              : "bg-stone-200 text-stone-700"
          }`}
          onClick={() => setActiveSubTab("add")}
        >
          Add Offer
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            activeSubTab === "list"
              ? "bg-primary text-white"
              : "bg-stone-200 text-stone-700"
          }`}
          onClick={() => setActiveSubTab("list")}
        >
          Existing Offers
        </button>
      </div>

      {/* ADD OFFER FORM */}
      {activeSubTab === "add" && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Add New Offer</CardTitle>
            <CardDescription>Create a promotional offer.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Offer Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <Textarea
              placeholder="Offer Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              placeholder="Discount %"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <p className="text-sm mb-1">Start Date</p>
                <DatePicker
                  selected={startDate}
                  onChange={(d: any) => setStartDate(d)}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="w-1/2">
                <p className="text-sm mb-1">End Date</p>
                <DatePicker
                  selected={endDate}
                  onChange={(d: any) => setEndDate(d)}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <Button className="w-full" onClick={handleCreateOffer}>
              Create Offer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* EXISTING OFFERS */}
      {activeSubTab === "list" && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Existing Offers</CardTitle>
            <CardDescription>Manage, view or delete offers.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : offers.length === 0 ? (
              <p>No offers found.</p>
            ) : (
              offers.map((offer) => (
                <div
                  key={offer._id}
                  className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{offer.title}</h3>
                    <p className="text-sm text-stone-600">
                      {offer.description}
                    </p>

                    <p className="text-xs text-stone-500">
                      {new Date(offer.startDate).toLocaleDateString()} →{" "}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </p>

                    <p className="text-sm font-bold">{offer.discount}% OFF</p>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteOffer(offer._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
