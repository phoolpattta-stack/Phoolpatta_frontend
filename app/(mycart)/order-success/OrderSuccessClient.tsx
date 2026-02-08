// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { CheckCircle } from "lucide-react";
// import Button from "@/components/ui/Button";

// export default function OrderSuccessClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId");

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-gradient-to-b from-pink-50 to-white">
//       <div className="max-w-xl w-full bg-white border rounded-lg border-pink-200 shadow-md p-8 text-center relative overflow-hidden">

//         {/* SUCCESS ICON */}
//         <CheckCircle size={76} className="mx-auto text-green-600 mb-4 pt-2" />

//         {/* TITLE */}
//         <h1 className="text-3xl font-semibold text-gray-800 mb-2">
//           Your flowers are on their way 🌸
//         </h1>

//         {/* MESSAGE */}
//         <p className="text-gray-600 mb-6 leading-relaxed">
//           Thank you for choosing <b>PhoolPatta</b> 💐
//           <br />
//           Your order has been placed successfully and we’re already
//           preparing something beautiful just for you.
//         </p>

//         {/* ORDER ID */}
//         {orderId && (
//           <p className="text-sm text-gray-500 mb-6">
//             Order ID: <span className="font-medium">{orderId}</span>
//           </p>
//         )}

//         {/* NOTE */}
//         <div className="px-4">
//           <div className="bg-pink-50 border border-pink-200 rounded-xl p-2 mb-5 px-4 text-sm text-pink-700">
//             🌷 <b>A little note from us:</b>
//             <br />
//             Flowers have a way of saying what words cannot.
//             We hope this order brings a smile — to you and the one receiving it.
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5 px-4">
//           <Button onClick={() => router.push("/")}>
//             Continue Shopping
//           </Button>

//           <button
//             onClick={() => router.push("/orders")}
//             className="
//               px-6 py-3 rounded-xl
//               border border-pink-600
//               text-pink-600 font-medium
//               hover:bg-pink-50 transition
//             "
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Sparkles,
  Truck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function OrderSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Pink Confetti */}
      {mounted && showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#ec4899", "#f472b6", "#db2777", "#fbcfe8"][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
            {/* Pink Gradient Header */}
            <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white/30 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-block relative mb-4">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-white rounded-full p-4">
                    <CheckCircle
                      size={64}
                      className="text-pink-600"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-fadeInUp">
                  Order Confirmed! 🌸
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-medium animate-fadeInUp animation-delay-200">
                  Your beautiful flowers are on their way
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              {/* Thank You Message */}
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Thank you for choosing{" "}
                  <span className="font-bold text-pink-600">PhoolPatta</span> 💐
                </p>
                <p className="text-gray-500">
                  Your order has been confirmed and we're preparing something
                  beautiful just for you.
                </p>
              </div>

              {/* Order ID Badge */}
              {/* {orderId && (
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-300 rounded-full px-6 py-3 shadow-sm">
                    <Package size={20} className="text-pink-600" />
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="font-bold text-gray-800 text-lg">{orderId}</span>
                  </div>
                </div>
              )} */}
              {orderId && (
                <div className="flex justify-center mb-8 px-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-50 to-pink-100 border-2 border-pink-300 rounded-2xl px-4 py-3 shadow-sm max-w-full text-center">
                    <Package size={20} className="text-pink-600 shrink-0" />

                    <span className="text-sm text-gray-600">Order ID:</span>

                    <span className="font-bold text-gray-800 text-sm sm:text-lg break-all sm:break-normal">
                      {orderId}
                    </span>
                  </div>
                </div>
              )}

              {/* Progress Steps */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                  What happens next?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Step 1 - Completed */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center transform group-hover:scale-105 transition-all duration-300 border-2 border-pink-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle size={28} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Order Confirmed
                      </h4>
                      <p className="text-sm text-gray-600">
                        We've received your order
                      </p>
                      <div className="mt-3 text-xs text-pink-600 font-semibold bg-pink-100 px-3 py-1 rounded-full inline-block">
                        Completed ✓
                      </div>
                    </div>
                  </div>

                  {/* Step 2 - In Progress */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center transform group-hover:scale-105 transition-all duration-300 border-2 border-pink-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                        <Sparkles size={28} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Preparing
                      </h4>
                      <p className="text-sm text-gray-600">
                        Creating your arrangement
                      </p>
                      <div className="mt-3 text-xs text-pink-600 font-semibold bg-pink-100 px-3 py-1 rounded-full inline-block">
                        In Progress...
                      </div>
                    </div>
                  </div>

                  {/* Step 3 - Upcoming */}
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 text-center transform group-hover:scale-105 transition-all duration-300 border-2 border-gray-200">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Truck size={28} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Out for Delivery
                      </h4>
                      <p className="text-sm text-gray-500">On its way to you</p>
                      <div className="mt-3 text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full inline-block">
                        Upcoming
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Message Card */}
              <div className="bg-gradient-to-r from-pink-100 via-pink-100 to-pink-100 border-2 border-pink-300 rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full filter blur-3xl opacity-30"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <Heart size={24} className="text-white" fill="white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-pink-800 mb-2 text-lg">
                      A little note from us 🌷
                    </h4>
                    <p className="text-pink-800 leading-relaxed">
                      Flowers have a way of saying what words cannot. We hope
                      this order brings a smile — to you and the one receiving
                      it. Every petal is arranged with love and care.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => router.push("/orders")}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-pink-700 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Track Your Order</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-white border-2 border-pink-300 text-pink-700 font-semibold py-4 px-6 rounded-xl hover:bg-pink-50 hover:border-pink-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <Package
                    size={20}
                    className="text-pink-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm mb-1">
                      Delivery Updates
                    </h5>
                    <p className="text-xs text-gray-600">
                      We'll send you notifications about your order status
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <Heart
                    size={20}
                    className="text-pink-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm mb-1">
                      Fresh Guarantee
                    </h5>
                    <p className="text-xs text-gray-600">
                      100% fresh flowers or we'll replace them for free
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-pink-200 shadow-lg">
            <p className="text-gray-600 mb-2">
              Need help with your order?
            </p>
            <a 
              href="#"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
            >
              <span>Contact Support</span>
              <ArrowRight size={16} />
            </a>
          </div> */}
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
