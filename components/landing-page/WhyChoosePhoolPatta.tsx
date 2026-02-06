"use client";

import {
  Flower,
  Truck,
  Store,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Fresh & Handpicked Flowers",
    description:
      "We use premium, fresh flowers crafted daily by expert florists.",
    icon: Flower,
  },
  {
    title: "Same-Day Delivery in Delhi",
    description:
      "Order before 2 PM and get flowers delivered the same day.",
    icon: Truck,
  },
  {
    title: "Trusted Local Florist",
    description:
      "Manoj Florist — serving weddings & events with years of trust.",
    icon: Store,
  },
  {
    title: "Custom Orders on WhatsApp",
    description:
      "Personalised flower designs & wedding decor via WhatsApp.",
    icon: MessageCircle,
  },
];

const WhyChoosePhoolPatta = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Why Choose PhoolPatta
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Trusted flowers. Local expertise. Reliable delivery.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="
                bg-white
                border
                border-gray-100
                rounded-xl
                p-5
                text-center
                hover:shadow-md
                transition
              "
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-50 flex items-center justify-center">
                <Icon className="text-pink-600" size={22} />
              </div>

              <h3 className="text-sm font-medium text-gray-800">
                {item.title}
              </h3>

              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChoosePhoolPatta;
