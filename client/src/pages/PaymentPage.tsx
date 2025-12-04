import { useEffect, useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  const params = new URLSearchParams(window.location.search);
  const reservationId = params.get("reservationId");
  const roomName = params.get("roomName");
  const price = Number(params.get("price"));
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");

  const days =
    Math.max(
      1,
      (new Date(endDate!).getTime() - new Date(startDate!).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const amount = price * days;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/payment/create-order",
        { reservationId }
      );

      setOrder(res.data.order);
      setLoading(false);
    } catch (err) {
      alert("Failed to load payment. Try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reservationId) {
      alert("Missing reservation details");
      return;
    }
    createOrder();
  }, []);

  const handlePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Mili's Resort",
      description: `Payment for ${roomName}`,
      order_id: order.id,
      handler: async (response: any) => {
        try {
          const verifyRes = await axios.post(
            "http://localhost:3000/api/v1/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              reservationId,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment successful!");
            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          alert("Error verifying payment");
        }
      },
      theme: { color: "#6D28D9" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  if (loading)
    return (
      <p className="p-10 text-center text-stone-600 animate-pulse text-lg">
        Loading payment details...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-stone-100 p-6">
      <div className="w-full max-w-xl backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl border border-white/50 p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide mb-1">
            Complete Your Payment
          </h1>
          <p className="text-stone-600 text-sm">
            Secure checkout powered by Razorpay
          </p>
        </div>

        {/* Details card */}
        <div className="p-5 rounded-xl border shadow-inner bg-white">
          <div className="space-y-1">
            <p className="text-xl font-semibold">{roomName}</p>
            <p className="text-sm text-stone-600">
              {startDate} → {endDate}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-stone-50 border">
              <p className="text-sm text-stone-500">Price/night</p>
              <p className="text-lg font-bold">₹{price}</p>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border">
              <p className="text-sm text-stone-500">Nights</p>
              <p className="text-lg font-bold">{days}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span className="text-purple-700">₹{amount}</span>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handlePayment}
          className="w-full py-3 text-lg font-semibold rounded-xl bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all active:scale-[0.98]"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
