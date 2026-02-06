"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Contact Us
      </h1>

      <p className="text-gray-700 mb-10 max-w-2xl">
        Have questions, need custom flower arrangements, or planning a wedding
        or event? We’re here to help. Reach out to Manoj Florist through the
        details below.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ================= LEFT : CONTACT DETAILS ================= */}
        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start gap-3 text-gray-700">
            <MapPin className="mt-1 text-pink-600" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Manoj+Florist+Harsh+Vihar+Delhi+110034"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              Shop No. 1, Harsh Vihar Gate No-1<br />
              Opposite Maharaja Agrsen Park<br />
              New Delhi – 110034
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="text-pink-600" />
            <a
              href="tel:+916200040974"
              className="hover:text-pink-600 transition"
            >
              +91 62000 40974
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-pink-600" />
            <a
              href="mailto:phoolpattta@gmail.com"
              className="hover:text-pink-600 transition"
            >
              phoolpattta@gmail.com
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="text-pink-600" />
            <span>Open: 8:00 AM – 10:00 PM (All days)</span>
          </div>
        </div>

        {/* ================= RIGHT : CONTACT FORM ================= */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded px-3 py-2"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border rounded px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            For urgent orders or same-day delivery, please call us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
