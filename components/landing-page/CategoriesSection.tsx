"use client";

import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "../../utils/constants";



const CategoriesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Our Diverse Categories
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose from our wide range of floral services
        </p>
      </div>

      {/* GRID */}
      <div
        className="
          grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    gap-5
        "
      >
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.slug}
            title={cat.title}
            slug={cat.slug}
            image={cat.image!}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
