// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// type CategoryCardProps = {
//   title: string;
//   slug: string;
//   image: string;
// };

// const CategoryCard = ({ title, slug, image }: CategoryCardProps) => {
//   const router = useRouter();

//   return (
//     <button
//       onClick={() => router.push(`/category/${slug}`)}
//       className="
//         group
//         w-full
//         rounded-2xl
//         bg-white
//         border border-gray-200
//         overflow-hidden
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:shadow-xl
//         text-left
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative h-32 sm:h-36 md:h-40">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="
//             object-cover
//             transition-transform
//             duration-300
//             group-hover:scale-105
//           "
//         />
//       </div>

//       {/* TEXT */}
//       <div className="p-3 text-center">
//         <h3 className="text-sm sm:text-base font-medium text-gray-800">
//           {title}
//         </h3>
//       </div>
//     </button>
//   );
// };

// export default CategoryCard;
  

// 2nd design

// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// type CategoryCardProps = {
//   title: string;
//   slug: string;
//   image: string;
// };

// const CategoryCard = ({ title, slug, image }: CategoryCardProps) => {
//   const router = useRouter();

//   return (
//     <button
//       onClick={() => router.push(`/category/${slug}`)}
//       className="group text-left"
//     >
//       {/* IMAGE CARD */}
//       <div
//         className="
//           relative
//           h-32 sm:h-36 md:h-40
//           rounded-2xl
//           bg-white
//           border border-gray-200
//           overflow-hidden
//           transition-all
//           duration-300
//           hover:-translate-y-1
//           hover:shadow-xl
//         "
//       >
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="
//             object-cover
//             transition-transform
//             duration-300
//             group-hover:scale-105
//           "
//         />

//         {/* subtle overlay on hover */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
//       </div>

//       {/* TITLE OUTSIDE IMAGE */}
//       <h3 className="mt-3 text-sm sm:text-base font-medium text-gray-800 text-center">
//         {title}
//       </h3>
//     </button>
//   );
// };

// export default CategoryCard;


"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  title: string;
  slug: string;
  image: string;
};

const CategoryCard = ({ title, slug, image }: CategoryCardProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/category/${slug}`)}
      className="group text-left"
    >
      {/* IMAGE CARD */}
      <div
        className="
          relative
          h-24 sm:h-32 md:h-40
          rounded-xl sm:rounded-2xl
          bg-white
          border border-gray-200
          overflow-hidden
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:cursor-pointer
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
      </div>

      {/* TITLE */}
      <h3
        className="
          mt-2 sm:mt-3
          text-xs sm:text-sm md:text-base
          font-medium
          text-gray-800
          text-center
          leading-tight
        "
      >
        {title}
      </h3>
    </button>
  );
};

export default CategoryCard;
