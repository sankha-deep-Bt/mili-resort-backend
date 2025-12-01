export type GallerySeedItem = {
  title: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
};

export const GALLERY_SHOWCASE: Array<GallerySeedItem> = [
  {
    title: "Moonlit Courtyard Celebrations",
    description:
      "Nestled amid foliage, the signature garden suites glow gently, promising privacy with postcard-ready views.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/55c6d42a-d8fc-46a3-9cef-685ad162154d",
    displayOrder: 1,
  },
  {
    title: "Villa Facades in Full Glow",
    description:
      "Marigold blooms frame the promenade, guiding guests from villas to experience zones with a burst of color.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/8c93def8-7687-4c98-86be-a6d50fa85717",
    displayOrder: 2,
  },
  {
    title: "Intimate Lawn Gatherings",
    description:
      "A hand-painted Buddha mural anchors the garden stage, creating a meditative backdrop for cultural performances.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/ffbbd7e4-5dfc-49cf-854b-84493d0d6e19",
    displayOrder: 3,
  },
  {
    title: "Bodhi Wall of Serenity",
    description:
      "The central lawn hosts cozy winter soirées, complete with artisanal food counters and fireside conversations.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/0aae04a8-16bc-4ca5-b330-963e8a9176dc",
    displayOrder: 4,
  },
  {
    title: "Bloom-Lined Promenade",
    description:
      "Every cottage block shines in synchronized illumination, highlighting the architectural symmetry that lines the pool.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/de6ddfa2-a4f4-4139-80d3-3e0f373a13b5",
    displayOrder: 5,
  },
  {
    title: "Garden Suites by Night",
    description:
      "Festoon lights, live music, and curated seating turn the main courtyard into Mili Resorts' most romantic social setting.",
    imageUrl:
      "https://harmless-tapir-303.convex.cloud/api/storage/b10ce60c-97da-4db8-a62c-92d965c94912",
    displayOrder: 6,
  },
] as const;
