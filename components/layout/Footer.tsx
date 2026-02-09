"use client";

import { Truck, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      {/* ================= TOP TRUST BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Truck className="text-pink-600" />
          <h4 className="font-semibold text-gray-800">
            Free Delivery in Delhi
          </h4>
          <p className="text-sm text-gray-600">
            Same-day & scheduled flower delivery across Delhi
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <MapPin className="text-pink-600" />
          <h4 className="font-semibold text-gray-800">Trusted Local Florist</h4>
          <p className="text-sm text-gray-600">
            Serving weddings, events & home decoration
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <Truck className="text-pink-600" />
          <h4 className="font-semibold text-gray-800">
            Fresh Flowers Guaranteed
          </h4>
          <p className="text-sm text-gray-600">
            Handcrafted arrangements with premium flowers
          </p>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-sm">
          {/* ================= BRAND ================= */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo_bg.png"
                alt="PhoolPatta"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold text-pink-600">
                PhoolPatta
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-1">
              Manoj Florist is a trusted local flower shop in Delhi.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Now available online through PhoolPatta, serving customers with
              premium flowers, jaimala, and wedding decorations.
            </p>

            <p className="text-xs text-gray-500">
              Local shop • Personal service • Online convenience
            </p>
          </div>

          {/* ================= FLOWER CATEGORIES ================= */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-4">
              Flower Categories
            </h5>
            {/* <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/category/jaimala" className="hover:text-pink-600">
                  Jaimala
                </Link>
              </li>
              <li>
                <Link
                  href="/category/floral-jewellery"
                  className="hover:text-pink-600"
                >
                  Floral Jewellery
                </Link>
              </li>
              <li>
                <Link href="/category/bouquet" className="hover:text-pink-600">
                  Bouquets
                </Link>
              </li>
              <li>
                <Link
                  href="/category/car-decoration"
                  className="hover:text-pink-600"
                >
                  Car Decoration
                </Link>
              </li>
              <li>
                <Link
                  href="/category/bed-decoration"
                  className="hover:text-pink-600"
                >
                  Bed Decoration
                </Link>
              </li>
            </ul> */}
            {/* <ul className="space-y-2 text-gray-600">
    <li>Rose (All Colors)</li>
    <li>Gerbera (Seasonal)</li>
    <li>Carnation (Seasonal)</li>
    <li>Lily (Seasonal)</li>
    <li>Orchid (On Demand)</li>
    <li>Anthurium</li>
    <li>Gladiolus</li>
    <li>Marigold (Genda)</li>
    <li>Sunflower (Surajmukhi)</li>
    <li>Desi Gulab</li>
    <li>Tuberose (Rajnigandha)</li>
    <li>Jasmine (Mogra)</li>
    <li>Lotus (Kamal)</li>
    <li>Daisy</li>
    <li>Artificial Flowers</li>
  </ul> */}
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
  <li>Rose</li>
<li>Lily</li>
<li>Orchid</li>
<li>Daisy</li>
<li>Lotus</li>
<li>Gerbera</li>
<li>Carnation</li>
<li>Marigold</li>
<li>Sunflower</li>


<li>Jasmine</li>
<li>Tuberose</li>

<li>Anthurium</li>
<li>Gladiolus</li>
<li>Desi Gulab</li>

  {/* <li>Artificial Flowers</li> */}
</ul>


          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-4">Our Services</h5>
            <ul className="space-y-2 text-gray-600">
              <li>Wedding Decoration</li>
              <li>Jaimala & Garlands</li>
              <li>Car & Bed Decoration</li>
              <li>Home & Event Decor</li>
              <li>Custom Flower Orders</li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h5 className="font-semibold text-gray-800 mb-4">
              Contact Manoj Florist
            </h5>

            {/* Address */}
            <div className="flex items-start gap-3 text-gray-600 mb-3 leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Manoj+Florist+Harsh+Vihar+Delhi+110034"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition"
              >
                Shop No. 1, Harsh Vihar Gate No-1
                <br />
                Opposite Maharaja Agrsen Park
                <br />
                New Delhi – 110034
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-gray-600 mb-2">
              <Phone size={16} className="shrink-0" />
              <a
                href="tel:+916200040974"
                className="hover:text-pink-600 transition"
              >
                +91 62000 40974
              </a>
            </div>

            {/* Email */}
            {/* <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} className="shrink-0" />
              <a
                href="mailto:phoolpattta@gmail.com"
                className="hover:text-pink-600 transition"
              >
                phoolpattta@gmail.com
              </a>
            </div> */}
            <div className="flex items-center gap-3 text-gray-600 min-w-0">
              <Mail size={16} className="shrink-0" />

              <a
                href="mailto:phoolpattta@gmail.com"
                className="hover:text-pink-600 transition break-all"
              >
                phoolpattta@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-700">
        <p>🇮🇳 Proudly Made in India</p>
        <p>
          © {new Date().getFullYear()} Manoj Florist • Powered by PhoolPatta
        </p>
      </div>
    </footer>
  );
};

export default Footer;
