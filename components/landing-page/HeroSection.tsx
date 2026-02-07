"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";

/* =========================================================
   HERO BANNERS DATA
========================================================= */

const banners = [
  {
    title: "Wedding Flowers & Jaimala",
    image: "/hero-banner/banner-1.png",
    slug: "jaimala",
  },
  {
    title: "Fresh Bouquets for Every Occasion",
    image: "/hero-banner/bouquet_banner.jpg",
    slug: "bouquet",
  },
  {
    title: "Bridal Floral Jewellery",
    image: "/hero-banner/floral_banner.jpg",
    slug: "floral-jewellery",
  },
  {
    title: "Car & Bed Flower Decoration",
    image: "/hero-banner/bed_decor_banner.jpg",
    slug: "car-decoration",
  },
  {
    title: "Custom Flower Orders on WhatsApp",
    image: "/hero-banner/home_banner.jpg",
    slug: "customise-designs",
  },
];

/* =========================================================
   HERO SECTION COMPONENT
========================================================= */

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  /* -------------------------------------------------------
     AUTO SLIDE (EVERY 7 SECONDS)
  -------------------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------------------------------------------
     NAVIGATION HANDLERS
  -------------------------------------------------------- */
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-6">
      {/* OUTER CARD */}
      <div
        className="
          relative
          h-[200px] sm:h-[280px] md:h-[360px]
          rounded-2xl
          border border-pink-200
          overflow-hidden
          px-14
          

        "
      >
        {/* BACKGROUND IMAGE SLIDES */}
        {banners.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              current === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}

        {/* TEXT + CTA */}
        {/* <div className="relative z-20 flex flex-col items-start justify-center h-full text-left
                        px-5 sm:px-6 md:px-8
                        max-w-full sm:max-w-lg md:max-w-xl
                        py-6 sm:py-0
                      "> */}
        <div
          className="
    relative z-20 flex flex-col items-start text-left h-full
    justify-start sm:justify-center
    pt-6 sm:pt-0
    px-4 sm:px-6 md:px-8
    max-w-full sm:max-w-lg md:max-w-xl
  "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl  font-semibold text-white">
            {banners[current].title}
          </h2>

          <p className="text-sm sm:text-base text-white/90 mt-2 ">
            Premium floral arrangements for weddings & special occasions
          </p>

          {/* <div className="mt-5 flex gap-4"> */}
          <div className="mt-4 flex flex-row gap-3 items-center">
            <button
              onClick={() => router.push(`/category/${banners[current].slug}`)}
              //   className="
              //   bg-pink-600 text-white px-5 py-2.5 rounded-full text-sm font-medium
              //   hover:bg-pink-700 transition hover:cursor-pointer"
              // >
              className="
   bg-pink-600 text-white
    px-5 py-2
    rounded-full
    text-sm font-medium
    shadow-sm
    hover:bg-pink-700 transition
    hover:cursor-pointer
  "
            >
              Explore
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              // className="border border-white text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition"
              // >
              className="
   hidden sm:inline-flex
    border border-white
    text-white
    px-4 py-2
    rounded-full
    text-sm font-medium
    hover:bg-white hover:text-gray-900
    transition
  "
            >
              Order through WhatsApp
            </a>
          </div>
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="
            absolute left-4 top-1/2 -translate-y-1/2
            z-30
            bg-white/90
            p-2
            rounded-full
            shadow
            hover:bg-white
            transition
            hover:cursor-pointer
          "
        >
          <ChevronLeft />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            z-30
            bg-white/90
            p-2
            rounded-full
            shadow
            hover:bg-white
            transition
            hover:cursor-pointer
          "
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
