

// "use client";

// import { Truck } from "lucide-react";

// type ProductCardProps = {
//   name: string;
//   price: number;
//   images: string[];     // full images array
//   discount?: number;    // percentage (optional)
// };

// const ProductCard = ({
//   name,
//   price,
//   images,
//   discount,
// }: ProductCardProps) => {
//   /* DELIVERY LOGIC */
//   const hour = new Date().getHours();
//   const deliveryText =
//     hour < 14 ? "Delivery Today" : "Delivery Tomorrow";

//   const finalPrice = discount
//     ? Math.round(price - (price * discount) / 100)
//     : price;

//   return (
//     <div
//       className="
//         bg-white
//         rounded-xl
//         overflow-hidden
//         border border-gray-200
//         hover:border-pink-300
//         hover:shadow-md
//         transition
//         flex flex-col
//         h-full
//       "
//     >
//       {/* IMAGE */}
//       <div className="w-full h-[200px] b bg-gray-100">
//         <img
//           src={images[0]}        // ✅ FIRST IMAGE ONLY
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="p-3 flex flex-col flex-1">
//         {/* NAME */}
//         <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
//           {name}
//         </p>

//         {/* PRICE */}
//         <div className="flex items-center gap-2 mt-1">
//           <span className="text-pink-600 font-semibold text-sm">
//             ₹{finalPrice}
//           </span>

//           {discount && (
//             <>
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{price}
//               </span>
//               <span className="text-xs text-green-600 font-medium">
//                 {discount}% OFF
//               </span>
//             </>
//           )}
//         </div>

//         {/* DELIVERY */}
//         <div className="mt-auto pt-2 flex items-center gap-1 text-xs text-gray-500">
//           <Truck size={14} />
//           <span>{deliveryText}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


"use client";

import { Truck } from "lucide-react";

type ProductCardProps = {
  name: string;
  price: number;        // ✅ FINAL price from backend
  images: string[];
  discount?: number;
  rating: number;
  reviewCount: number;
};

const ProductCard = ({
  name,
  price,
  images,
  discount,
  rating,
  reviewCount,
}: ProductCardProps) => {
  /* DELIVERY LOGIC */
  const hour = new Date().getHours();
  const deliveryText =
    hour < 14 ? "Delivery Today" : "Delivery Tomorrow";

  /* PRICE LOGIC (backend price is final) */
  const finalPrice = price;

  const originalPrice =
    discount && discount > 0
      ? Math.round(price / (1 - discount / 100))
      : null;

  /* RATING STARS */
  const renderStars = () => {
    const filledStars = Math.round(rating);

    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < filledStars ? "⭐" : "☆"}</span>
    ));
  };

  return (
    <div
      className="
        bg-white
        rounded-xl
        overflow-hidden
        border border-gray-200
        hover:border-pink-300
        hover:shadow-md
        transition
        flex flex-col
        h-full
      "
    >
      {/* IMAGE */}
      <div className="w-full h-[200px] bg-gray-100">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">
        {/* NAME */}
        <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {name}
        </p>

        
        {/* RATING */}
        <div className="flex items-center gap-1 text-xs mt-1">
          {renderStars()}

          {reviewCount === 0 ? (
            <span className="text-gray-400 ml-1">
              Be the first to rate this product ✨
            </span>
          ) : (
            <span className="text-gray-500 ml-1">
              {rating} · {reviewCount} reviews
            </span>
          )}
        </div>


        {/* PRICE */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-pink-600 font-semibold text-sm">
            ₹{finalPrice}
          </span>

          {discount && originalPrice && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </span>
              <span className="text-xs text-green-600 font-medium">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* DELIVERY */}
        <div className="mt-auto pt-2 flex items-center gap-1 text-xs text-gray-500">
          <Truck size={14} />
          <span>{deliveryText}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
