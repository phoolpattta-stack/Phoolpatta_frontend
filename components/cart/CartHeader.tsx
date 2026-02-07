

// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Check } from "lucide-react";

// import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";
// import { useAuthContext } from "@/context/AuthContext";
// import UserAvatar from "@/components/ui/UserAvatar";

// const steps = [
//   { label: "Cart", path: "/cart" },
//   { label: "Checkout", path: "/checkout" },
//   { label: "Payment", path: "/payment" },
//   { label: "Confirmation", path: "/order-success" },
// ];

// export default function CartHeader() {
//   const pathname = usePathname();
//   const currentIndex = steps.findIndex((step) =>
//     pathname.startsWith(step.path)
//   );

//   const { isAuthenticated, profile } = useAuthContext();

//   return (
//     <header className="bg-white border-b">
//       <div className="max-w-7xl mx-auto px-4 mt-4">
//         {/* ================= TOP ROW ================= */}
//         <div className="flex items-center h-14">
//           {/* LOGO + BRAND NAME */}
//           <Link href="/" className="flex items-center gap-2 mr-12">
//             <Image
//               src="/Logo_bg.png"
//               alt="PhoolPatta"
//               width={34}
//               height={34}
//               priority
//             />
//             <span className="text-2xl font-semibold text-pink-600">
//               PhoolPatta
//             </span>
//           </Link>

//           {/* RIGHT SIDE */}
//           <div className="ml-auto flex items-center gap-6 text-sm text-gray-600">
//             {/* HELP */}
//             <a
//               href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
//                 "Hi PhoolPatta Team, I need help with my order."
//               )}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 hover:text-green-600 transition"
//             >
//               💬 Help
//             </a>

//             {/* SECURE CHECKOUT */}
//             <span className="flex items-center gap-1 text-green-600">
//               🔒 Secure Payment
//             </span>

//             {/* USER (READ ONLY) */}
//             {isAuthenticated && (
//               <div className="flex items-center gap-2 text-gray-700">
//                 <UserAvatar
//                   name={profile?.name}
//                   gender={profile?.gender}
//                   size={22}
//                 />
//                 <span className="font-medium">
//                   {profile?.name?.split(" ")[0]}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ================= STEPPER ================= */}
//         <div className="flex-1 relative">
          
//           <div className="
          
//             relative flex justify-center  gap-5 justify-between mb-2 ">
            
//             {steps.map((step, index) => {
//               const active = pathname.startsWith(step.path);
//               const completed = index < currentIndex;

//               return (
//                 <div
//                   key={step.label}
//                   className="flex flex-col items-center bg-white px-1"
//                 >
//                   {/* COMPLETED STEP */}
//                   {completed && (
//                     <span className="mb-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
//                       <Check size={12} className="text-white" />
//                     </span>
//                   )}

//                   {/* CURRENT STEP */}
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
//                         ? "text-gray-700"
//                         : "text-gray-400"
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


// chatgpt version 2.0
// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// const steps = [
//   { label: "Cart", path: "/cart" },
//   { label: "Address", path: "/checkout" },
//   { label: "Payment", path: "/payment" },
//   { label: "Done", path: "/order-success" },
// ];

// export default function CartHeader() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const currentIndex = steps.findIndex(step =>
//     pathname.startsWith(step.path)
//   );

//   const progressPercent =
//     ((currentIndex + 1) / steps.length) * 100;

//   return (
//     <header className="bg-white border-b sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* ================= MOBILE HEADER ================= */}
//         <div className="flex items-center h-12 sm:hidden">
//           <button
//             onClick={() => router.back()}
//             className="text-xl mr-3"
//           >
//             ←
//           </button>

//           <h1 className="text-base font-semibold">
//             {steps[currentIndex]?.label || "Checkout"}
//           </h1>
//         </div>

//         {/* ================= DESKTOP HEADER ================= */}
//         <div className="hidden sm:flex items-center h-14">
//           <Link href="/" className="flex items-center gap-2">
//             <Image
//               src="/Logo_bg.png"
//               alt="PhoolPatta"
//               width={30}
//               height={30}
//             />
//             <span className="text-lg font-semibold text-pink-600">
//               PhoolPatta
//             </span>
//           </Link>
//         </div>

//         {/* ================= PROGRESS BAR ================= */}
//         <div className="pb-3">
//           <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-pink-600 transition-all duration-300"
//               style={{ width: `${progressPercent}%` }}
//             />
//           </div>

//           {/* DESKTOP LABELS */}
//           <div className="hidden sm:flex justify-between mt-2 text-xs">
//             {steps.map((step, index) => (
//               <span
//                 key={step.label}
//                 className={`${
//                   index <= currentIndex
//                     ? "text-pink-600 font-medium"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             ))}
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
import { Check, ShieldCheck, MessageCircle } from "lucide-react";

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
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* MOBILE VIEW */}
        <div className="md:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Logo_bg.png"
                alt="PhoolPatta"
                width={32}
                height={32}
                priority
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-pink-600">
                PhoolPatta
              </span>
            </Link>

            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
              <ShieldCheck size={14} className="text-green-600" />
              <span className="text-xs font-semibold text-green-700">
                Secure
              </span>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="px-4 py-4">
            <div className="relative mb-3">
              {/* Background Track */}
              <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200 rounded-full" />

              {/* Active Progress */}
              <div
                className="absolute top-2 left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / steps.length) * 100}%`,
                }}
              />

              {/* Step Indicators */}
              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const active = index === currentIndex;
                  const completed = index < currentIndex;

                  return (
                    <div key={step.label} className="flex flex-col items-center">
                      <div
                        className={`
                          w-5 h-5 rounded-full flex items-center justify-center
                          transition-all duration-300 shadow-sm
                          ${
                            active
                              ? "bg-green-500 ring-4 ring-green-100 scale-110"
                              : completed
                              ? "bg-green-500"
                              : "bg-white border-2 border-gray-300"
                          }
                        `}
                      >
                        {completed ? (
                          <Check size={11} className="text-white" strokeWidth={3} />
                        ) : active ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : null}
                      </div>

                      {active && (
                        <span className="text-xs font-semibold text-green-600 mt-2">
                          {step.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs text-gray-500 font-medium">
                Step {currentIndex + 1} of {steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/Logo_bg.png"
                alt="PhoolPatta"
                width={38}
                height={38}
                priority
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-pink-600">
                PhoolPatta
              </span>
            </Link>

            <div className="flex items-center gap-8">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                  "Hi PhoolPatta Team, I need help with my order."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors group"
              >
                <MessageCircle
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Need Help?</span>
              </a>

              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <ShieldCheck size={18} className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  100% Secure Payment
                </span>
              </div>

              {isAuthenticated && profile && (
                <div className="flex items-center gap-2.5 bg-gray-50 px-4 py-2 rounded-full">
                  <UserAvatar
                    name={profile.name}
                    gender={profile.gender}
                    size={24}
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {profile.name?.split(" ")[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="px-6 lg:px-8 py-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />

                <div
                  className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-green-500 to-green-400 transition-all duration-700"
                  style={{
                    width:
                      currentIndex === steps.length - 1
                        ? "100%"
                        : `${((currentIndex + 0.5) / (steps.length - 1)) * 100}%`,
                  }}
                />

                <div className="relative flex justify-between">
                  {steps.map((step, index) => {
                    const active = index === currentIndex;
                    const completed = index < currentIndex;

                    return (
                      <div
                        key={step.label}
                        className="flex flex-col items-center bg-white px-3"
                      >
                        <div
                          className={`
                            w-11 h-11 rounded-full flex items-center justify-center
                            transition-all duration-300 shadow-md
                            ${
                              active
                                ? "bg-gradient-to-br from-green-500 to-green-600 ring-4 ring-green-100 scale-110"
                                : completed
                                ? "bg-green-500"
                                : "bg-white border-2 border-gray-300"
                            }
                          `}
                        >
                          {completed ? (
                            <Check size={20} className="text-white" strokeWidth={3} />
                          ) : (
                            <span
                              className={`text-sm font-bold ${
                                active ? "text-white" : "text-gray-400"
                              }`}
                            >
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div className="mt-3 text-center">
                          <span
                            className={`
                              text-sm font-semibold transition-colors
                              ${
                                active
                                  ? "text-green-600"
                                  : completed
                                  ? "text-gray-700"
                                  : "text-gray-400"
                              }
                            `}
                          >
                            {step.label}
                          </span>
                          {active && (
                            <div className="mt-0.5 text-xs text-gray-500 font-medium">
                              In Progress
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}