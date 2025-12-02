export const sendReservationEmail = async (
  reservation: any,
  status: string
) => {
  const { _id, room, user, startDate, endDate, adult, children } = reservation;

  // Build the payment URL only if reservation is not cancelled
  const paymentUrl =
    status !== "cancelled"
      ? `http://localhost:5173/payment?reservationId=${_id}&roomName=${encodeURIComponent(
          room.name
        )}&price=${room.price}&startDate=${
          startDate.toISOString().split("T")[0]
        }&endDate=${
          endDate.toISOString().split("T")[0]
        }&adults=${adult}&children=${children}&email=${encodeURIComponent(
          user.email
        )}`
      : null;

  let htmlContent = "";

  if (status === "cancelled") {
    // Cancelled reservation email
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #b91c1c;">Hello ${user.name},</h2>
        <p>Your reservation for <strong>${
          room.name
        }</strong> has been <strong style="color: #b91c1c;">Rejected</strong>.</p>
        <p>
          <strong>Check-in:</strong> ${
            startDate.toISOString().split("T")[0]
          } <br/>
          <strong>Check-out:</strong> ${
            endDate.toISOString().split("T")[0]
          } <br/>
          <strong>Guests:</strong> ${adult} adult(s), ${children} children
        </p>
        <p style="margin-top: 20px; color: #555;">We are sorry to inform you that your reservation has been <strong style="color: #b91c1c;">Rejected</strong>. If you have any questions, please contact our support.</p>
      </div>
    `;
  } else {
    // Active reservation / payment pending email
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #5b21b6;">Hello ${user.name},</h2>
        <p>Your reservation for <strong>${
          room.name
        }</strong> has been created.</p>
        <p>
          <strong>Check-in:</strong> ${
            startDate.toISOString().split("T")[0]
          } <br/>
          <strong>Check-out:</strong> ${
            endDate.toISOString().split("T")[0]
          } <br/>
          <strong>Guests:</strong> ${adult} adult(s), ${children} children <br/>
          <strong>Price per night:</strong> ₹${room.price} <br/>
          <strong>Total Nights:</strong> ${
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
          } <br/>
          <strong>Total Amount:</strong> ₹${
            room.price *
            ((new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24))
          }
        </p>
        <p style="margin-top: 20px;">
          <a href="${paymentUrl}" style="display: inline-block; padding: 12px 20px; background-color: #5b21b6; color: #fff; text-decoration: none; border-radius: 6px;">
            Complete Your Payment
          </a>
        </p>
        <p style="margin-top: 20px; color: #555;">If you did not make this reservation, please ignore this email.</p>
      </div>
    `;
  }

  return htmlContent;
};
