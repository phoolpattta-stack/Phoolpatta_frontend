"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { googleLogin } from "@/modules/auth/services/auth.api";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

declare global {
  interface Window {
    google: any;
  }
}

type Props = {
  onSuccess?: () => void;
  disabled?: boolean;
};

export default function GoogleLoginButton({ onSuccess }: Props) {
  const router = useRouter();
  const { login } = useAuthContext();
  const btnRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "429233333879-uq182tcr8dvumui6e0i5lt1ssiappvvs.apps.googleusercontent.com",
        callback: async (response: any) => {
          try {
            const token = response?.credential;
            if (!token) return toast.error("Google login failed");

            const res = await googleLogin(token);
            login(res.data.token);

            toast.success("Logged in with Google 🎉");
            onSuccess?.();
            router.push("/");
          } catch (err: any) {
            toast.error(
              err?.response?.data?.message || "Google login failed"
            );
          }
        },
      });

      // 🔑 THIS IS THE FIX
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: "100%",
      });

      initialized.current = true;
    };

    document.body.appendChild(script);
  }, []);

  return <div ref={btnRef} className="w-full" />;
}