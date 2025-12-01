// import { ROOM_SHOWCASE } from "./roomShowcase";

// export type RoomPriceEntry = {
//   name: string;
//   price: number;
// };

// export const ROOM_PRICE_PRESETS: RoomPriceEntry[] = ROOM_SHOWCASE.map(
//   ({ name, price }: { name: string; price: number }) => ({
//     name,
//     price,
//   })
// );

// export const ROOM_PRICE_MAP = ROOM_PRICE_PRESETS.reduce<Record<string, number>>(
//   (acc, entry) => {
//     acc[entry.name] = entry.price;
//     return acc;
//   },
//   {}
// );

// export const DEFAULT_ROOM_NAME =
//   ROOM_PRICE_PRESETS[0]?.name ?? "Ground Floor Deluxe Room";
