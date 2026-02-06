// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Check } from "lucide-react";

// const steps = [
//   { label: "Cart", path: "/cart" },
//   { label: "Checkout", path: "/checkout" },
//   { label: "Payment", path: "/payment" },
//   { label: "Confirmation", path: "/order-success" },
// ];

// export default function CartHeader() {
//   const pathname = usePathname();
//   const currentIndex = steps.findIndex((step) =>
//     pathname.startsWith(step.path),
//   );

//   return (
//     <header className="bg-white border-b">
//       <div className="max-w-7xl mx-auto px-4 mt-4">
//         {/* TOP ROW */}
//         <div className="flex items-center h-14">
//           {/* LOGO */}
//           <Link href="/" className="flex items-center gap-2 mr-12">
//             <Image src="/Logo_bg.png" alt="PhoolPatta" width={34} height={34} />
//             <span className="text-2xl font-semibold text-pink-600">
//               PhoolPatta
//             </span>
//           </Link>
//         </div>
//         {/* STEPPER */}
//         <div className="flex-1 relative">
          

//           {/* LABELS */}
//           <div className="relative flex justify-center  gap-10 justify-between mb-5 mt-1">
//             {/* {steps.map((step) => {
//                 const active = pathname.startsWith(step.path);

//                 return (
//                   <span
//                     key={step.label}
//                     className={`px-1 text-lg font-medium bg-white
//                       ${
//                         active
//                           ? "text-pink-600"
//                           : "text-gray-400"
//                       }`}
//                   >
//                     {step.label}
//                   </span>
//                 );
//               })} */}
//             {steps.map((step, index) => {
//               const active = pathname.startsWith(step.path);
//               const completed = index < currentIndex;

//               return (
//                 <div
//                   key={step.label}
//                   className="flex flex-col items-center bg-white px-1"
//                 >
//                   {/* GREEN CHECK FOR COMPLETED */}
//                   {completed && (
//                     <span className="mb-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
//                       <Check size={12} className="text-white" />
//                     </span>
//                   )}

//                   {/* CURRENT STEP DOT */}
//                   {active && !completed && (
//                     <span className="mb-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
//                       <Check size={12} className="text-black" />
//                     </span>
//                   )}

//                   {/* LABEL */}
//                   <span
//                     className={`text-lg font-medium ${
//                       active
//                         ? "text-green-600"
//                         : completed
//                           ? "text-gray-700"
//                           : "text-gray-400"
//                     }`}
//                   >
//                     {step.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";
import { useAuthContext } from "@/context/AuthContext";
import UserAvatar from "@/components/ui/UserAvatar";

const steps = [
  { label: "Cart", path: "/cart" },
  { label: "Checkout", path: "/checkout" },
  { label: "Payment", path: "/payment" },
  { label: "Confirmation", path: "/order-success" },
];

export default function CartHeader() {
  const pathname = usePathname();
  const currentIndex = steps.findIndex((step) =>
    pathname.startsWith(step.path)
  );

  const { isAuthenticated, profile } = useAuthContext();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 mt-4">
        {/* ================= TOP ROW ================= */}
        <div className="flex items-center h-14">
          {/* LOGO + BRAND NAME */}
          <Link href="/" className="flex items-center gap-2 mr-12">
            <Image
              src="/Logo_bg.png"
              alt="PhoolPatta"
              width={34}
              height={34}
              priority
            />
            <span className="text-2xl font-semibold text-pink-600">
              PhoolPatta
            </span>
          </Link>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-6 text-sm text-gray-600">
            {/* HELP */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                "Hi PhoolPatta Team, I need help with my order."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              💬 Help
            </a>

            {/* SECURE CHECKOUT */}
            <span className="flex items-center gap-1 text-green-600">
              🔒 Secure Payment
            </span>

            {/* USER (READ ONLY) */}
            {isAuthenticated && (
              <div className="flex items-center gap-2 text-gray-700">
                <UserAvatar
                  name={profile?.name}
                  gender={profile?.gender}
                  size={22}
                />
                <span className="font-medium">
                  {profile?.name?.split(" ")[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= STEPPER ================= */}
        <div className="flex-1 relative">
          
          <div className="
          
            relative flex justify-center  gap-5 justify-between mb-2 ">
            
            {steps.map((step, index) => {
              const active = pathname.startsWith(step.path);
              const completed = index < currentIndex;

              return (
                <div
                  key={step.label}
                  className="flex flex-col items-center bg-white px-1"
                >
                  {/* COMPLETED STEP */}
                  {completed && (
                    <span className="mb-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </span>
                  )}

                  {/* CURRENT STEP */}
                  {active && !completed && (
                    <span className="mb-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check size={12} className="text-black" />
                    </span>
                  )}

                  {/* LABEL */}
                  <span
                    className={`text-lg font-medium ${
                      active
                        ? "text-green-600"
                        : completed
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
