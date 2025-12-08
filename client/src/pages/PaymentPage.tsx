import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);

  const params = new URLSearchParams(window.location.search);
  const reservationId = params.get("reservationId");
  const roomName = params.get("roomName");
  const price = Number(params.get("price"));
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const guests = Number(params.get("guests"));
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reservationId) {
        setError("Missing reservation ID");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/reservation/${reservationId}`
        );

        if (!res.data) {
          setError("Reservation does not exist");
          setLoading(false);
          return;
        }
        if (res.data.message === "Reservation not found") {
          setError("Reservation does not exist");
        }

        const reservationData = res.data;
        setReservation(reservationData);

        if (reservationData.paid) {
          setError("This reservation is already paid.");
          setLoading(false);
          return;
        }

        // Create Razorpay order only if not paid
        await createOrder();
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reservation details");
        console.error(error);

        setLoading(false);
      }
    };

    fetchReservation();
  }, [reservationId]);

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
      toast.error("Failed to load payment. Try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reservationId) {
      toast.error("Missing reservation details");
      return;
    }
    createOrder();
  }, []);

  const handlePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
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
            toast.success("Payment successful!");
            window.location.href = "/success";
          } else {
            toast.error("Payment verification failed");
          }
        } catch (err) {
          toast.error("Error verifying payment");
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
  if (error)
    return (
      <p className="p-10 text-center text-red-600 font-semibold text-lg">
        {error}
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
            <div className="p-3 rounded-lg bg-stone-50 border">
              <p className="text-sm text-stone-500">Charges</p>
              <p className="text-lg font-bold">
                {amount > 10000 ? "10%" : "5%"}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border">
              <p className="text-sm text-stone-500">Guests</p>
              <p className="text-lg font-bold">{guests}</p>
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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// interface Reservation {
//   _id: string;
//   roomName: string;
//   price: number;
//   startDate: string;
//   endDate: string;
//   guests: number;
//   paid: boolean;
// }

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [reservation, setReservation] = useState<Reservation | null>(null);
//   const [order, setOrder] = useState<any>(null);
//   const [error, setError] = useState<string>("");

//   const params = new URLSearchParams(window.location.search);
//   const reservationId = params.get("reservationId");

//   useEffect(() => {
//     const fetchReservation = async () => {
//       if (!reservationId) {
//         setError("Missing reservation ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/v1/reservation/${reservationId}`
//         );

//         if (!res.data) {
//           setError("Reservation does not exist");
//           setLoading(false);
//           return;
//         }

//         const reservationData: Reservation = res.data;
//         setReservation(reservationData);

//         if (reservationData.paid) {
//           setError("This reservation is already paid.");
//           setLoading(false);
//           return;
//         }

//         // Create Razorpay order only if not paid
//         await createOrder(reservationId);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch reservation details");
//         setLoading(false);
//       }
//     };

//     fetchReservation();
//   }, [reservationId]);

//   const days = reservation
//     ? Math.max(
//         1,
//         (new Date(reservation.endDate).getTime() -
//           new Date(reservation.startDate).getTime()) /
//           (1000 * 60 * 60 * 24)
//       )
//     : 1;

//   const amount = reservation ? reservation.price * days : 0;

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const createOrder = async (reservationId: string) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/v1/payment/create-order",
//         { reservationId }
//       );
//       setOrder(res.data.order);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load payment. Try again.");
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     if (!order) return;

//     const loaded = await loadRazorpay();
//     if (!loaded) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: "INR",
//       name: "Mili's Resort",
//       description: `Payment for ${reservation?.roomName}`,
//       order_id: order.id,
//       handler: async (response: any) => {
//         try {
//           const verifyRes = await axios.post(
//             "http://localhost:3000/api/v1/payment/verify",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               reservationId,
//             }
//           );

//           if (verifyRes.data.success) {
//             toast.success("Payment successful!");
//             window.location.href = "/success";
//           } else {
//             toast.error("Payment verification failed");
//           }
//         } catch (err) {
//           toast.error("Error verifying payment");
//         }
//       },
//       theme: { color: "#6D28D9" },
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };

//   if (loading)
//     return (
//       <p className="p-10 text-center text-stone-600 animate-pulse text-lg">
//         Loading payment details...
//       </p>
//     );

//   if (error)
//     return (
//       <p className="p-10 text-center text-red-600 font-semibold text-lg">
//         {error}
//       </p>
//     );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-stone-100 p-6">
//       <div className="w-full max-w-xl backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl border border-white/50 p-8 space-y-6">
//         <div className="text-center">
//           <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide mb-1">
//             Complete Your Payment
//           </h1>
//           <p className="text-stone-600 text-sm">
//             Secure checkout powered by Razorpay
//           </p>
//         </div>

//         <div className="p-5 rounded-xl border shadow-inner bg-white">
//           <div className="space-y-1">
//             <p className="text-xl font-semibold">{reservation?.roomName}</p>
//             <p className="text-sm text-stone-600">
//               {reservation?.startDate} → {reservation?.endDate}
//             </p>
//           </div>

//           <div className="mt-4 grid grid-cols-2 gap-3">
//             <div className="p-3 rounded-lg bg-stone-50 border">
//               <p className="text-sm text-stone-500">Price/night</p>
//               <p className="text-lg font-bold">₹{reservation?.price}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-stone-50 border">
//               <p className="text-sm text-stone-500">Nights</p>
//               <p className="text-lg font-bold">{days}</p>
//             </div>
//             <div className="p-3 rounded-lg bg-stone-50 border">
//               <p className="text-sm text-stone-500">Guests</p>
//               <p className="text-lg font-bold">{reservation?.guests}</p>
//             </div>
//           </div>

//           <hr className="my-4" />

//           <div className="flex justify-between text-lg font-semibold">
//             <span>Total Amount</span>
//             <span className="text-purple-700">₹{amount}</span>
//           </div>
//         </div>

//         <button
//           onClick={handlePayment}
//           className="w-full py-3 text-lg font-semibold rounded-xl bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all active:scale-[0.98]"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
