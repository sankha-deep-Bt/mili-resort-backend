// import { Request, Response } from "express";
// import crypto from "crypto";
// import razorpay from "../config/razorpay";

// import { updateReservation } from "../services/user.service";

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { amount, currency = "INR", receipt } = req.body;

//     if (!amount) {
//       return res.status(400).json({ message: "Amount is required" });
//     }

//     const options = {
//       amount: amount * 100, // convert to paise
//       currency,
//       receipt: receipt || `rcpt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error: any) {
//     console.error("Order creation error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not create order",
//     });
//   }
// };

// export const verifyPayment = async (req: Request, res: Response) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       reservationId,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ message: "Missing payment details" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//       .update(body)
//       .digest("hex");

//     const isValid = expectedSignature === razorpay_signature;

//     if (!isValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid payment signature" });
//     }

//     // OPTIONAL — if you want to update reservation status
//     if (reservationId) {
//       await updateReservation(reservationId, {
//         paymentStatus: "paid",
//         paymentId: razorpay_payment_id,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };
