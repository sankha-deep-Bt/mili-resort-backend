import { Request, Response } from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay";
import { findReservation, updateReservation } from "../services/user.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.body;
    const currency = "INR";

    const reservation = await findReservation(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (!reservation.room || !reservation.room.price) {
      return res.status(400).json({ message: "Room price missing" });
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    // ensure minimum 1 night
    const days = Math.max(
      1,
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const amount = reservation.room.price * days;

    const options = {
      amount: amount * 100,
      currency,
      receipt: `rcpt_${reservationId}_${Date.now()}`.slice(0, 40),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      amount,
      days,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not create order",
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      reservationId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Missing RAZORPAY_KEY_SECRET in env");
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    if (reservationId) {
      await updateReservation(reservationId, {
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
