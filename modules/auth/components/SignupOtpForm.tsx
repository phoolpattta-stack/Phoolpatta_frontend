// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { verifySignupOtp } from "@/modules/auth/services/auth.api";
// import { useAuthContext } from "@/context/AuthContext";
// import Button from "@/components/ui/Button";
// import AuthCard from "@/components/ui/AuthCard";

// export default function SignupOtpForm() {
//   const router = useRouter();
//   const { login } = useAuthContext();

//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//   const [signupData, setSignupData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [seconds, setSeconds] = useState(60);
//   const [shake, setShake] = useState(false);

//   const inputsRef = useRef<HTMLInputElement[]>([]);
  
//   // Load signup data from sessionStorage 
//   useEffect(() => { const data = sessionStorage.getItem("signupData"); 
//     if (!data) { router.push("/signup"); 
//       return; 
//     } 
//       setSignupData(JSON.parse(data)); 
//     }, [router]);

//   /* ---------------- LOAD SIGNUP DATA ---------------- */
//   useEffect(() => {
//     const data = sessionStorage.getItem("signupData");
//     if (data) {
//       setSignupData(JSON.parse(data));
//     }
//   }, []);

//   /* ---------------- COUNTDOWN TIMER ---------------- */
//   useEffect(() => {
//     if (seconds === 0) return;

//     const timer = setInterval(() => {
//       setSeconds((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [seconds]);

//   /* ---------------- OTP INPUT HANDLER ---------------- */
//   const handleOtpChange = (value: string, index: number) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!signupData) {
//       setError("Signup data missing. Please signup again.");
//       return;
//     }

//     const otpValue = otp.join("");
//     if (otpValue.length !== 6) {
//       setError("Please enter complete OTP");
//       setShake(true);
//       return;
//     }

//     setError(null);
//     setLoading(true);

//     try {
//       const res = await verifySignupOtp({
//         ...signupData,
//         otp: otpValue,
        
//       });

//       login(res.data.token);
//       sessionStorage.removeItem("signupData");

//       setSuccess(true);

//       setTimeout(() => {
//         router.push("/");
//       }, 1200);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Invalid OTP");
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- RESEND (UI ONLY) ---------------- */
//   const handleResend = () => {
//     setSeconds(60);
//     setOtp(Array(6).fill(""));
//     inputsRef.current[0]?.focus();
//   };

//   return (
//     <>
//       {/* SUCCESS TOAST */}
//       {success && (
//         <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
//           OTP Verified Successfully 🎉
//         </div>
//       )}

//       <AuthCard title="Verify OTP">
//         <p className="text-xs text-gray-500 text-center mb-4">
//           Enter the 6-digit OTP sent to your email / phone
//         </p>

//         {error && (
//           <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* OTP BOXES */}
//           <div
//             className={`flex justify-center gap-2 mb-4 ${
//               shake ? "animate-shake" : ""
//             }`}
//           >
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => {
//                   if (el) inputsRef.current[index] = el;
//                 }}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleOtpChange(e.target.value, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 className="w-10 h-12 text-center text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
//               />
//             ))}
//           </div>

//           {/* TIMER / RESEND */}
//           <div className="text-center text-xs text-gray-500 mb-4">
//             {seconds > 0 ? (
//               <>Resend OTP in {seconds}s</>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleResend}
//                 className="text-pink-600 font-medium hover:underline"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>

//           <Button type="submit" disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </Button>
//         </form>
//       </AuthCard>

//       {/* SHAKE ANIMATION */}
//       <style jsx>{`
//         .animate-shake {
//           animation: shake 0.4s;
//         }
//         @keyframes shake {
//           0% {
//             transform: translateX(0);
//           }
//           25% {
//             transform: translateX(-5px);
//           }
//           50% {
//             transform: translateX(5px);
//           }
//           75% {
//             transform: translateX(-5px);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  verifySignupOtp,
  sendSignupOtp,
} from "@/modules/auth/services/auth.api";
import { useAuthContext } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";

export default function SignupOtpForm() {
  const router = useRouter();
  const { login } = useAuthContext();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [signupData, setSignupData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [shake, setShake] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);



 /* ---------------- Load signup data from sessionStorage ---------------- */

  useEffect(() => { const data = sessionStorage.getItem("signupData"); 
    if (!data) { router.push("/signup"); 
      return; 
    } 
      setSignupData(JSON.parse(data)); 
    }, [router]);

    

  /* ---------------- LOAD SIGNUP DATA ---------------- */
  useEffect(() => {
    const data = sessionStorage.getItem("signupData");

    if (!data) {
      router.push("/signup");
      return;
    }

    setSignupData(JSON.parse(data));
  }, [router]);

  /* ---------------- COUNTDOWN TIMER ---------------- */
  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  /* ---------------- OTP INPUT HANDLER ---------------- */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData) {
      setError("Signup session expired. Please signup again.");
      return;
    }

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter complete OTP");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await verifySignupOtp({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        address: signupData.address,
        gender: signupData.gender,
        password: signupData.password,
        otp: otpValue,
      });

      login(res.data.token);
      sessionStorage.removeItem("signupData");

      setSuccess(true);
      setTimeout(() => router.push("/"), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "OTP verification failed");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResend = async () => {
    if (!signupData) return;

    try {
      setLoading(true);
      setError(null);

      await sendSignupOtp({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        address: signupData.address,
        gender: signupData.gender,
        password: signupData.password,
      });

      setOtp(Array(6).fill(""));
      setSeconds(60);
      inputsRef.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
          OTP Verified Successfully 🎉
        </div>
      )}

      <AuthCard title="Verify OTP">
        <p className="text-xs text-gray-500 text-center mb-4">
          Enter the 6-digit OTP sent to your email / phone
        </p>

        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div
            className={`flex justify-center gap-2 mb-4 ${
              shake ? "animate-shake" : ""
            }`}
          >
            {otp.map((digit, index) => (
             <input
                key={index}
              ref={(el) => {
    if (el) {
      inputsRef.current[index] = el;
    }
  }}
  type="text"
  maxLength={1}
  value={digit}
  onChange={(e) => handleOtpChange(e.target.value, index)}
  onKeyDown={(e) => handleKeyDown(e, index)}
  className="w-10 h-12 text-center text-lg border rounded-xl focus:ring-2 focus:ring-pink-400"
/>

            ))}
          </div>

          <div className="text-center text-xs text-gray-500 mb-4">
            {seconds > 0 ? (
              <>Resend OTP in {seconds}s</>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-pink-600 font-medium hover:underline hover:cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </AuthCard>
    </>
  );
}
