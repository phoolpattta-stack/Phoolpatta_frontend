// src/utils/constants.ts


export const WHATSAPP_PHONE_NUMBER: string =
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");




export type Category = {
  name: string;        // for header / simple lists
  title: string;       // for category section
  slug: string;
  image?: string;      // optional (header doesn’t need it)
};

export const CATEGORIES: Category[] = [
  {
    name: "Jaimala",
    title: "Jaimala",
    slug: "jaimala",
    image: "/categories_poster/jaimala2.jpg",
  },
  {
    name: "Bouquet",
    title: "Bouquets",
    slug: "bouquet",
    image: "/categories_poster/bouquet.jpg",
  },
  {
    name: "Floral Jewellery",
    title: "Floral Jewellery",
    slug: "floral-jewellery",
    image: "/categories_poster/floral-jewellery.png",
  },
  {
    name: "Car Decoration",
    title: "Car Decoration",
    slug: "car-decoration",
    image: "/categories_poster/car-decoration.png",
  },
  {
    name: "Bed Decoration",
    title: "Bed Decoration",
    slug: "bed-decoration",
    image: "/categories_poster/bed-decoration.png",
  },
  {
    name: "Bridal Chunni",
    title: "Bridal Chunni",
    slug: "bridal-chunni",
    image: "/categories_poster/bridal-chunni.png",
  },
  {
    name: "Bride Chaddar",
    title: "Bride Chaddar",
    slug: "bride-chaddar",
    image: "/categories_poster/bride-chaddar.png",
  },
  {
    name: "Home Decoration",
    title: "Home Decoration",
    slug: "home-decoration",
    image: "/categories_poster/home-decoration.jpg",
  },
  {
    name: "Guruji Event Decoration",
    title: "Guruji Event Decoration",
    slug: "guruji-event-decoration",
    image: "/categories_poster/guruji-decoration.png",
  },
  {
    name: "Customise Designs",
    title: "Custom Designs",
    slug: "customise-designs",
    // slug:"Flowers",
    image: "/categories_poster/custom.jpg",
  },
//   {
//     name: "Flower",
//     title: "Flower",
//     slug: "flower",
//     image: "/categories_poster/flower.jpg",
//   },
];

