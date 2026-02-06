"use client";

const AboutUsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        About PhoolPatta
      </h1>

      {/* Intro */}
      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>PhoolPatta</strong> is the online extension of{" "}
        <strong>Manoj Florist</strong>, a trusted local flower shop based in
        Delhi. We bring the same freshness, craftsmanship, and personal care
        from our physical store directly to your doorstep.
      </p>

      <p className="text-gray-700 leading-relaxed mb-10">
        Flowers are an important part of every celebration. From weddings to
        special moments at home, our handcrafted floral arrangements are
        designed to make your occasions memorable.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>🌸 Fresh flower bouquets</li>
            <li>💍 Wedding jaimala & garlands</li>
            <li>🚗 Car & bed decoration</li>
            <li>🏠 Home & event floral décor</li>
            <li>🎉 Custom flower arrangements</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Trusted local florist in Delhi</li>
            <li>🚚 Same-day delivery across Delhi</li>
            <li>🌼 Premium quality & fresh flowers</li>
            <li>👨‍🌾 Personalized service</li>
            <li>📍 Physical shop with online convenience</li>
          </ul>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-20 bg-gray-50 border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Our Promise
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We promise freshness, timely delivery, and honest service — just like
          a neighborhood florist, now available online through PhoolPatta.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
