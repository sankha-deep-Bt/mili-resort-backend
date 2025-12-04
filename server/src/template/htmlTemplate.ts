// export const sendReservationEmail = async (
//   reservation: any,
//   status: string
// ) => {
//   const { _id, room, user, startDate, endDate, adult, children } = reservation;

//   // Build the payment URL only if reservation is not cancelled
//   const paymentUrl =
//     status !== "cancelled"
//       ? `http://localhost:5173/payment?reservationId=${_id}&roomName=${encodeURIComponent(
//           room.name
//         )}&price=${room.price}&startDate=${
//           startDate.toISOString().split("T")[0]
//         }&endDate=${
//           endDate.toISOString().split("T")[0]
//         }&adults=${adult}&children=${children}&email=${encodeURIComponent(
//           user.email
//         )}`
//       : null;

//   let htmlContent = "";

//   if (status === "cancelled") {
//     // Cancelled reservation email
//     htmlContent = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
//         <h2 style="color: #b91c1c;">Hello ${user.name},</h2>
//         <p>Your reservation for <strong>${
//           room.roomId
//         }</strong> has been <strong style="color: #b91c1c;">Rejected</strong>.</p>
//         <p>
//           <strong>Check-in:</strong> ${
//             startDate.toISOString().split("T")[0]
//           } <br/>
//           <strong>Check-out:</strong> ${
//             endDate.toISOString().split("T")[0]
//           } <br/>
//           <strong>Guests:</strong> ${adult} adult(s), ${children} children
//         </p>
//         <p style="margin-top: 20px; color: #555;">We are sorry to inform you that your reservation has been <strong style="color: #b91c1c;">Rejected</strong>. If you have any questions, please contact our support.</p>
//       </div>
//     `;
//   } else {
//     // Active reservation / payment pending email
//     htmlContent = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
//         <h2 style="color: #5b21b6;">Hello ${user.name},</h2>
//         <p>Your reservation for <strong>${
//           room.name
//         }</strong> has been created.</p>
//         <p>
//           <strong>Check-in:</strong> ${
//             startDate.toISOString().split("T")[0]
//           } <br/>
//           <strong>Check-out:</strong> ${
//             endDate.toISOString().split("T")[0]
//           } <br/>
//           <strong>Guests:</strong> ${adult} adult(s), ${children} children <br/>
//           <strong>Price per night:</strong> ₹${room.price} <br/>
//           <strong>Total Nights:</strong> ${
//             (new Date(endDate).getTime() - new Date(startDate).getTime()) /
//             (1000 * 60 * 60 * 24)
//           } <br/>
//           <strong>Total Amount:</strong> ₹${
//             room.price *
//             ((new Date(endDate).getTime() - new Date(startDate).getTime()) /
//               (1000 * 60 * 60 * 24))
//           }
//         </p>
//         <p style="margin-top: 20px;">
//           <a href="${paymentUrl}" style="display: inline-block; padding: 12px 20px; background-color: #5b21b6; color: #fff; text-decoration: none; border-radius: 6px;">
//             Complete Your Payment
//           </a>
//         </p>
//         <p style="margin-top: 20px; color: #555;">If you did not make this reservation, please ignore this email.</p>
//       </div>
//     `;
//   }

//   return htmlContent;
// };

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

  // -----------------------------
  // 3. PAYMENT URL (NO CHANGE IN FRONTEND)
  // -----------------------------
  const paymentUrl =
    status !== "cancelled" && status !== "rejected"
      ? `http://localhost:5173/payment?reservationId=${_id}&roomName=${encodeURIComponent(
          RoomName
        )}&price=${totalPricePerNight}&startDate=${
          startDate.toISOString().split("T")[0]
        }&endDate=${endDate.toISOString().split("T")[0]}`
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
        <p>Your reservation (ID: <strong>${_id}</strong>) has been <strong style="color: #b91c1c;">${status.toUpperCase()}</strong>.</p>

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
  } else {
    // Active reservation (pending payment or approved) email
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #5b21b6;">Hello ${user.name},</h2>
        <p>Your reservation (ID: <strong>${_id}</strong>) has been successfully created. Please complete your payment to confirm your booking.</p>

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
  }

  return htmlContent;
};

// export const sendReservationEmail = async (reservation: any) => {
//   const {
//     _id,
//     rooms,
//     user,
//     startDate,
//     endDate,
//     adult,
//     children,
//     notes,
//     food,
//     status,
//   } = reservation;

//   // -----------------------------
//   // 1. TOTAL PRICE PER NIGHT
//   // -----------------------------
//   const totalPricePerNight = rooms.reduce((sum: number, room: any) => {
//     return sum + room.price * (room.quantity || 1);
//   }, 0);

//   // -----------------------------
//   // 2. FIRST ROOM NAME (FOR URL)
//   // -----------------------------
//   const firstRoomName = rooms[0]?.name || "Rooms Selected";

//   // -----------------------------
//   // 3. PAYMENT URL (NO CHANGE IN FRONTEND)
//   // -----------------------------
//   const paymentUrl =
//     status !== "cancelled" && status !== "rejected"
//       ? `http://localhost:5173/payment?reservationId=${_id}&roomName=${encodeURIComponent(
//           firstRoomName
//         )}&price=${totalPricePerNight}&startDate=${
//           startDate.toISOString().split("T")[0]
//         }&endDate=${endDate.toISOString().split("T")[0]}`
//       : null;

//   // -----------------------------
//   // 4. ROOMS LIST IN EMAIL
//   // -----------------------------
//   const roomsHtml = rooms
//     .map(
//       (room: any) => `
//       <li style="margin-bottom: 8px;">
//         <strong>${room.name}</strong>
//         (₹${room.price} × ${room.quantity || 1})
//       </li>
//     `
//     )
//     .join("");

//   // -----------------------------
//   // 5. COMPLETE EMAIL TEMPLATE
//   // -----------------------------
//   const htmlContent = `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//       <h2 style="color:#333;">Reservation Details</h2>

//       <p><strong>Reservation ID:</strong> ${_id}</p>

//       <h3>Guest Information</h3>
//       <p><strong>Name:</strong> ${user?.name}</p>
//       <p><strong>Email:</strong> ${user?.email}</p>
//       <p><strong>Phone:</strong> ${user?.phoneNumber}</p>

//       <h3>Stay Information</h3>
//       <p><strong>Check-in:</strong> ${startDate.toISOString().split("T")[0]}</p>
//       <p><strong>Check-out:</strong> ${endDate.toISOString().split("T")[0]}</p>
//       <p><strong>Guests:</strong> ${adult} Adults, ${children} Children</p>

//       <h3>Rooms Booked</h3>
//       <ul>
//         ${roomsHtml}
//       </ul>

//       <h3>Price Summary</h3>
//       <p><strong>Total Price Per Night:</strong> ₹${totalPricePerNight}</p>

//       ${
//         food && food.length > 0
//           ? `<p><strong>Food Preference:</strong> ${food.join(", ")}</p>`
//           : ""
//       }

//       ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}

//       <h3>Status: ${status.toUpperCase()}</h3>

//       ${
//         paymentUrl
//           ? `
//         <a href="${paymentUrl}"
//            style="display:inline-block;
//                   background:#007bff;
//                   color:#fff;
//                   padding:12px 20px;
//                   text-decoration:none;
//                   border-radius:5px;
//                   margin-top:20px;">
//             Complete Payment
//         </a>
//       `
//           : `<p style="color:red;">This reservation is ${status}.</p>`
//       }
//     </div>
//   `;

//   return htmlContent;
// };
