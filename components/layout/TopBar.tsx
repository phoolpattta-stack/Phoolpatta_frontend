"use client";

import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="w-full bg-pink-600 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-2 text-center">
        {/* DELIVERY TEXT */}
        <span className="font-medium">🚚 Same Day Delivery in Delhi</span>

        {/* SEPARATOR */}
        <span className="hidden sm:inline">|</span>

        {/* OFFER TEXT */}
        {/* <span>🎉 Valentine's Week Offer • Custom Flower Orders Available</span>
        <span className="hidden sm:inline">|</span> */}

        <span className="font-medium">
          🎁 Launch Offer: Use code <strong>PHOOL10</strong> & get 10% OFF
        </span>

        {/* SEPARATOR */}
        <span className="hidden sm:inline">|</span>

        {/* WHATSAPP CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hi%20PhoolPatta%2C%20I%20want%20to%20place%20a%20custom%20flower%20order`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 underline font-medium hover:opacity-90"
        >
          <Image
            src="/icons/whatsapp-icon-green.svg"
            alt="WhatsApp"
            width={16}
            height={16}
          />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default TopBar;
