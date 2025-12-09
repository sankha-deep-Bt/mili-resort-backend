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
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [priceLabel, setPriceLabel] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaHref, setCtaHref] = useState("");

  // Fetch offers
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/latest-offers"
      );
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

  // Create Offer
  const handleCreateOffer = async () => {
    if (!title || !description || !priceLabel || !ctaLabel || !ctaHref) {
      toast.error("Please fill all fields");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile); // FILE
    formData.append("priceLabel", priceLabel);
    formData.append("ctaLabel", ctaLabel);
    formData.append("ctaHref", ctaHref);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/admin/latest-offers/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Offer created!");

      // Reset
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPriceLabel("");
      setCtaLabel("");
      setCtaHref("");

      fetchOffers();
      setActiveSubTab("list");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create offer");
    }
  };

  // Delete Offer
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

            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded-md w-full"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            {imageFile && (
              <p className="text-sm text-green-600">
                Selected: {imageFile.name}
              </p>
            )}

            <Input
              placeholder="Price Label (e.g., 'Flat ₹999')"
              value={priceLabel}
              onChange={(e) => setPriceLabel(e.target.value)}
            />

            <Input
              placeholder="CTA Label (e.g., 'Book Now')"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
            />

            <Input
              placeholder="CTA Link (URL)"
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
            />

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

                    {offer.image && (
                      <img
                        src={`http://localhost:3000/uploads/offers/${offer.image}`}
                        className="w-20 h-20 object-cover rounded mt-2"
                      />
                    )}

                    <p className="text-sm font-bold mt-1">{offer.priceLabel}</p>

                    <p className="text-xs text-stone-500">{offer.ctaHref}</p>
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
