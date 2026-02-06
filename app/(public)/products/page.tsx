// only for the search through the search bar


// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { getAllProducts } from "@/modules/products/services/product.api";
// import ProductCard from "@/components/landing-page/ProductCard";
// import { useRouter } from "next/navigation";


// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   images: string[];
//   discount?: number;
//   rating: number;
//   reviewCount: number;
//   isActive: boolean;
// };

// const ProductsPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Read query params
//   const search = searchParams.get("search") || "";
//   const category = searchParams.get("category") || "";

//   // State
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* -----------------------------------------
//      FETCH PRODUCTS (SEARCH / CATEGORY)
//   ------------------------------------------*/
//   useEffect(() => {
//     setLoading(true);

//     getAllProducts({
//       search,
//       category,
//       page: 1,
//       limit: 20,
//     })
//       .then((res) => {
//         // setProducts(res.data.products ?? res.data ?? []);
//         const allProducts: Product[] =
//     res.data.products ?? res.data ?? [];

//   const activeProducts = allProducts.filter(
//     (product) => product.isActive === true
//   );

  

//   setProducts(activeProducts);
//       })
//       .catch((err) => {
//         // console.error("Failed to fetch products", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [search, category]);

//   /* -----------------------------------------
//      UI STATES
//   ------------------------------------------*/

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
//         Loading products...
//       </div>
//     );
//   }

//   if (!products.length) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-10 text-center">
//         <p className="text-gray-600 text-sm">
//           No products found
//           {search && (
//             <>
//               {" "}
//               for <span className="font-medium">“{search}”</span>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   }

//   /* -----------------------------------------
//      RENDER PRODUCTS
//   ------------------------------------------*/

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       {/* RESULT INFO */}
//       {search && (
//         <p className="text-sm text-gray-500 mb-4">
//           Showing results for{" "}
//           <span className="font-medium text-gray-700">“{search}”</span>
//         </p>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {products.map((product) => {
//           // SEO-friendly slug (frontend-only)
//           const productSlug = product.name
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/(^-|-$)/g, "");

//           return (
//             <div
//               key={product._id}
//               onClick={() =>
//                 search &&
//                 router.push(`/product/${productSlug}-${product._id}`)
//               }
//               className={search ? "cursor-pointer" : ""}
//             >
//               <ProductCard
//                 name={product.name}
//                 price={product.price}
//                 images={product.images}
//                 discount={product.discount}
//                 rating={product.rating}
//                 reviewCount={product.reviewCount}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;



// app/products/page.tsx
import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
        Loading products...
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}