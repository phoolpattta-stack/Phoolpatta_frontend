// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginUser, googleLogin } from "@/modules/auth/services/auth.api";
// import { useAuthContext } from "@/context/AuthContext";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import AuthCard from "@/components/ui/AuthCard";
// declare global {
//   interface Window {
//     google: any;
//   }
// }


// export default function LoginForm() {
//   const router = useRouter();
//   const { login } = useAuthContext();

//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /* ================= NORMAL LOGIN ================= */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const res = await loginUser({ emailOrPhone, password });
//       login(res.data.token);
//       router.push("/");
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= GOOGLE LOGIN ================= */
//   // const handleGoogleLogin = async () => {
//   //   setError(null);
//   //   setLoading(true);

//   //   try {
//   //     /**
//   //      * IMPORTANT:
//   //      * This `googleIdToken` will come from Google Identity SDK
//   //      * (we will integrate it later).
//   //      */
//   //     const googleIdToken = ""; // <-- to be replaced later

//   //     if (!googleIdToken) {
//   //       setError("Google login not configured yet");
//   //       return;
//   //     }

//   //     const res = await googleLogin(googleIdToken);
//   //     login(res.data.token);
//   //     router.push("/");
//   //   } catch (err: any) {
//   //     setError(err?.response?.data?.message || "Google login failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleGoogleLogin = async () => {
//   setError(null);
//   setLoading(true);

//   try {
//     // Ensure Google SDK is loaded
//     if (!window.google) {
//       throw new Error("Google SDK not loaded");
//     }

//     // Initialize Google Identity
//     window.google.accounts.id.initialize({
//       client_id:
//         "92670838358-87ir0pe673oql8in9gsf0ch0gj18gaum.apps.googleusercontent.com",
//       callback: async (response: any) => {
//         try {
//           const googleIdToken = response.credential; // ✅ REAL TOKEN

//           if (!googleIdToken) {
//             setError("Failed to get Google token");
//             return;
//           }

//           const res = await googleLogin(googleIdToken);
//           login(res.data.token);
//           router.push("/");
//         } catch (err: any) {
//           setError(
//             err?.response?.data?.message || "Google login failed"
//           );
//         } finally {
//           setLoading(false);
//         }
//       },
//     });

//     // Open Google popup
//     window.google.accounts.id.prompt();
//   } catch (err: any) {
//     setError(err.message || "Google login failed");
//     setLoading(false);
//   }
// };


//   return (
    
//     <AuthCard title="Login to PhoolPatta">
//       {error && (
//         <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <Input
//           placeholder="Email or Phone"
//           value={emailOrPhone}
//           onChange={(e) => setEmailOrPhone(e.target.value)}
//           required
//         />

//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {/* FORGOT PASSWORD */}
//         <div className="text-right mb-4">
//           <button
//             type="button"
//             onClick={() => router.push("/forgot-password")}
//             className="text-xs text-pink-600 hover:underline hover:cursor-pointer"
//           >
//             Forgot password?
//           </button>
//         </div>

//         <Button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </Button>
//       </form>

//       {/* DIVIDER */}
//       <div className="flex items-center my-5">
//         <div className="flex-1 h-px bg-gray-200" />
//         <span className="px-3 text-xs text-gray-400">OR</span>
//         <div className="flex-1 h-px bg-gray-200" />
//       </div>

//       {/* GOOGLE LOGIN */}
//       <button
//         type="button"
//         onClick={handleGoogleLogin}
//         disabled={loading}
//         className="
//           w-full
//           h-[48px]
//           border
//           border-gray-300
//           rounded-xl
//           text-sm
//           font-medium
//           flex
//           items-center
//           justify-center
//           gap-2
//           hover:bg-gray-50
//           disabled:opacity-60
//           hover:cursor-pointer
//         "
//       >
//         <img
//           src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//           alt="Google"
//           className="w-5 h-5"
//         />
//         Continue with Google
//       </button>

//       {/* SIGNUP LINK */}
//       <p className="mt-5 text-sm text-center text-gray-600">
//         No account?{" "}
//         <button
//           onClick={() => router.push("/signup")}
//           className="text-pink-600 font-medium hover:underline hover:cursor-pointer"
//         >
//           Create one
//         </button>
//       </p>
//     </AuthCard>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, googleLogin } from "@/modules/auth/services/auth.api";
import { useAuthContext } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";
import { toast } from "react-toastify";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { sanitizePhone, isValidPhone, toE164Phone } from "@/utils/validators";
import { on } from "events";


// declare global {
//   interface Window {
//     google: any;
//   }
// }

// export default function LoginForm() {
export default function LoginForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {

  const router = useRouter();
  const { login } = useAuthContext();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleInitialized = useRef(false);

  /* ================= LOAD GOOGLE SDK ================= */
  useEffect(() => {
    if (window.google || googleInitialized.current) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleInitialized.current = true;
    };

    document.body.appendChild(script);
  }, []);

  /* ================= NORMAL LOGIN ================= */
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     const res = await loginUser({
  //       emailOrPhone,
  //       password,
  //     });

  //     login(res.data.token);
  //     toast.success("Login successful 🎉"); //toast message 
  //     onSuccess?.();
  //     router.push("/");
  //   } catch (err: any) {
  //     setError(err?.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    let value = emailOrPhone.trim();

    // if not email → treat as phone
    if (!value.includes("@")) {
      const cleanedPhone = sanitizePhone(value);

      if (!isValidPhone(cleanedPhone)) {
        setError("Enter a valid 10-digit phone number");
        setLoading(false);
        return;
      }

      value = toE164Phone(cleanedPhone);
    }

    const res = await loginUser({
      emailOrPhone: value,
      password,
    });

    login(res.data.token);
    toast.success("Login successful 🎉");
    onSuccess?.();
    router.push("/");
  } catch (err: any) {
    setError(err?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  /* ================= GOOGLE LOGIN ================= */
  // const handleGoogleLogin = () => {
  //   setError(null);

  //   if (!window.google) {
  //     setError("Google SDK not loaded. Please refresh.");
  //     return;
  //   }

  //   window.google.accounts.id.initialize({
  //     client_id:
  //       "92670838358-87ir0pe673oql8in9gsf0ch0gj18gaum.apps.googleusercontent.com",
  //     callback: async (response: any) => {
  //       try {
  //         setLoading(true);

  //         const googleIdToken = response?.credential;

  //         if (!googleIdToken) {
  //           setError("Google authentication failed");
  //           return;
  //         }

  //         const res = await googleLogin(googleIdToken);
  //         login(res.data.token);
  //         toast.success("Logged in with Google 🎉");//toast message 
  //         onSuccess?.();
  //         router.push("/");
  //       } catch (err: any) {
  //         setError(
  //           err?.response?.data?.message || "Google login failed"
  //         );
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //   });

  //   window.google.accounts.id.prompt((notification: any) => {
  //     if (
  //       notification.isNotDisplayed() ||
  //       notification.isSkippedMoment()
  //     ) {
  //       setLoading(false);
  //     }
  //   });
  // };



  




  return (
    <AuthCard title="Login to PhoolPatta">
      {error && (
        <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* FORGOT PASSWORD */}
        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-xs text-pink-600 hover:underline hover:cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* DIVIDER */}
      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* GOOGLE LOGIN */}
      {/* <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="
          w-full
          h-[48px]
          border
          border-gray-300
          rounded-xl
          text-sm
          font-medium
          flex
          items-center
          justify-center
          gap-2
          hover:bg-gray-50
          disabled:opacity-60
          hover:cursor-pointer
        "
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button> */}
      <GoogleLoginButton
  disabled={loading}
  onSuccess={onSuccess}
/>


      {/* SIGNUP LINK */}
      <p className="mt-5 text-sm text-center text-gray-600">
        No account?{" "}
        <button
          onClick={() => router.push("/signup")}
          className="text-pink-600 font-medium hover:underline hover:cursor-pointer"
        >
          Create one
        </button>
      </p>
    </AuthCard>
  );
}
