"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/modules/products/services/product.api";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
};

const TestProductsPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 🔥 CHANGE THIS TO TEST FILTER
        const res = await getAllProducts({
          category: "flower", // try "Flowers" also
        });

        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Test Product Listing
      </h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p._id}
              onClick={() =>
                router.push(`/product/test-${p._id}`)
              }
              className="border p-3 rounded cursor-pointer hover:bg-gray-50"
            >
              <p><b>Name:</b> {p.name}</p>
              <p><b>Category:</b> {p.category}</p>
              <p><b>Price:</b> ₹{p.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestProductsPage;
