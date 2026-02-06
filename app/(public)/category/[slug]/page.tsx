"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/landing-page/ProductCard";
import { getAllProducts } from "@/modules/products/services/product.api";

type Product = {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isActive: boolean;
};

const CategoryPage = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllProducts({
          category: slug as string,
        });

        const activeProducts = (res.data.products || []).filter(
          (product: Product) => product.isActive === true,
        );

        // setProducts(res.data.products || []);
        setProducts(activeProducts);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* CATEGORY TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800 capitalize mb-6">
        {slug?.toString().replace(/-/g, " ")}
      </h1>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4
          "
        >
          {products.map((product) => {
            // SEO-friendly slug
            const productSlug = product.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            return (
              <div
                key={product._id}
                onClick={() =>
                  router.push(`/product/${productSlug}-${product._id}`)
                }
                className="cursor-pointer"
              >
                <ProductCard
                  name={product.name}
                  price={product.price}
                  images={product.images}
                  discount={product.discount}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
