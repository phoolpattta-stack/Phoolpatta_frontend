// "use client";

// import { useRouter } from "next/navigation";
// import ProductCard from "./ProductCard";

// const BEST_SELLERS = [
//   {
//     id: 1,
//     name: "Red Rose Bouquet",
//     price: 999,
//     discount: 23,
//     images:
//       "/products/rose-bouquet.jpg",
//       // "/products/rose-bouquet2.jpg",

//     slug: "bouquet",
//   },
//   {
//     id: 2,
//     name: "Wedding Jaimala (Premium)",
//     price: 1999,
//     discount: 20,
//     images:
//       "/products/jaimala.jpg",
//       // "/products/jaimala2.jpg",

//     slug: "jaimala",
//   },
//   {
//     id: 3,
//     name: "Bridal Floral Jewellery Set",
//     price: 1499,
//     discount: 15,
//     images: "/products/floral-jewellery.jpg",
//     slug: "floral-jewellery",
//   },
//   {
//     id: 4,
//     name: "Car Flower Decoration",
//     price: 2499,
//     discount: 10,
//     images: "/products/car-decoration.jpg",
//     slug: "car-decoration",
//   },
//   {
//     id: 5,
//     name: "Bed Decoration for Honeymoon",
//     price: 2999,
//     discount: 18,
//     images: "/products/bed-decoration.jpg",
//     slug: "bed-decoration",
//   },
// ];

// const BestSellersSection = () => {
//   const router = useRouter();

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//           Best Sellers
//         </h2>

//         <button className="text-sm text-pink-600 hover:underline hover:cursor-pointer">
//           View All
//         </button>
//       </div>

//       {/* GRID */}
//       <div
//         className="
//           grid
//           grid-cols-2
//           sm:grid-cols-3
//           md:grid-cols-4
//           lg:grid-cols-5
//           gap-4
//         "
//       >
//         {BEST_SELLERS.map((product) => (
//           <div
//             key={product.id}
//             onClick={() =>
//               router.push(`/product/${product.slug}-${product.id}`)
//             }
//             className="cursor-pointer"
//           >
//             <ProductCard
//               name={product.name}
//               price={product.price}
//               discount={product.discount}
//               images={product.images}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BestSellersSection;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/modules/products/services/product.api";

const BestSellersSection = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await getAllProducts({
        limit: 5,
        category:"bestseller",
      });
      
      const list = res.data.data || res.data.products || [];
   
      setProducts(list);
      
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Best Sellers
        </h2>

        <button
          onClick={() => router.push("/category/bestseller")}
          className="text-sm text-pink-600 hover:underline hover:cursor-pointer"
        >
          View All
        </button>
      </div>

      <div
        className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() =>
              router.push(`/product/${product.slug}-${product._id}`)
            }
            className="cursor-pointer"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
