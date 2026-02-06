
import Script from "next/script";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      {children}
      
      {/* Google Identity Services */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

    </div>
  );
}
