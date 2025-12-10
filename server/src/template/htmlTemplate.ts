import { CLIENT_URL } from "../config/env";

export const sendReservationEmail = async (
  reservation: any,
  status: string
) => {
  // Destructure top-level properties. 'room' is replaced by 'rooms'.
  const { _id, rooms, user, startDate, endDate, adult, children, notes, food } =
    reservation;

  // -----------------------------
  // 1. TOTAL PRICE PER NIGHT
  // -----------------------------
  const totalPricePerNight = rooms.reduce((sum: number, room: any) => {
    return sum + room.price * (room.quantity || 1);
  }, 0);

  // -----------------------------
  // 2. FIRST ROOM NAME (FOR URL)
  // -----------------------------
  const RoomName =
    rooms.map((room: any) => room.name).join(", ") || "Rooms Selected";
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const guests = Number(adult) + Number(children);

  // -----------------------------
  // 3. PAYMENT URL (NO CHANGE IN FRONTEND)
  // -----------------------------
  const paymentUrl =
    status !== "cancelled" && status !== "rejected"
      ? `${CLIENT_URL}/payment?reservationId=${_id}&roomName=${encodeURIComponent(
          RoomName
        )}&price=${totalPricePerNight}&startDate=${
          startDate.toISOString().split("T")[0]
        }&endDate=${endDate.toISOString().split("T")[0]}&guests=${guests}`
      : null;

  // -----------------------------
  // 4. ROOMS LIST IN EMAIL
  // -----------------------------
  const roomsHtml = rooms
    .map(
      (room: any) => `
      <li style="margin-bottom: 8px;">
        <strong>${room.name}</strong>  
        (₹${room.price} × ${room.quantity || 1})  
      </li>
    `
    )
    .join("");

  let htmlContent = "";

  if (status === "cancelled" || status === "rejected") {
    // Cancelled or Rejected reservation email
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #b91c1c;">Hello ${user.name},</h2>
        <p>Your reservation has been <strong style="color: #b91c1c;">${status.toUpperCase()}</strong>.</p>

        <h3>Reservation Details</h3>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Check-in:</strong> ${start}</li>
            <li><strong>Check-out:</strong> ${end}</li>
            <li><strong>Guests:</strong> ${adult} adult(s), ${children} child(ren)</li>
        </ul>

        <h4>Booked Rooms:</h4>
        <ul style="list-style: disc; margin-left: 20px;">
            ${roomsHtml}
        </ul>

        <p style="margin-top: 20px; color: #555;">We are sorry to inform you that your reservation has been ${status}. If you have any questions, please contact our support.</p>
      </div>
    `;
  } else if (status === "approved") {
    // Active reservation (pending payment or approved) email
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #5b21b6;">Hello ${user.name},</h2>
        <p>Your reservation has been successfully created. Please complete your payment to confirm your booking.</p>

        <h3>Reservation Details</h3>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Check-in:</strong> ${start}</li>
            <li><strong>Check-out:</strong> ${end}</li>
            <li><strong>Guests:</strong> ${adult} adult(s), ${children} child(ren)</li>
            <li><strong>Total Amount Due:</strong> <strong style="color: #5b21b6;">₹${totalPricePerNight.toLocaleString()}</strong></li>
        </ul>

        <h4>Booked Rooms:</h4>
        <ul style="list-style: disc; margin-left: 20px;">
            ${roomsHtml}
        </ul>

        ${
          paymentUrl
            ? `
          <p style="margin-top: 30px; text-align: center;">
            <a href="${paymentUrl}" style="display: inline-block; padding: 12px 20px; background-color: #5b21b6; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Complete Your Payment
            </a>
          </p>
        `
            : ""
        }

        <p style="margin-top: 20px; color: #555;">If you did not make this reservation, please ignore this email.</p>
      </div>
    `;
  } else if (status === "checked-in") {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #15803d;">Welcome, ${user.name}!</h2>

        <p>We are excited to let you know that your check-in at <strong>Mili's Resort</strong> has been successfully completed.</p>

        <h3>Your Stay Details</h3>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Check-in:</strong> ${start}</li>
            <li><strong>Check-out:</strong> ${end}</li>
            <li><strong>Guests:</strong> ${adult} adult(s), ${children} child(ren)</li>
            <li><strong>Total Price Per Night:</strong> ₹${totalPricePerNight.toLocaleString()}</li>
        </ul>

        <h4>Your Room(s)</h4>
        <ul style="list-style: disc; margin-left: 20px;">
          ${roomsHtml}
        </ul>

        ${
          notes
            ? `<p style="margin-top: 12px;"><strong>Notes:</strong> ${notes}</p>`
            : ""
        }

        ${
          food && food.length > 0
            ? `<p><strong>Selected Food Options:</strong> ${food.join(
                ", "
              )}</p>`
            : ""
        }

        <p style="margin-top: 20px; color: #555;">
          If you need anything during your stay, feel free to contact our front desk.  
          We hope you have a wonderful and relaxing experience with us!
        </p>

        <p style="margin-top: 30px; font-weight: bold; color: #15803d;">
          Enjoy your stay! 🌿
        </p>
      </div>
    `;
  }

  return htmlContent;
};
